import { useEffect, useRef, useState } from 'react'
import './DevMessage.css'
import { shouldShowDevMessage, DEV_MESSAGE_EVENT } from '../utils/devMessageStore'
import SmileIcon from '../assets/smile.svg'

const DevMessage = () => {
  const [open, setOpen] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldShowDevMessage()) {
      setOpen(true)
    }
  }, [])

  useEffect(() => {
    const handleTrigger = () => setOpen(true)
    window.addEventListener(DEV_MESSAGE_EVENT, handleTrigger)
    return () => window.removeEventListener(DEV_MESSAGE_EVENT, handleTrigger)
  }, [])

  useEffect(() => {
    if (!open) return
    const handleClickOutside = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  if (!open) return null

  return (
    <div className="dev-overlay">
      <div className="dev-message-box" ref={boxRef}>
        <button className="dev-close" onClick={() => setOpen(false)} aria-label="Close">×</button>
        <h2>A note from the developer</h2>
        <p>Hi there! Thanks for visiting my website! This is an early build of MARS and some features are still in progress.</p>
        <p>Keep in mind that the website may be severely restricted by <strong>August 1st 2026</strong> as the website heavily depends on MASSIVE API calls
          which I pay for to avoid API rate limits. Hope you understand!
        </p>
        <p> I created this website to learn about investing and the stock market, but also to share that knowledge with others.
          I also wanted to challenge myself and genuinely build something incorporating all the things I've learnt as a software engineer into
          a real-world passion project
        </p>
        <p>
          If you want to give feedback or contact me you can do so through email:
        </p>
        <p>
          <strong>williamlor.yp@gmail.com</strong>
        </p>
        <img src={SmileIcon}></img>
        <p>Click outside the box to continue</p>
      </div>
    </div>
  )
}

export default DevMessage