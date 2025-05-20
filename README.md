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



---

## 📁 프로젝트 구조

```
logme-tracker/
├── frontend/
├── backend/
├── README.md
```

---

## 🎯 개발 목표 및 진행 현황

- 

---

## 📌 커밋 작성 규칙

- 커밋 메시지는 `기능 중심 + 단어 하나`로 간결하게 작성
  - 예: `feat: 기록 추가 기능`, `fix: 로그인 오류 수정`, `style: 버튼 색상 조정`
