import React, { Component } from 'react';

import { Col, Container, Row, Table} from "react-bootstrap";
import axios from 'axios';
import { headingStyle, theadStyle } from "./LandingStyles";
import AgentRow from "../../components/AgentRow";
import { withRouter } from "react-router";
import CancelExperimentBlock from '../../components/CancelExperimentBlock';
import ScheduleExperimentBlock from '../../components/ScheduleExperimentBlock';

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            agents: [],
            token: props.location.state.token,
            url: props.location.state.url
        }
    }

    componentDidMount() {
      this.interval = setInterval(() => {
        console.log(this.state.token);
        console.log(this.state.url);
        axios({
          method: "get",
          url: this.state.url + "/api/v1/experiment/agents",
          headers: {
            "authorization": "Bearer " + this.state.token 
          }
        }).then((response)=>{
            if(response.status === 200){
              console.log(response.data);
              this.setState({agents: response.data.agents, token: this.state.token, url: this.state.url});
            }
        }).catch((error)=>{
          console.log(error);
        })
      }, 2000);
    }
    componentWillUnmount() {
      clearInterval(this.interval);
    }

    render () {
        return (
            <Container>
                <Row>
                    <Col md={ {span: 4, offset: 4}} lg={ {span: 6, offset: 3}} sm={ {span: 10, offset:1}} xs={ {span: 10, offset:1}} style={headingStyle}>
                        Dashboard - {this.state.url}
                    </Col>
                </Row>
                <Row>
                  <Col>
                    <ScheduleExperimentBlock token={this.state.token} url={this.state.url} />
                    <CancelExperimentBlock token={this.state.token} url={this.state.url}/>
                  </Col>
                </Row>
                <Row>
                    <Col md={ {span: 8, offset: 2}} lg={ {span: 8, offset: 2}} sm={ {span: 10, offset:1}}  xs={ {span: 10, offset:1}} >
                        <Table responsive bordered>
                            <thead style={theadStyle}>
                            <tr>
                                <th>Agent ID</th>
                                <th>Session</th>
                                <th>Status</th>
                            </tr>
                            </thead>
                            <tbody>
                                {this.state.agents.map( (agent, index) => {
                                    return (
                                        <AgentRow key={index} agent={agent}/>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
}


export default withRouter(LandingPage);
