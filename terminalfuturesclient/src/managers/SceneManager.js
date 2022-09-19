export const getScenes = (storyId) => {
    return fetch(`http://localhost:8000/scenes?story=${storyId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createScene = Scene => {
    return fetch("http://localhost:8000/scenes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(Scene)
        })
        .then(response => response.json())
}

export const getStories = () => {
    return fetch("http://localhost:8000/stories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateScene = scene => {
    return fetch(`http://localhost:8000/scenes/${scene.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(scene)
    })
    };

export const deleteScene = scene => {
        return fetch(`http://localhost:8000/scenes/${scene.id}`, {
            method: "DELETE",
            headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        })
        };