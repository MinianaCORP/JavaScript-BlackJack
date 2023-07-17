// import { shuffle } from 'underscore'; //Específicamente un método
import _ from 'underscore'; //Importamos todo en una variable "_"
import { crearDeck, pedirCarta, valorCarta } from './usecases'

//Para importar modulos por defecto se coloca ---- import crearDeck from './usecases/crear-deck';
//Los import pueden tener alias import { crearDeck as alias } from 'ruta' y lo invocamos con el alias en vez del modulo

// console.log({ mensajePublico }); //Sin alias
// console.log({ otroNombre });

/*
* 2C = Two of Clubs (Tréboles)
* 2D = Two of Diamonds (Tréboles)
* 2H = Two of Hearts (Tréboles)
* 2S = Two of Spades (Tréboles)
*/

const miModulo = (() => {
  'use strict'; //Siempre habilita, esto escanea nuestro código para evitar problemas "invisibles"

  let deck = [];
  const   tipos = [ 'C', 'D', 'H', 'S' ],
          especiales = [ 'A', 'J', 'Q', 'K' ];

  let puntosJugadores = [];

  const   btnPedir = document.querySelector('#btnPedir'),
          btnDetener = document.querySelector('#btnDetener'),
          btnNuevo = document.querySelector('#btnNuevo');

  const   divCartasJugadores = document.querySelectorAll('.divCartas'),
          puntosHTML = document.querySelectorAll('small');


  const inicializarJuego = ( numeroJugadores = 2 ) => {
    deck = crearDeck( tipos, especiales );
    
    puntosJugadores = [];
    for (let index = 0; index < numeroJugadores; index++) {
      puntosJugadores.push(0);
    }

    puntosHTML.forEach( item => item.innerText = 0 );
    divCartasJugadores.forEach( item => item.innerText = '' );

    btnPedir.disabled = false;
    btnDetener.disabled = false;
  }

  const acumularPuntos = ( carta, turno ) => {
    puntosJugadores[turno] += valorCarta( carta );
    puntosHTML[turno].innerText = puntosJugadores[turno];

    return puntosJugadores[turno];
  }

  const crearCarta = ( carta, turno ) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = ` assets/cartas/${ carta }.png `;
    imgCarta.classList.add('carta');
    divCartasJugadores[turno].append( imgCarta );
  }

  const determinarGanador = (  ) => {

    const [ puntos, puntosComputadora ] = puntosJugadores; 

    setTimeout(() => {
      if ( puntosComputadora === puntos ) {
        alert('Nadie gana');
      } else if ( puntos > 21 ) {
        alert('Computadora gana');
      } else if ( puntosComputadora > 21 ) {
        alert('Jugador gana');
      } else {
        alert('Computadora gana')
      }
    }, 100);
  }

  const turnoComputadora = ( puntosMinimos ) => {
    
    let puntosComputadora = 0;

    do {
      const carta = pedirCarta( deck );

      puntosComputadora = acumularPuntos( carta, puntosJugadores.length - 1 );
      crearCarta( carta, puntosJugadores.length - 1 );

      if ( puntosMinimos > 21 ) {
        break;
      }


    } while ( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    determinarGanador();
  }



  btnNuevo.addEventListener('click', () => {
    inicializarJuego();
  });

  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta( deck );
    const puntosJugador = acumularPuntos( carta, 0 );

    crearCarta( carta, 0 );

    if ( puntosJugador > 21 ) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora( puntosJugador );

    } else if ( puntosJugador === 21 ) {
      console.warn('21');
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputadora( puntosJugador );
    }

  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;

    turnoComputadora( puntosJugadores[0] );
  });

  
  return {
    nuevoJuego: inicializarJuego
  }
})();

  