/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
      navToggle = document.getElementById('nav-toggle'),
      navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if(navToggle){
    navToggle.addEventListener('click', () =>{
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if(navClose){
    navClose.addEventListener('click', () =>{
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== HOME SWIPER ===============*/
let homeSwiper = new Swiper(".home-swiper", {
    spaceBetween: 30,
    loop: 'true',
    
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
})

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/*=============== NEW SWIPER ===============*/
let newSwiper = new Swiper(".new-swiper", {
    centeredSlides: true,
    slidesPerView: "auto",
    loop: 'true',
    spaceBetween: 16,
});

/*==================== TRACK RECORD MODAL ====================*/
 const modalViews = document.querySelectorAll('.tracks__modal'),
    modalBtns = document.querySelectorAll('.tracks__button'),
    modalCloses = document.querySelectorAll('.tracks__modal-close')
let modal = function (modalClick) {
    modalViews[modalClick].classList.add('active-modal')
}

modalBtns.forEach((modalBtn, i) => {
    modalBtn.addEventListener('click', () => {
        modal(i)
    })
})

modalCloses.forEach((modalClose) => {
    modalClose.addEventListener('click', () => {
        modalViews.forEach((modalView) => {
            modalView.classList.remove('active-modal')
        })
    })
}) 

/*=============== SHOPPING CART ===============*/
let carts = document.querySelectorAll('.add-cart');

/* JSON products list */
let products = [
    {
        name: 'Toffee',
        tag: 'trick-treat1-img',
        price: 12,
        inCart: 0
    },

    {
        name: 'Bone',
        tag: 'trick-treat2-img',
        price: 9,
        inCart: 0
    },

    {
        name: 'Crow',
        tag: 'trick-treat3-img',
        price: 16,
        inCart: 0
    },

    {
        name: 'Cane',
        tag: 'trick-treat4-img',
        price: 8,
        inCart: 0
    },

    {
        name: 'Pumpkin',
        tag: 'trick-treat5-img',
        price: 20,
        inCart: 0
    },

    {
        name: 'Ghost',
        tag: 'trick-treat6-img',
        price: 18,
        inCart: 0
    },

    {
        name: 'Haunted House',
        tag: 'hauntedhouse',
        price: 15,
        inCart: 0
    },

    {
        name: 'Halloween Candle',
        tag: 'halloweencandle',
        price: 12,
        inCart: 0
    },

    {
        name: 'Witch Hat',
        tag: 'witchhat',
        price: 5,
        inCart: 0
    },

    {
        name: 'Rip',
        tag: 'rip',
        price: 25,
        inCart: 0
    },

    {
        name: 'Terrifying Crystal Ball',
        tag: 'terrifyingcrystalball',
        price: 6,
        inCart: 0
    },

    {
        name: 'Witch Broom',
        tag: 'witchbroom',
        price: 8,
        inCart: 0
    },
    
]

for (let i= 0; i < carts.length ; i++){
    carts[i].addEventListener('click', ()=> {
        cartNumbers(products[i]);
        totalCost(products[i]);
        alert("This item has already added to your card!");
    })
}

/* Save the number of product when reload page */
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');
    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}

/* Count the number of product */
function cartNumbers(product) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
    }

    setItem(product);
}


/* Save the products */
function setItem(product){
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if(cartItems !== null){

        if(cartItems[product.tag] == undefined){
            cartItems ={
                ...cartItems,
                [product.tag] : product
            }
        }
        cartItems[product.tag].inCart += 1;
    }else{

        product.inCart = 1;
        cartItems = {
            [product.tag] : product
    } 
 }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}



/* Caculate total cost */
function totalCost(product){

    let cartCost = localStorage.getItem('totalCost');

    if(cartCost != null){
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + product.price);
    }else{
        localStorage.setItem("totalCost", product.price);
    }
   cartCost = Math.round(cartCost);
}



function displayCart(){
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let cartCost = localStorage.getItem('totalCost');

    productContainer = document.querySelector(".products");
    if (cartItems && productContainer){


        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class ="product-header">
            <div class="product">
            <i class='bx bx-trash cart-icon'></i>
            <img class = "cart-img"src="assets/img/${item.tag}.png">
            <span>${item.name}</span>
            </div>
            
            <div class="price">$
            ${item.price},00
            </div>
            <div class="quantity">
            <i class='bx bx-minus-circle cart-icon button-minus' data-id=${products.tag}></i>
            <span>${item.inCart}</span>
            <i class='bx bx-plus-circle cart-icon button-plus'></i>
            </div>
            <div class="total">$${item.inCart * item.price},00</div>
            `;
        });
        productContainer.innerHTML += `
        <div class = "baskTotalContainer">
        <h4 class = "basketTotalTitle">
        Basket Total: </h4>
        <h4 class="basketTotal">
         $${cartCost},00
        </h4></div>
        <button class = "payment-button">Proceed to payment</button>
        `;

        
    }else{
       /*  productContainer.innerHTML =`<a href="index.html#trick">
       <button class="empty-cart">Your shopping cart is empty now, click here to buy more!</button></a>`; */
    }
}

onLoadCartNumbers();
displayCart();

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SHOW SCROLL UP ===============*/ 
function scrollUp(){
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 460 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 460) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2500,
    delay: 300,
    /* reset: true */
})

sr.reveal(`.home-swiper, .new-swiper, .newsletter__container`)
sr.reveal(`.category__data, .trick__content, .footer__content`,{interval: 100})
sr.reveal(`.about__data, .discount__img`,{origin: 'left'})
sr.reveal(`.about__img, .discount__data`,{origin: 'right'})

/*==================== DARK LIGHT THEME ====================*/
const themeButton = document.getElementById('theme-button')
const darkTheme = 'dark-theme'
const iconTheme = 'bx-sun'

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem('selected-theme')
const selectedIcon = localStorage.getItem('selected-icon')

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light'
const getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun'

// We validate if the user previously chose a topic
if (selectedTheme) {
    // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener('click', () => {
    // Add or remove the dark / icon theme
    document.body.classList.toggle(darkTheme)
    themeButton.classList.toggle(iconTheme)
    // We save the theme and the current icon that the user chose
    localStorage.setItem('selected-theme', getCurrentTheme())
    localStorage.setItem('selected-icon', getCurrentIcon())
})
/* Play tracks */
function play(){
   let audio = document.getElementById("audio");
   let playPauseIcon = document.getElementById("playPauseIcon");
   if(audio.paused){
    audio.play();

   }else{
    audio.pause();
   }
}