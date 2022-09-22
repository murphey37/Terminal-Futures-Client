import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { SceneForm } from "../Scene/SceneForm"
import { SceneList } from "../Scene/SceneList"
import { Visualizer } from "../visualizer/visualizer"

export const SceneLayout = () => {
    return <div>
        <SceneForm /><SceneList />
        <Visualizer/>
        </div>
            // <div><SceneList /></div>
}
