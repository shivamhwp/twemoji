import { type NextPage } from "next";
import Head from "next/head";

export const SinglePostPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>twemoji</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" flex h-screen justify-center">
        <div>PostView </div>
      </main>
    </>
  );
};

export default SinglePostPage;
