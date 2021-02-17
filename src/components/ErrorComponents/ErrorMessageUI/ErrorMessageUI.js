import React from 'react';
import './ErrorMessageUI.css';
import {AnimateOnChange} from 'react-animation';

function ErrorMessageUI(props)
{
    const {message} = props;
    return (
        <AnimateOnChange animationIn="popIn" animationOut="popOut" durationOut={1000} >
            <div className="error-ui-message">
                <p>:( Oh No!</p>
                <p>{message}</p>
            </div>
        </AnimateOnChange>
    )
}
export default ErrorMessageUI;