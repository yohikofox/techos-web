import Link from 'next/link'
import styles from './header.module.scss'
import MenuList from '../MenuList'
import UseCaseFactory, { UseCaseOption } from '@/business/useCaseFactory'
import { HeaderDataResult } from '@/business/useCases/getHeaderData'
import { redirect } from 'next/navigation'
import HeaderData from '@/business/model/headerData'
import SearchModal from '../SearchModal'
import { MainLogo } from '../Icon/Logo'
import HamburgerMenu from './parts/HamburgerMenu'
import Container from '@/business/dependencyFactory'
import { DependencyKeys } from '@/business/dependencies'

export interface HeaderProps {
  title: string
}
export default async function Header({ title }: HeaderProps) {

  const configManager = await Container.Instance.resolve(DependencyKeys.helper_configmanager);
  const useCase = await UseCaseFactory.Instance.getUseCase<any, HeaderData, HeaderDataResult>(UseCaseOption.GET_HEADER_DATA);

  const response = await useCase?.execute();

  if (response.IsError) {
    redirect('/error/400')
  }

  return (
    <header className={styles.container}>
      <span className={styles.hamburger__menu}><HamburgerMenu /></span>
      <section className={styles.logo}>
        {/* <Image src="/logo.png" alt="logo" width={50} height={50} /> */}
        {/* <Image src="/logo.png" alt="logo" fill /> */}
        {/* <Logo className={styles.logo__svg} /> */}
        <MainLogo className={styles.logo__svg} />
        <Link href="/" />
      </section>
      <span className={styles.title}>{await configManager.get("DOMAIN_NAME")}<Link aria-label={await configManager.get("DOMAIN_NAME")} href={"/"} className={styles.inset__link} /></span>
      <nav>
        <ul className={styles.nav__menu}>
          <li className={styles.menu__link}>
            <Link href="/formations">Formations</Link>
          </li>
          {response.Value.trainings && <li><MenuList name={response.Value.trainings.title || ""} items={response.Value.trainings.items} /></li>}
          {/* <li className={styles.push__right}>
            
            
          </li> */}
        </ul>
      </nav>
      <SearchModal
        className={styles.search__modal}
        placeholder={response.Value.search?.placeholder || ""}
        title={response.Value.search?.search_title || ""}
      />
    </header>
  )
}