import React, {useState} from 'react';
import './WriteEntryBody.css';
import FeatherButton from "../../FeatherButton/FeatherButton";
import loadingGif from "../../../images/loading.gif";
import {getFeather} from "../../../controllers/featherController";
import {AnimateOnChange} from 'react-animation';



function WriteEntryBody(props)
{
    const {update} = props
    const [featherName, setFeatherName] = useState('');
    const [featherCode, setFeatherCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(null);

    function handleNameChange(event)
    {
        const {value} = event.target;
        setFeatherName(value);
    }

    function handleCodeChange(event)
    {
        const {value} = event.target;
        setFeatherCode(value);
    }
    
    async function confirmFeatherInput()
    {
        try {
            if (!featherName || !featherCode)
            {
                throw new Error("Empty input");
            }
            // check if feather is in database
            const feather = await getFeather(featherName, featherCode); 
            if (feather)
            {
                console.log("Feather:", feather);
                update(feather);
            }
            else
            {
                throw new Error("Feather does not exist"); 
            }
        }
        catch (err)
        {
            console.error(err);
            setShowError(err);
            setIsLoading(false);
        }
    }

    return (
        <form className="write-entry-form"
            onSubmit={(e) => {e.preventDefault()}}
        >
            <label className="feather-name" htmlFor="featherName">Feather Name</label><br/>
            <input className="feather-name" 
                name="featherName" 
                onChange={(e) => (handleNameChange(e))}
                onClick={() => (setShowError(null))}
                type="text" 
                value={featherName}
            ></input><br/>

            <label className="feather-id"   htmlFor="featherId">Feather Code</label><br/>
            <input 
                className="feather-id"   
                name="featherName" 
                onChange={(e) => (handleCodeChange(e))} 
                onClick={(e) => (setShowError(null))}
                type="text" 
                value={featherCode}
            ></input><br/>
            <div className="error-container">
                {
                    showError ?
                    <AnimateOnChange animationIn="popIn" animationOut="popOut" durationOut={1000}>
                        <div className="error-display">
                            <p className="error-message">{`${showError}`}</p>
                        </div>
                    </AnimateOnChange>
                    :
                    null
                }
            </div>
            <div className="continue-state">
                {
                    !isLoading ?
                        <FeatherButton name="Continue" func={()=>{setIsLoading(true); confirmFeatherInput()}} />
                        :
                        <img className="loading-img" src={loadingGif} alt="loading gif" />
                }
            </div>
        </form>
    )
}

export default WriteEntryBody;