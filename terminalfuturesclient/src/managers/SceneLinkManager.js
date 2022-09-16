export const getSceneLinks = () => {
    return fetch("http://localhost:8000/sceneLinks", {
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
        .then(getSceneLinks)
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

export const deleteSceneLink = sceneLink => {
        return fetch(`http://localhost:8000/sceneLinks/${sceneLink.id}`, {
            method: "DELETE",
            headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        })
        };