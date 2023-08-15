import OffLinePageData from "@/business/model/offLinePageData";
import UseCaseFactory, { UseCaseOption } from "@/business/useCaseFactory";
import { GetOfflinePageDataUseCaseResult } from "@/business/useCases/getOfflinePageData";
import md from 'markdown-it';
import styles from './offline.module.scss'

export default async function Page() {
  const offlinePageUseCase = await UseCaseFactory.Instance.getUseCase<any, OffLinePageData, GetOfflinePageDataUseCaseResult>(UseCaseOption.GET_OFFLINE_PAGE_DATA)
  const response = await offlinePageUseCase.execute()

  const content = md().render(response.Value.content)

  if (response.IsError) {
    return (
      <main>
        <h1>Arf !</h1>
        <div>Même le chargement de la page offline à foiré ... LOL</div>
      </main>
    )
  }

  return (
    <main className={styles.container}>
      {/* <link href="/offline.css" rel="stylesheet" /> */}
      <h1>{response.Value.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }}></div>
    </main>
  );
}