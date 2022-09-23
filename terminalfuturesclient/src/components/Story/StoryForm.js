import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createStory, getScenes } from '../../managers/StoryManager.js'
import './Story.css'

export const StoryForm = () => {
    const navigate = useNavigate()
    const [scenes, setScenes] = useState([])
        // default values.
    const [currentStory, setCurrentStory] = useState({
        title: "",
        startScene: 1
    })

    const [currentScene, setCurrentScene] = useState({
        name:"Opening",
        sceneText:""
    })

    const changeCurrentStoryState = (domEvent) => {
        const copy = { ...currentStory }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentStory(copy)
    }

    const changeCurrentSceneState = (domEvent) => {
        const copy = { ...currentScene }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentScene(copy)
    }

    useEffect(() => {
        getScenes().then(data => setScenes(data))
    }, [])

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Story Setup</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentStory.title}
                        onChange={changeCurrentStoryState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="name">Starting Scene Name: </label>
                    <input type="text" name="name" required className="form-control"
                        value={currentScene.name}
                        onChange={changeCurrentSceneState} />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="sceneText">Scene Text: </label>
                    <input type="text" name="sceneText" required className="form-control"
                        value={currentScene.sceneText}
                        onChange={changeCurrentSceneState} />
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const story = {

                        title: currentStory.title,
                        name: currentScene.name,
                        sceneText: currentScene.sceneText
                    }

                    // Send POST request to your API
                    createStory(story)
                        .then((newStory) => navigate(`/scenes/${newStory.id}/new`))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}