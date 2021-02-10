import React, { useContext} from 'react';
import './App.css';
import HomeMenu from './components/HomeMenu/HomeMenu';
import ReadMenu from './components/ReadMenu/ReadMenu';
import WriteMenu from './components/WriteMenu/WriteMenu';

import {MenuContext} from "./MenuContext";
import {AnimateOnChange} from 'react-animation';

function App(props)
{
  const {selMenu} =  useContext(MenuContext);

  return (
    <div className="App">
      <AnimateOnChange >
      {
        (selMenu === "") ?
            <HomeMenu />
          : 
          (
            <>
              {
                (selMenu === "writeMenu") ?
                    <WriteMenu />
                :
                <>
                  {
                    (selMenu === "readMenu") ?
                        <ReadMenu />
                      :
                      null
                  }
                </>
              }
            </>
          )
      }
      </AnimateOnChange>
    </div>
  )
}
export default App;