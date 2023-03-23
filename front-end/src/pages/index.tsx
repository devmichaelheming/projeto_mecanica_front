import S from "~/styles/styles";
import { Breadcrumb } from "antd";
import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <h3>Página Home</h3>
    </>
  );
};

export default Home;
