	// <----------------------------------------->
    // DECLARAMOS LAS CONSTANTES A SER UTILIZADAS 
    // DENTRO DE LAS CLASES DE SNAKE Y SQUARE
    // <----------------------------------------->
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    let foods = []; // GUARDA EL HISTORIAL DE COMIDAS
    let ponits = 0; // REGISTRA LOS PUNTOS QUE VAMOS OBTENIENDO
    
	
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