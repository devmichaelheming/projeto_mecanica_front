import Breadcrumb from "~/components/Breadcrumb";
import type { NextPage } from "next";

const BreadcrumbData = [
  {
    id: "1",
    title: "Home",
    href: "/",
  },
];

const Home: NextPage = () => {
  return (
    <>
      <Breadcrumb data={BreadcrumbData} />

      <h3>Página Home</h3>
    </>
  );
};

export default Home;
