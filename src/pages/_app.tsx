import LayoutPage from "~/components/Layout";
import GlobalStyles from "~/styles/GlobalStyles";
import { queryClient } from "~/utils/services/queryClient";
import type { AppProps } from "next/app";
import { ReactElement } from "react";
import { QueryClientProvider } from "react-query";

const MyApp = ({ Component, pageProps }: AppProps): ReactElement => {
  return (
    <QueryClientProvider client={queryClient}>
      <LayoutPage>
        <GlobalStyles />
        <Component {...pageProps} />
      </LayoutPage>
    </QueryClientProvider>
  );
};

export default MyApp;
