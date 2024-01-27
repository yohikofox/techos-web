import Product from "@domain/product";
import { StoreResult } from "@infra/store";
import UseCaseFactory, { UseCaseOption } from "@infra/useCaseFactory";

import ProductComponent from "./components/Product";
import styles from './styles.module.scss';


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