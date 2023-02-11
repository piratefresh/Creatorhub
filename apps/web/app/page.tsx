import { WordLoop } from "ui";
import { HeroBanner } from "../components/HeroBanner";

export default async function HomePage() {
  return (
    <section>
      <HeroBanner />
      <div className="flex items-center justify-center">
        <h2 className="text-display-xs text-white md:text-display-md">
          Helping People
          <WordLoop
            words={[
              "Gain more experience",
              "Fulfill their projects",
              "Find creative groups",
            ]}
          />
        </h2>
      </div>
    </section>
  );
}
