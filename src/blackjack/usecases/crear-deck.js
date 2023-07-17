import _ from 'underscore';

//exportación independiente
//export const mensajePublico = 'Hola Mundo';
//exportación por default, se pone al final del archivo "export default crearDeck y creardeck no se coloca export al inicio;"

/**
 * Esta función crea un nuevo deck
 * @param { Array<String> } tiposDeCarta cualquierTexto
 * @param { Array<String> } tiposEspeciales cualquierTexto
 * @returns { Array<String> } regresa un nuevo deck de cartas
 */
export const crearDeck = ( tiposDeCarta, tiposEspeciales ) => {

  if ( !tiposDeCarta || tiposDeCarta.length == 0 ) { throw new Error('tiposDeCarta es obligatorio como un arreglo de string ') }
  if ( !tiposEspeciales || tiposEspeciales.length == 0 ) { throw new Error('tiposEspeciales es obligatorio como un arreglo de string ') }

  let deck = [];

  for ( let index = 2; index <= 10; index++ ) {
    for ( let tipo of tiposDeCarta ) {
      deck.push( `${index}${tipo}` );
    }
  }

  for ( let tipo of tiposDeCarta ) {
    for ( let especial of tiposEspeciales ) {
      deck.push( `${especial}${tipo}` )
    }  
  }
  return _.shuffle( deck );
}

// export default crearDeck;