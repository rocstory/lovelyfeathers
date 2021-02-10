import React, {useContext, useState} from 'react';
import './WriteMenu.css';
import {MenuContext} from "../../MenuContext";
import FeatherButton from "../FeatherButton/FeatherButton";
import WriteEntryBody from "./WriteEntryBody/WriteEntryBody";

function WriteMenu(props)
{
  const {setSelMenu, wasFeatherFound} = useContext(MenuContext);
  const [feather, setFeather] = useState(null);

  const [bodyState, setBodyState] = useState('');


  

  function MoveTo(menuName)
  {
    setSelMenu(menuName);
  }

  function updateFeather(feather)
  {
    setFeather(feather)
  }


  return (
    <div className="write-menu menu gray-paper">
        <div className="write-menu-header">
        </div>

        <div className="write-menu-body">
          {
            (bodyState === "") ? 
              <WriteEntryBody updateFeather={updateFeather}/>
              :
              <>
                {
                  (bodyState === "messageBody") ?
                    <div className="message-body">
                      <p>
                        {"This is a message!"}
                      </p>
                    </div>
                    :
                    <>
                      {
                        (bodyState === "promptBody") ?
                          <div className="prompt-body">
                            <p>
                              {"This is a prompt"}
                            </p>
                          </div>
                        :
                        <>
                          {
                            (bodyState === "finalBody") ?
                              <div className="prompt-body">
                                <p>
                                  {"This is the final body"}
                                </p>
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
        </div>

        <div className="wm-footer">
            <FeatherButton name="Back" func={()=>{MoveTo("")}} />
        </div>
    </div>
  )
}
export default WriteMenu;