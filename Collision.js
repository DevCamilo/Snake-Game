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
