import { getSceneLink } from '../../managers/SceneLinkManager.js'
import { useNavigate, useParams } from 'react-router-dom'
import {useEffect, useState } from 'react'
import './playthrough.css'

export const PlaythroughChallenge = () => {

    const navigate = useNavigate()

    const [sceneLink, setSceneLink] =useState({
        scene:null,
        action:"",
        challengeText:"",
        challengeAnswer:"",
        failScene:null,
        nextScene:null
    })

    const [userAnswer, setUserAnswer] =useState("")

    const {storyId, sceneLinkId} = useParams()
    
    useEffect(() => {
        getSceneLink(sceneLinkId).then(setSceneLink)
    }, [sceneLinkId])
console.log(sceneLink)
return (<>

        <fieldset>
                            <div className="form-group"></div>
                                <label htmlFor="challengeAnswer">{sceneLink.challengeText}</label>
                                <input type="text" name="challengeAnswer" required className="form-control"
                                    // value={sceneLink.challengeAnswer}
                                    onChange={
                                        (domEvent) => {
                                            
                                            const input=domEvent.target.value
                                            setUserAnswer(input)
                                        }                                        
                                    } />
                        </fieldset>
        {               <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                                    if (userAnswer === sceneLink.challengeAnswer) {
                                        navigate(`/playthrough/${storyId}/${sceneLink.nextScene.id}` )
                                    } else {
                                        navigate(`/playthrough/${storyId}/${sceneLink.failScene.id}` )
                                    }
                                }}
                                    >Submit</button>
                                }
        
        </>
)

}