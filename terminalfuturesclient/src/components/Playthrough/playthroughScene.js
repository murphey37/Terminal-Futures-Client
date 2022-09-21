import { getScene } from '../../managers/SceneManager.js'
import { useNavigate, useParams } from 'react-router-dom'
import {useEffect, useState } from 'react'

export const PlaythroughScene = () => {

    const navigate = useNavigate()
    const [scene, setScene] = useState({

        sceneText:""
    })
    const [sceneLinks, getSceneLinks] =useState({
        scene:null,
        action:"",
        challengeText:"",
        challengeAnswer:"",
        failScene:null,
        nextScene:null
    })
    // const [scene, getScene] = useState([])
    const {storyId, sceneId} = useParams()
    
    useEffect(() => {
        getScene(sceneId).then(setScene)
    }, [sceneId])

return (<>
        <div>
            {scene.sceneText}
        </div>
        {scene.scene_links?.map((scene_link) => {
                return <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                navigate(`/playthrough/${storyId}/${scene_link.nextScene}` ) //need proper routing
        }}
            >{scene_link.action}</button>
        })}
        
        </>
)

}