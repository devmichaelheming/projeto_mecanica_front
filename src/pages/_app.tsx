import { StyleProvider } from "@ant-design/cssinjs";
import Loading from "~/components/Loading";
import useAuthStore from "~/lib/stores/useAuthStore";
import GlobalStyles from "~/styles/GlobalStyles";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { ReactElement, useEffect, lazy, Suspense } from "react";

import "antd/dist/antd.css";

const LayoutPage = lazy(() => import("~/components/Layout"));

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  const router = useRouter();
  const { token, setToken } = useAuthStore();

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("@auth/access_token");

    if (tokenLocalStorage) {
      setToken(tokenLocalStorage);
    }
  }, []);

  useEffect(() => {
    if (token !== null && token === "") {
      router.push("/signIn");
    } else {
      router.push("/home");
    }
  }, [token]);

  return (
    <ConfigProvider locale={ptBR}>
      <StyleProvider hashPriority="high" ssrInline>
        <GlobalStyles />
        {!token ? (
          <Component {...pageProps} />
        ) : (
          <Suspense fallback={<Loading size="large" fullscreen />}>
            <LayoutPage>
              <Component {...pageProps} />
            </LayoutPage>
          </Suspense>
        )}
      </StyleProvider>
    </ConfigProvider>
  );
};

export default MyApp;
