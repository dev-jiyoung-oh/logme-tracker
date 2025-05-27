# 데이터베이스 스키마 설계

## 설계 의도 및 참고 사항

- 컬럼명은 모두 대문자로 작성하며, 단어 구분은 언더스코어(`_`) 사용
- 소프트 삭제 여부는 `IS_DELETED` 컬럼으로 관리 (기본값 FALSE)
- `UPDATED_AT`은 최초 생성 시에도 업데이트함
- 필수 값은 `NOT NULL`, 선택 값은 `NULL` 허용
- 기록의 제목과 내용은 필수가 아님 (이미지만 첨부 가능)
- 이미지는 별도의 `RECORD_IMAGES` 테이블에서 1:N 관계로 처리
- 외래키 컬럼은 참조 대상 테이블 명시 (예: USER_ID → USERS.ID)

---

## USERS 테이블

사용자 기본 정보와 인증 관련 데이터를 저장하는 테이블

| 컬럼명     | 타입         | 필수 | 고유 | 설명                            |
| ---------- | ------------ | ---- | ---- | ------------------------------- |
| ID         | BIGINT       | O    | O    | 회원 고유 식별자 (자동 증가)    |
| EMAIL      | VARCHAR(255) | O    | O    | 로그인용 이메일                 |
| PASSWORD   | VARCHAR(255) | O    |      | 비밀번호 (해시값 저장)          |
| NICKNAME   | VARCHAR(50)  | O    |      | 사용자 닉네임                   |
| CREATED_AT | TIMESTAMP    | O    |      | 가입 일시                       |
| UPDATED_AT | TIMESTAMP    | O    |      | 수정 일시                       |
| IS_DELETED | BOOLEAN      | O    |      | 소프트 삭제 여부 (기본값 FALSE) |

---

## RECORDS 테이블

사용자가 작성한 기록 데이터를 저장하는 테이블

| 컬럼명      | 타입         | 필수 | 고유 | 설명                              |
| ----------- | ------------ | ---- | ---- | --------------------------------- |
| ID          | BIGINT       | O    | O    | 기록 고유 식별자 (자동 증가)      |
| USER_ID     | BIGINT       | O    |      | 작성자 회원 ID (외래키: USERS.ID) |
| TITLE       | VARCHAR(255) |      |      | 기록 제목                         |
| CONTENT     | TEXT         |      |      | 기록 내용                         |
| RECORD_DATE | DATE         | O    |      | 기록 날짜                         |
| CREATED_AT  | TIMESTAMP    | O    |      | 생성 일시                         |
| UPDATED_AT  | TIMESTAMP    | O    |      | 수정 일시                         |
| IS_DELETED  | BOOLEAN      | O    |      | 소프트 삭제 여부 (기본값 FALSE)   |

---

## RECORD_IMAGES 테이블

기록에 첨부된 이미지 정보를 관리하는 테이블

| 컬럼명     | 타입         | 필수 | 고유 | 설명                                |
| ---------- | ------------ | ---- | ---- | ----------------------------------- |
| ID         | BIGINT       | O    | O    | 이미지 고유 식별자 (자동 증가)      |
| RECORD_ID  | BIGINT       | O    |      | 연결된 기록 ID (외래키: RECORDS.ID) |
| IMAGE_URL  | VARCHAR(255) | O    |      | 이미지 저장 경로                    |
| CREATED_AT | TIMESTAMP    | O    |      | 등록 일시                           |
| UPDATED_AT | TIMESTAMP    | O    |      | 수정 일시                           |
| IS_DELETED | BOOLEAN      | O    |      | 소프트 삭제 여부 (기본값 FALSE)     |

---

## HABITS 테이블

사용자가 등록한 습관 정보를 저장하는 테이블

| 컬럼명      | 타입         | 필수 | 고유 | 설명                              |
| ----------- | ------------ | ---- | ---- | --------------------------------- |
| ID          | BIGINT       | O    | O    | 습관 고유 식별자 (자동 증가)      |
| USER_ID     | BIGINT       | O    |      | 소유자 회원 ID (외래키: USERS.ID) |
| NAME        | VARCHAR(100) | O    |      | 습관 이름                         |
| DESCRIPTION | VARCHAR(255) |      |      | 습관 설명                         |
| CREATED_AT  | TIMESTAMP    | O    |      | 생성 일시                         |
| UPDATED_AT  | TIMESTAMP    | O    |      | 수정 일시                         |
| IS_DELETED  | BOOLEAN      | O    |      | 소프트 삭제 여부 (기본값 FALSE)   |

---

## HABIT_LOGS 테이블

습관별 일별 수행 여부를 기록하는 테이블

| 컬럼명     | 타입      | 필수 | 고유 | 설명                               |
| ---------- | --------- | ---- | ---- | ---------------------------------- |
| ID         | BIGINT    | O    | O    | 습관 기록 고유 식별자 (자동 증가)  |
| HABIT_ID   | BIGINT    | O    |      | 연결된 습관 ID (외래키: HABITS.ID) |
| LOG_DATE   | DATE      | O    |      | 습관 기록 날짜                     |
| STATUS     | BOOLEAN   | O    |      | 해당 날짜 습관 수행 여부           |
| CREATED_AT | TIMESTAMP | O    |      | 생성 일시                          |
| UPDATED_AT | TIMESTAMP | O    |      | 수정 일시                          |
| IS_DELETED | BOOLEAN   | O    |      | 소프트 삭제 여부 (기본값 FALSE)    |

---

## BODY_LOGS 테이블

사용자의 신체 정보(몸무게, 키 등) 일별 기록을 저장하는 테이블

| 컬럼명     | 타입         | 필수 | 고유 | 설명                                   |
| ---------- | ------------ | ---- | ---- | -------------------------------------- |
| ID         | BIGINT       | O    | O    | 신체 정보 기록 고유 식별자 (자동 증가) |
| USER_ID    | BIGINT       | O    |      | 회원 ID (외래키: USERS.ID)             |
| LOG_DATE   | DATE         | O    |      | 기록 날짜                              |
| WEIGHT     | DECIMAL(5,2) |      |      | 몸무게 (kg)                            |
| HEIGHT     | DECIMAL(5,2) |      |      | 키 (cm)                                |
| CREATED_AT | TIMESTAMP    | O    |      | 생성 일시                              |
| UPDATED_AT | TIMESTAMP    | O    |      | 수정 일시                              |
| IS_DELETED | BOOLEAN      | O    |      | 소프트 삭제 여부 (기본값 FALSE)        |
