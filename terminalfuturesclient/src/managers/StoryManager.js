export const getStories = () => {
    return fetch("http://localhost:8000/stories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createStory = Story => {
    return fetch("http://localhost:8000/scenes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(Story)
        })
        .then(getStories)
}

export const getScenes = () => {
    return fetch("http://localhost:8000/scenes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateStory = story => {
    return fetch(`http://localhost:8000/storys/${story.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(story)
    })
    };

export const deleteStory = story => {
        return fetch(`http://localhost:8000/stories/${story.id}`, {
            method: "DELETE",
            headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        })
        };