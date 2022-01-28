export const extractElement = (data, element) => {
    return data.map((idx) => {
        //console.log(idx.Calories,idx.Heart);
        

        /*[idx.Calories].forEach( function(valor, idx, array) {
            console.log("En el índice " + [idx] + " hay este valor: " + valor);
        });*/
        
            /*[idx.Calories].forEach( function(valor, idx, array) {
                let i=0; 
                while(i<7){
                console.log("En el índice " + idx + " hay este valor: " + valor);
                i++;
                }
            });*/
            
       /* for(let i=0;i<7; i++){
            console.log(idx.Calories);
            i++;
        }*/
       

        
        
        return idx[element];
    })
}
//
export const extractDate = (data) => {
    return data.map((idx) => {
        //console.log(idx.Date);
        var ritmoDia= ([data[6].Rate])/3;
        //console.log(([data[0].Rate])/3); 6=dia mas actual 0=dia mas antiguo

        localStorage.setItem("CaloriaDia",[data[6].Calories]);
        localStorage.setItem("RitmoDia",Math.round(ritmoDia));
        localStorage.setItem("PuntosCardio",[data[6].Heart]);
        localStorage.setItem("MinMovimiento",[data[6].Move]);
        localStorage.setItem("Pasos",[data[6].Steps]);
        localStorage.setItem("Fecha",[data[6].Date]);

        

        var x = `${idx.Date.getDate()}-${(idx.Date.getMonth()+1)}-${idx.Date.getFullYear()}`;

        localStorage.setItem("dia",idx.Date.getDate());
        localStorage.setItem("año",idx.Date.getFullYear());
        localStorage.setItem("mes",(idx.Date.getMonth())+1);
        
        
        return x;
    })
}