import React, { useEffect, useState } from "react"
import { getScenes, deleteScene } from "../../managers/SceneManager"
import { getStories } from "../../managers/StoryManager"
import { useNavigate, useParams } from "react-router-dom"
import './Scene.css'


export const SceneList = (props) => {
    const [ scenes, setScenes ] = useState([])
    const navigate = useNavigate()

    const {storyId, sceneId} = useParams()

    const loadScenes = () => {
        getScenes(storyId).then(data => {
            console.log(data)
            setScenes(data)
        })
    }
    useEffect(() => {
        loadScenes()
    }, [sceneId, storyId])

    return (
        <article className="scenes">

        <h1>Jump to Scene</h1>
            {
                scenes.map(scene => {
                    return <section key={`scene--${scene.id}`} className="scene">
                        <div className="scene__name">{scene.name}</div>

                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                // navigate( `/scenes/${scene.story.id}/${scene.id}`);
                                window.location.href = `/scenes/${scene.story.id}/${scene.id}`
                        }}
                            >Jump Here</button>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                deleteScene(scene)
                        .then(() => loadScenes())
                        }}
                            >Delete Scene</button>
                    </section>
                })
            }
        </article>
    )
}

{/* <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate( "/scenes/new" )
    }}
        >Register New Game</button> */}

        {/* <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                deleteGame(game)
                        .then(() => loadGames())
                        }}
                            >Delete Game</button> */}