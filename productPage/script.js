// script.js
document.addEventListener("DOMContentLoaded", function () {
    // Image Swap Functionality
    const images = document.querySelectorAll(".swap-image");

    images.forEach(image => {
        image.addEventListener("click", function () {
            // Get the current source of the clicked image
            const currentSrc = this.src;

            // Find the next image in the sequence
            let nextImage = this.nextElementSibling;
            if (!nextImage) {
                nextImage = images[0]; // Loop back to the first image
            }

            // Swap the sources
            const tempSrc = this.src;
            this.src = nextImage.src;
            nextImage.src = tempSrc;
        });
    });

    // Shopping Cart Functionality
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartBadge = document.getElementById("cartBadge");
    const cartButton = document.getElementById("cartButton");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    document.querySelectorAll(".add-to-cart").forEach(button => {
        button.addEventListener("click", function () {
            const product = {
                id: this.getAttribute("data-id"),
                name: this.getAttribute("data-name"),
                price: parseFloat(this.getAttribute("data-price")),
                image: this.getAttribute("data-image"),
                quantity: 1
            };

            const existingItem = cart.find(item => item.id === product.id);
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push(product);
            }

            updateCartDisplay();
            saveCart();
        });
    });

    function updateCartDisplay() {
        cartItems.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            itemCount += item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `N${total.toFixed(2)}`;
        cartBadge.textContent = itemCount;

        if (cart.length === 0) {
            document.getElementById("emptyCart").style.display = "block";
            document.getElementById("checkoutSection").style.display = "none";
        } else {
            document.getElementById("emptyCart").style.display = "none";
            document.getElementById("checkoutSection").style.display = "block";
        }

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                cart = cart.filter(item => item.id !== productId);
                updateCartDisplay();
                saveCart();
            });
        });
    }

    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    cartButton.addEventListener("click", () => {
        cartOverlay.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartOverlay.style.display = "none";
    });

    updateCartDisplay();
});

document.addEventListener("DOMContentLoaded", function () {
    // Snipcart Events
    Snipcart.events.on('cart.ready', (event) => {
        console.log('Snipcart is ready!');
    });

    Snipcart.events.on('item.added', (event) => {
        console.log('Item added to cart:', event.item);
    });

    Snipcart.events.on('cart.ready', (event) => {
        console.log('Snipcart is ready!');
    });
});


document.addEventListener("DOMContentLoaded", function () {
    // Image Swap Functionality

    const images = document.querySelectorAll(".swap-image");
    let currentIndex = 0;

    // Set initial state
    images[currentIndex].classList.add('active');

    // Function to show next image
    function showNextImage() {
        // Remove active class from current image
        images[currentIndex].classList.remove('active');
        
        // Update index
        currentIndex = (currentIndex + 1) % images.length;
        
        // Add active class to next image
        images[currentIndex].classList.add('active');
    }

    // Add click event to container
    const container = document.querySelector('.image-swap-container');
    container.addEventListener('click', showNextImage);

    // Optional: Auto-rotate every 5 seconds
    setInterval(showNextImage, 4000);





    // Snipcart Events
    Snipcart.events.on('cart.ready', (event) => {
        console.log('Snipcart is ready!');
    });

    Snipcart.events.on('item.added', (event) => {
        console.log('Item added to cart:', event.item);
    });

    Snipcart.events.on('cart.closed', (event) => {
        console.log('Cart closed');
    });

    // Shopping Cart Functionality (Optional: Custom Cart Logic)
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartItems = document.getElementById("cartItems");
    const cartTotal = document.getElementById("cartTotal");
    const cartBadge = document.getElementById("cartBadge");
    const cartButton = document.getElementById("cartButton");
    const cartOverlay = document.getElementById("cartOverlay");
    const closeCart = document.getElementById("closeCart");

    // Update Cart Display (Optional: Custom Cart Logic)
    function updateCartDisplay() {
        cartItems.innerHTML = "";
        let total = 0;
        let itemCount = 0;

        cart.forEach(item => {
            total += item.price * item.quantity;
            itemCount += item.quantity;

            const cartItem = document.createElement("div");
            cartItem.classList.add("cart-item");
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-details">
                    <h3>${item.name}</h3>
                    <p>N${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
                <button class="remove-item" data-id="${item.id}">×</button>
            `;
            cartItems.appendChild(cartItem);
        });

        cartTotal.textContent = `N${total.toFixed(2)}`;
        cartBadge.textContent = itemCount;

        if (cart.length === 0) {
            document.getElementById("emptyCart").style.display = "block";
            document.getElementById("checkoutSection").style.display = "none";
        } else {
            document.getElementById("emptyCart").style.display = "none";
            document.getElementById("checkoutSection").style.display = "block";
        }

        // Add event listeners to remove buttons
        document.querySelectorAll(".remove-item").forEach(button => {
            button.addEventListener("click", function () {
                const productId = this.getAttribute("data-id");
                cart = cart.filter(item => item.id !== productId);
                updateCartDisplay();
                saveCart();
            });
        });
    }

    // Save Cart to Local Storage (Optional: Custom Cart Logic)
    function saveCart() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }

    // Toggle Cart Overlay (Optional: Custom Cart Logic)
    cartButton.addEventListener("click", () => {
        cartOverlay.style.display = "block";
    });

    closeCart.addEventListener("click", () => {
        cartOverlay.style.display = "none";
    });

    // Initialize Cart Display (Optional: Custom Cart Logic)
    updateCartDisplay();
});


document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper('.swiper', {
        // Optional parameters
        slidesPerView: 3,  // Show 3 slides at once
        spaceBetween: 30,  // Space between slides
        loop: true,        // Infinite loop
        
        // Navigation arrows
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        
        // Pagination
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },

        // Responsive breakpoints
        breakpoints: {
            // when window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10
            },
            // when window width is >= 480px
            480: {
                slidesPerView: 2,
                spaceBetween: 20
            },
            // when window width is >= 640px
            640: {
                slidesPerView: 3,
                spaceBetween: 30
            }
        }
    });
})



