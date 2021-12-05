const alphabet = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];




/**
 * Randomly rearrange the members of any array
 * @param {array} inputArray an array
 * @retun the input array with its members randomly rearranged
 */
function shuffleArray(inputArray) {

    const holdingPile = inputArray.splice(0,inputArray.length);
    let index;
    while (holdingPile.length > 0) {
        index = Math.floor(Math.random() * holdingPile.length);
        inputArray.push(...holdingPile.splice(index,1));
    }
    return inputArray;
}

export {
    alphabet,
    shuffleArray
}