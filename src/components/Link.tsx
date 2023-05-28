import { q } from "groqd";
import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";

interface LinkProps extends NextLinkProps {
  children: ReactNode;
  className?: string;
}

export const Link = (props: LinkProps) => {
  const href = String(props.href);
  const isInternalLink = href.startsWith("/") || href.startsWith("#");

  return isInternalLink ? (
    <NextLink {...props} />
  ) : (
    <NextLink {...props} rel="noopener noreferrer" target="_blank" />
  );
};


export const linkGroqd = {
  enable: q.boolean(),
  label: q.string().nullable(),
  link: q.string().nullable(),
};