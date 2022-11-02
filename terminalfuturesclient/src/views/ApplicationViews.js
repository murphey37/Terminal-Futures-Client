import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { StoryList } from "../components/Story/StoryList"
import { StoryForm } from "../components/Story/StoryForm"
import { SceneForm } from "../components/Scene/SceneForm"
import { SceneList } from "../components/Scene/SceneList"
import { SceneLayout } from "../components/Layout/SceneLayout"
import { PlaythroughStory } from "../components/Playthrough/playthroughStory"
import { PlaythroughScene} from "../components/Playthrough/playthroughScene"
import { PlaythroughChallenge } from "../components/Playthrough/playthroughChallenge"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/" element={<Login />} /> 
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/stories" element={<StoryList />} />
                <Route path="/stories/new" element={<StoryForm />} />
                <Route path="/scenes/:storyId/:sceneId" element={<SceneLayout />} />
                <Route path="/playthrough/:storyId" element={<PlaythroughStory />} /> 
                <Route path="/playthrough/:storyId/:sceneId" element={<PlaythroughScene />} />  
                <Route path="/playthrough/:storyId/challenge/:sceneLinkId" element={<PlaythroughChallenge />} /> 
            </Route>
        </Routes>
    </>
}

