import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";

async function Header() {
  const user = await currentUser();
  console.log(user);

  return (
    <Container variant="breakpointPadded">
      <div className="flex mx-auto items-center justify-between">
        <Logo />
        <div className="flex p-4 justify-end gap-4 items-center">
          <ModeToggle />
          {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
        </div>
      </div>
    </Container>
  );
}

function SignInButton() {
  return (
    <Link href="/sign-in">
      <Button variant="outline">
        Sign In <ArrowRight className="ml-2" size={16} />
      </Button>
    </Link>
  );
}

export default function Home() {
  return (
    <main>
      <Header />
      <Container>
        <h1 className="text-3xl font-bold"> Quiz App</h1>
      </Container>
    </main>
  );
}
