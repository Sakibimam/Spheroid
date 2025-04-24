import React, { useEffect, useState } from "react"
import { loadFull } from "tsparticles"
import Particles, { initParticlesEngine } from "@tsparticles/react"

type EmitterConfig = {
  direction: string
  rate: {
    quantity: number
    delay: number
  }
  size: {
    width: number
    height: number
  }
  spawnColor: {
    value: string
    animation: {
      h: {
        enable: boolean
        offset: {
          min: number
          max: number
        }
        speed: number
        sync: boolean
      }
      l: {
        enable: boolean
        offset: {
          min: number
          max: number
        }
        speed: number
        sync: boolean
      }
    }
  }
  position: {
    x: number
    y: number
  }
}

const baseEmitterConfig = (direction: string, position: { x: number; y: number }): EmitterConfig => {
  return {
    direction,
    rate: {
      quantity: 15,
      delay: 0.3,
    },
    size: {
      width: 0,
      height: 0,
    },
    spawnColor: {
      value: "#ff0000",
      animation: {
        h: {
          enable: true,
          offset: {
            min: -1.4,
            max: 1.4,
          },
          speed: 2,
          sync: false,
        },
        l: {
          enable: true,
          offset: {
            min: 40,
            max: 60,
          },
          speed: 0,
          sync: false,
        },
      },
    },
    position,
  }
}

const CornerConfetti = () => {
  const [init, setInit] = useState(false)

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadFull(engine)
    }).then(() => {
      setInit(true)
    })
  }, [])

  return (
    init && (
      <Particles
        id="tsparticles"
        options={{
          background: {
            color: "transparent",
          },
          particles: {
            angle: {
              value: 0,
              offset: 30,
            },
            move: {
              enable: true,
              outModes: {
                top: "none",
                default: "destroy",
              },
              gravity: {
                enable: true,
              },
              speed: { min: 5, max: 20 },
              decay: 0.01,
            },
            number: {
              value: 0,
            },
            opacity: {
              value: 1,
            },
            shape: {
              type: ["circle", "square", "triangle"],
            },
            size: {
              value: { min: 2, max: 5 },
              animation: {
                count: 1,
                startValue: "min",
                enable: true,
                speed: 5,
                sync: true,
              },
            },
            rotate: {
              value: {
                min: 0,
                max: 360,
              },
              direction: "random",
              animation: {
                enable: true,
                speed: 60,
              },
            },
            tilt: {
              direction: "random",
              enable: true,
              value: {
                min: 0,
                max: 360,
              },
              animation: {
                enable: true,
                speed: 60,
              },
            },
            roll: {
              darken: {
                enable: true,
                value: 25,
              },
              enable: true,
              speed: {
                min: 15,
                max: 25,
              },
            },
            wobble: {
              distance: 30,
              enable: true,
              speed: {
                min: -15,
                max: 15,
              },
            },
          },
          emitters: [baseEmitterConfig("top-right", { x: 0, y: 30 }), baseEmitterConfig("top-left", { x: 100, y: 30 })],
        }}
      />
    )
  )
}

export default CornerConfetti
