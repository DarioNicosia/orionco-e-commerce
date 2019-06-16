
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
        productPrice.innerHTML = 'price :' + data[i].price;
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
}).then(function (data) {
    getOneCamera(data);
})
.catch(function (err) {
    console.log('error: ' + err);
});

function getOneCamera(data){
    let pageContainer =document.getElementById("single-camera-page-container");
    let img = document.createElement("img");
    let cameraName = document.createElement("h2");
    let cameraPrice = document.createElement("h3");
    let descritpion = document.createElement("h5");
    let cameraDescription = document.createElement("p");
    let labelLenses = document.createElement("label");
    let selectLenses = document.createElement("select");
    let containerImage =  document.createElement("div");
    let containerCameraDetails =  document.createElement("div");
    let totalContainer =  document.createElement("div");


    containerImage.appendChild(img);
    containerImage.classList.add("col-md-4");

    selectLenses.setAttribute("id","lenses" );
    labelLenses.setAttribute("for","lenses" );


    containerCameraDetails.appendChild(cameraName);
    containerCameraDetails.appendChild(cameraPrice);
    containerCameraDetails.appendChild(descritpion);
    containerCameraDetails.appendChild(cameraDescription);
    containerCameraDetails.appendChild(labelLenses);
    containerCameraDetails.appendChild(selectLenses);
    containerCameraDetails.classList.add("col-md-8");

    img.setAttribute("src", data.imageUrl);
    cameraName.innerHTML = data.name;
    cameraPrice.innerHTML ='$ ' + data.price;
    descritpion.innerHTML = 'Description';
    cameraDescription.innerHTML = data.description;
    labelLenses.innerHTML= 'Choose a lense';

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



