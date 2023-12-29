// This function creates and returns a car card element
function createCarCard(car) {
    const colDiv = document.createElement('div');
    colDiv.classList.add('col-md-4');
  
    const cardDiv = document.createElement('div');
    cardDiv.classList.add('card', 'mb-4', 'shadow-sm');
    cardDiv.setAttribute('data-id', car.id); // Set a data attribute with the car's ID
  
    const img = document.createElement('img');
    img.src = car.images[0];
    img.classList.add('card-img-top');
    img.alt = `${car.make} ${car.model}`;
  
    const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
  
    const cardTitle = document.createElement('h5');
    cardTitle.classList.add('card-title');
    cardTitle.textContent = `${car.make} ${car.model}`;
  
    const cardText = document.createElement('p');
    cardText.classList.add('card-text');
    cardText.textContent = car.description;
  
    const ul = document.createElement('ul');
    ul.classList.add('list-unstyled', 'mt-3', 'mb-4');
  
    // Dynamically create list items from the car object and append to 'ul'
    const details = ['year', 'mileage', 'fuelType', 'transmission', 'price'];
    details.forEach(detail => {
      const li = document.createElement('li');
      li.textContent = `${detail.charAt(0).toUpperCase() + detail.slice(1)}: ${car[detail]}`;
      ul.appendChild(li);
    });
  
    // Append elements to the card body
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    cardBody.appendChild(ul);
  
    // Append the image and card body to the card
    cardDiv.appendChild(img);
    cardDiv.appendChild(cardBody);
  
    // Append the card to the column div
    colDiv.appendChild(cardDiv);
  
    // Add a click event listener to the card
    cardDiv.addEventListener('click', () => {
      openCarModal(car);
    });
  
    return colDiv; // Return the column div with the card inside
  }
  
  // Function to open the modal window with the selected car's details
  function openCarModal(car) {
    // Set the title of the modal
    const carModalLabel = document.getElementById('carModalLabel');
    carModalLabel.textContent = `${car.make} ${car.model}`;
  
    // Clear previous content of the modal body
    const modalBody = document.querySelector('#carModal .modal-body');
    modalBody.innerHTML = '';
  
    // Add all car images to the modal body
    car.images.forEach(imageSrc => {
      const img = document.createElement('img');
      img.src = imageSrc;
      img.classList.add('img-fluid');
      img.style.marginBottom = '1rem';
      modalBody.appendChild(img);
    });
  
    // Use Bootstrap's jQuery method to show the modal
    $('#carModal').modal('show');
  }
  
  // Fetch and render car cards from the cars.json file
  document.addEventListener('DOMContentLoaded', function() {
    fetch('cars.json')
      .then(response => response.json())
      .then(carsArray => {
        const row = document.querySelector('.cars .row');
        carsArray.forEach(car => {
          const carCard = createCarCard(car);
          row.appendChild(carCard); // Append the car card to the row
        });
      })
      .catch(error => console.error('Error loading car data:', error));
  });