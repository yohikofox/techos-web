import { PropsWithChildren } from "react";
import Header from "./_parts/Header";
import Menu from "./_parts/Menu";
import Content from "./_parts/Content";
import Footer from "./_parts/Footer";

import styles from "./style.module.scss";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <div className={styles.container}>
        <Menu />
        <Header />
        <Content>
          {children}
          <Footer className={styles.footer} />
        </Content>
      </div>
    </>
  )
}