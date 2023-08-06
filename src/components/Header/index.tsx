import Link from 'next/link'
import styles from './header.module.scss'
import Image from "next/image"
import MenuList from '../MenuList'
import UseCaseFactory, { UseCaseOption } from '@/business/useCaseFactory'
import { HeaderDataResult } from '@/business/useCases/getHeaderData'
import { redirect } from 'next/navigation'
import HeaderData from '@/business/model/headerData'
import SearchModal from '../SearchModal'
import Logo from '../Icon/Logo'

export interface HeaderProps {
  title: string
}
export default async function Header({ title }: HeaderProps) {

  const useCase = await UseCaseFactory.Instance.get<any, HeaderData, HeaderDataResult>(UseCaseOption.GET_HEADER_DATA);

  const response = await useCase?.execute();

  if (response.IsError) {
    redirect('/error/400')
  }

  return (
    <header className={styles.container}>
      <nav>
        <ul>
          <li>
            <section className={styles.logo}>
              <Logo className={styles.logo__svg} />
              <Link href="/" />
            </section>
          </li>
          <li className={styles.menu__link}>
            <Link href="/formations">Formations</Link>
          </li>
          {response.Value.trainings && <li><MenuList name={response.Value.trainings.title || ""} items={response.Value.trainings.items} /></li>}
          <li className={styles.push__right}>
            {/* Search <mark>articles</mark> */}
            <SearchModal
              placeholder={response.Value.search?.placeholder || ""}
              title={response.Value.search?.search_title || ""}
            />
          </li>
        </ul>
      </nav>
    </header>
  )
}