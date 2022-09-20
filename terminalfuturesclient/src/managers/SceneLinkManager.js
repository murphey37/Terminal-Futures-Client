export const getSceneLinks = (sceneId) => {
    return fetch(`http://localhost:8000/sceneLinks?scene=${sceneId}`, {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createSceneLink = SceneLink => {
    return fetch("http://localhost:8000/sceneLinks", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(SceneLink)
        })
        .then(response => response.json())
}

export const getScenes = () => {
    return fetch("http://localhost:8000/scenes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateSceneLink = sceneLink => {
    return fetch(`http://localhost:8000/sceneLinks/${sceneLink.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(sceneLink)
    })
    };

export const deleteSceneLink = sceneId => {
        return fetch(`http://localhost:8000/sceneLinks/${sceneId}`, {
            method: "DELETE",
            headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        })
        };