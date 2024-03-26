import { StyleProvider } from "@ant-design/cssinjs";
import GlobalStyles from "~/styles/GlobalStyles";
import { ConfigProvider } from "antd";
import ptBR from "antd/lib/locale/pt_BR";
import type { AppProps } from "next/app";
import { ReactElement, useEffect, lazy, Suspense } from "react";
import { useRouter } from "next/router";

import "antd/dist/antd.css";
import useAuthStore from "~/lib/stores/useAuthStore";
import Loading from "~/components/Loading";

const UrlsAuth = ["/signIn", "/signUp"];

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
    if (!token && !UrlsAuth.includes(router.pathname)) {
      console.log("token", token);

      router.push("/signIn");
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
