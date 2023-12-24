function findCommonElements(array1, array2) {
  let commonElements = [];
  let seenElements = {};

  // Iterate through each element in both arrays
  for (let i = 0; i < array1.length || i < array2.length; i++) {
    if (i < array1.length) {
      let elementA = array1[i];
      seenElements[elementA] === 1 ? commonElements.push(elementA) : seenElements[elementA] = 1;
    }

    if (i < array2.length) {
      let elementB = array2[i];
      seenElements[elementB] === 1 ? commonElements.push(elementB) : seenElements[elementB] = 1;
    }
  }

  return commonElements;
}

let arrayA = [1, 2, 3, 4, 5];
let arrayB = [3, 4, 5, 6, 7];

let commonElementsArray = findCommonElements(arrayA, arrayB);
console.log(commonElementsArray);