import { type GetStaticProps, type NextPage } from "next";
import Head from "next/head";
import { api } from "~/utils/api";
import Image from "next/image";

import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { db } from "~/server/db";
import { appRouter } from "../server/api/root";
import { PageLayout } from "~/components/layout";
import { LoadingPage } from "~/components/Loading";
import { PostView } from "~/components/Postview";

const ProfileFeed = (props: { userId: string }) => {
  const { data, isLoading } = api.posts.getPostsByUserId.useQuery({
    userId: props.userId,
  });

  if (isLoading)
    return (
      <div>
        <LoadingPage />
      </div>
    );

  if (!data || data.length === 0) {
    <div> User has not posted yet.</div>;
  }

  return (
    <div className="flex flex-col ">
      {data?.map((fullPost) => (
        <PostView {...fullPost} key={fullPost.post.id} />
      ))}
    </div>
  );
};

export const ProfilePage: NextPage<{ username: string }> = ({ username }) => {
  const { data } = api.profile.getUserByUsername.useQuery({
    username,
  });
  if (!data) return <div>404</div>;

  return (
    <>
      <Head>
        <title>{data.username}</title>
        <meta name="description" content="Generated by create-t3-app" />
      </Head>

      <PageLayout>
        <div className="relative h-40  border-slate-400 bg-slate-600 ">
          <Image
            src={data.profilePicture}
            alt={`${data.username ?? ""}`}
            width={128}
            height={128}
            className="absolute bottom-0 left-0 -mb-[64px] ml-4 rounded-full border-4 border-black bg-black"
          />
        </div>
        <div className=" h-[64px]"></div>
        <div className="p-4 text-2xl font-bold"> {`@${data.username}`}</div>
        <div className="w-full border-b border-slate-400" />
        <ProfileFeed userId={data.id} />
      </PageLayout>
    </>
  );
};

export const getStaticProps: GetStaticProps = async (context) => {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: { db, userId: null },
    transformer: superjson,
  });

  const slug = context.params?.slug;
  if (typeof slug !== "string") throw new Error("no-slug");
  const username = slug.replace("@", "");

  await helpers.profile.getUserByUsername.prefetch({ username });

  return {
    props: {
      trpcState: helpers.dehydrate(),
      username,
    },
  };
};

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export default ProfilePage;
