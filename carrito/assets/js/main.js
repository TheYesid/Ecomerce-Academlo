// Botón del carrito => Mostrar y ocultar carrito.
const carToggle = document.querySelector(".car__toggle");
const carBlock = document.querySelector(".car__block");
// URL para petición AXIOS.
const baseURL = "https://academlo-api-production.up.railway.app/api"
const productsList = document.querySelector("#products-container")
// Carrito de compras
const car = document.querySelector('#car');
const carList = document.querySelector('#car__list');
const emptyCarButton = document.querySelector('#empty__car')
let carProducts = [];


// Lógica para mostrar y ocultar el carrito.
carToggle.addEventListener("click", () => {
    carBlock.classList.toggle("nav__car__visible")
})

//! Listeners
eventListenersLoader()

function eventListenersLoader(){
    //* Se ejecuta cuando se presione el botón "Add to car"
    productsList.addEventListener('click', addProduct);

    //* Se ejecuta cuando se presione el botón "Delete"
    car.addEventListener('click', deleteProduct);

    //* Se ejecuta cuando se presione el botón "Empty Car"
    emptyCarButton.addEventListener('click', emptyCar)

    //* Se ejecuta cuando se carga la página
    document.addEventListener('DOMContentLoaded', () => {
        carProducts = JSON.parse(localStorage.getItem('car')) || [];
        carElementsHTML();
    })
}

// Dark Mode- Aun no sirve
// function enableDarkMode(){
//     let main_body = document.body;
//     main_body.classList.toggle("dark-mode");
// }

// Petición GET.
function obtainProducts() {
    axios.get(`${baseURL}/products`)
        .then(function(response){
            const products = response.data
            printProducts(products)
        })
        .catch(function (error){
            console.log(error)
        })
}; 
obtainProducts()


// Pintar productos dentro de la web:
function printProducts(products) {
    let html = '';
    for(let i = 0; i < products.length; i++){
        html += `
        <div class="product__container">
            <div class="product__container__img">
                <img src="${products[i].images.image1}" alt="">
            </div>
            <div class="product__container__name">
                <p>${products[i].name}</p>
            </div>
            <div class="product__container__price">
                <p>$ ${products[i].price.toFixed(2)}</p>
            </div>
            <div class="product__container__button">
                <button class="car__button add__to__car" id="add__to__car" data-id="${products[i].id}">Add to car</button>
            </div>
        </div>
        `
    }
    productsList.innerHTML = html;
}

//* Agregar productos al carrito.

//* 1. Capturar la información del producto al que le de click.
function addProduct(e) {
    if(e.target.classList.contains('add__to__car')){
        const product = e.target.parentElement.parentElement
        carProductsElements(product)
    }
}

//* 2. Debo transformar la información HTML en un array de objetos.
function carProductsElements(product) {
    const infoProduct = {
        id: product.querySelector('button').getAttribute('data-id'),
        image: product.querySelector('img').src,
        name: product.querySelector('.product__container__name p').textContent,
        price: product.querySelector('.product__container__price p').textContent,
        quantity: 1
    }
    
    //* Agregar contador
    //* Si dentro de carProducts existe un ID igual al ID de infoProducts
    if(carProducts.some(product => product.id === infoProduct.id)){
        const product = carProducts.map(product => {
            if(product.id === infoProduct.id) {
                product.quantity ++;
                return product;
            } else {
                return product;
            }
        })
        carProducts = [...product]
        //* El operador ...rest crea una copia exacta de un array.
    } else {
        carProducts = [...carProducts, infoProduct]
    }

    carElementsHTML()
}

//* 3. Imprimir, pintar, dibujar O renderizar los productos dentro del carrito.
function carElementsHTML() {

    //! como cada vez que iteramos con forEach creamos un nuevo div, debemos depurar los duplicados reinicializando el carList con innerHTML vacío. Esto borra todo lo que pueda ser repetido.
    carList.innerHTML = "";

    carProducts.forEach(product => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="car__product">
            <div class="car__product__image">
                <img src="${product.image}" alt="">
            </div>
            <div class="car__product__description">
                <div>
                    <p>${product.name}</p>
                </div>
                <div>
                    <p>Precio: ${product.price}</p>
                </div>
                <div>
                    <p>Cantidad: ${product.quantity}</p>
                </div>
                <div class="car__product__button">
                    <button class="delete__product" data-id="${product.id}">Delete</button>
                </div>
            </div>
        </div>
        <hr>
        `;
        carList.appendChild(div)
    })
    //* Local Storage
    productsStorage()
}

function productsStorage(){
    localStorage.setItem('car', JSON.stringify(carProducts))
}

//5 Esto hace que al momentode dar empty se borre todos los articulos del carrito
function emptyCar(){
    carList.innerHTML = "";
    carProducts = [];
}


//4 Esto hace que al momento de dar click en delete se borrren los productos que van en el carrito
function deleteProduct(e){
    if(e.target.classList.contains('delete__product')){
        const productId = e.target.getAttribute('data-id');
        //* Tengo eliminar del array carProducts el producto con el ID que estamos guardando en productId.
        carProducts = carProducts.filter(product => product.id !== productId);
        carElementsHTML();
    }
}

//Buscador dinamico de productos con mixtup - No funciono

// mixitup(".options_clothes", {
//     selectors: {
//         target: '?????'
//     },
//     animation: {
//         duration: 300
//     }
// });

// const close = document.querySelector(".???");
// const open = document.querySelector(".????");
// const menu = document.querySelector(".div donde hallan opciones de cada prenda");

// [close, open].forEach((icon) =>{
//     icon.addEventListener("click", () => menu.classList.toggle("main_show"))
// }) 



//EJEMPLO DE DE COMO GUARDAR Y OBTENER EL VALOR DEL LOCAL STORAGE

// //* Local Storage

// //* Guardar un valor en el Local Storage
// localStorage.setItem('name', 'Alejandro')

// //* Obtener un valor del Local Sotorage
// localStorage.getItem('name')

// const user = {
//     name: 'Alejandro',
//     lastName: 'Betancur'
// }

// localStorage.setItem('user', JSON.stringify(user))

// const userFromLocal = localStorage.getItem('user')

// console.log(JSON.parse(userFromLocal))