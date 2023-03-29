import LayoutPage from "~/components/Layout";
import GlobalStyles from "~/styles/GlobalStyles";
import { queryClient } from "~/utils/services/queryClient";
import { ConfigProvider } from "antd";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { QueryClientProvider } from "react-query";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#2e8ccf",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <LayoutPage>
          <GlobalStyles />
          <Component {...pageProps} />
        </LayoutPage>
      </QueryClientProvider>
    </ConfigProvider>
  );
};

export default MyApp;
