import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { SceneForm } from "../Scene/SceneForm"
import { SceneList } from "../Scene/SceneList"
import { Visualizer } from "../visualizer/visualizer"
import './SceneLayout.css'

export const SceneLayout = () => {
    return <div>
        <SceneForm />
        <div className="visualizewrap">
        <SceneList />
        <div className="visualize"> 
        <Visualizer/>
        </div>
        </div>
        </div>
            // <div><SceneList /></div>
}
