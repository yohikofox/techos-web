'use client'

import classNames from "classnames"
import styles from "./styles.module.scss"
import { useState } from "react"
import ReactIcon from '@Admin/components/Icon/ReactIcon';

export interface TextProps {
  name: string
  label?: string
  initialValue?: string
  onChange?: (value: string) => void
  onValidate?: () => void
  theme?: "primary" | "default"
}

export default function Component({ name, label, initialValue, onChange, onValidate, theme }: TextProps) {

  const [value, setValue] = useState<string>(initialValue || "")

  const onInputChange = (event: any) => {
    setValue(event.target.value);
    onChange && onChange(event.target.value);
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
        {onValidate && <button onClick={onValidate} className={styles.form__validate__button}><ReactIcon name="fa/FaCheck" /></button>}
      </div>
    </>
  )
}