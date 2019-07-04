
let url = ('http://localhost:3000/api/cameras/');



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
    let mainContainer = document.getElementById("productMainPage");
   
    for (let i = 0; i < data.length; i++){
        let img = document.createElement("img");
        let productName = document.createElement("h3");
        let productPrice = document.createElement("h5");
        let productBottom = document.createElement("div");
        let totalProduct = document.createElement("div");
        let link = document.createElement("a");
        

     
        
        productBottom.appendChild(productName);
        productBottom.appendChild(productPrice);


        productBottom.classList.add("product-bottom", "text-center");
        link.setAttribute("href","product.html?id=" + data[i]._id) ;
        totalProduct.classList.add("col-md-4"); 
       
        link.setAttribute("id", data[i]._id);
        
        

        img.setAttribute("src", data[i].imageUrl);
        productName.innerHTML = data[i].name;
        productPrice.innerHTML = 'price: $' + data[i].price/100;
        link.appendChild(img);
        


        totalProduct.appendChild(link );
        totalProduct.appendChild(productBottom);
        
        console.log(totalProduct)
       
       
        mainContainer.appendChild(totalProduct);
        

        

        

        };
    };
  

   




//single product page
 

function getUrlParams(){
    let param = window.location.search;
    let newUrl = new URLSearchParams(param);
    return newUrl.get("id");
  }

  let id = getUrlParams();

  fetch(url + id)
  .then(function (response) {
    return response.json();
}).then(function (cameraDetail) {
    getOneCamera(cameraDetail);
})
.catch(function (err) {
    console.log('error: ' + err);
});



function getOneCamera(cameraDetail){
    let pageContainer =document.getElementById("single-camera-page-container");
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

    pageContainer.appendChild(totalContainer);
    
   

}

//return lenses
fetch(url + id)
.then(function (response) {
  return response.json();
}).then(function (data) {
    returnLenses(data);
})
.catch(function (err) {
  console.log('error: ' + err);
});


function returnLenses(data){
    for (let i = 0; i < data.lenses.length; i++){
    let lense = document.createElement("option");
    lense.setAttribute("id","lense" );
    lense.setAttribute("value",data.lenses[i] );
    lense.innerHTML = data.lenses[i];

    let addLense = document.getElementById("lenses" );
    addLense.appendChild(lense);

   




}
}




//add camera to cart


fetch(url + id)
.then(function (response) {
  return response.json();
}).then(function (cartData) {
    addToCart(cartData);
})
.catch(function (err) {
  console.log('error: ' + err);
});

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
            
           
            console.log(dataCart)
          

            
        
      })

      
  }
//add item to nav bar - local storage length
let navCount = document.getElementById('nav-count')
navCount.innerHTML = localStorage.length + ' items'
console.log(localStorage.length)
  
//create cart

  for(let i=0; i<localStorage.length; i++){
  let dataCamera = localStorage.getItem(localStorage.key(i));
  let cartContainer = document.getElementById("cart");
  let cartCamera = document.createElement("h5");
  let cartImg =document.createElement("img");
  //let quantityContainer = document.getElementById("quantity");
  //let quantityLabel = document.createElement("label");
  //let quantityInput= document.createElement("input");
  let removeButton = document.createElement("button"); 
  
  let dataCart = JSON.parse(dataCamera);
  
  //quantityInput.setAttribute("id","inputQuantity" );
  //quantityInput.setAttribute("type","text" );
  //quantityLabel.setAttribute("for","inputQuantity" );
  //quantityLabel.innerHTML= 'quantity:';
  cartImg.setAttribute("src", dataCart.image);
  cartImg.classList.add("mb-1");
  cartCamera.classList.add("mb-0");
  //quantityInput.classList.add("mb-3");
  
  removeButton.classList.add("btn-secondary","mb-2" );
  removeButton.setAttribute("id", dataCart.id);
  removeButton.innerHTML = 'remove';

  cartCamera.innerHTML = dataCart.name;
  cartContainer.appendChild(cartImg);
  cartContainer.appendChild(cartCamera);

  //cartContainer.appendChild(quantityLabel);
  //cartContainer.appendChild(quantityInput);

  cartContainer.appendChild(removeButton);


 
}
 
//show total price
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

console.log(totalInCart)
console.log(localStorage.length)
    

   
    
}

//remove items

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

/* Check if the form is complete */
let inputFirstName = document.getElementById("inputFirstName")
let InputLastName = document.getElementById("inputLastName")
let InputEmail= document.getElementById("InputEmail")
let InputAddress= document.getElementById("InputAddress")
let InputCity= document.getElementById("InputCity")
let btnCheckout= document.getElementById("checkout")

//product id array
const productArrays = [ ]
for(let i=0; i<localStorage.length; i++){
  let dataCamera = localStorage.getItem(localStorage.key(i));
  let dataCart = JSON.parse(dataCamera);
   
   productArrays.push(dataCart.id)
   
}

console.log(productArrays)