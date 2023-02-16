import RootLayout, { getRootLayout } from "@components/layouts/rootLayout";
import { useSession, signIn, signOut } from "next-auth/react";
import { WordLoop } from "ui";
import { HeroBanner } from "../components/HeroBanner";
import { api } from "../utils/api";
import { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  const hello = api.example.hello.useQuery({ text: "from tRPC" });
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

      <div className="flex flex-col items-center gap-2">
        <p className="text-2xl text-white">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <AuthShowcase />
      </div>
    </section>
  );
};

export default Home;

Home.getLayout = getRootLayout;

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};
