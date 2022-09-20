import { getStory, getScenes, getScene } from '../../managers/StoryManager.js'
import { useNavigate } from 'react-router-dom'

const PlaythroughScene = (storyId) => {

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

return (<>
        <div>
            ${scene.sceneText}
        </div>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate(`/scenes/${story.id}/${sceneLink.nextScene}` ) //need proper routing
    }}
        >${sceneLinks.action}</button>
        </>
)

}