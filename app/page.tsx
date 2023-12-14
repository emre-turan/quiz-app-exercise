import { Container } from "@/components/ui/container";
import { UserButton } from "@clerk/nextjs";

function Header() {
  return (
    <div className="bg-stone-900">
      <div className="flex p-4 justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
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
