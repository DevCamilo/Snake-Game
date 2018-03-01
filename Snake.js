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
	
	// CREA LA SERPIENTE
	const snake = new Snake(); 
	
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