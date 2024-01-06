'use client'
import useBlogStore from "R/src/infrastructure/store/blog"

export default function Component() {
  const selectedSpeech = useBlogStore((state) => state.speech.selectedSpeech)
  return (
    <div>
      <h3>{selectedSpeech}</h3>
    </div>
  )
}