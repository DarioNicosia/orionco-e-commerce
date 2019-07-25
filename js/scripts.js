
let url = ('http://localhost:3000/api/cameras/');
// all cameras page
// fetch url that return a Promise. Then created a function that display cameras data on the page
fetch (url)
.then(function (response) {
    return response.json();
}).then(function (data) {
    getAllCameras(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});
function getAllCameras(data){
  //created variable to acces the DOM
    let mainContainer = document.getElementById("productMainPage");
  //developed for loop for each data camera in url to create element and  append them to DOM 
    for (let i = 0; i < data.length; i++){
  //create element    
        let img = document.createElement("img");
        let productName = document.createElement("h3");
        let productPrice = document.createElement("h5");
        let productBottom = document.createElement("div");
        let totalProduct = document.createElement("div");
        let link = document.createElement("a");
  //append name and price element to div element      
        productBottom.appendChild(productName);
        productBottom.appendChild(productPrice);
  //add class to camera data container div
        productBottom.classList.add("product-bottom", "text-center");
  //set attribute to link element - link will redirect to product.html page + id camera
        link.setAttribute("href","html/product.html?id=" + data[i]._id) ;
  //add classes to       
        totalProduct.classList.add("col-md-4"); 
  //set cameras image data to img element     
        img.setAttribute("src", data[i].imageUrl);
  //set name and price data cameras to name and price element      
        productName.innerHTML = data[i].name;
        productPrice.innerHTML = 'price: $' + data[i].price/100;
  //append img element to link element
        link.appendChild(img);
  //append link and camera data container elements to total product div      
        totalProduct.appendChild(link );
        totalProduct.appendChild(productBottom);
  //append total product div to DOM      
        mainContainer.appendChild(totalProduct);
        };
    };

//single product page
//created function to get url parameters
function getUrlParams(){
    let param = window.location.search;
    let newUrl = new URLSearchParams(param);
    return newUrl.get("id");
  }

  let id = getUrlParams();
//fetch url + id parameter, return a promise, then created a function to get one single camera details and diplay retured data in single product page
  fetch(url + id)
  .then(function (response) {
    return response.json();
}).then(function (cameraDetail) {
    getOneCamera(cameraDetail);
})
.catch(function (err) {
    console.log('error: ' + err);
});
// function one camera detail
function getOneCamera(cameraDetail){
  //access the DOM
    let pageContainer =document.getElementById("single-camera-page-container");
  //create element  
    let img = document.createElement("img");
    let button = document.createElement("button"); 
    let cameraName = document.createElement("h2");
    let cameraPrice = document.createElement("h5");
    let descritpion = document.createElement("h5");
    let cameraDescription = document.createElement("p");
    let labelLenses = document.createElement("label");
    let selectLenses = document.createElement("select");
    let containerImage =  document.createElement("div");
    let containerCameraDetails =  document.createElement("div");
    let totalContainer =  document.createElement("div");
  //append elements, add classes and set attribute to elements
    containerImage.appendChild(img);
    containerImage.appendChild(button );
    containerImage.classList.add("col-md-4");
    button.classList.add("btn",  "add-to-cart");
    button.setAttribute("id","add-cart");
    selectLenses.setAttribute("id","lenses" );
    labelLenses.setAttribute("for","lenses" );
    containerCameraDetails.appendChild(cameraName);
    containerCameraDetails.appendChild(cameraPrice);
    containerCameraDetails.appendChild(descritpion);
    containerCameraDetails.appendChild(cameraDescription);
    containerCameraDetails.appendChild(labelLenses);
    containerCameraDetails.appendChild(selectLenses);
    containerCameraDetails.classList.add("col-md-4");
    img.setAttribute("src", cameraDetail.imageUrl);
    cameraName.innerHTML = cameraDetail.name;
    cameraPrice.innerHTML ='Price: $' + cameraDetail.price/100;
    descritpion.innerHTML = 'Description:';
    cameraDescription.innerHTML = cameraDetail.description;
    labelLenses.innerHTML= 'Choose a lense';
    button.innerHTML= 'add to cart';
    totalContainer.appendChild(containerImage);
    totalContainer.appendChild(containerCameraDetails);
    totalContainer.classList.add("row");
  //appends elements and data to DOM
    pageContainer.appendChild(totalContainer);
}

//fetch url+id parameter, return a promise, then created a function to get data lenses available for cameras - return lenses
fetch(url + id)
.then(function (response) {
  return response.json();
}).then(function (data) {
    returnLenses(data);
})
.catch(function (err) {
  console.log('error: ' + err);
});

//funtcion to return lenses
function returnLenses(data){
  //created a for loop that for each data lense create an option element, set attribute and append it to DOM
    for (let i = 0; i < data.lenses.length; i++){
    let lense = document.createElement("option");
    lense.setAttribute("id","lense" );
    lense.setAttribute("value",data.lenses[i] );
    lense.innerHTML = data.lenses[i];
    let addLense = document.getElementById("lenses" );
    addLense.appendChild(lense);
  }
}
//fetch url + id parameter, return a promise, and created add to cart function
fetch(url + id)
.then(function (response) {
  return response.json();
}).then(function (cartData) {
    addToCart(cartData);
})
.catch(function (err) {
  console.log('error: ' + err);
});
//created an addEventListener which create an object of the cart and set item to local storage.
function addToCart(cartData){
    let addToCartButton = document.getElementById("add-cart");
    addToCartButton.addEventListener('click',() =>{
            let items = cartData.name
            const cartItems  = {
                'name':cartData.name,
                'price':cartData.price,
                'image':cartData.imageUrl,
                'id':cartData._id
            };
            localStorage.setItem(items ,JSON.stringify(cartItems));
            setInterval(()=>{
                window.location.reload();
              }, 1000);
       })
}
//add item count to nav bar - local storage length
let navCount = document.getElementById('nav-count')
navCount.innerHTML = localStorage.length + ' items'
//create cart
//created a for loop to get item from local storage and append it to cart page. 
  for(let i=0; i<localStorage.length; i++){
  let dataCamera = localStorage.getItem(localStorage.key(i));
  let cartContainer = document.getElementById("cart");
  let cartCamera = document.createElement("h5");
  let cartImg =document.createElement("img");
  let removeButton = document.createElement("button"); 
  let dataCart = JSON.parse(dataCamera);
  cartImg.setAttribute("src", dataCart.image);
  cartImg.classList.add("mb-1");
  cartCamera.classList.add("mb-0");
  removeButton.classList.add("btn-secondary","mb-2" );
  removeButton.setAttribute("id", dataCart.id);
  removeButton.innerHTML = 'remove';
  cartCamera.innerHTML = dataCart.name;
  cartContainer.appendChild(cartImg);
  cartContainer.appendChild(cartCamera);
  cartContainer.appendChild(removeButton);
}
 //show total price
//created a for loop that get price items from local storage, push it on an empty array and show the total amount of the cart
let total = [ ]
for(let i=0; i<localStorage.length; i++){
    let dataCamera = localStorage.getItem(localStorage.key(i));
    let dataCart = JSON.parse(dataCamera);
    let price = dataCart.price/100
    total.push(parseFloat(price))
    let totalPrice = total;
    const totalInCart = totalPrice.reduce(function(totalPrice, price){
    totalPrice += price;
    return totalPrice;
} ,  0)
let showTotal = document.getElementById("show-total")
showTotal.innerHTML = " $" + totalInCart;
}

//remove items
//created remove button functionality using a for loop of local storage length and local storage removeItem property
for(let i=0; i<localStorage.length; i++){
let dataCamera = localStorage.getItem(localStorage.key(i));
let dataCart = JSON.parse(dataCamera);
let removeButton = document.getElementById(dataCart.id)
removeButton.addEventListener('click',() =>{
localStorage.removeItem(dataCart.name)
setInterval(()=>{
    window.location.reload();
  }, 1000);
})
}
/* access the DOM - form of cart html */
let inputFirstName = document.getElementById("inputFirstName")
let inputLastName = document.getElementById("inputLastName")
let inputEmail= document.getElementById("InputEmail")
let inputAddress= document.getElementById("InputAddress")
let inputCity= document.getElementById("InputCity")
//product id array - created an array of product id for POST request.
const productArrays = [ ]
for(let i=0; i<localStorage.length; i++){
  let dataCamera = localStorage.getItem(localStorage.key(i));
  let dataCart = JSON.parse(dataCamera);
  productArrays.push(dataCart.id)
}
//developed button checkout add event listener to get all form fields value  and product id array for POST request
let userForm= document.getElementById("form")
userForm.addEventListener('submit', ($event) => {
  $event.preventDefault();
  let form =
  {
    contact : {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value
    },

     products: productArrays

  };
//fetch the POST request to send data to backend and get orderId.
  const options = {
    method:'POST',
    mode:'cors',
    headers:{
      'Content-Type': 'application/json' 
    }, 
    body:JSON.stringify(form)
  };
  fetch(url +'order', options )
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    redirectToConfirm(data);
    console.log(data.orderId)
  })
  .catch(function (err) {
    console.log('error: ' + err);
  });
//created a function create a link to confirmation.html + order id
  function redirectToConfirm(data){
    if(localStorage.length===0){
      alert("your cart is empty")
    }else{
    let confirmUrl = 'confirmation.html?orderId='+ data.orderId;
    window.location = confirmUrl
  }
  }

});

