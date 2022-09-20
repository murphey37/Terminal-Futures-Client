import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { SceneForm } from "../Scene/SceneForm"
import { SceneList } from "../Scene/SceneList"

export const SceneLayout = () => {
    return <div>
        <SceneForm /><SceneList />
        </div>
            // <div><SceneList /></div>
}
