import { FacetType } from "@infra/repositories/baseSearchEngineRepository";
import { FacetedSearch } from "R/src/domain/search";

import { ServerComponent as ServerRangedFacet } from "../RangedFacet";
import SimpleFacet from "../SimpleFacet";
import styles from "./styles.module.scss";

export default function Component({ facet }: { facet: FacetedSearch }) {
  // { facet.multiple && "mult" }
  // { facet.autocomplete && "auto" }

  let type = FacetType.SIMPLE;

  if (facet.min !== undefined && facet.max !== undefined) {
    type = FacetType.RANGED;
  }

  let Comp;

  switch (type) {
    case FacetType.RANGED:
      Comp = function ServerRangedFacetComponent() {
        return <ServerRangedFacet facet={facet} />;
      };
      break;
    default:
      Comp = function SimpleFacetComponent() {
        return <SimpleFacet facet={facet} />;
      };
  }

  return (
    <div className={styles.facet__group}>
      <Comp />
    </div>
  );
}
