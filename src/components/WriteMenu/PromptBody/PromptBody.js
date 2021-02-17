import React, { useState } from 'react';
import './PromptBody.css';
import FeatherButton from "../../FeatherButton/FeatherButton";
import { containsMaliciousContent } from "../../../controllers/featherController";


const CHAR_LIMIT = 2000;

function PromptBody(props) {
    const {prompt, username, update} = props;
    const [userInput, setUserInput] = useState('');
    const [promptError, setPromptError] = useState(null);
    
    function handleUserInput(event) 
    {
        const {value} = event.target;

        if (value.length > CHAR_LIMIT)
            setPromptError("Max character limit reached!")
        else if (value.length <= CHAR_LIMIT && promptError)
            setPromptError(null);

        setUserInput(value);
    }

    async function validateUserInput() 
    {
        try {
            const isMalicious = await containsMaliciousContent(userInput);
            if (isMalicious)
                throw new Error("Please remove any bad words!");

            if (userInput.length === 0)
                throw new Error("Your response is empty!");
            
            update(userInput);
        }
        catch (error) {
            const errMessage = String(error);
            setPromptError(errMessage);
        }
    }

    const capitalizedUsername = username ? username[0].toUpperCase() + username.substring(1) : ''

    return (
        <>
            <div className="prompt-body write-body">
                <p className="prompt"> {`${capitalizedUsername}! ${prompt}`} </p>
                <form onSubmit={(e) => { e.preventDefault() }}>
                    <textarea className={`user-input ${promptError ? 'textarea-error-input': ''}`} 
                        value={userInput} 
                        onChange={handleUserInput} />
                </form>
                    <div className="user-input-details">
                        {
                            promptError ?
                                <p className="prompt-error-message">
                                    { promptError }
                                </p>
                            : null
                        }
                        <p className={`prompt-char-count ${promptError ? "error-input" : ''}`}>
                            {`${userInput.length}/${CHAR_LIMIT}`}
                        </p>
                    </div>
            </div>
            <FeatherButton name="Submit" func={() => { validateUserInput() }} />
        </>
    )
}
export default PromptBody;