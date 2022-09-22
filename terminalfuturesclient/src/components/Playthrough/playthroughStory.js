import { getStory, getScenes, getScene } from '../../managers/StoryManager.js'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './playthrough.css'

export const PlaythroughStory = () => {

    const navigate = useNavigate()
    const [story, setStory] = useState({

        title:""
    })
    // const [scene, getScene] = useState([])
    const {storyId} = useParams()
    
    useEffect(() => {
        getStory(storyId).then(setStory)
    }, [])



return (
        <div className="frontpage">
        <h1>{story.title}</h1>
        <button className="btn btn-2 btn-sep icon-create "
            onClick={() => {
            navigate(`/playthrough/${story.id}/${story.startScene.id}` ) //need proper routing
    }}
        >Begin</button>
        </div>
        
)

}