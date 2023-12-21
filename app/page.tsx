import Logo from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { UserButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";
import { currentUser } from "@clerk/nextjs";
import Link from "next/link";
import QuizModal from "@/components/quiz-modal";
import CountdownTimer from "@/components/countdown";
import Footer from "@/components/footer";

function SignInButton() {
  return (
    <Link href="/sign-in">
      <Button variant="outline">
        Sign In <ArrowRight className="ml-2 size-4" />
      </Button>
    </Link>
  );
}

async function Header({ user }: any) {
  return (
    <Container variant="breakpointPadded">
      <div className="mx-auto flex items-center justify-between">
        <Logo className="size-12" />
        <div className="flex items-center justify-end gap-4 p-4">
          <ModeToggle />
          {user ? <UserButton afterSignOutUrl="/" /> : <SignInButton />}
        </div>
      </div>
    </Container>
  );
}

export default async function Home() {
  const user = await currentUser();

  return (
    <main className="flex min-h-full flex-col">
      <div className="flex flex-1 flex-col items-center gap-y-8 text-center md:justify-start">
        <Header user={user} />
        <Container>
          <div className="flex flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold"> Quiz App</h1>
            {user ? <div>Welcome {user.firstName} </div> : ""}
          </div>
          <QuizModal />
          <CountdownTimer />
        </Container>
      </div>
      <Footer />
    </main>
  );
}
