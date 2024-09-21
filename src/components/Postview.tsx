import { type RouterOutputs } from "~/utils/api";
import Image from "next/image";
import Link from "next/link";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
type PostWithUser = RouterOutputs["posts"]["getAll"][number];

export const PostView = (props: PostWithUser) => {
  const { post, author } = props;
  return (
    <>
      <Link href={`/post/${post.id}`}>
        <div key={post.id} className="flex gap-3 border-b border-gray-600 p-4 ">
          <div>
            <Link href={`@${author.username}`}>
              <Image
                src={author.profilePicture}
                width={56}
                height={56}
                alt="post-image"
                className="rounded-full"
              />
            </Link>
          </div>
          <div className="flex flex-col ">
            <div className="flex gap-1   text-gray-300">
              <Link href={`@${author.username}`}>
                <span>{`@${author.username}`}</span>
              </Link>

              <span className="font-thin">{`  ·  ${dayjs(
                post.createdAt,
              ).fromNow()}`}</span>
            </div>
            <span className="text-2xl">{post.content}</span>
          </div>
        </div>
      </Link>
    </>
  );
};
