import { PropsWithChildren, Suspense } from "react";
import Header from "./_parts/Header";

import Content from "./_parts/Content";

import styles from "./style.module.scss";
import dynamic from "next/dynamic";

const Menu = dynamic(() => import("./_parts/Menu"), { suspense: true });

interface MainLayoutProps extends PropsWithChildren {
};

export default async function Layout({ children }: MainLayoutProps) {
  return (
    <>
      <div className={styles.container}>
        <Suspense fallback={<div>Loading...</div>}>
          <Menu />
        </Suspense>
        <Header />
        <Content>
          {children}
        </Content>
      </div>
    </>
  )
}