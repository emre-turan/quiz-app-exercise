import { Container } from "@/components/ui/container";
import { UserProfile } from "@clerk/nextjs";

const UserProfilePage = () => (
  <Container>
    <UserProfile path="/user-profile" routing="path" />
  </Container>
);

export default UserProfilePage;
