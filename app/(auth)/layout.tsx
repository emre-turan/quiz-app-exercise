import Logo from "@/components/logo";
import { Container } from "@/components/ui/container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pt-4 ps-4">
        <Logo />
      </div>
      <Container className="flex justify-center items-center h-screen">
        {children}
      </Container>
    </>
  );
}
