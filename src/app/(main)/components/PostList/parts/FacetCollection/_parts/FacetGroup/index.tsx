import { FacetedSearch } from "R/src/domain/search"
import { FacetType } from "R/src/infrastructure/repositories/searchEngineRepository"

import { ServerComponent as ServerRangedFacet } from "../RangedFacet"
import SimpleFacet from "../SimpleFacet"
import styles from "./styles.module.scss"

export default function Component({ facet }: { facet: FacetedSearch }) {

  // { facet.multiple && "mult" }
  // { facet.autocomplete && "auto" }

  let type = FacetType.SIMPLE

  if (facet.min && facet.max) {
    type = FacetType.RANGED
  }

  let Comp;


  switch (type) {
    case FacetType.RANGED:
      Comp = () => <ServerRangedFacet facet={facet} />
      break;
    default:
      Comp = () => <SimpleFacet facet={facet} />
  }

  return (
    <div className={styles.facet__group}>
      <Comp />
    </div>
  )
}

