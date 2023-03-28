const storageItems = JSON.parse(localStorage.getItem('cities'));
let div_cities = document.getElementById('list__cities');
let message = document.getElementById('message');

const cities_elements = storageItems.map((city) => {  
    return `→ ${city.name} `;
}).join("\n");

// div_cities.innerHTML = cities_elements;
message.value = cities_elements;



