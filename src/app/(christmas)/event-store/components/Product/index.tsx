"use client"

import Product from "@domain/product";
import Image from "R/src/components/Image"
import { useCallback, useState } from "react";
import styles from './styles.module.scss';

const mapToModel = (product: Product) => {
  return {
    title: product.title,
    description: product.description,
    image: product.image,
    price: product.price,
    category: product.category,
  }
}
const formatPrice = (price: number) => {
  return (price * 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

export interface ProductProps {
  initialModel: Product;
}

export default function Component({ initialModel }: ProductProps) {
  const [model, setModel] = useState(mapToModel(initialModel));

  const [category, setCategory] = useState(model.category);

  const handleSameCategory = useCallback(() => {
    (async function () {
      console.log('handleSameCategory', category)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/product/${category}/random`)
      const value = await response.json();
      setModel(mapToModel(value));
    })()
  }, [category, setModel])

  return (
    <>
      <section className={styles.content}>
        <h1>{model.title}</h1>
        <div className={styles.image}>
          <Image
            src={model.image}
            alt={model.title}
            fill
          />
        </div>
        <button className={styles.button} onClick={handleSameCategory}>Voir un autre cadeau similaire</button>
      </section>
    </>
  )
}