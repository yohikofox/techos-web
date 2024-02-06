import classNames from "classnames";
import { useState } from "react";

export interface RangeProps {
  min: number;
  max: number;
  value?: number;
  onChange: (value: string) => void;
  step?: number;
  className?: string;
}

export default function Range({
  min,
  max,
  onChange,
  step,
  value,
  className,
}: RangeProps) {
  // const diff = (min + (max - min) / 2)
  // console.log('diff:', diff)

  const [localValue, setLocalValue] = useState<number | undefined>(
    value !== undefined ? value : min + (max - min) / 2
  );
  // const router = useRouter()
  // const searchParams = useSearchParams()

  // const selectValue = useCallback(async (d: FacetItemData) => {
  //   const newQuery: Record<string, string | string[]> = {}

  //   newQuery[d.key] = d.label

  //   for (const k of searchParams.keys()) {

  //     if (k === d.key) {
  //       const alreadyInQuery = searchParams.getAll(k)

  //       if (alreadyInQuery.includes(d.label)) {
  //         newQuery[k] = alreadyInQuery.filter((v: string) => v !== d.label)
  //       } else {
  //         newQuery[k] = [...alreadyInQuery, d.label]
  //       }

  //       continue
  //     }

  //     const alreadyInQuery = searchParams.getAll(k)

  //     if (alreadyInQuery.length > 0) {

  //       alreadyInQuery.forEach((v: string) => {
  //         const vals = newQuery[k] || []
  //         if (vals.includes(v)) return
  //         newQuery[k] = [...vals, v]
  //       })

  //     }
  //   }

  //   router.push(`/posts/1?${qs.stringify(newQuery)}`)

  // }, [router, searchParams])

  const localOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setLocalValue(Number(e.target.value));
    onChange(e.target.value);
  };

  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        className={classNames(className)}
        value={localValue}
        step={step !== undefined ? step : (max - min) / 10}
        onChange={localOnChange}
      />
    </>
  );
}
