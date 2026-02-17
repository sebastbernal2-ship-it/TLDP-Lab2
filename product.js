// ==========================================
// COFFEE SHOP PRODUCTS PAGE - STUDENT LAB
// ==========================================

let allCoffees = [];

// Local data because the API is failing
const sampleCoffees = [
  {
    id: 1,
    title: 'Espresso',
    description:
      'Intense single shot of our house-roasted espresso. Bold flavor with velvety crema.',
    ingredients: ['espresso'],
    image: 'images/espresso.jpg'
  },
  {
    id: 2,
    title: 'Latte',
    description:
      'Smooth espresso with steamed milk and light foam. Perfect balance of strength and creaminess.',
    ingredients: ['espresso', 'milk'],
    image: 'images/latte.jpg'
  },
  {
    id: 3,
    title: 'Hot Chocolate',
    description:
      'Rich, velvety cocoa made with premium chocolate and steamed milk. Warm indulgence without coffee.',
    ingredients: ['cocoa', 'milk', 'whipped cream'],
    image: 'images/hot-chocolate.jpg'
  },
  {
    id: 4,
    title: 'Mocha',
    description:
      'Our signature espresso fused with dark chocolate and steamed milk. Decadent, robust wake-up call.',
    ingredients: ['espresso', 'milk', 'dark chocolate'],
    image: 'images/mocha.jpg'
  }
];

// ==========================================
// "FETCH" DATA (FROM LOCAL ARRAY)
// ==========================================
async function fetchCoffees() {
  try {
    const data = sampleCoffees;

    allCoffees = data.map(coffee => ({
      id: coffee.id,
      name: coffee.title,
      description: coffee.description,
      category: getCoffeeCategory(coffee.title, coffee.ingredients),
      ingredients: coffee.ingredients,
      image_url: coffee.image
    }));

    displayCoffees(allCoffees);
    console.log('Loaded coffees from local sample:', allCoffees.length);
  } catch (error) {
    console.error('Error loading coffees:', error);
    const grid = document.getElementById('product-grid');
    if (grid) {
      grid.innerHTML =
        'Sorry, unable to load products. Please try again later.';
    }
  }
}

// ==========================================
// CATEGORY FUNCTION
// ==========================================
function getCoffeeCategory(title, ingredients) {
  const ingredientsStr = Array.isArray(ingredients)
    ? ingredients.join(' ').toLowerCase()
    : '';

  if (ingredientsStr.includes('espresso')) {
    return 'espresso';
  }
  if (ingredientsStr.includes('coffee')) {
    return 'coffee';
  }
  return 'other';
}

// ==========================================
// DISPLAY COFFEE CARDS
// ==========================================
function displayCoffees(coffeesToShow) {
  const productGrid = document.getElementById('product-grid');
  if (!productGrid) return;

  productGrid.innerHTML = '';

  coffeesToShow.forEach(coffee => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-image-wrapper">
        <img src="${coffee.image_url}" alt="${coffee.name}" class="product-image">
      </div>
      <div class="product-info">
        <h3 class="product-name">${coffee.name}</h3>
        <p class="product-category">Category: ${coffee.category}</p>
        <p class="section-label">Description</p>
        <p class="section-content">
          ${coffee.description || 'No description available.'}
        </p>
        <p class="section-label">Ingredients</p>
        <p class="section-content">
          ${
            Array.isArray(coffee.ingredients)
              ? coffee.ingredients.join(', ')
              : coffee.ingredients
          }
        </p>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// ==========================================
// FILTER + BUTTON WIRING
// ==========================================
function filterByCategory(category) {
  if (category === 'all') {
    displayCoffees(allCoffees);
    return;
  }
  const filtered = allCoffees.filter(coffee => coffee.category === category);
  displayCoffees(filtered);
}

function setupFilterButtons() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // update active class
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      filterByCategory(category);
    });
  });
}

// ==========================================
// INITIALIZE
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  fetchCoffees();
  setupFilterButtons();
});
