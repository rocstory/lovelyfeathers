import React from 'react';
import './FinalBody.css';
import FeatherIDCard from "../../FeatherIDCard/FeatherIDCard";

function FinalBody(props) {
    const {message, feather, post} = props;
    // const {postId} = post

    console.log("Creating post:")
    console.log(post);
    return (
        <>
            <div className="final-body write-body">
                <h2 >{"Thank you for your response!"} </h2>
                <p className="final-body-message">{message ? message : ''}</p>
                <FeatherIDCard feather={feather} post={post}/>
                <p className="take-screenshot-msg">Take a screenshot so you won't forget!</p>
            </div>
        </>
    )
}
export default FinalBody;