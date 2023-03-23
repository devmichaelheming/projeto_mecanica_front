import LayoutPage from "~/components/Layout";
import GlobalStyles from "~/styles/GlobalStyles";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {},
        },
      }}
    >
      <LayoutPage>
        <Component {...pageProps} />
        <GlobalStyles />
      </LayoutPage>
    </ConfigProvider>
  );
};

export default MyApp;
