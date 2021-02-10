import React, {useState} from 'react';
import './WriteEntryBody.css';
import FeatherButton from "../../FeatherButton/FeatherButton";
import loadingGif from "../../../images/loading.gif";
import {validateFeatherCode} from "../../../controllers/featherController";
import {AnimateOnChange} from 'react-animation';



function WriteEntryBody(props)
{
    const {updateFeather} = props
    const [featherName, setFeatherName] = useState('');
    const [featherId, setFeatherId] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showError, setShowError] = useState(null);

    function handleNameChange(event)
    {
        const {value} = event.target;
        setFeatherName(value);
    }

    function handleIdChange(event)
    {
        const {value} = event.target;
        setFeatherId(value);
    }
    
    async function confirmFeatherInput()
    {
        try {
            if (!featherName || !featherId)
            {
                throw new Error("Empty input");
            }
            // check if feather is in database
            const isFeatherValid = await validateFeatherCode(featherName, featherId); // change to getFeatherCode
            if (isFeatherValid)
            {
                console.log("Validated feather:", featherName, featherId);
                updateFeather(featherName, featherId);
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
        }
        finally
        {
            setIsLoading(false);
        }
    }

    return (
        <form className="write-entry-form"
            onClick={(e) => {e.preventDefault()}}
        >
            <label className="feather-name" htmlFor="featherName">Feather Name</label><br/>
            <input className="feather-name" 
                name="featherName" 
                onChange={(e) => (handleNameChange(e))}
                onClick={() => (setShowError(null))}
                type="text" 
                value={featherName}
            ></input><br/>

            <label className="feather-id"   htmlFor="featherId">Feather ID</label><br/>
            <input 
                className="feather-id"   
                name="featherName" 
                onChange={(e) => (handleIdChange(e))} 
                onClick={(e) => (setShowError(null))}
                type="text" 
                value={featherId}
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