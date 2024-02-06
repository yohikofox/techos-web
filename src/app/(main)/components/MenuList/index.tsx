import ImageSet from "@domain/image";
import Link from "next/link";
import slugify from "slugify";

import ServerImage from "@/components/Image";

import styles from "./menuList.module.scss";

interface MenuItem {
  title: string;
  link: string;
  background?: ImageSet;
}

export interface MenuListProps {
  name: string;
  items: MenuItem[];
}

const MenuCard = async ({ item }: { item: MenuItem }) => {
  return (
    <div className={styles.menu__card}>
      {item.background !== undefined && (
        <ServerImage
          alt={item.title}
          src={item.background.src}
          preset={item.background.preset}
          sizes={item.background.sizes}
        />
      )}
      <span>{item.title}</span>
      <Link href={item.link} className={styles.inset__link} />
    </div>
  );
};

export default function MenuList({ name, items }: MenuListProps) {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{name}</label>
        <div className={styles.menu}>
          <ul>
            {items.map((item: MenuItem, index: number) => (
              <li key={`menu-item-${slugify(name)}-${index}`}>
                <MenuCard item={item} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
