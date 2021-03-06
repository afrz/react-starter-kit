/** Immutability helper : update an element properties belonging to an array.
  @param array (array) : container array
  @param element (object) : object to update
  @param properties (hash object) : new properties
*/
export function replaceElement(array, element, properties) {

  //find index of current object
  const index = array.indexOf(element);
  //rebuild array using ES6 syntax
  return [
    ...array.slice(0, index),
    //current object is shallow copied with its new properties (immutability safe)
    Object.assign({}, element, properties),
    ...array.slice(index + 1)
  ];
}

/** Immutability helper : remove an element belonging to an array.
  @param array (array) : container array
  @param element (object) : object to remove
*/
export function removeElement(array, element) {

  //find index of current object
  const index = array.indexOf(element);
  //rebuild array using ES6 syntax
  return [
    ...array.slice(0, index),
    ...array.slice(index + 1)
  ];
}
