import Image from "next/image"
import styles from "./menuList.module.scss"
import Link from "next/link"
import slugify from "slugify"

export interface MenuListProps {
  name: string
  items: {
    title: string
    link: string,
    background?: any
  }[]
}



const MenuCard = async ({ item, }: any) => {
  return (
    <div className={styles.menu__card}>
      {item.background && <Image
        alt={item.title}
        src={item.background.src}
        width={100}
        height={100}
      />}
      <span>{item.title}</span>
      <Link href={item.link} className={styles.inset__link} />
    </div>
  )
}

export default function MenuList({ name, items }: MenuListProps) {
  return (
    <>
      <div className={styles.container}>
        <label className={styles.label}>{name}</label>
        <div className={styles.menu}>
          <ul>{items.map((item: any, index: number) => <li key={`menu-item-${slugify(name)}-${index}`}><MenuCard item={item} /></li>)}</ul>
        </div>
      </div>
    </>
  )
}
