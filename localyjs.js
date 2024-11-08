// Sample product data (this could also be loaded from a JSON file or API)
const products = [
    {
        name: "Organic Apples",
        image: "https://5.imimg.com/data5/YY/EN/MY-8155364/fresh-apple-500x500.jpg",
        description: "Fresh organic apples sourced from local farms."
    },
    {
        name: "Handcrafted Soap",
        image: "https://st4prdbebeautiful4s4ci.blob.core.windows.net/www-bebeautiful-in/use-soap-and-save-the-earth-300x400.jpg",
        description: "Natural soaps made with local ingredients."
    },
    {
        name: "Locally Roasted Coffee",
        image: "https://www.dona.coffee/wp-content/uploads/2022/02/roast-locally.jpg",
        description: "Freshly roasted coffee from local beans."
    },
    {
        name: "Artisan Bread",
        image: "https://bakersvalleybd.com/wp-content/uploads/2022/07/brown-bread-300-gm-400x400.png",
        description: "Freshly baked bread from a nearby bakery."
    },
    {
        name: "Homemade Jam",
        image: "https://tse2.mm.bing.net/th?id=OIP.PP0z3KB9nuWHtPNWQsvfegHaE7&pid=Api&P=0&h=180",
        description: "Delicious jams made from locally grown fruits."
    },
    {
        name: "Local Honey",
        image: "https://tse3.mm.bing.net/th?id=OIP.NyL1exy8qgYE565ncphMuAAAAA&pid=Api&P=0&h=180",
        description: "Sweet honey from local beekeepers."
    }
];

// Display products in the gallery
const productList = document.getElementById('productList');

// Function to display products
function displayProducts(products) {
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;
        productDiv.addEventListener('click', () => openModal(product));
        productList.appendChild(productDiv);
    });
}

// Search functionality
document.getElementById('searchBar').addEventListener('input', function() {
    const searchTerm = this.value.toLowerCase();
    const filteredProducts = products.filter(product => product.name.toLowerCase().includes(searchTerm));
    displayProducts(filteredProducts);
});

// Toggle feedback form visibility
const feedbackForm = document.getElementById('feedbackForm');
const toggleFeedbackBtn = document.getElementById('toggleFeedbackBtn');

toggleFeedbackBtn.addEventListener('click', () => {
    feedbackForm.classList.toggle('hidden');
});

// Feedback form submission
feedbackForm.addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    alert(`Thank you for your feedback, ${name}!`);
    this.reset();
    feedbackForm.classList.add('hidden');
});

// Modal for product details
const productModal = document.getElementById('productModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalImage = document.getElementById('modalImage');
const closeModal = document.getElementById('closeModal');

// Function to open modal
function openModal(product) {
    modalTitle.innerText = product.name;
    modalDescription.innerText = product.description;
    modalImage.src = product.image;
    productModal.classList.remove('hidden');
}

// Close modal
closeModal.addEventListener('click', () => {
    productModal.classList.add('hidden');
});

// Initial display of products
displayProducts(products);
