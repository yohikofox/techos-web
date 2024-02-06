import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import { PropsWithChildren, Suspense } from "react";

import Content from "./_parts/Content";
import ContextLoader from "./_parts/ContextLoader";
import Header from "./_parts/Header";
import ToasterProvider from "./_parts/ToasterProvider";
import styles from "./style.module.scss";

const Menu = dynamic(() => import("./_parts/Menu"), { suspense: true });

interface MainLayoutProps extends PropsWithChildren {}

export default async function Layout({ children }: MainLayoutProps) {
  const session = await getServerSession();

  const b64 = await fetch(
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      session?.user?.name !== undefined && session?.user?.name !== null
        ? session?.user?.name
        : "default"
    )}&rounded=true&font-size=.33&background=random&color=random`
  )
    .then((res) => res.arrayBuffer())
    .then(
      (res) => `data:image/png;base64,${Buffer.from(res).toString("base64")}`
    );

  const defaultData = {
    avatarFallback: b64,
  };

  return (
    <>
      <div className={styles.container}>
        <ContextLoader {...defaultData} />
        <Suspense fallback={<div>Loading...</div>}>
          <Menu />
        </Suspense>
        <Header />
        <Content>{children}</Content>
        <ToasterProvider />
      </div>
    </>
  );
}
