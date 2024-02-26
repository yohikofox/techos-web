import { FacetedSearch, FacetedValue } from "R/src/domain/search";
import { Suspense } from "react";

import FacetItem from "../FacetItem";
import styles from "./styles.module.scss";

export default function Component({ facet }: { facet: FacetedSearch }) {
  return (
    <>
      <section className={styles.container}>
        <h4>{facet.label}</h4>
        {facet.values.map((value: FacetedValue, index: number) => {
          return (
            <Suspense key={index} fallback={<div>Loading...</div>}>
              <FacetItem
                key={index}
                className={styles.item}
                data={{ ...value, key: facet.name }}
                multiple={facet.multiple}
                autocomplete={facet.autocomplete}
              />
            </Suspense>
          );
        })}
      </section>
    </>
  );
}
