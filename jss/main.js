// main.js

function crearCard(propiedad) {
  const { titulo, descripcion, direccion, habitaciones, banos, precio, imagen, smoke, pets } = propiedad;
  const smokeHtml = smoke ? `<p class="text-success"><i class="fas fa-smoking"></i> Permitido fumar</p>` : `<p class="text-danger"><i class="fas fa-smoking-ban"></i> No se permite fumar</p>`;
  const petsHtml = pets ? `<p class="text-success"><i class="fas fa-paw"></i> Mascotas permitidas</p>` : `<p class="text-danger"><i class="fa-solid fa-ban"></i> No se permiten mascotas</p>`;
  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${imagen}" class="card-img-top" alt="Imagen de ${titulo}" onerror="this.src='https://via.placeholder.com/700x400?text=Imagen+no+disponible'">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text">${descripcion}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${direccion}</p>
          <p><i class="fas fa-bed"></i> ${habitaciones} Habitaciones | <i class="fas fa-bath"></i> ${banos} Baños</p>
          <p><i class="fas fa-dollar-sign"></i> ${precio}</p>
          <div class="mt-auto">
            ${smokeHtml}
            ${petsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderizarPropiedadesEn(containerId, arrayProp) {
  console.log('renderizarPropiedadesEn llamado para', containerId, 'con', arrayProp && arrayProp.length, 'items');
  const contenedor = document.getElementById(containerId);
  if (!contenedor) { console.error(`No existe el contenedor con id "${containerId}"`); return; }
  contenedor.innerHTML = '';
  const fragment = document.createDocumentFragment();
  arrayProp.forEach(prop => {
    const temp = document.createElement('div');
    temp.innerHTML = crearCard(prop);
    while (temp.firstChild) fragment.appendChild(temp.firstChild);
  });
  contenedor.appendChild(fragment);
}

/**
 * Crea el HTML de una card a partir de un objeto propiedad.
 * Devuelve string con el markup (Bootstrap card).
 */

function crearCard(propiedad) {
  const { titulo, descripcion, direccion, habitaciones, banos, precio, imagen, smoke, pets } = propiedad;

  // iconos condicionales para smoke/pets
  const smokeHtml = smoke
    ? `<p class="text-success"><i class="fas fa-smoking"></i> Permitido fumar</p>`
    : `<p class="text-danger"><i class="fas fa-smoking-ban"></i> No se permite fumar</p>`;

  const petsHtml = pets
    ? `<p class="text-success"><i class="fas fa-paw"></i> Mascotas permitidas</p>`
    : `<p class="text-danger"><i class="fa-solid fa-ban"></i> No se permiten mascotas</p>`;

  return `
    <div class="col-md-4 mb-4">
      <div class="card h-100">
        <img src="${imagen}" class="card-img-top" alt="Imagen de ${titulo}" onerror="this.src='https://via.placeholder.com/700x400?text=Imagen+no+disponible'">
        <div class="card-body d-flex flex-column">
          <h5 class="card-title">${titulo}</h5>
          <p class="card-text">${descripcion}</p>
          <p><i class="fas fa-map-marker-alt"></i> ${direccion}</p>
          <p><i class="fas fa-bed"></i> ${habitaciones} Habitaciones | <i class="fas fa-bath"></i> ${banos} Baños</p>
          <p><i class="fas fa-dollar-sign"></i> ${precio}</p>
          <div class="mt-auto">
            ${smokeHtml}
            ${petsHtml}
          </div>
        </div>
      </div>
    </div>
  `;
}

/**
 * Renders en el contenedor con id = containerId las propiedades pasadas en arrayProp.
 * Vacía primero el contenedor y lo rellena con las cards (cada 3 cols es row en Boostrap, 
 * pero dejamos que las cards estén dentro de un row que el HTML debe contener).
 */
function renderizarPropiedadesEn(containerId, arrayProp) {
  const contenedor = document.getElementById(containerId);
  if (!contenedor) {
    console.error(`No existe el contenedor con id "${containerId}"`);
    return;
  }

  // limpia
  contenedor.innerHTML = '';

  // genera markup
  const fragment = document.createDocumentFragment();
  // Como usamos Bootstrap grid, insertamos strings dentro de un wrapper temporal
  arrayProp.forEach(prop => {
    // crear elemento temporal y asignar innerHTML de la card
    const temp = document.createElement('div');
    temp.innerHTML = crearCard(prop);
    // temp puede contener múltiples nodes (col-md-4)
    // appendarlos uno por uno
    while (temp.firstChild) {
      fragment.appendChild(temp.firstChild);
    }
  });

  contenedor.appendChild(fragment);
}

// Si quieres que main.js haga el render al cargar, descomenta lo siguiente:
// document.addEventListener('DOMContentLoaded', () => {
//   renderizarPropiedadesEn('contenedor-venta', propiedadesVenta.slice(0, 3));
//   renderizarPropiedadesEn('contenedor-alquiler', propiedadesAlquiler.slice(0, 3));
// });
