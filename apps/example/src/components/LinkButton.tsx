import Link from "next/link";

export type LinkButtonProps = {
  link: string;
  label: string;
};

export const LinkButton = (props: LinkButtonProps) => {
  return (
    <Link href={props.link}>
      <button>{props.label}</button>
    </Link>
  );
};
