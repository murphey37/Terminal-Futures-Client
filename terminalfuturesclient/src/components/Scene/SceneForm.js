import React, { useState, useEffect } from "react"
import { useNavigate, useParams } from 'react-router-dom'
import { createScene, getStories, getScenes, getScene, updateScene } from '../../managers/SceneManager.js'
import { createSceneLink, deleteSceneLink, getSceneLinks, updateSceneLink } from "../../managers/SceneLinkManager.js"
import { Visualizer } from '../visualizer/visualizer.js'

export const SceneForm = () => {
    const navigate = useNavigate()
    const [stories, setStories] = useState([])
    const [scenes, setScenes] = useState([])
    const [scene, setScene] = useState([])
    const [sceneLinks, setSceneLinks] = useState([])
        // default values.

    const {storyId, sceneId} = useParams()

    const [currentScene, setCurrentScene] = useState({
        name: "",
        sceneText: "",
        story: storyId,
        links:[]
    })

    const [currentSceneLink, setCurrentSceneLink] = useState({
        scene:null,//how do I populate this?
        action: "",
        challengeText:"",
        challengeAnswer:"",
        failScene:null,
        nextScene:null

                    //Do I need to set the story here?
    })



    useEffect(() => {
        getScenes(storyId).then(data => setScenes(data))
    }, [sceneId, storyId])

    useEffect(() => {
        if (sceneId=="new")
        
        {setSceneLinks([])
            console.log("Blank values")
            setCurrentScene({
                name: "",
                sceneText: "",
                story: storyId
        })}
            else {
        getScene(sceneId).then(data => 
            {console.log(data)
                setCurrentScene({
                    name: data.name,
                    sceneText: data.sceneText,
                    story: data.story.id
                })
            })
            .then(() => getSceneLinks(sceneId))
            .then(data => {console.log(data)
                setSceneLinks(data.map((sceneLink) => {
                    return {scene:sceneId.toString(),
                            action: sceneLink.action,
                            challengeText:sceneLink.challengeText,
                            challengeAnswer:sceneLink.challengeAnswer,
                            failScene:sceneLink.failScene ? sceneLink.failScene.id.toString() : null,
                            nextScene:sceneLink.nextScene.id.toString()}
                }))
            })
    }
}, 
[sceneId, storyId])


    const changeCurrentSceneState = (domEvent) => {
        const copy = { ...currentScene }
        copy[domEvent.target.name] = domEvent.target.value
        setCurrentScene(copy)
    }

    const changeCurrentSceneLinkState = (domEvent, index) => {
        // const copy = { ...currentSceneLink }
        // copy[domEvent.target.name] = domEvent.target.value
        // setCurrentSceneLink(copy)
        setSceneLinks(sceneLinks => sceneLinks.map(
                    (sceneLink, i) => {
                        if (i == index) {
                            sceneLink[domEvent.target.name] = domEvent.target.value
                        } return sceneLink
                    }
        ))
    }

    console.log(sceneLinks)

    return (<>
        <form className="sceneForm">
            <h2 className="sceneForm__name">New Scene</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Scene Name: </label>
                    <input type="text" name="name" required autoFocus className="form-control"
                        value={currentScene.name}
                        onChange={changeCurrentSceneState}
                    />
                </div>
            </fieldset>

            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="sceneText">Scene Text: </label>
                    <input type="text" name="sceneText" required className="form-control"
                        value={currentScene.sceneText}
                        onChange={changeCurrentSceneState} />
            </fieldset>

            <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                setSceneLinks(
                                    sceneLinks => 
                                        [{scene:sceneId,
                                        action: "",
                                        challengeText:"",
                                        challengeAnswer:"",
                                        failScene:null,
                                        nextScene:null},...sceneLinks]
                                    
                                )
                        }}
                            >New SceneLink</button>

            {sceneLinks.map((sceneLink, index) => {

                return (<React.Fragment key={index}>
                    <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="action">Action Text: </label>
                    <input type="text" name="action" required className="form-control"
                        value={sceneLink.action}
                        onChange={
                            (evt) => {
                                changeCurrentSceneLinkState(evt, index)
                            }                                        
                        } />
            </fieldset>
            <fieldset>
                <div className="form-group"></div>
                    <label htmlFor="nextScene">Scene to Link: </label>
                    <select onChange={
                            (evt) => {
                                changeCurrentSceneLinkState(evt, index)
                            }                                        
                        }name="nextScene">
                        {
                            scenes.map(s => {
                                const selected = sceneLink.nextScene == s.id
                                return <option value={s.id} selected={selected}>{s.name}</option>
                            })

                        }
                        </select>

                        <fieldset>
                        <div className="form-group"></div>
                            <label htmlFor="challengeText">Challenge Text: </label>
                            <input type="text" name="challengeText" required className="form-control"
                                value={sceneLink.challengeText}
                                onChange={
                                    (evt) => {
                                        changeCurrentSceneLinkState(evt, index)
                                    }                                        
                                } />
                        </fieldset>

                        <fieldset>
                            <div className="form-group"></div>
                                <label htmlFor="challengeAnswer">Challenge Answer: </label>
                                <input type="text" name="challengeAnswer" required className="form-control"
                                    value={sceneLink.challengeAnswer}
                                    onChange={
                                        (evt) => {
                                            changeCurrentSceneLinkState(evt, index)
                                        }                                        
                                    } />
                        </fieldset>
                        <div className="form-group"></div>
                            <label htmlFor="failScene">Scene to Link on Failure: </label>
                        <select onChange={
                            (evt) => {
                                changeCurrentSceneLinkState(evt, index)
                            }                                        
                        }name="failScene"> <option value={""}>Choose!</option>
                        {
                            scenes.map(s => {
                                const selected = sceneLink.failScene == s.id
                                return <option value={s.id} selected={selected}>{s.name}</option>
                            })

                        }
                        </select>

                        <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                setSceneLinks(sceneLinks => {sceneLinks.splice(index)
                                                return [...sceneLinks]})
                        }}
                            >Delete SceneLink</button>
                        
            </fieldset>
            </React.Fragment>
                )
            })

            }

            <button type="submit" disabled = {
                    sceneLinks.some(sceneLink => {
                        console.log(sceneLink.challengeAnswer)
                        console.log(sceneLink.challengeText)
                        console.log(sceneLink.failScene)
                        console.log(!((!!sceneLink.challengeAnswer ==
                            !!sceneLink.challengeText) ==
                            (!!sceneLink.challengeAnswer ==
                            !!sceneLink.failScene)))
                        return !((!!sceneLink.challengeAnswer ==
                        !!sceneLink.challengeText) ==
                        (!!sceneLink.challengeAnswer ==
                        !!sceneLink.failScene))
                    })

                            }
                onClick={evt => {
                    // Prevent form from being submitted

                    evt.preventDefault()

                    const scene = {
                        name: currentScene.name,
                        sceneText: currentScene.sceneText,
                        story:currentScene.story
                    }
                    const sceneLink = {
                        scene:currentScene.id,
                        action:currentSceneLink.action,
                        nextScene:currentSceneLink.nextScene
                    }
                    if (sceneId=="new"){
                        createScene(scene)

                        .then((scene) => {
                        const sceneLinkUpdates = sceneLinks.map((sceneLink) => {
                            sceneLink.scene = scene.id
                            console.log(sceneLink)
                            return  createSceneLink(sceneLink)
                        })
                            
                        Promise.all(sceneLinkUpdates)
                        return scene
                    })

                        

                        .then(scene => {
                            return navigate(`/scenes/${storyId}/${scene.id}`)})
                    }
                        else 
                    {
                            scene.id=sceneId
                    updateScene(scene).then(() => deleteSceneLink(sceneId))
                    .then(() => {
                        console.log(sceneLinks)
                    const sceneLinkUpdates = sceneLinks.map(createSceneLink)
                        
                    return Promise.all(sceneLinkUpdates)})
                    
                    .then(() => window.location.reload())
                    
                        }
                }
                    // Send POST request to your API
                    
                } 
                className="btn btn-primary" >Save Scene</button>
                <button className="btn btn-2 btn-sep icon-create"
                            onClick={() => {
                                navigate( `/scenes/${storyId}/new`)
                        }}
                            >New Scene</button>
        </form>

        
        </>
    )
}