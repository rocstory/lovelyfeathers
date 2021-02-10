import React, {useContext} from 'react';
import './HomeMenu.css';
import {MenuContext} from "../../MenuContext";

function HomeMenu(props)
{
  const {setSelMenu, setWasFeatherFound} = useContext(MenuContext);
  return (
    <div className="home-menu menu gray-paper">
        <h2 className="prj-title">Lovely Feathers</h2>
        <h3 className="slogan">Always be kind</h3>

        <ul className="button-container">
          <li>
            <button className="wiggle-hover"
              onClick={()=>{setSelMenu("writeMenu"); setWasFeatherFound(true)}}
            >
              <p>Found A Feather</p>
            </button>
          </li>

          <li>
            <button className="wiggle-hover"
              onClick={()=>{setSelMenu("writeMenu"); setWasFeatherFound(false)}}
            >
              <p>Given A Feather</p>
            </button>
          </li>
          
          <li>
            <button className="wiggle-hover"
              onClick={() => {setSelMenu("readMenu")}}
            >
              <p>Read A Feather</p>
            </button>
          </li>
        </ul>
    </div>
  )
}
export default HomeMenu;