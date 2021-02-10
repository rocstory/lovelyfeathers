import React, {useContext} from 'react';
import './ReadMenu.css';
import {MenuContext} from "../../MenuContext";
import FeatherButton from "../FeatherButton/FeatherButton";

function ReadMenu(props)
{
  const {setSelMenu} = useContext(MenuContext);
  console.log(setSelMenu);

  function BackTo(menuName)
  {
    setSelMenu(menuName);
  }

  function ContinueTo(menuName)
  {
    setSelMenu(menuName);
  }


  return (
    <div className="read-menu menu gray-paper">
        <div>
            Header
        </div>
        <div>
            Body
        </div>
        <div className="rm-footer">
            <FeatherButton name="Back" func={()=>{BackTo("")}} />
            <FeatherButton name="Continue" func={()=>{ContinueTo("")}}/>
        </div>
    </div>
  )
}
export default ReadMenu;