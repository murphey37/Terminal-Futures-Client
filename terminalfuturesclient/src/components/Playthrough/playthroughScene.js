import { getScene } from '../../managers/SceneManager.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import './playthrough.css'

export const PlaythroughScene = () => {

    const navigate = useNavigate()
    const [scene, setScene] = useState({

        sceneText: ""
    })
    const [sceneLinks, getSceneLinks] = useState({
        scene: null,
        action: "",
        challengeText: "",
        challengeAnswer: "",
        failScene: null,
        nextScene: null
    })
    // const [scene, getScene] = useState([])
    const { storyId, sceneId } = useParams()

    useEffect(() => {
        getScene(sceneId).then(setScene)
    }, [sceneId])

    return (<>
        <main className="playthroughScene">
        <h2>
            {scene.sceneText}
        </h2>
        {scene.scene_links?.map((scene_link) => {
            return <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    if (scene_link.challengeText) {
                        navigate(`/playthrough/${storyId}/challenge/${scene_link.id}`)
                    } else { navigate(`/playthrough/${storyId}/${scene_link.nextScene}`) }//need proper routing
                }}
            >{scene_link.action}</button>
        })}
        </main>
    </>
    )

}