import LayoutPage from "~/components/Layout";
import GlobalStyles from "~/styles/GlobalStyles";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ReactElement } from "react";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2e8ccf",
        },
      }}
    >
      <LayoutPage>
        <GlobalStyles />
        <Component {...pageProps} />
      </LayoutPage>
    </ConfigProvider>
  );
};

export default MyApp;
