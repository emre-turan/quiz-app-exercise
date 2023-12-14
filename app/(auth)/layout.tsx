import { Container } from "@/components/ui/container";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Container className="flex justify-center items-center h-screen">
      {children}
    </Container>
  );
}
