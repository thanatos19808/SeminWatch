
import React from "react";


//Post datos 7 dias atrás 
//Los datos vienen de CardRowComponent en un LocalStorage
async function postDatosSemana(){
    //console.log(localStorage.getItem("Calorias"))
    try {
        let result = await fetch('https://semindigital.com:8090/api/v1/paciente/watch',{
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Authorization':'Token 2ece51f9b5935a1373f0cdc8606811d36aa7e12e'
            },
            body: JSON.stringify({
                tipo: 'SEMANA',
                fecha: '2021-12-25',
                promCardiaco: localStorage.getItem("Ritmo"),
                puntosCardio: localStorage.getItem("PuntosCardio"),
                minutosMovimiento: localStorage.getItem("Movimiento"),
                pasos: localStorage.getItem("Pasos"),
                calorias: localStorage.getItem("Calorias"),
                Paciente: 13 
            })
        });
        console.log('Result: '+ JSON.stringify(result) )
    }
    catch(e){
        console.log(e)
    }
}

async function postDatosDiario (){

    try {
        let result = await fetch('https://semindigital.com:8090/api/v1/paciente/watch',{
            method: 'POST',
            headers: {  
                'Content-Type': 'application/json',
                'Authorization':'Token 2ece51f9b5935a1373f0cdc8606811d36aa7e12e'
            },
            body: JSON.stringify({
                tipo: 'DIA',
                fecha: localStorage.getItem("año")+'-'+localStorage.getItem("mes")+'-' + localStorage.getItem("dia"),
                promCardiaco: localStorage.getItem("RitmoDia"),
                puntosCardio: localStorage.getItem("PuntosCardio"),
                minutosMovimiento: localStorage.getItem("MinMovimiento"),
                pasos: localStorage.getItem("Pasos"),
                calorias: localStorage.getItem("CaloriaDia"),
                Paciente: 13 
            })
        });
        console.log('Result: '+ JSON.stringify(result) )
    }
    catch(e){
        console.log(e)
    }
}

const Boton =() =>{

    const sincronizar = ()=>{ 
        postDatosSemana();
        postDatosDiario();
    }
    return(
 
            <div className="text-center justify-content-center">
                <button className="btn btn-success col-lg-6 col-md-6 col-sm-6 col-xs-12" type="submit" onClick={()=>{sincronizar()}}>
                Sincronizar
                </button>
            </div>
   
    )
}

export default Boton 