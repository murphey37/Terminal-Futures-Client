import React,{useEffect, useState} from "react";
import mermaid from "mermaid";
import {useParams } from 'react-router-dom'
import { getSceneLinks } from "../../managers/SceneLinkManager";
import {getScenes} from "../../managers/SceneManager"

;

/**
* Component.
*/
// export const WorkflowGraph =(props) => {
//     useEffect(() => {
//             console.log("it's me, mario")
        mermaid.initialize({
            startOnLoad: true
        })

//         mermaid.contentLoaded()
//     },[props.chart])


//         return <div className="mermaid">{props.chart }</div>;
//     }

const Mermaid = ({ chart }) => {
    let node;
    useEffect(() => {
      console.log("useEffect", node);
  
      console.log(node.getAttribute("data-processed"));
  
      //node.dataset.processed = false;
      console.log(node.getAttribute("data-processed"));
  
      mermaid.contentLoaded();
      node.removeAttribute("data-processed");
    });
    if (!chart) return null;
    return (
      <div ref={(e) => (node = e)} className="mermaid">
        {chart}
      </div>
    );
  };


export const Visualizer = (props) => {
    const { graphData } = props
    const {storyId, sceneId} = useParams()

    const [sceneLinks, setSceneLinks] = useState([])
    const [scenes, setScenes] = useState([])
    const [mermaidReturn, setMermaidReturn ] = useState("")

    useEffect(() => {
            const useMermaid = tooMermaid()
            setMermaidReturn(useMermaid)
    }, [sceneLinks, scenes]
    )

    useEffect(() => {
        getScenes(storyId).then(scenes => {
            setScenes(scenes)
            const sceneLinks = scenes.map(scene => {
                const resultLinks = getSceneLinks(scene.id)
                return resultLinks
            }) 
            

            return Promise.all(sceneLinks)
                
        }) .then(sceneLinks => {
            setSceneLinks(sceneLinks.flat())
        })
    }, [sceneId, storyId])

        const tooMermaid = () => {
                console.log(sceneLinks)
                const sceneMap = scenes.map(scene => {
                    return `sceneNode_${scene.id}((${scene.name}))`
                }
                )
                const sceneLinkMap = sceneLinks.map(sceneLink => {
                    if (!!(sceneLink.challengeText)) {
                        return `challengeNode_${sceneLink.id}{{${sceneLink.challengeText}}}
                        sceneNode_${sceneLink.scene.id}-- ${sceneLink.action} --> challengeNode_${sceneLink.id}
                        challengeNode_${sceneLink.id} --o sceneNode_${sceneLink.nextScene.id}
                        challengeNode_${sceneLink.id} --x sceneNode_${sceneLink.failScene.id}`
                    } //-- text -->
                    else {
                    return `sceneNode_${sceneLink.scene.id}-- ${sceneLink.action} -->sceneNode_${sceneLink.nextScene.id}`}
                })
                return sceneMap.join("\n").concat("\n", sceneLinkMap.join("\n"))
        }

        return (
        <div style={{display:"flex",justifyContent:"center"}}>
            {mermaidReturn !== "" ?<Mermaid
                chart={`flowchart TD\n${mermaidReturn}`}
            />:""}
        </div>
    );
}
