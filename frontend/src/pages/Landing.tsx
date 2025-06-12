import { Button } from "@/components/Button";
import { useAuthStore } from "@/stores/useAuthStore";

export default function Landing() {
  const user = useAuthStore((s) => s.user);
  
  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-4">
        LogMe: 나를 기록하는 트래커
      </h1>

      <section className="text-center">
        <p className="text-lg">
          하루의 습관, 운동, 몸무게까지<br />
          쉽게 기록하고 시각화하는 서비스
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">주요 기능</h2>
        <ul className="list-disc pl-5 space-y-1 text-gray-700">
          <li>일별 기록, 사진 첨부, 메모 저장</li>
          <li>습관 관리와 달성률 시각화</li>
          <li>몸무게·키 등 신체 정보 추적</li>
          <li>모든 데이터 안전하게 저장</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-2">자주 묻는 질문</h2>
        <ul className="space-y-1 text-gray-700">
          <li>Q. 계정이 없어도 쓸 수 있나요?<br />A. 기록 관리는 회원만 가능합니다.</li>
          <li>Q. 모바일에서도 되나요?<br />A. 네, PC와 모바일 모두 지원합니다.</li>
          <li>Q. 내 정보는 안전한가요?<br />A. 최신 보안 기술로 안전하게 보호합니다.</li>
        </ul>
      </section>

      {user ? 
      (
        <></>
      ) : (
        <section className="flex justify-center gap-4 mt-6">
          <Button as="a" href="/signup">회원가입</Button>
          <Button as="a" href="/login" outline={true}>로그인</Button>
        </section>
      )}
      
    </>
  );
}