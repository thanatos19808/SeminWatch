import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
const { extractElement, extractDate } = require('../../Utility/ChartDataManager.js');



const textStyle = {
  color: '#9b9b9b'
}

const ChartComponent = (props) => {
  const options = {
    chart: {
      type: 'bar',
      backgroundColor: '#ffffff'

    },
    title: {
      text: 'Datos semanales',
      style: textStyle
    },
    credits:{
      text: ''
    },
    xAxis: {
      categories: extractDate(props.data),
      crosshair: true,
      gridBarWidth: 4,
      labels: {
        style: textStyle
      }
    },
    yAxis: {
      min: 0,
      max:9500,
      gridLineWidth: 0
    },
    legend: {
      backgroundColor: '#ffffff'
    },
    tooltip: {
      backgroundColor: '#272727',
      headerFormat: '<span style="font-size:10px; color:white">{point.key}</span><table>',
      pointFormat: '<tr><td style="color:{series.color};padding:0"><b>{series.name}: </b></td>' +
        '<td style="padding:0; color:white"><b>{point.y} units</b></td></tr>',
      footerFormat: '</table>',
      shared: true,
      useHTML: true
    },
    plotOptions: {
      column: {
        pointPadding: 0.2,
        borderWidth: 0,
        stacking: 'normal'
      }
    },
    colors : ['#ff3d00', '#00e676', '#651fff','#9b9b9b', '#00e5ff'],
    series: [{
      name: 'Calorias',
      data: extractElement(props.data, 'Calories')
  
    }, 
    {
      name: 'Puntos Cardio',
      data: extractElement(props.data, 'Heart')
  
    }, 
    {
      name: 'Ritmo cardiaco',
      data: extractElement(props.data, 'Rate')
  
    }, 
    {
      name: 'Minutos de movimiento',
      data: extractElement(props.data, 'Move')
  
    }, 
    {
      name: 'Pasos',
      data: extractElement(props.data, 'Steps')
  
    }]
  }
  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
};

export default ChartComponent