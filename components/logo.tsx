import Link from "next/link";
import { SiMarvelapp } from "react-icons/si";

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-bold text-2xl underline italic">
        <SiMarvelapp className="h-12 w-12" />
      </h1>
    </Link>
  );
};

export default Logo;
