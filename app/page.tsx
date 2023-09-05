import Header from "./components/Header";
import Form from "./components/Form";
import getCurrentUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrentUser();

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" user={currentUser} />
    </>
  );
}
