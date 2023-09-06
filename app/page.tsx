import Header from "./components/Header";
import Form from "./components/Form";
import getCurrentUser from "./actions/getCurrentUser";
import ClientOnly from "./components/ClientOnly";
import PostFeed from "./components/posts/PostFeed";
import { getAllPosts } from "./actions/getAllPosts";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const allPosts = await getAllPosts();

  return (
    <>
      <Header label="Home" />
      <ClientOnly>
        <Form placeholder="What's happening?" user={currentUser} />
      </ClientOnly>
      {currentUser && <PostFeed user={null} posts={allPosts} />}
    </>
  );
}
