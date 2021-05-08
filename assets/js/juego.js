/*
Clubs -Treboles   -  C
Hearts- Corazones  - H
Diamonds - Diamantes - D
Picas - Spades - S
*/

let deck=[];
const tipos = ['C','D','H','S'];
const especiales = ['A','J','Q','K'];


let puntosJugador = 0,
    puntosComputadora = 0;
// REFERENCIAS HTML
const btnPedir = document.querySelector('#btnPedir')
const btnDetener = document.querySelector('#btnDetener')
const btnNuevo = document.querySelector('#btnNuevo')

const divCartasJugador = document.querySelector('#jugador-cartas')
const divCartasComputadora = document.querySelector('#computadora-cartas')
const puntosHTML = document.querySelectorAll('small')
//Esta funcion crea una nueva baraja
const crearDeck = () => {
    
    for( let i = 2; i <= 10; i++ ) {
        for( let tipo of tipos ) {
            deck.push( i + tipo );
        }
    }

    for( let tipo of tipos ) {
        for( let esp of especiales ) {
            deck.push(esp + tipo);
        }
    }
    //console.log( deck );
    deck = _.shuffle(deck);
    //console.log( deck );
    return deck;
}
crearDeck()

//Esta función permite pedir una carta
const pedirCarta = () =>{
    if (deck.length === 0){
        throw 'No quedan cartas en el deck'
    }
    const carta = deck.pop();

    //console.log(deck);
    //console.log(carta);
    return carta;
}
pedirCarta()

//VALOR CARTA
const valorCarta = ( carta) =>{
    const valor = carta.substring(0, carta.length - 1);
//    //let puntos = 0;
//    //2 = 2 10 = 10 3 =3 ...
//    if ( isNaN( valor) ) { //Retorna true o false Is Not A Number
//        puntos = (valor === 'A') ? 11 : 10;
//    }
//    else{
//        puntos = valor * 1;  //al multiplicarlo por uno pasa de string a int .... XD
//    }
//    console.log(puntos) //  ESTA ES LA MANERA MÁS PARECIDA A PYTHON DEBAJO LA DE JS (TERNARIOS)
    return (isNaN(valor)) ?
            (valor === 'A') ? 11 : 10
            : valor * 1;

}
//Turno CPU

const turnoComputadora = (puntosMinimos) =>{
    
    do{
        const carta = pedirCarta();
        puntosComputadora =puntosComputadora + valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora; 
        
        const imgCarta = document.createElement ('img');
        imgCarta.src = `assets/cartas/${carta}.png`  //apostrofes para insertar código de JS
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);

        if (puntosMinimos > 21){
            break;
        }
        
    } while(( puntosComputadora < puntosMinimos) && (puntosMinimos <= 21));
    setTimeout(() => {
    if (puntosComputadora=== puntosMinimos){
        alert('Nadie gana :(');
    }
    else if (puntosMinimos > 21){
        alert ('Computadora gana')
    }
    else if (puntosComputadora > 21){
        alert('Jugador gana')
    }
    else{
        alert ('Computadora gana')
    }
    }, 10);
}

//Eventos

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    puntosJugador =puntosJugador + valorCarta(carta);
    puntosHTML[0].innerText = puntosJugador; //el 0 es por el primer small, el 1 sería el de la máquina
    
    const imgCarta = document.createElement ('img');
    imgCarta.src = `assets/cartas/${carta}.png`  //apostrofes para insertar código de JS
    imgCarta.classList.add('carta');
    divCartasJugador.append(imgCarta)

    if (puntosJugador > 21) {
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora( puntosJugador );

    }
    else if (puntosJugador === 21){
        btnPedir.disabled = true;
        btnDetener.disabled = true;
        turnoComputadora(puntosJugador);

    }

});

btnDetener.addEventListener('click', () =>{
    btnDetener.disabled =true ;
    btnPedir.disabled = true ;
    turnoComputadora( puntosJugador );

});

btnNuevo.addEventListener('click', () => {

    console.clear();
    deck = []
    deck =crearDeck();

    btnDetener.disabled =false ;
    btnPedir.disabled = false ;
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    divCartasComputadora.innerHTML = '';
    divCartasJugador.innerHTML = ''

});
