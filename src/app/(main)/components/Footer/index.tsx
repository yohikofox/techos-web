import Link from 'next/link'
import styles from './footer.module.scss'
import UseCaseFactory, { UseCaseOption } from '@infra/useCaseFactory';

import classNames from 'classnames';
import dayjs from 'dayjs';
import ServerImage from "@/components/Image"
import { IConfigManager } from '@/infrastructure/adapter/configManager';
import { IOC } from "R/src/infrastructure/container";

import LogoIcon from 'R/public/logo.png';
import Brand from 'R/src/components/Brand';
import { HeaderResult } from '@app/getHeaderData';
import Header from '@domain/header';

const begin_date = dayjs('2019-01-01');

export default async function Footer() {

  const useCase = await UseCaseFactory.Instance.getUseCase<any, Header, HeaderResult>(UseCaseOption.GET_HEADER_DATA);
  const configManager = await IOC().resolve<IConfigManager>('ConfigManager');

  const response = await useCase?.execute();

  if (response.IsError) {
    console.error('response.Error:', response)
    if (response.Result[response.Result.length - 1] === HeaderResult.NO_DATA_FOUND) {
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
      <ServerImage src={LogoIcon.src} className={styles.test} priority alt="" fill sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
      <section className={styles.section__list}>
        <section className={classNames(styles.section)}>
          <Brand />
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
            {response.Value?.trainings?.items.map((training: any, index: number) => {
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

