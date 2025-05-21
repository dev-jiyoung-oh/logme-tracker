# LogMe 📝

> 나를 기록하고, 습관을 만드는 트래커 웹 서비스  
> 프론트엔드와 백엔드를 모두 직접 구현한 프로젝트

---

## 🛠 기술 스택

### Frontend
- React
- TypeScript
- React Query
- Zustand
- React Router
- Tailwind CSS
- Axios

### Backend
- Java 17
- Spring Boot 3
- Spring Security + JWT
- Spring Data JPA
- MySQL
- Gradle

---

## 📐 프로젝트 설계 의도 및 상태 관리 전략

- 사용자 기록을 직관적으로 등록·조회할 수 있는 **트래커 서비스**를 목표로 설계
- **서버 상태**는 **React Query**로 관리 (데이터 캐싱, 리페칭, 에러 처리 등)
- **UI 로컬 상태**는 **Zustand**로 관리 (날짜 필터, 모달, 입력 값 등)
- 상태를 **역할별로 분리**해 흐름을 단순화하고 유지보수성을 높임
- 전체 구조는 **기능 단위 모듈화**를 기준으로 폴더를 구성
- **비동기 처리와 에러 핸들링**을 명확히 고려한 아키텍처 설계

---

## 🔐 주요 기능

- 회원가입 및 로그인 (JWT 기반 인증)
- 사용자 전용 기록 작성/수정/삭제 (CRUD)
- 월 단위 기록 목록 조회
- 기록 상세 보기 (이미지 포함)
- 초기 UI 상태 및 모달 제어는 Zustand를 통한 로컬 상태 관리로 처리
- 다중 이미지 업로드 및 미리보기 기능 (추후 구현 예정)
- 향후 확장
  - 습관 트래킹 기능 (habit, habit_logs)
  - 신체 정보 기록 기능 (body_logs)
  - 데이터 통계 시각화 기능

---

## 📁 프로젝트 구조

`logme-tracker`는 프론트엔드(React 기반)와 백엔드(Spring Boot 기반)를 함께 포함하는 **모노레포(Monorepo)** 구조로 구성되어 있음. 유지보수성과 확장성을 고려해 각 도메인의 책임을 분리하고, 기능별 모듈화를 지향함.

- `frontend/` : React + TypeScript 기반의 클라이언트 애플리케이션
- `backend/` : Spring Boot + Spring Data JPA + MySQL 기반의 REST API 서버
- 상태 관리는 `Zustand`, API 통신은 `Axios`, UI는 `Tailwind CSS` 기반으로 구성됨

```logme-tracker/
│
├── frontend/
│   ├── public/                    # 정적 파일 (favicon 등)
│   ├── src/
│   │   ├── assets/                # 이미지, 아이콘 등 정적 리소스
│   │   ├── components/            # 공통 UI 컴포넌트
│   │   ├── layout/                # 페이지 공통 레이아웃 (예: Header, Footer)
│   │   ├── pages/                 # 라우트 단위 페이지 컴포넌트
│   │   │   ├── Log.tsx           # 기록 작성 페이지
│   │   │   ├── History.tsx       # 기록 목록 페이지
│   │   │   ├── Detail.tsx        # 기록 상세 페이지
│   │   │   ├── Login.tsx         # 로그인 페이지
│   │   │   ├── Signup.tsx        # 회원가입 페이지
│   │   │   ├── Home.tsx          # 홈 화면
│   │   │   └── NotFound.tsx      # 404 페이지
│   │   ├── router/               # React Router 설정
│   │   ├── services/             # API 호출 함수 (Axios 핸들러)
│   │   ├── hooks/                # 커스텀 훅 (예: useRecords, useAuth)
│   │   ├── store/                # Zustand 기반 전역 상태 관리
│   │   ├── types/                # 전역 타입 정의
│   │   ├── utils/                # 공통 유틸 함수
│   │   ├── App.tsx               # 루트 컴포넌트
│   │   ├── main.tsx              # 진입점
│   │   └── index.css             # 글로벌 스타일 (Tailwind 포함)
│   ├── tailwind.config.cjs       # Tailwind 설정
│   ├── postcss.config.cjs        # PostCSS 설정
│   ├── tsconfig.json             # TypeScript 설정
│   ├── package.json              # npm 의존성 관리
│   └── vite.config.ts            # Vite 설정
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/com/logme/
│   │       │   ├── controller/   # REST API 컨트롤러
│   │       │   ├── domain/       # Entity 및 JPA 관련 클래스
│   │       │   ├── dto/          # 데이터 전송용 DTO 클래스
│   │       │   ├── repository/   # Spring Data JPA 레포지토리
│   │       │   ├── service/      # 비즈니스 로직 처리 서비스
│   │       │   └── LogmeTrackerApplication.java  # 메인 애플리케이션 실행 클래스
│   │       └── resources/
│   │           ├── application.yml  # Spring Boot 설정
│   └── build.gradle              # Gradle 빌드 스크립트
│
├── README.md
```

---

## 🎯 개발 목표 및 진행 현황

- ✅ frontend 구조 설계 및 디렉토리 정비
- ✅ 라우팅 및 페이지 컴포넌트 기본 생성 (Log, History, Detail 등)
- ✅ Zustand 기반의 상태 관리 초기 설정 (useRecordStore, useAuthStore)
- ✅ 데이터베이스 테이블 설계 및 ERD 작성 (users, records, record_images 등)
- ✅ tsconfig, .gitignore, vite 절대경로 설정 등 개발 환경 최적화
- ⏳ backend 구조 설계 및 디렉토리 정비
- ⏳ 기본 Spring Boot 설정 파일 생성
- ⏳ API 구현 및 프론트 연동 작업
- ⏳ 이미지 업로드 및 미리보기 구현
- ⏳ 습관 기능 도입 및 확장 설계
- ⏳ 마이페이지 등 사용자 기능 고도화

---

## 📌 커밋 작성 규칙

- 커밋 메시지는 `기능 중심 + 단어 하나`로 간결하게 작성
  - 예: `feat: 기록 추가 기능`, `fix: 로그인 오류 수정`, `style: 버튼 색상 조정`
