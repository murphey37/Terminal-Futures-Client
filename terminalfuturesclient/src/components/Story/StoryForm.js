import { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import { createStory, getScenes } from '../../managers/StoryManager.js'

export const StoryForm = () => {
    const navigate = useNavigate()
    const [scenes, setScenes] = useState([])
        // default values.
    const [currentStory, setCurrentStory] = useState({
        title: "",
        startSceneName: "",
        startSceneText: ""
    })

    useEffect(() => {
        getScenes().then(data => setScenes(data))
    }, [])

    const changeCurrentStoryState = (domEvent) => {
        const copy = { ...currentStory }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentStory(copy)
    }

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
                    <label htmlFor="startSceneName">Starting Scene Name: </label>
                    <input type="text" name="startSceneName" required className="form-control"
                        value={currentStory.startSceneName}
                        onChange={changeCurrentStoryState} />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="startSceneText">Scene Text: </label>
                    <input type="text" name="startSceneText" required className="form-control"
                        value={currentStory.startSceneText}
                        onChange={changeCurrentStoryState} />
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const story = {

                        title: currentStory.title,
                        startSceneName: currentStory.startSceneName,
                        startSceneText: currentStory.startSceneText
                    }

                    // Send POST request to your API
                    createStory(story)
                        .then(() => navigate("/stories"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}