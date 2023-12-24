function findUniqueElements(arr) {
  let uniqueObject = {};
  let uniqueArray = [];

  for (let i = 0; i < arr.length; i++) {
    let element = arr[i];

    if (!uniqueObject.hasOwnProperty(element)) {
      uniqueObject[element] = true;
      uniqueArray.push(element);
    }
  }

  return uniqueArray;
}

let inputArray = [1, 2, 3, 4, 2, 3, 5];
let resultArray = findUniqueElements(inputArray);
console.log(resultArray);