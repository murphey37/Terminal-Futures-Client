import { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createScene, getStories, getScenes } from '../../managers/SceneManager.js'
import { createSceneLink } from "../../managers/SceneLinkManager.js"

export const SceneForm = () => {
    const navigate = useNavigate()
    const [stories, setStories] = useState([])
    const [scenes, setScenes] = useState([])
        // default values.

    const {storyId} = useParams()

    const [currentScene, setCurrentScene] = useState({
        name: "",
        sceneText: "",
        story: storyId
    })

    const [currentSceneLink, setCurrentSceneLink] = useState({
        scene:null,//how do I populate this?
        action: "",
        challengeText:"",
        challengeAnswer:"",
        failScene:null,
        nextScene:null

                    //Do I need to set the story here?
    })



    useEffect(() => {
        getScenes(storyId).then(data => setScenes(data))
    }, [])

    const changeCurrentSceneState = (domEvent) => {
        const copy = { ...currentScene }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentScene(copy)
    }

    const changeCurrentSceneLinkState = (domEvent) => {
        const copy = { ...currentSceneLink }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentSceneLink(copy)
    }

    return (
        <form className="sceneForm">
            <h2 className="sceneForm__name">New Scene</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Scene Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentScene.name}
                        onChange={changeCurrentSceneState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="sceneText">Scene Text: </label>
                    <input type="text" name="sceneText" required className="form-control"
                        value={currentScene.sceneText}
                        onChange={changeCurrentSceneState} />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="action">Action Text: </label>
                    <input type="text" name="action" required className="form-control"
                        value={currentSceneLink.action}
                        onChange={changeCurrentSceneLinkState} />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="nextScene">Scene to Link: </label>
                    <select onChange={
                            (evt) => {
                                changeCurrentSceneLinkState(evt)
                            }                                        
                        }name="nextScene">
                        {
                            scenes.map(s => {
                                return <option value={s.id}>{s.name}</option>
                            })

                        }
                        </select>
                        
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const sceneLink = {
                        scene:currentScene.id,
                        action:currentSceneLink.action,
                        nextScene:currentSceneLink.nextScene
                    }

                    // Send POST request to your API
                    createSceneLink(sceneLink)
                        // .then(() => navigate("/scenes/new"))
                }}
                className="btn btn-primary">Link Scene</button>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const scene = {
                        name: currentScene.name,
                        sceneText: currentScene.sceneText,
                        story:currentScene.story
                    }

                    // Send POST request to your API
                    createScene(scene)
                        .then(() => window.location.reload())
                }}
                className="btn btn-primary">Add Scene</button>
        </form>
    )
}