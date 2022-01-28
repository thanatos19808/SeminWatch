import React, { useState } from 'react';
import { Container, Jumbotron, Row, Col } from 'react-bootstrap';
import CardRowComponent from '../CardRowComponent/CardRowComponent.js';
import UserCard from '../UserCard/UserCard.js';
import ChartComponent from '../ChartComponent/ChartComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import Pulsacion from "../ButtonComponent/pulsacion.js";
const { getRequestHeaders, getWeeklyData } = require('../../Utility/DataRequestManager.js');

const Dashboard = (props) => {
  // fetch weekly data
  const accessToken = props.user.accessToken;
  const [weekData, setWeekData] = useState([]);
  // let weekData = [];

  let selected = [0,1,2,3,4,5,6];
  const callBack = (state) => {
    setWeekData(state);
  }
  const requestHeaders = getRequestHeaders(accessToken);
  const timeRightNow = new Date().getTime();
  getWeeklyData(timeRightNow, requestHeaders, callBack, weekData);

  return (
    <div>
      <Container className="p-3">
        <Jumbotron style={{backgroundColor:"#ffffff", color:'#000000'}}>
          <h1 className="header">SEMIN Watch</h1>
          {props.user.haslogin ?
            null : <div>
              <h3> Please login</h3>
            </div>
          }
        </Jumbotron>
        {props.user.haslogin ?
          <div>
            <Row>
              <Col>
                <UserCard user={props.user}/>
              </Col>
            </Row>
            <Row>
              <div>
                <br></br>
              </div>
            </Row>
            <Row>
              <Col>
                <CardRowComponent user={props.user} selected={selected} data={weekData}/>
              </Col>
            </Row>
            <Row>
              <div>
                <br></br>
              </div>
            </Row>
            <Row>
              <Col>
                <ChartComponent data={weekData} selected={selected}/>
                <script>
                </script>
                <Pulsacion/>
              </Col>
            </Row>
          </div> : null
        }
      </Container>
    </div>
  );
}

export default Dashboard;
