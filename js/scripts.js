


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
       
        link.classList.add("col-md-4"); 
        link.setAttribute("href", "product.html");
        link.setAttribute("id", "single-Page-Link");
        link.setAttribute("data-value", "response[i]._id");
        link.style.textDecoration = "none";
        link.style.color = "#232A34";

        img.setAttribute("src", response[i].imageUrl);
        productName.innerHTML = response[i].name;
        productPrice.innerHTML = response[i].price;
       
        


        totalProduct.appendChild(img );
        totalProduct.appendChild(productBottom);
        link.appendChild(totalProduct);

       
       
        mainContainer.appendChild(link);
  

        

        };
    };
    getAllCameras();

}
};




//single product page



let secondApiRequest =  new XMLHttpRequest();
secondApiRequest.onreadystatechange= () => {
    if(secondApiRequest.readyState === 4){
    const secondResponse = JSON.parse(secondApiRequest.response);
  
    let singleProductName = document.getElementById('single-product-name');

    singleProductName.innerHTML = secondResponse.name;
   
        
    
}
};

let singlePageCamera = document.getElementById("single-Page-Link");
singlePageCamera.addEventListener('click', () =>{
    let idCamera = singlePageCamera.dataset.dataValue
    secondApiRequest.open('GET', 'http://localhost:3000/api/cameras?q='+idCamera);
    secondApiRequest.send();
    
})















