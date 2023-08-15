'use client'

import { MouseEventHandler } from "react"

export default function ClientButton() {
  const handleClick: MouseEventHandler<HTMLButtonElement> = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:3000/api/hello')
    alert((await response.json()).message)
  }
  return (
    <button onClick={handleClick}>Click me</button>
  )
}