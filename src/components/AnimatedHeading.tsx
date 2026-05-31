import { useState, useEffect } from 'react'
import type { CSSProperties } from 'react'

interface AnimatedHeadingProps {
  text: string
  className?: string
  style?: CSSProperties
  initialDelay?: number
  charDelay?: number
}

export default function AnimatedHeading({
  text,
  className = '',
  style,
  initialDelay = 200,
  charDelay = 30,
}: AnimatedHeadingProps) {
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  const lines = text.split('\n')

  return (
    <h1 className={className} style={style}>
      {lines.map((line, lineIndex) => {
        const chars = line.split('')
        const lineOffset = lines
          .slice(0, lineIndex)
          .reduce((acc, l) => acc + l.length, 0)

        return (
          <span key={lineIndex} style={{ display: 'block' }}>
            {chars.map((char, charIndex) => {
              const globalIndex = lineOffset + charIndex
              const delay = globalIndex * charDelay

              return (
                <span
                  key={charIndex}
                  style={{
                    display: 'inline-block',
                    opacity: animated ? 1 : 0,
                    transform: animated ? 'translateX(0)' : 'translateX(-18px)',
                    transition: 'opacity 500ms ease, transform 500ms ease',
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char === ' ' ? ' ' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}
