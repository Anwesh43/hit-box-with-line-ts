import React from 'react'
import DimenProps from './DimenProps'
import { useStyle } from './hooks'
import withContext from './withContext'
const BarHitWithLine = (props : DimenProps) => {
    const {w, h, onClick, scale} = props
    const {lineStyle, barStyle, parentStyle} = useStyle(w, h, scale) 
    return (
        <React.Fragment>
            <div style = {parentStyle()}>
                <div style = {barStyle()} onClick = {onClick()}></div>
                <div style = {lineStyle()}></div>
            </div>
        </React.Fragment>
    )
}

export default withContext(BarHitWithLine)