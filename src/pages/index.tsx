import React, { FC, ReactElement } from "react";
import Loading from "~/components/Loading";

const pages: FC = (): ReactElement => {
  return <Loading size="large" fullscreen />;
};

export default pages;
