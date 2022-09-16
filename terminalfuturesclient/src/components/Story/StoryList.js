import React, { useEffect, useState } from "react"
import { getStories, deleteStory } from "../../managers/StoryManager.js"
import { useNavigate } from "react-router-dom"

export const StoryList = (props) => {
    const [ stories, setStories ] = useState([])
    const navigate = useNavigate()
    const loadStories = () => {
        getStories().then(data => setStories(data))
    }
    useEffect(() => {
        loadStories()
    }, [])

    return (
        <article className="stories">

        <h1>Your Stories</h1>
        <button className="btn btn-2 btn-sep icon-create"
            onClick={() => {
            navigate( "/stories/new" )
    }}
        >Create New Story</button>

        

            {
                stories.map(story => {
                    return <section key={`story--${story.id}`} className="story">
                        <div className="story__title">{story.title}</div>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                navigate( `/stories/${story.id}/update`)
                        }}
                            >Edit</button>
                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                deleteStory(story)
                        .then(() => loadStories())
                        }}
                            >Delete Story</button>
                    </section>
                })
            }
            

        </article>
    )
}