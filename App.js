document.addEventListener("DOMContentLoaded", function () {
    let allProducts = [];

    // Fetch data from the API
    fetch("https://fakestoreapi.com/products")
        .then(response => response.json())
        .then(data => {
            allProducts = data;
            displayProducts(shuffleArray(allProducts));
            populateCategoryFilter(allProducts);
            document.getElementById("loading").style.display = "none";
            document.getElementById("content").style.display = "block";
            document.getElementById("body").style.display = "block";
        })
        .catch(error => console.error("Error fetching data:", error));

    const productsContainer = document.getElementById("products");
    const categoryFilter = document.getElementById("categoryFilter");

    // Display products
    function displayProducts(products) {
        productsContainer.innerHTML = "";
        products.forEach(product => {
            const productCard = document.createElement("div");
            productCard.className = "col-sm p-sm-1";
            productCard.innerHTML = `
            <div class="card">
                <img src="${product.image}" alt="${product.title}">
                <div class="card-body">
                    <h5 class="card-title">${truncateDescription(product.title, 5)}</h5>
                    <p class="price">$${product.price}</p>
                    <p class="category">${product.category}</p>
                    <p class="small">${truncateDescription(product.description, 15)}</p>
                    </div>
                <div class="card-footer">
                    <button class="btn" role="button">Buy Now</button>
                </div>
                </div>
                `;
            productsContainer.appendChild(productCard);
        });
    }

    // Truncate description to a limited number of words
    function truncateDescription(description, wordLimit) {
        const words = description.split(" ");
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(" ") + " ...";
        }
        return description;
    }

    // Shuffle an array
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Populate the category filter dropdown
    function populateCategoryFilter(products) {
        const categories = ["all", ...new Set(products.map(product => product.category))];
        categories.forEach(category => {
            const option = document.createElement("option");
            option.value = category;
            option.textContent = category.charAt(0).toUpperCase() + category.slice(1);
            categoryFilter.appendChild(option);
        });
    }

    // Filter products based on category
    categoryFilter.addEventListener("change", function () {
        const selectedCategory = this.value;
        const filteredProducts = selectedCategory === "all"
            ? shuffleArray([...allProducts])
            : shuffleArray(allProducts.filter(product => product.category === selectedCategory));
        displayProducts(filteredProducts);
    });
});
