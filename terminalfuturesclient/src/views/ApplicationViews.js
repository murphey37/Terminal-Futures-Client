import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { StoryList } from "../components/Story/StoryList"
import { StoryForm } from "../components/Story/StoryForm"
import { SceneForm } from "../components/Scene/SceneForm"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/stories" element={<StoryList />} />
                <Route path="/stories/new" element={<StoryForm />} />
                <Route path="/scenes/new" element={<SceneForm />} />
                {/* <Route path="/stories/:storyId/update" element={<StoryUpdate />} />  */}
            </Route>
        </Routes>
    </>
}

{/* <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path="/games/:gameId/update" element={<GameUpdate />} />
                <Route path="/events/:eventId/update" element={<EventUpdate />} /> */}