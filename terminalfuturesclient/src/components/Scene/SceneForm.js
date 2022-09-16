import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createScene, getStories, getScenes } from '../../managers/SceneManager.js'

export const SceneForm = () => {
    const navigate = useNavigate()
    const [stories, setStories] = useState([])
        // default values.
    const [currentScene, setCurrentScene] = useState({
        name: "",
        sceneText: "",
        actionText: ""
                    //Do I need to set the story here?
    })

    useEffect(() => {
        getScenes().then(data => setScenes(data))
    }, [])

    const changeCurrentSceneState = (domEvent) => {
        const copy = { ...currentScene }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentScene(copy)
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
                    <label htmlFor="actionText">Action Text: </label>
                    <input type="text" name="actionText" required className="form-control"
                        value={currentStory.actionText}
                        onChange={changeCurrentSceneState} />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="sceneId">Scene to Link: </label>
                    <select onChange={
                            (evt) => {
                                changeCurrentSceneState(evt)
                            }                                        
                        }name="sceneId">
                        {
                            scenes.map(s => {
                                return <option value={s.id}>{gt.name}</option>
                            })

                        }
                        </select>
                        
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const story = {
                        name: currentScene.name,
                        sceneText: currentScene.sceneText,
                        actionText: currentScene.actionText
                    }

                    // Send POST request to your API
                    createScene(scene)
                        .then(() => navigate("/scenes/new"))
                }}
                className="btn btn-primary">Add Scene</button>
        </form>
    )
}