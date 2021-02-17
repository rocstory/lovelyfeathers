import React, {useContext, useState} from 'react';
import './WriteMenu.css';
import {MenuContext} from "../../MenuContext";
import FeatherButton from "../FeatherButton/FeatherButton";
import WriteEntryBody from "./WriteEntryBody/WriteEntryBody";
import PromptBody from "./PromptBody/PromptBody";
import FinalBody from "./FinalBody/FinalBody";
import LoadingGif from "../../images/loading.gif";
import MessageBody from "./MessageBody/MessageBody";
import {createPost} from "../../controllers/featherController";

function WriteMenu(props)
{
  const {setSelMenu, wasFeatherFound} = useContext(MenuContext);
  const [feather, setFeather] = useState(null);
  const [bodyState, setBodyState] = useState('');
  const [userName, setUserName] = useState('');
  const [post, setPost] = useState(null); 
  
  function MoveTo(menuName)
  {
    setSelMenu(menuName);
  }

  function WriteEntryBodyUpdate(feather)
  {
    setFeather(feather)
    // wasFeatherFound ?  setBodyState("promptBody") : setBodyState("messageBody");
    setBodyState("messageBody");
  }

  function MessageBodyUpdate(newUsername)
  {
    console.log("Reading username:", newUsername);
    setUserName(newUsername)
    // wasFeatherFound ? setBodyState("promptBody") : setBodyState("messageBody")
    setBodyState("promptBody");
  }

  async function PromptBodyUpdate(userResponse)
  {
    try
    {
      console.log("Updating prompt response: ", userResponse);
      console.log("Creating post!");
      let createdPost = await createPost(userName, userResponse, feather)

      if (!createdPost)
        throw new Error("Unable to create post");

      setPost(createdPost);
      setBodyState("finalBody"); // create an error body
    }
    catch (error)
    {
      console.error(error);
      setBodyState("finalBody") // create an error body
    }
  }

  // function updateFeather(feather)
  // {
  //   setFeather(feather)
  //   wasFeatherFound ?  setBodyState("promptBody") : setBodyState("messageBody");
  // }

  // function updateUserName(newUserName)
  // {
  //   setUserName(newUserName)
  //   wasFeatherFound ? setBodyState("promptBody") : setBodyState("messageBody")
  // }

  // async function updatePromptResponse(input)
  // {
  //   try
  //   {
  //     console.log("Updating prompt response: ", input);
  //     console.log("Creating post!");
  //     let createdPost = await createPost(userName, input, feather)

  //     if (!createdPost)
  //       throw new Error("Unable to create post");

  //     setPost(createdPost);
  //     setPromptResponse(input);
  //     setBodyState("finalBody"); // create an error body
  //   }
  //   catch (error)
  //   {
  //     console.error(error);
  //     setBodyState("finalBody") // create an error body
  //   }
  // }

  return (
    <div className="write-menu menu gray-paper">
        <div className="write-menu-header"></div>
        <div className="write-menu-body">
          {
            (bodyState === "") ? 
              <WriteEntryBody update={WriteEntryBodyUpdate} />
              :
              <>
                {
                  (bodyState === "messageBody") ?
                      <MessageBody showMessage={!wasFeatherFound} feather={feather} update={MessageBodyUpdate}/>
                    :
                    <>
                      {
                        (bodyState === "promptBody") ?
                          <PromptBody prompt={feather.prompt ? feather.prompt : ''} update={PromptBodyUpdate} username={userName}/>
                        :
                        <>
                          {
                            (bodyState === "finalBody") ?
                              <FinalBody feather={feather} message={feather.passToMessage ? feather.passToMessage : null} post={post}/>
                              :
                              <>
                                {
                                  (bodyState === "loadingBody") ?
                                  <div className="loading-body write-body">
                                    <div className="img-container">
                                      <img className="loading-img" src={LoadingGif} alt="loading gif" />
                                    </div>
                                  </div>
                                  :
                                  setBodyState("") 
                                }


                              </>
                          }
                        </>
                      }
                    </>
                }
              </>
          }
        </div>

        <div className="wm-footer">
            <FeatherButton name="Home" func={()=>{MoveTo("")}} />
        </div>
    </div>
  )
}
export default WriteMenu;