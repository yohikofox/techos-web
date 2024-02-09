import classNames from "classnames";
import { FacetedSearch } from "R/src/domain/search";

import ClearButton from "./_parts/ClearButton";
import FacetGroup from "./_parts/FacetGroup";
import styles from "./styles.module.scss";

export type FacetCollectionProps = {
  data: FacetedSearch[];
  className?: string;
};

export default function Component({ data, className }: FacetCollectionProps) {
  return (
    <>
      <section
        id="facet-container"
        className={classNames(styles.container, className)}
      >
        <ClearButton />
        {data.map((facet: FacetedSearch, index: number) => {
          return <FacetGroup key={index} facet={facet} />;
        })}
      </section>
    </>
  );
}
