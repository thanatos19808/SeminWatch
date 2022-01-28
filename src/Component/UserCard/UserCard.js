import React from 'react';
import { Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
const UserCard = (props) => {
  const style = {
    backgroundColor: '#FFFFFF',
    color: '#000000'
  };
  return (
    <Card  className="mb-2 text-center" style={style}>
      <Card.Body>
        <Card.Title>
          Bienvenido(a) {props.user.name}
        </Card.Title>
        <Card.Subtitle>
          Tus estadisticas recopiladas son las siguientes:
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
}
export default UserCard;
