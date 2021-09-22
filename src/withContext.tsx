import React from 'react'
import {useAnimatedScale, useDimension} from './hooks'
import DimenProps from './DimenProps'
const withContext = (MainComponent : React.FC<DimenProps>) => {
    return () => {
        const {scale, start : onClick} = useAnimatedScale()
        const {w, h} = useDimension()
        const props = {
            w, 
            h,
            scale, 
            onClick
        }
        return (<MainComponent {...props}>
            </MainComponent>)
    }
}

export default withContext 
