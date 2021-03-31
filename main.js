
/*--------------- TESTDATA! Sätter localstrage. Uppdatera sidan så läggs produkt 1 till i varukorgen---------------*/
var products = [
    {
        name: "Mellanmjölk Arla",
        id: 1,
        price: 12,
        inCart: 0 
    }
    , 
     {
         name: "Bregott Arla",
         id: 2,
         price: 25,
         inCart: 0 
     }, 
     {
         name: "Bulgur Änglamark",
         id: 3,
         price: 30,
         inCart: 0 
     }
]; 

    function onLoadSetCartNumberFromLocalstorage(){
        let quantityInCart = localStorage.getItem('quantityInCart');
        quantityInCart = parseInt(quantityInCart);
        
    }

    function setCartNumberInLocalstorage(product){
    let quantityInCart = localStorage.getItem('quantityInCart');
    quantityInCart = parseInt(quantityInCart);
    if(quantityInCart){
       localStorage.setItem('quantityInCart',quantityInCart + 1);
    }else{
        localStorage.setItem('quantityInCart', 1)
    }
    setItems(product);
}

function setItems(product){
    let inCart = localStorage.getItem('productsInCart');
    
    inCart = JSON.parse(inCart);
    if(inCart != null){ 

      if(inCart[product.id] == undefined){
        inCart = {
              ...inCart,
              [product.id]: product
          }
        }
        inCart[product.id].inCart += 1;
    } else {
        product.inCart = 1;
        inCart = {
            [product.id]: product
        }
    }
    var cartItemsJSON = JSON.stringify(inCart);
    localStorage.setItem("productsInCart", cartItemsJSON);

}

/*------------------------------------------------------------------*/


function deleteItemFromCart(product){
    console.log('produkten vi vill ta bort:', product)
    let inCart1 = localStorage.getItem('productsInCart');
    let inCart = [];
    inCart1 = JSON.parse(inCart1);

    Object.values(inCart1).map(item =>{ 
        if(item.id != product) 
         { 
           inCart.push(item);
         } 
        });

    var cartItemsJSON = JSON.stringify(inCart);
    localStorage.setItem("productsInCart", cartItemsJSON);
    totalCost();
    window.location.reload(); 

}

     let inCart = localStorage.getItem("productsInCart");
     inCart = JSON.parse(inCart);
     let productContainer = document.querySelector(".products");
     
     
     if(inCart == null){
        let data = '';
        data += '<div class = "product-title">NO ITEMS FOUND</div>'      

    }else if (productContainer != null){

        let cartCost = localStorage.getItem('totalCost');
        let productContainer = document.querySelector(".products");

        Object.values(inCart).map(item => {
            productContainer.innerHTML += `
                 <div class ="products2">
                 <div class= "product-title">
                  <span =class "product-title">${item.name}</span>
                  <img src ="./images/${item.id}.jpg">
                   </div>
                   <div class = "price"kr/styck>${item.price} kr</div>
                    <div class = "quantity">
                  
                    <span>${item.inCart} st</span> 
                    
                    </div>

                    <div class="total">
                    ${item.inCart * item.price}:-
                     </div>
                     <div class="delete">
                     <a class="delete" href="#" onclick= deleteItemFromCart(${item.id})>
                     <i class="fa fa-trash"></i></a>
                    </div>

                    </div>
                    </div>                    
                      ` 
        });
        productContainer.innerHTML += `
        <div class ="basketTotalContainer">
        <h4 class = "basketTotalTitle">
            Totalt belopp
        </h4>
        <h4 class="basketTotal">
            ${cartCost} kr
        </h4>
        `;  

    }    

    //TODO: function totalCost is not finished!
  function totalCost(product){
     
    let totalCost = localStorage.getItem('totalCost');
    let productsInCart = localStorage.getItem('productsInCart');
    console.log("My totalCost is", totalCost);
    
    if(product != undefined){

        if(productsInCart.length == 0){
            localStorage.setItem("totalCost", "0");
            localStorage.setItem("quantityInCart", "0");
            
        }
        else if(totalCost != null){
                totalCost = parseInt(totalCost);
                let price = parseInt(product.price);
                localStorage.setItem("totalCost", + totalCost + 
                +product.price);
        }else{
               //localStorage.setItem("totalCost", product.price);
        }
          
    }else{
    }

}


onLoadSetCartNumberFromLocalstorage();
setCartNumberInLocalstorage(products[1]);
totalCost(products[1]);

