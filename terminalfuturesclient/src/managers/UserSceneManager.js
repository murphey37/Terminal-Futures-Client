export const getUserScenes = () => {
    return fetch("http://localhost:8000/userScenes", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const createUserScene = UserScene => {
    return fetch("http://localhost:8000/userScenes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(UserScene)
        })
        .then(getUserScenes)
}

export const getSceneLinks = () => {
    return fetch("http://localhost:8000/sceneLinks", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
        }
    })
        .then(response => response.json())
}

export const updateUserScene = userScene => {
    return fetch(`http://localhost:8000/userScenes/${userScene.id}`, {
        method: "PUT",
        headers: {
        "Content-Type": "application/json",
        "Authorization": `Token ${localStorage.getItem("lu_token")}`
        },
        body: JSON.stringify(userScene)
    })
    };

export const deleteUserScenes = userScene => {
        return fetch(`http://localhost:8000/userScenes/${userScene.id}`, {
            method: "DELETE",
            headers: {
            "Authorization": `Token ${localStorage.getItem("lu_token")}`
            },
        })
        };