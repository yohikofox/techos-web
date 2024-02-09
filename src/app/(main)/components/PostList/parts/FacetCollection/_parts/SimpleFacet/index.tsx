import { FacetedSearch, FacetedValue } from "R/src/domain/search";

import FacetItem from "../FacetItem";
import styles from "./styles.module.scss";

export default function Component({ facet }: { facet: FacetedSearch }) {
  return (
    <>
      <section className={styles.container}>
        <h4>{facet.label}</h4>
        {facet.values.map((value: FacetedValue, index: number) => {
          return (
            <FacetItem
              key={index}
              className={styles.item}
              data={{ ...value, key: facet.name }}
              multiple={facet.multiple}
              autocomplete={facet.autocomplete}
            />
          );
        })}
      </section>
    </>
  );
}
