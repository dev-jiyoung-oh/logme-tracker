# 데이터베이스 스키마 설계

## 설계 의도 및 정책

- 컬럼명은 모두 대문자로 작성하며, 단어 구분은 언더스코어(`_`) 사용

- 기록의 제목과 내용은 필수가 아님 (이미지만 첨부하는 경우도 있음)
- 이미지는 별도의 `RECORD_IMAGES` 테이블에서 1:N 관계로 처리
- 외래키 컬럼은 참조 대상 테이블 명시 (예: USER_ID → USERS.ID)
- **모든 FK는 ON DELETE NO ACTION** (IS_DELETED 컬럼으로 소프트 삭제 관리)
- 모든 생성/수정일시는 **JPA Auditing**
- 타임존: **KST(Asia/Seoul)**
- 문자열 인코딩: **utf8mb4**


---

## **1. USERS**
사용자 기본 정보와 인증 관련 데이터를 저장하는 테이블

| 컬럼명         | 타입           | 필수 | 고유 | 인덱스/제약조건      | 설명                |
| ----------- | ------------ | -- | -- | ------------- | ----------------- |
| ID          | BIGINT       | O  | O  | PK            | 회원 고유 식별자 (자동 증가) |
| EMAIL       | VARCHAR(150) | O  | O  | UNIQUE INDEX  | 로그인용 이메일          |
| PASSWORD    | VARCHAR(100) | O  |    |               | 비밀번호 (해시값 저장)     |
| NICKNAME    | VARCHAR(20)  | O  |    |               | 사용자 닉네임           |
| CREATED_AT | TIMESTAMP    | O  |    | JPA Auditing  | 가입 일시 (KST)       |
| UPDATED_AT | TIMESTAMP    | O  |    | JPA Auditing  | 수정 일시 (KST)       |
| IS_DELETED | BOOLEAN      | O  |    | DEFAULT FALSE | 소프트 삭제 여부         |

---

## **2. RECORDS**
사용자가 작성한 기록 데이터를 저장하는 테이블

| 컬럼명          | 타입           | 필수 | 고유 | 인덱스/제약조건                                                 | 설명                        |
| ------------ | ------------ | -- | -- | -------------------------------------------------------- | ------------------------- |
| ID           | BIGINT       | O  | O  | PK                                                       | 기록 고유 식별자 (자동 증가)         |
| USER_ID     | BIGINT       | O  |    | FK(USERS.ID), INDEX IDX_RECORDS_USER_ID_RECORD_DATE | 작성자 회원 ID (외래키: USERS.ID) |
| TITLE        | VARCHAR(100) |    |    |                                                          | 기록 제목                     |
| CONTENT      | TEXT         |    |    |                                                          | 기록 내용                     |
| RECORD_DATE | DATE         | O  |    | INDEX IDX_RECORDS_USER_ID_RECORD_DATE               | 기록 날짜                     |
| CREATED_AT  | TIMESTAMP    | O  |    | JPA Auditing                                             | 생성 일시 (KST)               |
| UPDATED_AT  | TIMESTAMP    | O  |    | JPA Auditing                                             | 수정 일시 (KST)               |
| IS_DELETED  | BOOLEAN      | O  |    | DEFAULT FALSE                                            | 소프트 삭제 여부                 |

---

## **3. RECORD_IMAGES**
기록에 첨부된 이미지 정보를 관리하는 테이블

| 컬럼명         | 타입           | 필수 | 고유 | 인덱스/제약조건                                              | 설명                          |
| ----------- | ------------ | -- | -- | ----------------------------------------------------- | --------------------------- |
| ID          | BIGINT       | O  | O  | PK                                                    | 이미지 고유 식별자 (자동 증가)          |
| RECORD_ID  | BIGINT       | O  |    | FK(RECORDS.ID), INDEX IDX_RECORD_IMAGES_RECORD_ID | 연결된 기록 ID (외래키: RECORDS.ID) |
| IMAGE_URL  | VARCHAR(255) | O  |    |                                                       | 이미지 저장 경로                   |
| CREATED_AT | TIMESTAMP    | O  |    | JPA Auditing                                          | 등록 일시 (KST)                 |
| UPDATED_AT | TIMESTAMP    | O  |    | JPA Auditing                                          | 수정 일시 (KST)                 |
| IS_DELETED | BOOLEAN      | O  |    | DEFAULT FALSE                                         | 소프트 삭제 여부                   |

---

## **4. HABITS**
사용자가 등록한 습관 정보를 저장하는 테이블

| 컬럼명         | 타입           | 필수 | 고유 | 인덱스/제약조건                                  | 설명                        |
| ----------- | ------------ | -- | -- | ----------------------------------------- | ------------------------- |
| ID          | BIGINT       | O  | O  | PK                                        | 습관 고유 식별자 (자동 증가)         |
| USER_ID    | BIGINT       | O  |    | FK(USERS.ID), INDEX IDX_HABITS_USER_ID | 소유자 회원 ID (외래키: USERS.ID) |
| NAME        | VARCHAR(30)  | O  |    |                                           | 습관 이름                     |
| DESCRIPTION | VARCHAR(255) |    |    |                                           | 습관 설명                     |
| CREATED_AT | TIMESTAMP    | O  |    | JPA Auditing                              | 생성 일시 (KST)               |
| UPDATED_AT | TIMESTAMP    | O  |    | JPA Auditing                              | 수정 일시 (KST)               |
| IS_DELETED | BOOLEAN      | O  |    | DEFAULT FALSE                             | 소프트 삭제 여부                 |

---

## **5. HABIT_LOGS**
습관별 일별 수행 여부를 기록하는 테이블

| 컬럼명         | 타입        | 필수 | 고유 | 인덱스/제약조건                                                          | 설명                         |
| ----------- | --------- | -- | -- | ----------------------------------------------------------------- | -------------------------- |
| ID          | BIGINT    | O  | O  | PK                                                                | 습관 기록 고유 식별자 (자동 증가)       |
| HABIT_ID   | BIGINT    | O  |    | FK(HABITS.ID), UNIQUE INDEX UQ_HABIT_LOGS_HABIT_ID_LOG_DATE | 연결된 습관 ID (외래키: HABITS.ID) |
| LOG_DATE   | DATE      | O  |    | UNIQUE INDEX UQ_HABIT_LOGS_HABIT_ID_LOG_DATE                | 습관 기록 날짜                   |
| STATUS      | BOOLEAN   | O  |    |                                                                   | 해당 날짜 습관 수행 여부             |
| CREATED_AT | TIMESTAMP | O  |    | JPA Auditing                                                      | 생성 일시 (KST)                |
| UPDATED_AT | TIMESTAMP | O  |    | JPA Auditing                                                      | 수정 일시 (KST)                |
| IS_DELETED | BOOLEAN   | O  |    | DEFAULT FALSE                                                     | 소프트 삭제 여부                  |

---

## **6. BODY_LOGS**
사용자의 신체 정보(몸무게, 키 등) 일별 기록을 저장하는 테이블

| 컬럼명         | 타입           | 필수 | 고유 | 인덱스/제약조건                                                       | 설명                      |
| ----------- | ------------ | -- | -- | -------------------------------------------------------------- | ----------------------- |
| ID          | BIGINT       | O  | O  | PK                                                             | 신체 정보 기록 고유 식별자 (자동 증가) |
| USER_ID    | BIGINT       | O  |    | FK(USERS.ID), UNIQUE INDEX UQ_BODY_LOGS_USER_ID_LOG_DATE | 회원 ID (외래키: USERS.ID)   |
| LOG_DATE   | DATE         | O  |    | UNIQUE INDEX UQ_BODY_LOGS_USER_ID_LOG_DATE               | 기록 날짜                   |
| WEIGHT      | DECIMAL(5,2) |    |    |                                                                | 몸무게 (kg)                |
| HEIGHT      | DECIMAL(5,2) |    |    |                                                                | 키 (cm)                  |
| CREATED_AT | TIMESTAMP    | O  |    | JPA Auditing                                                   | 생성 일시 (KST)             |
| UPDATED_AT | TIMESTAMP    | O  |    | JPA Auditing                                                   | 수정 일시 (KST)             |
| IS_DELETED | BOOLEAN      | O  |    | DEFAULT FALSE                                                  | 소프트 삭제 여부               |

