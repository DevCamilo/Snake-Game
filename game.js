// DevCamilo
// 22/02/2018
; (function () {
    // GENERA ALEATORIAMENTE PUNTOS EN EL MAPA
    class Random {
        static get(start, finish){
            return Math.floor(Math.random() * finish) + start;
        }
    }
    class Food {
        // NOS DICE EN QUE CORDENADA VAMOS A PONER LA COMIDA
        constructor(x,y){
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 10;
        }
        static generate(){
            return new Food(Random.get(0,490),Random.get(0,290));
        }
        // DIBUJA LA COMIDA
        drawFood(){
            ctx.fillRect(this.x,this.y,this.width,this.height);
        }
    }
    // CREA LA COMIDA EN EL MAPA Y LA GUARDA EN UN ARREGLO
    function creatFood(){
        for(const index in foods){
            const food = foods[index];
            if(typeof food !== 'undefined'){
                food.drawFood();
                 // VALIDA LA COLISION
                if(hit(food,snake.head)){
                    snake.eat();
                    removeFood(food);
                }
            }
        }
    }
    //ELIMINA LA COMIDA
    function removeFood(food){
        foods = foods.filter(function(f){
            return food !== f;
        })
    }
    // <----------------------------------------->
    // ESTA PARTE CREA LA CABEZA DEL SNAKE
    // LA QUE SERÁ LA PARTE QUE SE MOVERÁ
    // <----------------------------------------->
    class Square {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.width = 10;
            this.height = 10;
            this.back = null; // CUADRADO DE ATRAS
        }
        // DIBUJA LOS CUADRADOS
        drawSquare() {
            ctx.fillRect(this.x,this.y,this.width,this.height);
            if(this.hasBack()){
             this.back.drawSquare();   
            }
        }
        // CREA NUEVOS CUADRADOS QUE VAN EN LA PARTE DE ATRAS DEL PRIMERO
        addSquare(){
            if(this.hasBack()) return this.back.addSquare();
            this.back = new Square(this.x, this.y);
        }
        // COMPRUEBA SI HAY CUADRADOS ATRAS DE EL
        hasBack(){
            return this.back !== null;
        }
        // SIGUE LA DIRECCION DLE CUADRADO DE ADELANTE
        copy(){
            if(this.hasBack()){
                this.back.copy();
                this.back.x = this.x;
                this.back.y = this.y;
            }
        }
        right(){
            this.copy();
            this.x += 10;
        }
        left(){
            this.copy();
            this.x -= 10;
        }
        up(){
            this.copy();
            this.y -= 10;
        }
        down(){
            this.copy();
            this.y += 10;
        }
        // EVALUA UNA COLICON ENTRE CUADRADOS DEL SNAKE
        hit(head,second=false){
            // ESTO VALIDA QUE NO ES POSIBLE HACER UNA COLISION
            if(this === head && !this.hasBack()) return false;
            // ESTO VALIDA QUE SI ES POSIBLE UNA COLISION
            if(this === head) return this.back.hit(head, true);
            // ESTO EVALUA QUE NO ES POSIBLE UNA COLICOIN CON EL SUGUNDO CUADRADO DEL SNAKE
            if(second && !this.hasBack()) return false;
            // ESTO EVALUA QUE SI ES POSIBLE UNA COLICOIN CON EL SUGUNDO CUADRADO DEL SNAKE
            if(second) return this.back.hit(head);
            // <----------------------------------------->
            // NO ES NI LA CABEZA NI EL SEGUNDO
            // <----------------------------------------->
            if(this.hasBack()) return squareHit(this,head) || this.back.hit(head);          
            // <----------------------------------------->
            // NO ES NI LA CABEZA NI EL SEGUNDO POR QUE ES EL ULTIMO
            // <----------------------------------------->
            return squareHit(this,head);
        }
        // EVALUA UNA COLICION ENTRE EL SNAKE Y EL BORDE
        hitBorder(){
            // DELIMITAMOS TODO EL AREA DEL MAPA
            return this.x > 490 || this.x < 0 || this.y > 290 || this.y < 0;
        }
    }
    // <----------------------------------------->
    // CREAMOS LA CLASE SNAKE CON SUS MOVIMIENTOS
    // Y EN ELLA UTILIZAMOS LA CLASE SQUARE 
    // PARA DIBUJAR LA BEZA
    // <----------------------------------------->
    class Snake {
        constructor() {
            this.head = new Square(250, 290); // SE DECLARA UNA SNAKE EN UNA POSICION ESPECIFICA DEL MAPA
            this.drawSnake(); // LLAMA A LA FUNCION QUE DIBUJA AL SNAKE
            this.direction = 'up'; // ES LA DIRECCION DE ORIGEN CON LA QUE SE INICIARÁ EL JUEGO
            this.head.addSquare(); // AÑADE MAS CUADRADOS AL SNAKE
        }
        // DIBUJA LA CABEZA DE LA SERPIENTE
        drawSnake() {
            let lol = colorAleatorio();
            ctx.fillStyle = lol;
            this.head.drawSquare();
        }
        right(){
            if(this.direction === 'left') return
            this.direction = 'right';
        }
        left(){
            if(this.direction === 'right') return
            this.direction = 'left';
        }
        up(){
            if(this.direction === 'down') return
            this.direction = 'up';
        }
        down(){
            if(this.direction === 'up') return
            this.direction = 'down';
        }
        // SEGUN EL ESTADO DE LA DIRECCION LLAMA AL METODO DEL SQUARE
        move(){
            if(this.direction === 'right') return this.head.right();
            if(this.direction === 'left') return this.head.left();
            if(this.direction === 'up') return this.head.up();
            if(this.direction === 'down') return this.head.down();
        }
        // SOLO SIGNIFICA QUE LA CABEZA VA HA AGREGAR UN NUEVO ELEMENTO
        eat(){
            /* const msg = new SpeechSynthesisUtterance('Puntaco Papuh'); // VOZ DE PUNTO
            window.speechSynthesis.speak(msg); // SUENA VOZ DE PUNTO */
            ponits = ponits + 1; // SUMA UN PUNTO CADA VES QUE SE COME
            this.head.addSquare();
            var div = document.getElementById("table");  
            div.textContent = 'Puntos: ' + ponits;    
        }
        // NOS MUSTRA SI EL SNAKE ESTA VIVO O NO SEGUN UNA COLISION CON SI MISMO
        dead(){
            return  this.head.hit(this.head) || // CHOCA CON SIGO MIMSO
            this.head.hitBorder(); // CHOCA CON LOS BORDES
        }
    }



    // <----------------------------------------->
    // DECLARAMOS LAS CONSTANTES A SER UTILIZADAS 
    // DENTRO DE LAS CLASES DE SNAKE Y SQUARE
    // <----------------------------------------->
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const snake = new Snake(); // CREA LA SERPIENTE
    let foods = []; // GUARDA EL HISTORIAL DE COMIDAS
    let ponits = 0; // REGISTRA LOS PUNTOS QUE VAMOS OBTENIENDO



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



    // <----------------------------------------->
    // ESTA PARTE GESTIONA TODO EL SISTEMA DE COLISION
    // ES LA PARTE MÁS LARGA Y TEDIOSA DE TODAS
    // <----------------------------------------->
    function hit(a,b){
        var hit = false;
        // COLISIONES HORIZONTALES
        if(b.x + b.width >= a.x && b.x < a.x + a.width){
            // COLSIONES VERTICALES
            if(b.y + b.height >= a.y && b.y < a.y + a.height){
                hit=true;
            }
        }
        // COLISION DE a CON b
        if(b.x <= a.x && b.x + b.width >= a.x + a.width){
            if(b.y <= a.y && b.y + b.height >= a.y + a.height){
                hit=true;
            }
        } 
        // COLISION DE b CON a
        if(a.x <=b.x && a.x + a.width >= b.x + b.width){
            if(a.y <= b.y && a.y + a.height >= b.y + b.height){
                hit = true;
            }
        }
        return hit;
    }
    function squareHit(squere_1,squere_2){
        // VALIDA LA UBICACION DE AMBOS CUADRADOS UNO CON RESPECTO DEL OTRO
        return squere_1.x == squere_2.x && squere_1.y == squere_2.y
    }


    // <----------------------------------------->
    // GENERA TANTO COMO UN NUMERO ALEATORIO
    // PARA LUEGO CREAR UN COLOR ALEATORIO
    // <----------------------------------------->
    function numeroAleatorio(superior, inferior){ 
        var numPosibilidades = (superior + 1) - inferior; 
        var aleat = Math.random() * numPosibilidades; 
        aleat = Math.floor(aleat); 
        aleat = (inferior + aleat); 
        return aleat 
     } 
     function colorAleatorio(){ 
        color_aleat="#" 
        hexadecimal = new Array("0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F") 
        var inferior = 0; 
        var superior = hexadecimal.length-1; 
        for (i=0;i<6;i++){ 
           color_aleat += hexadecimal[numeroAleatorio(superior, inferior)]; 
        } 
        return color_aleat 
     }
})()
