import OffLinePageData from "@domain/offLinePageData";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";
import { GetOfflinePageDataUseCaseResult } from "@app/getOfflinePageData";
import md from 'markdown-it';
import styles from './offline.module.scss'

export default async function Page() {
  const offlinePageUseCase = await UseCaseFactory.Instance.getUseCase<any, OffLinePageData, GetOfflinePageDataUseCaseResult>(UseCaseOption.GET_OFFLINE_PAGE_DATA)
  const response = await offlinePageUseCase.execute()

  if (response.IsError) {
    console.error('response.Error:', response)
    return (
      <main>
        <h1>Arf !</h1>
        <div>Même le chargement de la page offline à foiré ... LOL</div>
      </main>
    )
  }

  const content = md().render(response.Value.content)

  return (
    <main className={styles.container}>
      {/* <link href="/offline.css" rel="stylesheet" /> */}
      <h1>{response.Value.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </main>
  );
}