


let apiRequest =  new XMLHttpRequest();

apiRequest.open('GET', 'http://localhost:3000/api/cameras/');
apiRequest.send();

apiRequest.onreadystatechange= () => {
    if(apiRequest.readyState === 4){
    const response = JSON.parse(apiRequest.response);
  
    
    function getAllCameras(){
    let mainContainer = document.getElementById("productMainPage");
   
    for (let i = 0; i < response.length; i++){
        let img = document.createElement("img");
        let productName = document.createElement("h3");
        let productPrice = document.createElement("h5");
        let productBottom = document.createElement("div");
        let totalProduct = document.createElement("div");
        let link = document.createElement("a");
        

     
       
        productBottom.appendChild(productName);
        productBottom.appendChild(productPrice);

        productBottom.classList.add("product-bottom", "text-center");
        link.setAttribute("href", "product.html");
        totalProduct.classList.add("col-md-4"); 
       
        link.setAttribute("id", response[i]._id);
        
        

        img.setAttribute("src", response[i].imageUrl);
        productName.innerHTML = response[i].name;
        productPrice.innerHTML = 'price :' + response[i].price;
        link.appendChild(img);
        


        totalProduct.appendChild(link );
        totalProduct.appendChild(productBottom);
        

       
       
        mainContainer.appendChild(totalProduct);
        

        

        

        };
    };
    getAllCameras();

}
};




//single product page



a.addEventListener ("click",($event) => {
    $event.preventDefault();
    //let idCamera = event.target.id;
    let idCamera = document.getElementsByClassName("col-md-4").getAttribute("onclick");
    let secondApiRequest =  new XMLHttpRequest();
    secondApiRequest.onreadystatechange= () => {
    if(secondApiRequest.readyState === 4){
    const secondResponse = JSON.parse(secondApiRequest.response);
    let singleProductName = document.getElementById('single-product-name');
    singleProductName.innerHTML = secondResponse.name;
    }
    };
    secondApiRequest.open('GET', 'http://localhost:3000/api/cameras?q='+ idCamera);
    secondApiRequest.send();
    })








/*let secondApiRequest =  new XMLHttpRequest();
secondApiRequest.onreadystatechange= () => {
    if(secondApiRequest.readyState === 4){
    const secondResponse = JSON.parse(secondApiRequest.response);
    let singleProductName = document.getElementById('single-product-name');
    singleProductName.innerHTML = secondResponse.name;
   }
};

secondApiRequest.open('GET', 'http://localhost:3000/api/cameras/5be9c4471c9d440000a730e8');
secondApiRequest.send();


let singlePageCamera = document.getElementsByClassName("single-product-name"); 
singlePageCamera.addEventListener ("click",()=> {
    
})*/


















