import Link from "next/link";
import { SiMarvelapp } from "react-icons/si";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="text-2xl font-bold italic underline">
        <SiMarvelapp className="h-12 w-12" />
      </h1>
    </Link>
  );
};

export default Logo;
