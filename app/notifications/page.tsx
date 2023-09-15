import React from "react";
import Header from "../components/Header";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import NotificationsFeed from "./NotificationsFeed";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);
  
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
}

const page = () => {
  return (
    <>
      <Header label="Notifications" showBackArrow />
      <NotificationsFeed />
    </>
  );
};

export default page;
