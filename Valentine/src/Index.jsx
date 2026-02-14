import { useState, useEffect, useRef } from "react"
import * as THREE from "three"
import FOG from "vanta/dist/vanta.fog.min"

const Index = () => {
    const vantaRef = useRef(null)
    const vantaEffect = useRef(null)

    const [step, setStep] = useState(0)
    const [accepted, setAccepted] = useState(false)

    const negativeTerms = ["Are you sure?", "Are you realy sure about this?", "Are you sure you're sure?", "Baby", "Baaaaaabe", "Babe pleaseeeee", "Just say yes babe", "You better say yes", "No returning point after", "Don't press the button", "The final countdown", "10", "9", "8", "still thinking?", "7", "6", "I Know What You Are Thinking", "5", "ME", "4", "You", "3", "US", "2", "Love", "1", "Za Wah-roo-doh"]

    const gifs = Array.from({ length: 28 }, (_, i) => `${i}.gif`)

    useEffect(() => {
        if (!vantaEffect.current) {
            vantaEffect.current = FOG({
                el: vantaRef.current,
                THREE: THREE,
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                highlightColor: 0xef67dc,
                midtoneColor: 0xca0800,
                lowlightColor: 0xfcfcfc,
                blurFactor: 0.45,
                speed: 1.5,
                zoom: 1.6,
            })
        }

        return () => {
            if (vantaEffect.current) {
                vantaEffect.current.destroy()
            }
        }
    }, [])

    const handleYes = () => {
        setAccepted(true)
    }

    const handleNo = () => {
        if (step < negativeTerms.length - 1) {
            setStep(prev => prev + 1)
        }
    }

    const yesScale = 1 + step * 0.3

  return (
    <div
      ref={vantaRef}
      className="min-h-screen flex flex-col items-center justify-center gap-6"
    >
      {accepted ? (
        <>
          <div className="w-96 h-96 overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover"
              src="MY LOVE.gif"
              alt="love"
            />
          </div>
          <h1 className="text-4xl font-bold text-black">
            YAAAYYY!!! 💖
          </h1>
          <audio controls>
            <source src="/audio/eat-slay-love.flac" type="audio/mpeg" />
            Ваш браузер не поддерживает аудио.
          </audio>
        </>
      ) : (
        <>
          <div className="w-96 h-96 overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover"
              src={gifs[step]}
              alt="gif"
            />
          </div>

          <h1 className="text-black text-4xl font-bold">
            Will You be My Valentine?
          </h1>

          <div className="flex gap-64 items-center">
            <button onClick={handleYes} style={{ transform: `scale(${yesScale})` }} className="border-4 border-black rounded-lg p-2 transition duration-300">
              Yes
            </button>

            <button onClick={handleNo} className="border-4 border-black rounded-lg p-2">
              {negativeTerms[step]}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default Index