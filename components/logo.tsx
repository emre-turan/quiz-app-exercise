import Link from "next/link";
import { SiMarvelapp } from "react-icons/si";

interface LogoProps {
  className?: string;
}

const Logo = ({ className }: LogoProps) => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold italic underline">
        <SiMarvelapp className={className} />
      </h1>
    </Link>
  );
};

export default Logo;
