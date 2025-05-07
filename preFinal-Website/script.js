const apiUrl = 'https://6810f37b27f2fdac241374ae.mockapi.io/PlantWold';

const form = document.getElementById('plantForm');
const message = document.getElementById('formMessage');
const searchInput = document.getElementById('searchInput');
const resultsDiv = document.getElementById('results');

async function fetchPlants() {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
}

function displayNotFound(query) {
  resultsDiv.innerHTML = `<p>We have not included information about this plant yet :)</p>`;
}

searchInput.addEventListener('input', async () => {
  const query = searchInput.value.trim().toLowerCase();
  if (query === '') {
    resultsDiv.innerHTML = '';
    return;
  }

  const plants = await fetchPlants();
  const matchedPlant = plants.find(p => p.name.toLowerCase() === query);

  if (matchedPlant) {
    displayPlant(matchedPlant);
  } else {
    displayNotFound(query);
  }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    const newPlant = {
      name: document.getElementById('name').value.trim(),
      generalInfo: document.getElementById('generalInfo').value.trim(),
      careInstructions: document.getElementById('careInstructions').value.trim(),
      imageUrl: document.getElementById('imageUrl').value.trim()
    };
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPlant)
      });
  
      if (response.ok) {
        message.textContent = 'Plant added successfully!';
        form.reset();
      } else {
        message.textContent = 'Failed to add plant.';
      }
    } catch (error) {
      message.textContent = 'Error sending data to server.';
    }
  });
  
  function displayPlant(plant) {
    resultsDiv.innerHTML = `
      <div class="plant-info">
        <h2>${plant.name}</h2>
        <img src="${plant.imageUrl}" alt="${plant.name}" class="plant-image"/>
        <p><strong>General Info:</strong> ${plant.generalInfo}</p>
        <p><strong>Care Instructions:</strong> ${plant.careInstructions}</p>
      </div>
    `;
  }
  