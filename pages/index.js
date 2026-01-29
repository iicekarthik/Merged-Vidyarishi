
import HomePage from "./home";
import BackToTop from "./backToTop";
import { useScreenSize } from "@/hooks/screenSize";

export default function Home() {
  const screenSize = useScreenSize();
  const BigScreenLogic = ["xxl", "xl", "lg"].includes(screenSize);

  return (
    <>
      <main className="">
        <HomePage />
        <BackToTop BigScreenLogic={BigScreenLogic} />
      </main>
    </>
  );
}
