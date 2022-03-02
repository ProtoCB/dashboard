import {Button, Col, Container, Form, Row} from "react-bootstrap";
import {textStyle} from "../containers/LandingPage/LandingStyles";
import React, {useState} from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import ErrorAlert from "./ErrorAlert";
import SuccessAlert from "./SuccessAlert";

const ScheduleExperimentBlock = (props) => {
    const [ isLoading, setLoading ] = useState(false);
    const [ errorStatus, setError ] = useState({
        isError: false,
        errorMessage: ""
    })

    const [ successStatus, setSuccess ] = useState({
        isSuccess: false,
        successMessage: ""
    })

    let recipe = React.createRef();

    let submitHandler =  (event) => {
        event.preventDefault();
        setLoading(true);

        try {
          const reader = new FileReader();

          const fileType = recipe.current.files[0].type;
          if(fileType !== "application/json") throw new Error('JSON Recipe Expected');

          reader.readAsText(recipe.current.files[0]);
    
          reader.onload = () => {
            const exprimentRecipe = JSON.parse(reader.result);

            axios({
              method: "post",
              url: props.url + "/api/v1/experiment/schedule",
              headers: {
                "authorization": "Bearer " + props.token 
              },
              data: exprimentRecipe
            }).then((response) => {
                setSuccess({
                  isSuccess: true,
                  successMessage: "Scheduling succeeded"
                }) 
                setLoading(false);
            }).catch((ex) => {
              setError({
                  isError: true,
                  errorMessage: ex.response.data.message
              })
              setLoading(false);
            });

          }

        } catch(ex) {
          setError({
              isError: true,
              errorMessage: ex.message
          })
          setLoading(false);
        }
    }

    return (
        <Container>
            { successStatus.isSuccess ?
                <Row>
                    <Col md={ {span: 6, offset: 3}} lg={ {span: 4, offset: 4}} sm={ {span: 10, offset:1}} xs={{span:10, offset:1}} style={{paddingLeft: "1.5rem", paddingRight: "1.5rem", paddingTop: "1.5rem", paddingBottom: "2rem", marginTop:"1rem"}}>
                        <SuccessAlert dismiss={() => {
                            setSuccess({
                                isSuccess: false,
                                successMessage: ""
                            })
                        }} message={successStatus.successMessage}/>
                    </Col>
                </Row>
                : null
            }
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
                <Col md={ {span: 6, offset: 3}} lg={ {span: 4, offset: 4}} sm={ {span: 10, offset:1}} xs={{span:10, offset:1}}     style={{padding: "1.5rem", marginTop:"0.25rem", borderRadius:"1rem", border:"medium solid #093009"}}>
                    <Form onSubmit={submitHandler}>
                        <Form.Row>
                          <Form.Group controlId="formFile" className="mb-3">
                            <Form.Control type="file" ref={recipe} />
                          </Form.Group>
                          <Button variant="success" style={{backgroundColor: "#093009"}} type="submit" disabled={isLoading}>
                              {isLoading ? 'Schedulling...' : 'Schedule Experiment'}
                          </Button>
                        </Form.Row>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default ScheduleExperimentBlock;

