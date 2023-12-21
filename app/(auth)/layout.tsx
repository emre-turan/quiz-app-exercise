import Logo from "@/components/logo";
import { Container } from "@/components/ui/container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex min-h-screen items-center justify-center">
      {children}
    </Container>
  );
}
