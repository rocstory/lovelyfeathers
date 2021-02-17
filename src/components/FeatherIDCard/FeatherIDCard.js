import React from 'react';
import './FeatherIDCard.css';
import FeatherIcon from "../../images/feather-icon.png";

function FeatherIDCard(props) {
    const {feather, post} = props;
    const {name, code} = feather;
    const {postId} = post
    
    return (
        <div className="feather-id-card">
            <h3>Your Feather</h3>

            <div className="card-info-container">
                <table className="card-info">
                    <tbody>
                        <tr>
                            <td className="td-bold">Feather Name</td>
                            <td>{name}</td>
                        </tr>
                        <tr>
                            <td className="td-bold">Feather Code</td>
                            <td>{code}</td>
                        </tr>
                        <tr>
                            <td className="td-bold">Feather ID</td>
                            <td>{postId}</td>
                        </tr>
                    </tbody>
                </table>

                <div className="card-info-icon gray-paper">
                    <img src={FeatherIcon} alt="card icon" />
                </div>
            </div>
        </div>
    )
}
export default FeatherIDCard;