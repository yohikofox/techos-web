import Link from 'next/link'
import styles from './footer.module.scss'
import UseCaseFactory, { UseCaseOption } from '@/business/useCaseFactory';
import Container from '@/business/dependencyFactory'
import HeaderData from '@/business/model/headerData';
import { HeaderDataResult } from '@/business/useCases/getHeaderData';
import { redirect } from 'next/navigation';
import Logo, { MainLogo } from '../Icon/Logo';
import classNames from 'classnames';
import dayjs from 'dayjs';
import Image from 'next/image';
import { IConfigManager } from '@/business/infrastructure/adapter/configManager';

export default async function Footer() {

  const useCase = await UseCaseFactory.Instance.getUseCase<any, HeaderData, HeaderDataResult>(UseCaseOption.GET_HEADER_DATA);
  const configManager = await Container.Instance.resolve<IConfigManager>("Helper/ConfigManager");

  const now = dayjs('2019-01-01');

  const response = await useCase?.execute();

  if (response.IsError) {
    redirect('/error/400')
  }


  const sections = [
    {
      title: 'Blog',
      link: '/'
    }
  ]

  return (
    <footer className={classNames(styles.container)}>
      <Image src={"/logo.png"} className={styles.test} alt="" fill />

      <section className={styles.section__list}>
        <section className={classNames(styles.section)}>
          {/* <Logo className={styles.logo} /> */}
          <MainLogo className={styles.logo} />
          {/* <img src="/logo.png" alt="logo" width={150} height={150} style={{
            borderRadius: '12px',

          }} /> */}
          <span className={styles.title}>{await configManager.get("DOMAIN_NAME")}</span>
          <Link href="/" className={styles.inset__link} />
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
                  <Link href={training.link}>{training.title}</Link>
                </li>
              )
            })}
          </ul>
        </section>
        <section className={classNames(styles.section)}>
          <h4 className={styles.section__header}>Contacts</h4>
          <ul>
            <li><a href="https://twitter.com/Geekspeaks3" >Twitter</a></li>
          </ul>
        </section>
      </section>
      <section className={styles.watermark}>
        @Techos.com, since <time dateTime={now.format('YYYY-MM-DD')}>&nbsp;{now.year()}</time>
      </section>
    </footer>
  )
}

