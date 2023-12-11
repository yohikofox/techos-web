'use client'

import classNames from "classnames"
import styles from "./styles.module.scss"
import { useState } from "react"
import ReactIcon from '@Admin/components/Icon/ReactIcon';
import Spinner from "../Icon/ReactIcon/Spinner";

export interface TextProps {
  name: string
  label?: string
  initialValue?: string
  onChange?: (value: string) => void
  onValidate?: () => Promise<void>
  theme?: "primary" | "default"
}

export default function Component({ name, label, initialValue, onChange, onValidate, theme }: TextProps) {

  const [value, setValue] = useState<string>(initialValue || "")
  const [loading, setLoading] = useState<boolean>(false)

  const onInputChange = (event: any) => {
    setValue(event.target.value);
    onChange && onChange(event.target.value);
  }

  const validate = () => {
    setLoading(true)
    onValidate && onValidate().then(() => setLoading(false))
  }

  return (
    <>
      <div className={classNames(styles.form__group, {
        [styles.active]: value !== undefined && value !== null && value.length > 0,
        [styles[theme || "default"]]: theme !== undefined,
        [styles.form__group__collapsed]: onValidate !== undefined
      })}>
        <input type="text" name={name} className={styles.form__control} placeholder=" " value={value} onChange={onInputChange} />
        {label && <label htmlFor={name}>{label}</label>}
        {onValidate && (
          <button
            disabled={value !== null && value !== undefined && value.length === 0}
            onClick={validate}
            className={styles.form__validate__button}>
            {loading ? <Spinner /> : <ReactIcon name="fa/FaCheck" />}
          </button>
        )}
      </div>
    </>
  )
}