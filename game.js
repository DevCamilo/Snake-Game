	// DevCamilo
	// 1/03/2018
; (function () {
    // <----------------------------------------->
    // EN ESTA SECCION SE CREA TODO EL MOVIMIENTO
    // SEGUN LAS TECLAS QUE SEAN PRECIONADA
    // Y LA VELOCIDAD DEL MISMO
    // <----------------------------------------->
	
    window.addEventListener('keydown',function(event){
        if(event.keyCode > 36 && event.keyCode < 41) event.preventDefault() // EVITA QUE LAS FLECHAS MUEVAN LA PANTALLA
        if(event.keyCode === 37) return snake.left();
        if(event.keyCode === 39) return snake.right();
        if(event.keyCode === 40) return snake.down();
        if(event.keyCode === 38) return snake.up();
        return false;
    })
    const juego = setInterval(function(){
        snake.move(); // HACE QUE LA SERPIENTE SE MUEVA DE FORMA AUTOMATICA
        ctx.clearRect(0,0,canvas.width,canvas.height); // BORRA LA PARTE DE ATRAS PARA DAR LA ILUCION D EMOVIMIENTO 
        snake.drawSnake(); // REDIBUJA LA SERPIENTE EN LA NUEVA POSICION
        creatFood(); // CREA LA COMIDA EN EL MAPA
        // EVALUA EL FIN DEL JUEGO POR LA COLISION
        if(snake.dead()){
            window.clearInterval(juego);
            var div = document.getElementById("table");  
            div.textContent = 'FIN DEL JUEGO';
            /* const msg = new SpeechSynthesisUtterance('Fin del Juego Negrin'); // VOZ DE PUNTO
            window.speechSynthesis.speak(msg); // SUENA VOZ DE PUNTO */
        }
    },70);

    // <----------------------------------------->
    // ESTA SECCION SE ENCARGA DE GENERAR LOS 
    // INTERVALOS DE COMIDA EN EL MAPA Y TODO LO REFERENTE A ESTA
    // <----------------------------------------->
    setInterval(function(){
        const food = Food.generate();
        foods.push(food); // SE AGREGA LA COMIDA CREADA AL ARREGLO DE COMIDAS
        // ELIMINA LA COMIDA DESPUES DE UN DETERMIADO TIEMPO
        setTimeout(function(){
            removeFood(food)
        },4000)
    },1000)
	
})()
