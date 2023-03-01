import { getRootLayout } from "@components/layouts/rootLayout";
import { useRouter } from "next/router";

const ProjectPage = () => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div>
      <h2 className="text-white">{id}</h2>
    </div>
  );
};

ProjectPage.getLayout = getRootLayout;

export default ProjectPage;
