import {useState, useEffect, CSSProperties} from 'react'

const scGap : number = 0.01
const delay : number = 20 

export const useAnimatedScale = () => {
    const [scale, setScale] = useState(0)
    const [animated, setAnimated] = useState(false)
    return {
        scale, 
        start() {
            if (!animated) {
                setAnimated(true)
                const interval = setInterval(() => {
                    setScale((prev : number) => {
                        if (prev > 1) {
                            setAnimated(false)
                            clearInterval(interval)
                            return 0
                        }
                        return prev + scGap 
                    })
                }, delay)
            }
        }
    }
}

export const useDimension = () => {
    const [w, setW] = useState(window.innerWidth)
    const [h, setH] = useState(window.innerHeight)
    useEffect(() => {
        window.onresize = () => {
            setW(window.innerWidth)
            setH(window.innerHeight)
        }
        return () => {
            window.onresize = () => {

            }
        }
    }, [])
    return {
        w, 
        h
    }
}

const maxScale = (scale : number, i : number, n : number) : number => Math.max(0, scale - i / n)
const divideScale = (scale : number, i : number, n : number) : number => Math.min(1 / n, maxScale(scale, i, n)) * n 
const sinify = (scale : number) : number => Math.sin(scale * Math.PI)

export const useStyle = (w : number, h : number, scale : number) => {
    const position = 'absolute'
    const size = Math.min(w, h) / 10
    const background = 'indigo'
    const sf = sinify(scale)
    return {
        parentStyle() : CSSProperties {
            const left = `${w / 2}px`
            const top = `${h / 2}px`
            return {
                position, 
                left, 
                top
            }
        },
        lineStyle() : CSSProperties {
            const sf1 : number = divideScale(sf, 0, 2)
            const left = `${w * 0.5 * (1 - sf1)}px`
            const width = `${size}px`
            const height = `${Math.min(w, h) / 90}px`
            return {
                position, 
                left, 
                width, 
                height,
                background 
            }
        },
        barStyle() : CSSProperties {
            const sf2 : number = divideScale(sf, 1, 2)
            const left = `${-size - (w / 2 - size) * sf2}px`
            const top = `${-size / 2}px`
            const height = `${size}px`
            const width = `${size}px`
            return {
                position, 
                background, 
                left, 
                top, 
                width, 
                height 
            }
        }
    }
}