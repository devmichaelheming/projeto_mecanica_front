import { useRouter } from "next/router";
import React, { FC, ReactElement } from "react";

import S from "./styles";

interface BreadcrumProps {
  data: Array<{
    id: string;
    title: string;
    href: string;
  }>;
}

const Breadcrumb: FC<BreadcrumProps> = ({ data }): ReactElement => {
  const router = useRouter();

  const items = data.map((item) => {
    return {
      id: item.id,
      title: item.title,
      onClick: () => {
        window.location.pathname !== item.href && router.push(item.href);
      },
    };
  });

  return <S.Breadcrumb style={{ margin: "16px 0" }} items={items} />;
};

export default Breadcrumb;
