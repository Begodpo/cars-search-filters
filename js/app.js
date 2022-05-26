// Variables
const mark = document.querySelector("#marca");
const year = document.querySelector("#year");
const minimum = document.querySelector("#minimo");
const maximum = document.querySelector("#maximo");
const doors = document.querySelector("#puertas");
const transmission = document.querySelector("#transmision");
const color = document.querySelector("#color");
const result = document.querySelector("#resultado");

const max = new Date().getFullYear();
const min = max - 10;

const searchData = {
  marca: "",
  year: "",
  min: "",
  max: "",
  puertas: "",
  transmision: "",
  color: "",
};

// Listener
document.addEventListener("DOMContentLoaded", () => {
  showCars(cars);
  fillSelect();
});

mark.addEventListener("change", (e) => {
  searchData.marca = e.target.value;

  filterCar();
});
year.addEventListener("change", (e) => {
  searchData.year = parseInt(e.target.value);

  filterCar();
});
minimum.addEventListener("change", (e) => {
  searchData.min = e.target.value;

  filterCar();
});
maximum.addEventListener("change", (e) => {
  searchData.max = e.target.value;

  filterCar();
});
doors.addEventListener("change", (e) => {
  searchData.puertas = parseInt(e.target.value);

  filterCar();
});
transmission.addEventListener("change", (e) => {
  searchData.transmision = e.target.value;

  filterCar();
});
color.addEventListener("change", (e) => {
  searchData.color = e.target.value;
  //console.log(searchData);

  filterCar();
});

// Functions
function showCars(cars) {
  cleanHTML();

  cars.forEach((car) => {
    const { marca, modelo, year, puertas, transmision, precio, color } = car;
    const carHTML = document.createElement("p");

    carHTML.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmisión: ${transmision} - Precio: ${precio} - Color: ${color}
            `;

    result.appendChild(carHTML);
  });
}

function fillSelect() {
  for (let i = max; i > min; i--) {
    const option = document.createElement("option");
    option.value = i;
    option.textContent = i;
    year.appendChild(option);
  }
}

function cleanHTML() {
  while (result.firstChild) {
    result.removeChild(result.firstChild);
  }
}

function filterCar() {
  const result = cars
    .filter(filterMark)
    .filter(filterYear)
    .filter(filterMin)
    .filter(filterMax)
    .filter(filterDoors)
    .filter(filterTransmission)
    .filter(filterColor);

  if (result.length) {
    showCars(result);
  } else {
    noResults();
  }
}

function noResults() {
  cleanHTML();

  const noResults = document.createElement("div");
  noResults.classList.add("alerta", "error");
  noResults.textContent = "No hay resultados";
  result.appendChild(noResults);
}

function filterMark(car) {
  const { marca } = searchData;
  if (marca) {
    return car.marca === marca;
  }
  return car;
}

function filterYear(car) {
  const { year } = searchData;
  if (year) {
    return car.year === year;
  }
  return car;
}

function filterMin(car) {
  const { min } = searchData;
  if (min) {
    return car.precio >= min;
  }
  return car;
}

function filterMax(car) {
  const { max } = searchData;
  if (max) {
    return car.precio <= max;
  }
  return car;
}

function filterDoors(car) {
  const { puertas } = searchData;
  if (puertas) {
    return car.puertas === puertas;
  }
  return car;
}

function filterTransmission(car) {
  const { transmision } = searchData;
  if (transmision) {
    return car.transmision === transmision;
  }
  return car;
}

function filterColor(car) {
  const { color } = searchData;
  if (color) {
    return car.color === color;
  }
  return car;
}
