import React from 'react';
import './FeatherButton.css';


function FeatherButton(props)
{
    const {name, func} = props;
    return (
        <button className="feather-button"
            onClick={()=>{func()}}
        >
            <p className="feather-btn-name">
                {name}
            </p>
        </button>
    )
}
export default FeatherButton;