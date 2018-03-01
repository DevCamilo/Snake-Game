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
