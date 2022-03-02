import React, { useState } from "react";
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import ErrorAlert from "./ErrorAlert";
import { withRouter } from "react-router";

const Login = (props) =>{
    const [ errorStatus, setError ] = useState({
        isError: false,
        errorMessage: ""
    })
    const [ isLoading, setLoading ] = useState(false);

    let history = useHistory();
    let email = React.createRef();
    let password = React.createRef();
    let controllerUrl = React.createRef();

    let submitHandler = (event) => {
        event.preventDefault();
        setLoading(true);

        let controllerUrlValue = controllerUrl.current.value;

        let payload = {
            username: email.current.value,
            password: password.current.value
        }
        axios.post(controllerUrl.current.value + '/api/v1/auth/admin/login', payload).then((response)=>{
            if(response.status === 200){
                history.push( {
                  pathname: '/dashboard',
                  state: { token: response.data.token, url: controllerUrlValue }
                });
            }
        }).catch((error)=>{
            setError({
                isError: true,
                errorMessage: "Something went wrong! - " + error.message
            })
            setLoading(false);
        })

    }

    return (
        <Container>
            <Row>
                <Col md={ {span: 4, offset: 4}} lg={ {span: 6, offset: 3}} sm={ {span: 10}} style={{fontSize:"1.5rem",paddingBottom: "0", paddingLeft: "0", paddingRight: "0", textAlign:"center", marginTop:"1rem"}}>
                    Please login to continue
                </Col>
            </Row>
            <Row>
                <Col md={ {span: 6, offset: 3}} lg={ {span: 4, offset: 4}} sm={ {span: 10, offset:1}} xs={{span:10, offset:1}}     style={{padding: "1.5rem", marginTop:"0.25rem", borderRadius:"1rem", border:"medium solid #093009"}}>
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="formBasicText">
                            <Form.Label>Controller URL</Form.Label>
                            <Form.Control type="text" placeholder="Enter Controller URL" ref={controllerUrl}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicText2">
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" placeholder="Enter Userneame" ref={email}/>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Enter Password" ref={password} />
                        </Form.Group>
                        <Button variant="success" style={{backgroundColor: "#093009"}} type="submit" disabled={isLoading}>
                            {isLoading ? 'Loading…' : 'Login'}
                        </Button>
                    </Form>
                </Col>
            </Row>
            <Row>
                <Col md={ {span: 6, offset: 3}} lg={ {span: 4, offset: 4}} sm={ {span: 10, offset:1}} xs={{span:10, offset:1}} style={{paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1.5rem", paddingBottom: "2rem", marginTop:"1rem"}}>
                    { errorStatus.isError ? <ErrorAlert dismiss={() => {
                        setError({
                            isError: false,
                            errorMessage: ""
                        })
                    }} message={errorStatus.errorMessage}/> : null }
                </Col>
            </Row>
        </Container>
    );
}

export default Login;