import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {textStyle} from "../containers/LandingPage/LandingStyles";
import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorAlert from "./ErrorAlert";

const CancelExperimentBlock = (props) => {
    const [ isLoading, setLoading ] = useState(false);
    const [ errorStatus, setError ] = useState({
        isError: false,
        errorMessage: ""
    })

    let submitHandler =  (event) => {
        event.preventDefault();
        setLoading(true);

        axios({
          method: "patch",
          url: props.url + "/api/v1/experiment/cancel",
          headers: {
            "authorization": "Bearer " + props.token 
          }
        }).then((response) => {
                setLoading(false);
        }).catch((error) => {
            setError({
                isError: true,
                errorMessage: "Something went wrong! " + error.message
            })
            setLoading(false);
        })
    }

    return (
        <Container>
            { errorStatus.isError ?
                <Row>
                    <Col md={ {span: 6, offset: 3}} lg={ {span: 4, offset: 4}} sm={ {span: 10, offset:1}} xs={{span:10, offset:1}} style={{paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1.5rem", paddingBottom: "2rem", marginTop:"1rem"}}>
                        <ErrorAlert dismiss={() => {
                            setError({
                                isError: false,
                                errorMessage: ""
                            })
                        }} message={errorStatus.errorMessage}/>
                    </Col>
                </Row>
                : null
            }
            <Row>
                <Col md={ {span: 4, offset: 4}} lg={ {span: 6, offset: 3}} sm={ {span: 10, offset:1}} xs={ {span: 10, offset:1}} style={textStyle}>
                    <Button variant="success" style={{backgroundColor: "#093009"}} type="submit" onClick={submitHandler} disabled={isLoading}>
                            {isLoading ? 'Cancelling...' : 'Send Cancellation Signal'}
                    </Button>
                </Col>
            </Row>
            <Row>&nbsp;</Row>
        </Container>
    );
}

export default CancelExperimentBlock;