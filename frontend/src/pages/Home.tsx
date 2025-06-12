//import { useAuthStore } from "@/store/useAuthStore";

export default function Home() {
  //const user = useAuthStore((s) => s.user);
  
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
      
    </>
  );
}