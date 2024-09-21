import Link from "next/link";
import type { PropsWithChildren } from "react";

export const PageLayout = (props: PropsWithChildren) => {
  return (
    <main className=" flex h-screen justify-center">
      <div className=" h-full w-full  overflow-y-scroll  border-x border-gray-600 md:max-w-2xl">
        <Menu />
        {props.children}
      </div>
    </main>
  );
};

function Menu() {
  return (
    <div className="fixed left-16 top-12 flex flex-col gap-3 rounded-full font-medium  text-gray-600 transition duration-300  max-sm:hidden  ">
      <div className="flex flex-col items-start  justify-center gap-2 ">
        <Link
          href="/"
          className="flex  items-center justify-center gap-2 text-2xl hover:cursor-pointer hover:text-[#3D43D2] "
        >
          home
        </Link>
        <Link
          href="https://github.com/shivamhwp/twemoji"
          target="_blank"
          className="flex items-center justify-center gap-2 text-2xl hover:cursor-pointer hover:text-[#3D43D2] "
        >
          github
        </Link>
      </div>
    </div>
  );
}
