const url = "https://wagon-garage-api.herokuapp.com/chez-beber/cars";

const carsList = document.querySelector(`.cars-list`);

const displayCar = (car) => {
  const carTemplate = `
    <div class="car">
      <div class="car-image">
        <img src="http://loremflickr.com/280/280/${car.brand}${car.model}" />
      </div>
      <div class="car-info">
        <h4>${car.brand} ${car.model}</h4>
        <p><strong>Owner:</strong> ${car.owner}</p>
        <p><strong>Plate:</strong> ${car.plate}</p>
      </div>
    </div>
  `;
  carsList.insertAdjacentHTML("beforeend", carTemplate);
};

const postCar = (car) => {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(car)
  })
  .then(response => response.json())
  .then(data => displayCar(data))
};

// On va récuperer sur l'API les éléments voitures
// On fait un Fetch et on itère sur le résultat
// on va interpoler les valeurs de chaque voiture dans les élements de l'HTML
// on va inserer dans le doc 

fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(car => displayCar(car));
  });

  
// On veut sélectionner un formulaire 
// On veut add le addEventListener on sait que c'est du submit 
// On veut connaitre les inputs (valeur)
// On va vouloir faire un post (pas oublier les headers/body)
// On veut l'afficher

const carForm = document.querySelector('.car-form');

carForm.addEventListener('submit', (event) => {
  event.preventDefault();

  const inputBrand = document.querySelector('input[name="brand"]');
  const inputModel = document.querySelector('input[name="model"]');
  const inputPlate = document.querySelector('input[name="plate"]');
  const inputOwner = document.querySelector('input[name="owner"]');

  const car = {
    brand: inputBrand.value,
    model: inputModel.value,
    plate: inputPlate.value, 
    owner: inputOwner.value
  }

  postCar(car);
});

