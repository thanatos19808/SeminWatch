import React from 'react';
import { CardDeck } from 'react-bootstrap';
import CardComponent from '../CardComponent/CardComponent.js';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardRowComponent = (props) => {
  // calculate aggregated data
  let selected = props.selected;
  if (selected.length === 0) {
    selected = [0,1,2,3,4,5,6];
  }
  const data = props.data;
  // aggData = {"Heart": __, "Move": ___ ...}
  const aggData = {
    Calories: 0,
    Heart: 0,
    Move: 0,
    Steps: 0, 
    Rate: 0
  };
  
  if (data.length > 0) {
    selected.forEach((idx) => {
      aggData.Calories += data[idx].Calories;
      aggData.Heart += data[idx].Heart;
      aggData.Move += data[idx].Move;
      aggData.Steps += data[idx].Steps;
      aggData.Rate += data[idx].Rate;
    })
    //Guardar datos y se usan en ButtonComponent
    localStorage.setItem("Calorias",aggData.Calories);
    localStorage.setItem("Ritmo",aggData.Rate);
    localStorage.setItem("Pasos",aggData.Steps);
    localStorage.setItem("PuntosCardio",aggData.Heart);
    localStorage.setItem("Movimiento",aggData.Move);
  }
  return (
    <div>
      <CardDeck>
          <CardComponent element={{title: "Promedio cardiaco", value: Math.round(((aggData.Rate)/7)/3), id:0}} />
          <CardComponent element={{title: "Puntos cardio", value: aggData.Heart, id:1}} />
          <CardComponent element={{title: "Minutos en movimiento", value: aggData.Move, id:2}} />
          <CardComponent element={{title: "Pasos", value: aggData.Steps, id:3}} />
          <CardComponent element={{title: "Calorias", value: aggData.Calories, id: 4}} />
      </CardDeck>
    </div>
  );
}

export default CardRowComponent;
