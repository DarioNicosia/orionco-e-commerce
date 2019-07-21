'use strict';

var url = 'http://localhost:3000/api/cameras/';

fetch(url).then(function (response) {
  return response.json();
}).then(function (data) {
  getAllCameras(data);
}).catch(function (err) {
  console.log('error: ' + err);
});

function getAllCameras(data) {
  var mainContainer = document.getElementById("productMainPage");

  for (var i = 0; i < data.length; i++) {
    var img = document.createElement("img");
    var productName = document.createElement("h3");
    var productPrice = document.createElement("h5");
    var productBottom = document.createElement("div");
    var totalProduct = document.createElement("div");
    var link = document.createElement("a");

    productBottom.appendChild(productName);
    productBottom.appendChild(productPrice);

    productBottom.classList.add("product-bottom", "text-center");
    link.setAttribute("href", "html/product.html?id=" + data[i]._id);
    totalProduct.classList.add("col-md-4");

    link.setAttribute("id", data[i]._id);

    img.setAttribute("src", data[i].imageUrl);
    productName.innerHTML = data[i].name;
    productPrice.innerHTML = 'price: $' + data[i].price / 100;
    link.appendChild(img);

    totalProduct.appendChild(link);
    totalProduct.appendChild(productBottom);

    console.log(totalProduct);

    mainContainer.appendChild(totalProduct);
  };
};

//single product page


function getUrlParams() {
  var param = window.location.search;
  var newUrl = new URLSearchParams(param);
  return newUrl.get("id");
}

var id = getUrlParams();

fetch(url + id).then(function (response) {
  return response.json();
}).then(function (cameraDetail) {
  getOneCamera(cameraDetail);
}).catch(function (err) {
  console.log('error: ' + err);
});

function getOneCamera(cameraDetail) {
  var pageContainer = document.getElementById("single-camera-page-container");
  var img = document.createElement("img");
  var button = document.createElement("button");
  var cameraName = document.createElement("h2");
  var cameraPrice = document.createElement("h5");
  var descritpion = document.createElement("h5");
  var cameraDescription = document.createElement("p");
  var labelLenses = document.createElement("label");
  var selectLenses = document.createElement("select");
  var containerImage = document.createElement("div");
  var containerCameraDetails = document.createElement("div");
  var totalContainer = document.createElement("div");

  containerImage.appendChild(img);
  containerImage.appendChild(button);
  containerImage.classList.add("col-md-4");
  button.classList.add("btn", "add-to-cart");
  button.setAttribute("id", "add-cart");

  selectLenses.setAttribute("id", "lenses");
  labelLenses.setAttribute("for", "lenses");

  containerCameraDetails.appendChild(cameraName);
  containerCameraDetails.appendChild(cameraPrice);
  containerCameraDetails.appendChild(descritpion);
  containerCameraDetails.appendChild(cameraDescription);
  containerCameraDetails.appendChild(labelLenses);
  containerCameraDetails.appendChild(selectLenses);
  containerCameraDetails.classList.add("col-md-4");

  img.setAttribute("src", cameraDetail.imageUrl);
  cameraName.innerHTML = cameraDetail.name;
  cameraPrice.innerHTML = 'Price: $' + cameraDetail.price / 100;
  descritpion.innerHTML = 'Description:';
  cameraDescription.innerHTML = cameraDetail.description;
  labelLenses.innerHTML = 'Choose a lense';
  button.innerHTML = 'add to cart';
  totalContainer.appendChild(containerImage);
  totalContainer.appendChild(containerCameraDetails);
  totalContainer.classList.add("row");

  pageContainer.appendChild(totalContainer);
}

//return lenses
fetch(url + id).then(function (response) {
  return response.json();
}).then(function (data) {
  returnLenses(data);
}).catch(function (err) {
  console.log('error: ' + err);
});

function returnLenses(data) {
  for (var i = 0; i < data.lenses.length; i++) {
    var lense = document.createElement("option");
    lense.setAttribute("id", "lense");
    lense.setAttribute("value", data.lenses[i]);
    lense.innerHTML = data.lenses[i];

    var addLense = document.getElementById("lenses");
    addLense.appendChild(lense);
  }
}

//add camera to cart


fetch(url + id).then(function (response) {
  return response.json();
}).then(function (cartData) {
  addToCart(cartData);
}).catch(function (err) {
  console.log('error: ' + err);
});

function addToCart(cartData) {
  var addToCartButton = document.getElementById("add-cart");

  addToCartButton.addEventListener('click', function () {

    var items = cartData.name;

    var cartItems = {
      'name': cartData.name,
      'price': cartData.price,
      'image': cartData.imageUrl,
      'id': cartData._id
    };

    localStorage.setItem(items, JSON.stringify(cartItems));
    setInterval(function () {
      window.location.reload();
    }, 1000);

    console.log(dataCart);
  });
}
//add item to nav bar - local storage length
var navCount = document.getElementById('nav-count');
navCount.innerHTML = localStorage.length + ' items';
console.log(localStorage.length);

//create cart

for (var i = 0; i < localStorage.length; i++) {
  var dataCamera = localStorage.getItem(localStorage.key(i));
  var cartContainer = document.getElementById("cart");
  var cartCamera = document.createElement("h5");
  var cartImg = document.createElement("img");
  //let quantityContainer = document.getElementById("quantity");
  //let quantityLabel = document.createElement("label");
  //let quantityInput= document.createElement("input");
  var removeButton = document.createElement("button");

  var _dataCart = JSON.parse(dataCamera);

  //quantityInput.setAttribute("id","inputQuantity" );
  //quantityInput.setAttribute("type","text" );
  //quantityLabel.setAttribute("for","inputQuantity" );
  //quantityLabel.innerHTML= 'quantity:';
  cartImg.setAttribute("src", _dataCart.image);
  cartImg.classList.add("mb-1");
  cartCamera.classList.add("mb-0");
  //quantityInput.classList.add("mb-3");

  removeButton.classList.add("btn-secondary", "mb-2");
  removeButton.setAttribute("id", _dataCart.id);
  removeButton.innerHTML = 'remove';

  cartCamera.innerHTML = _dataCart.name;
  cartContainer.appendChild(cartImg);
  cartContainer.appendChild(cartCamera);

  //cartContainer.appendChild(quantityLabel);
  //cartContainer.appendChild(quantityInput);

  cartContainer.appendChild(removeButton);
}

//show total price
var total = [];
for (var _i = 0; _i < localStorage.length; _i++) {
  var _dataCamera = localStorage.getItem(localStorage.key(_i));
  var _dataCart2 = JSON.parse(_dataCamera);
  var price = _dataCart2.price / 100;

  total.push(parseFloat(price));
  var totalPrice = total;
  var totalInCart = totalPrice.reduce(function (totalPrice, price) {
    totalPrice += price;
    return totalPrice;
  }, 0);

  var showTotal = document.getElementById("show-total");

  showTotal.innerHTML = " $" + totalInCart;

  console.log(totalInCart);
  console.log(localStorage.length);
}

//remove items

var _loop = function _loop(_i2) {
  var dataCamera = localStorage.getItem(localStorage.key(_i2));

  var dataCart = JSON.parse(dataCamera);

  var removeButton = document.getElementById(dataCart.id);
  removeButton.addEventListener('click', function () {
    localStorage.removeItem(dataCart.name);
    setInterval(function () {
      window.location.reload();
    }, 1000);
  });
};

for (var _i2 = 0; _i2 < localStorage.length; _i2++) {
  _loop(_i2);
}

/* access the DOM cart html */
var inputFirstName = document.getElementById("inputFirstName");
var inputLastName = document.getElementById("inputLastName");
var inputEmail = document.getElementById("InputEmail");
var inputAddress = document.getElementById("InputAddress");
var inputCity = document.getElementById("InputCity");

//product id array
var productArrays = [];
for (var _i3 = 0; _i3 < localStorage.length; _i3++) {
  var _dataCamera2 = localStorage.getItem(localStorage.key(_i3));
  var _dataCart3 = JSON.parse(_dataCamera2);

  productArrays.push(_dataCart3.id);
}

//post

var userForm = document.getElementById("form");
//let productId = JSON.stringify(productArrays)


userForm.addEventListener('submit', function ($event) {
  $event.preventDefault();
  var form = {
    contact: {
      firstName: inputFirstName.value,
      lastName: inputLastName.value,
      address: inputAddress.value,
      city: inputCity.value,
      email: inputEmail.value
    },

    products: productArrays

  };

  //console.log(productArrays)
  //console.log(formData)


  var options = {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(form)
  };

  fetch(url + 'order', options).then(function (response) {
    return response.json();
  }).then(function (data) {
    redirectToConfirm(data);
    console.log(data.orderId);
  }).catch(function (err) {
    console.log('error: ' + err);
  });

  function redirectToConfirm(data) {
    if (localStorage.length === 0) {
      alert("your cart is empty");
    } else {
      var confirmUrl = 'confirmation.html?orderId=' + data.orderId;
      window.location = confirmUrl;
    }
  }
});
