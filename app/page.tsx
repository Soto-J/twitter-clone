import { getAllPosts } from "./actions/getAllPosts";

import ClientOnly from "./components/ClientOnly";
import Header from "./components/Header";
import Form from "./components/Form";
import getCurrentUser from "./actions/getCurrentUser";
import PostFeed from "./components/posts/PostFeed";

export default async function Home() {
  const currentUser = await getCurrentUser();
  const allPosts = await getAllPosts();

  return (
    <>
      <Header label="Home" />
      <ClientOnly>
        <Form placeholder="What's happening?" user={currentUser} />
      </ClientOnly>
      {currentUser && <PostFeed posts={allPosts} />}
    </>
  );
}
