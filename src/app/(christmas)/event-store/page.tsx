import { StoreResult } from "R/src/business/adapter/store";
import Product from "R/src/business/model/product";
import UseCaseFactory, { UseCaseOption } from "R/src/business/useCaseFactory";
import styles from './styles.module.scss';
import ProductComponent from "./components/Product";


export default async function Page() {

  const useCase = await UseCaseFactory.Instance.getUseCase<any, Product, StoreResult>(UseCaseOption.GET_RANDOM_PRODUCT);
  const response = await useCase?.execute();

  if (response?.IsError) {
    return (
      <>
        {JSON.stringify(response?.Result)}
      </>
    )
  }




  return (
    <>
      <section className={styles.container}>
        {/* <pre><code>{JSON.stringify(response.Value, null, 2)}</code></pre> */}
        <ProductComponent initialModel={response?.Value} />
      </section>
    </>
  )
}