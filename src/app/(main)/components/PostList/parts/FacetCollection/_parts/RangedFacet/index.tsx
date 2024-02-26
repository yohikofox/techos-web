"use client";
import { FacetedSearch } from "@domain/search";
import { QueryOperator } from "@infra/store/blog/index";
import { hasProperty } from "@lib/prototypes/object";
import dayjs from "dayjs";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "querystring";

import DoubleRange from "./_parts/DoubleRange";
import styles from "./styles.module.scss";

export interface RangedFacetProps {
  facet: FacetedSearch;
  renderLabel?: (value: number) => React.ReactNode;
  renderResults?: (value: string[]) => string;
}

export default function Component({
  facet,
  renderLabel = (value: number) => value.toString(),
  renderResults = (values: string[]) => values.join(","),
}: RangedFacetProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onChange = (value: string) => {
    const seed: Record<string, string[]> = {};
    const query = [...searchParams.entries()].reduce((acc, [k, v]) => {
      if (k === facet.name) {
        const current = hasProperty(acc, k) === true ? acc[k] : [];
        current.push(v);
        acc[k] = current;
        return acc;
      }

      return acc;
    }, seed);

    query["filters"] = [value];

    const newQs = qs.stringify(query);
    const url = `/posts/1?${newQs}#facet-container`;
    router.push(url);
  };

  return (
    <div className={styles.container}>
      <h4>{facet.label}</h4>
      <div className={styles.item}>
        {/* <span>{renderLabel(facet.min!)}</span> */}
        <DoubleRange
          min={facet.min!}
          max={facet.max!}
          onChange={onChange}
          renderResults={renderResults}
        />
        {/* <span>{renderLabel(facet.max!)}</span> */}
      </div>
      {/* <div className={styles.current__value}>
        {currentValue !== undefined && renderLabel(currentValue)}
      </div> */}
    </div>
  );
}

export function ServerComponent(props: RangedFacetProps) {
  let renderLabel = (value: number): string => value.toString();
  let renderResults = (values: string[]) => values.join(",");

  switch (props.facet.dataType) {
    case "date":
      renderLabel = (value: number) => dayjs(value).format("DD/MM/YYYY");
      renderResults = (values: string[]) => {
        const [min, max] = values;

        const render = (value: string, operator: QueryOperator) =>
          `${props.facet.name} ${operator} ${value}`;

        const filter = [
          render(min, QueryOperator.GREATER_THAN_OR_EQUAL),
          render(max, QueryOperator.LESS_THAN_OR_EQUAL),
        ].join(" AND ");

        return filter;
      };
      break;
    default:
      break;
  }
  return (
    <Component
      {...props}
      renderLabel={renderLabel}
      renderResults={renderResults}
    />
  );
}
