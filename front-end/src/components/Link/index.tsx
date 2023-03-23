import NextLink from "next/link";
import React, { FC, ReactElement, ReactNode } from "react";

interface linkProps {
  children: ReactNode;
  href: string;
}

const Link: FC<linkProps> = ({ children, href }): ReactElement => {
  return (
    <NextLink href={href}>
      <a>{children}</a>
    </NextLink>
  );
};

export default Link;
