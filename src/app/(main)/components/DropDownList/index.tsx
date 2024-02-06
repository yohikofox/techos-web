"use client";

import { MouseEventHandler, useState } from "react";

import CaretDown from "../Icon/CaretDown";
import styles from "./dropDownList.module.scss";

export interface DropDownListItem {
  value: string;
  label: string;
}

export interface DropDownListProps {
  name: string;
  placeholder: string;
  items: DropDownListItem[];
}
export default function DropDownList({
  items,
  placeholder,
}: DropDownListProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleInputClick: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    setShowMenu(!showMenu);
  };

  const handleItemClick = (item: DropDownListItem) => {
    setShowMenu(false);
    if (selectedValues.includes(item.value)) {
      setSelectedValues(
        selectedValues.filter((elt: string) => elt !== item.value)
      );
    } else {
      setSelectedValues([...selectedValues, item.value]);
    }
  };

  const getDisplay = () => {
    if (selectedValues.length > 0) {
      return selectedValues.join(", ");
    }
    return placeholder;
  };

  return (
    <div className={styles.container}>
      <div className={styles.input} onClick={handleInputClick}>
        <div className={styles.selected__value}>{getDisplay()}</div>
        <div className={styles.tools}>
          <div className={styles.tool}>
            <CaretDown />
          </div>
        </div>
        {showMenu && (
          <div className={styles.menu}>
            {items.map((item: DropDownListItem, index: number) => {
              return (
                <div
                  key={index}
                  className={styles.item}
                  onClick={() => handleItemClick(item)}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
