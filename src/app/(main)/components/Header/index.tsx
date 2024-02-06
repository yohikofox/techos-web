import { HeaderResult } from "@app/getHeaderData";
import Header from "@domain/header";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import Link from "next/link";
import { redirect } from "next/navigation";
import Brand from "R/src/components/Brand";
import { IOC } from "R/src/infrastructure/container";

import { IConfigManager } from "@/infrastructure/adapter/configManager";

import SearchModal from "../SearchModal";
import styles from "./header.module.scss";
import HamburgerMenu from "./parts/HamburgerMenu";

// export interface HeaderProps {
//   title: string
// }

export default async function Header() {
  const configManager = await IOC().resolve<IConfigManager>("ConfigManager");
  const useCase = await UseCaseFactory.Instance.getUseCase<
    void,
    Header,
    HeaderResult
  >(UseCaseOption.GET_HEADER_DATA);

  const response = await useCase?.execute();

  if (response.IsError) {
    console.error("response.Error:", response);
    redirect("/error/400");
  }

  const domainName = await configManager.get("DOMAIN_NAME");

  return (
    <header className={styles.container}>
      <span className={styles.hamburger__menu}>
        <HamburgerMenu />
      </span>
      <section className={styles.logo}>
        <div className={styles.logo__brand__container}>
          <Brand className={styles.logo__brand} />
        </div>
        <Link href="/" />
      </section>
      <span className={styles.title}>
        {domainName}
        <Link
          aria-label={domainName}
          href={"/"}
          className={styles.inset__link}
        />
      </span>
      <nav>
        <ul className={styles.nav__menu}>
          <li className={styles.menu__link}>
            <Link href="/flux">Astuces</Link>
          </li>
          {/* <li className={styles.menu__link}>
            <Link href="/formations">Formations</Link>
          </li> */}
          {/* {response.Value.trainings && <li><MenuList name={response.Value.trainings.title || ""} items={response.Value.trainings.items} /></li>} */}
          {/* <li className={styles.push__right}>


          </li> */}
        </ul>
      </nav>
      <SearchModal
        className={styles.search__modal}
        placeholder={
          response.Value.search?.placeholder !== undefined
            ? response.Value.search?.placeholder
            : ""
        }
        title={
          response.Value.search?.search_title !== undefined
            ? response.Value.search?.search_title
            : ""
        }
      />
    </header>
  );
}
