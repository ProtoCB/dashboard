import {categoryStyle, descriptionStyle} from "../containers/LandingPage/LandingStyles";
import React from "react";

const AgentRow = (props) => {
    return (
        <>
        <tr>
            <td style={categoryStyle}>{props.agent.ip}</td>
            <td style={descriptionStyle}>{props.agent.experimentSession}</td>
            <td style={descriptionStyle}>{props.agent.experimentStatus}</td>
        </tr>
        </>
    );
}

export default AgentRow;