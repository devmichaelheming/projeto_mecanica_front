import { StyleProvider } from "@ant-design/cssinjs";
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
      <StyleProvider>
        <LayoutPage>
          <GlobalStyles />
          <Component {...pageProps} />
        </LayoutPage>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default MyApp;
