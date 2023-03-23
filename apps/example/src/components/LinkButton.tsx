import Link from "next/link";

export type LinkButtonProps = {
  link: string;
  label: string;
};

export const LinkButton = ({ link, label, ...props }: LinkButtonProps) => {
  return (
    <Link href={link}>
      <button {...props}>{label}</button>
    </Link>
  );
};
