// Define a car object constructor
class Car {
    constructor(brand, model, year) {
        this.brand = brand;
        this.model = model;
        this.year = year;
    }
}

// Define a function to merge two car objects
function mergeCars(car1, car2) {
  // Create a new object to hold the merged properties
  const mergedCar = {};

  // Copy properties from both car1 and car2, giving preference to car2 for duplicates
  for (const key in car1) {
    mergedCar[key] = car1[key];
  }
  for (const key in car2) {
    mergedCar[key] = car2[key];
  }

  // Return a new Car object with the merged properties
  return new Car(mergedCar.brand, mergedCar.model, mergedCar.year);
}

const car1 = new Car("Toyota", "Camry", 2020);
const car2 = new Car("Honda", "Accord", 2023);

const mergedCar = mergeCars(car1, car2);

console.log(mergedCar);