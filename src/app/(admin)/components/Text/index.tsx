"use client";

import ReactIcon from "@Admin/components/Icon/ReactIcon";
import classNames from "classnames";
import { ChangeEventHandler, useState } from "react";

import Spinner from "../Icon/ReactIcon/Spinner";
import styles from "./styles.module.scss";

export type TextClassName = {
  label?: string;
};

export interface TextProps {
  name: string;
  label?: string;
  initialValue?: string;
  onChange?: (value: string) => void;
  onValidate?: () => Promise<void>;
  theme?: "primary" | "default";
  className?: TextClassName;
}

export default function Component({
  name,
  label,
  initialValue,
  onChange,
  onValidate,
  theme,
  className,
}: TextProps) {
  const [value, setValue] = useState<string>(
    initialValue !== undefined ? initialValue : ""
  );
  const [loading, setLoading] = useState<boolean>(false);

  const onInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value);
    onChange && onChange(event.target.value);
  };

  const validate = () => {
    setLoading(true);
    onValidate && onValidate().then(() => setLoading(false));
  };

  return (
    <>
      <div
        className={classNames(styles.form__group, {
          [styles.active]:
            value !== undefined && value !== null && value.length > 0,
          [styles[theme !== undefined ? theme : "default"]]:
            theme !== undefined,
          [styles.form__group__collapsed]: onValidate !== undefined,
        })}
      >
        <input
          type="text"
          name={name}
          className={styles.form__control}
          placeholder=" "
          value={value}
          onChange={onInputChange}
        />
        {label !== undefined && (
          <label className={classNames(className?.label)} htmlFor={name}>
            {label}
          </label>
        )}
        {onValidate && (
          <button
            disabled={
              value !== null && value !== undefined && value.length === 0
            }
            onClick={validate}
            className={styles.form__validate__button}
          >
            {loading ? <Spinner /> : <ReactIcon name="fa/FaCheck" />}
          </button>
        )}
      </div>
    </>
  );
}
