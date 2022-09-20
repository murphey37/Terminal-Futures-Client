import { getStory, getScenes, getScene } from '../../managers/StoryManager.js'
import { useNavigate } from 'react-router-dom'

const PlaythroughStory = (storyId) => {

    const navigate = useNavigate()
    const [story, setStory] = useState({

        title:""
    })
    // const [scene, getScene] = useState([])

return (<>
        <h1>${story.title}</h1>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate(`/scenes/${story.id}/${story.startScene.id}` ) //need proper routing
    }}
        >Begin</button>
        </>
)

}