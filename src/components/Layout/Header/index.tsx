import { UserOutlined } from "@ant-design/icons";
import React, { FC, ReactElement } from "react";

import S from "./styles";
import useAuthStore from "~/lib/stores/useAuthStore";
import { useRouter } from "next/router";

const HeaderPage: FC = (): ReactElement => {
  const { setToken } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    setToken("");
    localStorage.removeItem("@auth/access_token");
    router.push("/signIn");
  };

  return (
    <S.Container>
      <S.Wrapper>
        <button
          style={{
            height: "26px",
            width: "42px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={handleLogout}
        >
          Sair
        </button>
        <S.CircleProfile>
          <UserOutlined />
        </S.CircleProfile>
      </S.Wrapper>
    </S.Container>
  );
};

export default HeaderPage;
