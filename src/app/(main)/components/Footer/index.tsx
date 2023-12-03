import Link from 'next/link'
import styles from './footer.module.scss'
import UseCaseFactory, { UseCaseOption } from '@/business/useCaseFactory';
import Container from '@/infrastructure/dependencyFactory'

import HeaderData from '@/business/model/headerData';
import { HeaderDataResult } from '@/business/useCases/getHeaderData';
import { MainLogo } from '../Icon/Logo';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from "@/components/Image"
import { IConfigManager } from '@/infrastructure/adapter/configManager';
import { DependencyKeys } from '@/infrastructure/dependencies';

import LogoIcon from 'R/public/logo.png';

const begin_date = dayjs('2019-01-01');

export default async function Footer() {

  const useCase = await UseCaseFactory.Instance.getUseCase<any, HeaderData, HeaderDataResult>(UseCaseOption.GET_HEADER_DATA);
  const configManager = await Container.Instance.resolve<IConfigManager>(DependencyKeys.helper_configmanager);

  const response = await useCase?.execute();

  if (response.IsError) {
    console.error('response.Error:', response)
    if (response.Result[response.Result.length - 1] === HeaderDataResult.NO_DATA_FOUND) {
      return <section style={{
        display: 'none',
      }}>
        {response.Result[response.Result.length - 1]}
      </section>
    }
  }


  const sections = [
    {
      title: 'Blog',
      link: '/'
    }
  ]

  return (
    <footer className={classNames(styles.container)}>
      <Image src={LogoIcon.src} className={styles.test} alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      <section className={styles.section__list}>
        <section className={classNames(styles.section)}>
          <MainLogo className={styles.logo} />
          <span className={styles.title}>{await configManager.get("DOMAIN_NAME")}</span>
          <Link aria-label="go to home" href="/" className={styles.inset__link} />
        </section>
        <section className={classNames(styles.section)}>
          <h4 className={styles.section__header}>Sections</h4>
          <ul>
            {sections.map((section, index) => {
              return (
                <li key={`section-item-${index}`}>
                  <Link href={section.link}>{section.title}</Link>
                </li>
              )
            })}
          </ul>
        </section>
        <section className={classNames(styles.section, styles.trainings)}>
          <h4 className={styles.section__header}>Formation</h4>
          <ul>
            {response.Value.trainings?.items.map((training: any, index: number) => {
              return (
                <li key={`training-item-${index}`}>
                  <Link aria-label={`formation: ${training.title}`} href={training.link}>{training.title}</Link>
                </li>
              )
            })}
          </ul>
        </section>
        <section className={classNames(styles.section)}>
          <h4 className={styles.section__header}>Contacts</h4>
          <ul>
            <li><a href="https://twitter.com/Geekspeaks3">Twitter</a></li>
          </ul>
        </section>
      </section>
      <section className={styles.watermark}>
        @Techos.com, since <time dateTime={begin_date.format('YYYY-MM-DD')}>&nbsp;{begin_date.year()}</time>
      </section>
    </footer>
  )
}

