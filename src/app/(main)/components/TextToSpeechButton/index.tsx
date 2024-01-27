'use client';

import classNames from 'classnames';
import useBlogStore from "R/src/infrastructure/store/blog";
import { PropsWithChildren, useCallback, useEffect, useState } from "react";
import { ImPause2,ImPlay3, ImStop2 } from "react-icons/im";
import { useShallow } from "zustand/react/shallow";

import styles from "./styles.module.scss";

const LIMIT = 100
const STEP = 1
export interface TextToSpeechButtonProps extends PropsWithChildren<{}> {
  identifier: string
  text: string
  className?: string
  children?: React.ReactNode
}

enum PlayerState {
  Idle = 0,
  Playing = 1,
  Paused = 2,
}

export default function Component({ identifier, text, className }: TextToSpeechButtonProps) {
  const {
    selectASpeech,
    selectedSpeech
  } = useBlogStore(useShallow(state => state.speech))
  const [playerState, setPlayerState] = useState(0)

  const doSplit = (text: string) => text
    .replaceAll('/!\\', '')
    .replaceAll('#', '')
    .replaceAll('*', '\n\n')
    .replaceAll('\n\n', '====')
    .replaceAll('\n', ' ')
    .split('====').filter(it => it.length > 0)

  const [splitResult, setSplitText] = useState<string[]>(doSplit(text))

  const speak = useCallback(() => {

    if (window['speechSynthesis'] === undefined) {
      return;
    }

    const synth = window.speechSynthesis

    const current = splitResult.slice(0, STEP).join('\n')

    const utterThis = new SpeechSynthesisUtterance(current.trim());

    utterThis.addEventListener("end", (event) => {
      if (splitResult.length > 0) {
        const rest = splitResult.splice(0, STEP)
        setSplitText({ ...rest })
        speak()
      } else {
        setPlayerState(PlayerState.Idle)
      }
    });

    utterThis.voice = synth.getVoices()[12];

    synth?.cancel();
    synth?.speak(utterThis);

  }, [splitResult])

  const handlePlay = useCallback(() => {
    if (playerState === PlayerState.Paused)
      window.speechSynthesis.resume()
    else {
      selectASpeech(identifier)
      speak()
    }
    setPlayerState(PlayerState.Playing)
  }, [identifier, playerState, selectASpeech, speak])

  const handleStop = useCallback(() => {
    window.speechSynthesis.cancel()
    setSplitText(doSplit(text))
    setPlayerState(PlayerState.Idle)
  }, [text])


  const handlePause = useCallback(() => {
    setPlayerState(PlayerState.Paused)
    window.speechSynthesis.pause()
  }, [])


  useEffect(() => {
    (async function () {
      if (selectedSpeech !== identifier)
        setPlayerState(PlayerState.Idle)
    })()
  }, [handleStop, identifier, playerState, selectedSpeech])


  useEffect(() => {
    return () => {
      handleStop()
    }
  }, [handleStop])


  return (
    <>

      <div className={classNames(styles.container, className)} >
        <button disabled={playerState === PlayerState.Playing} onClick={handlePlay}><ImPlay3 /></button>
        {playerState !== PlayerState.Idle && (<>
          <button onClick={handleStop}><ImStop2 /></button>
          <button disabled={playerState !== PlayerState.Playing} onClick={handlePause}><ImPause2 /></button>
        </>)}
      </div>
    </>
  )
}