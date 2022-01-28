import axios from 'axios';
const { setReloadCookie, hasReloadCookie } = require('./CookieManager.js');
const API_KEY = "AIzaSyCMvrNvyaRMm2CU8nOBi9P8UcAQ88fi4gk";
const dataValues = [
  {
    "title": "Calories",
    "type": "com.google.calories.expended"
  },
  {
    "title": "Heart",
    "type": "com.google.heart_minutes"
  },
  {
    "title": "Move",
    "type": "com.google.active_minutes"
  },
  {
    "title": "Steps",
    "type": "com.google.step_count.delta"
  },
  {
    "title": "Rate",
    "type": "com.google.heart_rate.bpm"  
  },
];
// We need to get aggregated data *on that particular day for now*

// Provide request headers to be attached with each function call
export const getRequestHeaders = (accessToken) => {
  const requestHeaderBody = {
    params: {
      'key': API_KEY
    },
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Accept': 'application/json'
    }
  }
  return requestHeaderBody;
}

export const getAggregatedDataBody = (dataType, endTime) => {
  const requestBody = {
    "aggregateBy": [{
      "dataTypeName": dataType
    }],
    "bucketByTime": {
      "durationMillis": 86400000
    },
    "endTimeMillis": endTime,
    "startTimeMillis": endTime - (7*86400000)
  }
  return requestBody;
}

export const getAggregateData = async (body, headers) => {
  const req = await axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', body, headers);
  return req;
}

// we need to return [{Today}, {Yesterday} .... {7 days back}]
// Each object has : {"Calories" : value, "Heart": value ... , "Date": }
const baseObj = {
  "Calories": 0,
  "Heart": 0,
  "Move": 0,
  "Steps": 0,
  "Rate": 0
};

export const getWeeklyData = async(endTime, requestParameters, callBack, initialState) => {
  let state = [];
  let promises = [];
  const hasCookie = hasReloadCookie();
  if (!hasCookie.present || initialState.length === 0) {
    for(var i=6; i>=0; i--) {
      var currTime = new Date(endTime - i*86400000);
      state.push({
        ...baseObj,
        "Date": currTime
      })
    }
    dataValues.forEach((element) => {
      let body = getAggregatedDataBody(element.type, endTime);
      promises.push(
        axios.post('https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', body, requestParameters)
          .then((resp) => {
            // now, each data bucket represents exactly one day
            for(let idx=0; idx<7; idx++) {
              //console.log(resp.data.bucket[idx].dataset[0].point);
              resp.data.bucket[idx].dataset[0].point.forEach((point) => {

                point.value.forEach((val) => {
                  //console.log(point);//(point) retorna todo el JSON de la solicitud
                  let extract = val['intVal'] || Math.ceil(val['fpVal']) || 0;
                  state[idx][element.title] += extract; 
                  
                  //console.log(extract.slice(-7));
                })
              })
            }
          }
        )
      )
    })
    Promise.all(promises).then(() => {
      callBack(state);
    })
    setReloadCookie();
  }
}