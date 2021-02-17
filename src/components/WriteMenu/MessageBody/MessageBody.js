import React, { useState } from 'react';
import './MessageBody.css';
import ErrorMessageUI from "../../ErrorComponents/ErrorMessageUI/ErrorMessageUI";
import FeatherButton from "../../FeatherButton/FeatherButton";
import {containsMaliciousContent} from  "../../../controllers/featherController";

const MAX_NAME_LENGTH = 20;

function MessageBody(props) {
    const { feather , update, showMessage } = props
    const {message} = feather
    const [userName, setUsername] = useState('');
    const [showError, setShowError] = useState(null);

    function handleUsernameChange(event) {
        const { value } = event.target;

        if (value.length > MAX_NAME_LENGTH)
            setShowError("Oh no you're name is too long!")
        else if (value.length <= MAX_NAME_LENGTH && showError)
            setShowError(null);

        setUsername(value);
    }

    async function confirmUsername()
    {
        try 
        {
            const isMalicious = await containsMaliciousContent(userName);
            if (isMalicious)
                throw new Error("Please remove any bad words!");
            if (userName.length > MAX_NAME_LENGTH)
                throw new Error("Oh no you're name is too long!");
            if (userName.length === 0)
                throw new Error("Please enter your name.");
            
            update(userName);
        }
        catch (error)
        {
            const errorMessage = String(error)
            setShowError(errorMessage);
        }
    }



    return (
        <>
            <div className="message-body write-body">
                {
                    message ?
                        <>
                            <p className="message">
                                {`${showMessage ? message : ''}`}
                            </p>
                        </>
                        :
                        <ErrorMessageUI message={"It looks like this feather does not have a message!"} />
                }
                <form className="username-form" onSubmit={(e) => { e.preventDefault() }} >
                    <label>What is your name?</label><br />
                    <input
                        className="username-input"
                        name="usernameInput"
                        onChange={(e) => (handleUsernameChange(e))}
                        onClick={() => (setShowError(null))}
                        type="text"
                        value={userName}
                    ></input><br/>
                    <div className="username-input-details">
                        {
                            showError ?
                                <p className="username-error-msg">
                                    {showError}
                                </p> : null
                        }
                        <p className={`username-char-count ${showError ? "username-error-input" : ''}`}>
                            {`${userName.length}/${MAX_NAME_LENGTH}`}
                        </p>
                    </div>
                </form>
            </div>
            <FeatherButton name="Continue" func={() => { confirmUsername() }} />
        </>
    )
}

export default MessageBody;