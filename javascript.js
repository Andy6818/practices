const cartContainer = document.getElementById("cart-container");
const productsContainer = document.getElementById("products-container");
const dessertCards = document.getElementById("dessert-card-container");
const cartBtn = document.getElementById("cart-btn");
const clearCartBtn = document.getElementById("clear-cart-btn");
const totalNumberOfItems = document.getElementById("total-items");
const cartSubTotal = document.getElementById("subtotal");
const cartTaxes = document.getElementById("taxes");
const cartTotal = document.getElementById("total");
const showHideCartSpan = document.getElementById("show-hide-cart");



let isCartShowing = false;




const products= [{  
     id: 1,
     name: "Car Holder(6 Pack) #001",
     image:"image/2.jpg",
     category: "$3.5(each) x 6pcs =$21",
     price: 21,
},

  {
    id: 2,
    name: "Usb Cable for Iphone(6 pack)",
    image:"image/3.jpg",
    category: "$1.75(each x 6pcs = $10.5)",

    price: 10.5,
    
   
  },

  {
    id: 3,
    name: "Pumpkin Cupcake",
    image:"image/11.jpg",
 category: "Cupcake",
    price: 3.99,
   
  },
  {
    id: 4,
    name: "Chocolate Cupcake",
    image:"image/101.jpg",
   category: "Cupcake",

    price: 5.99,
 
    
  },
  {
    id: 5,
    name: "Chocolate Pretzels (4 Pack)",
    image:"image/105.jpg",

category: "Pretzel",
    price: 10.99,
    
    
  },
  {
    id: 6,
    name: "Strawberry Ice Cream",
    image:"image/106.jpg",

    category: "Ice Cream",
    price: 2.99,

   
  },
  {
    id: 7,
    name: "Chocolate Macarons (4 Pack)",
    image:"image/305.jpg",
 category: "Macaron",

    price: 9.99,
   
    
  },
  {
    id: 8,
    name: "Strawberry Pretzel",
    image:"image/701.jpg",
category: "Pretzel",

    price: 4.99,
    
    

  },
  {
    id: 9,
    name: "Butter Pecan Ice Cream",
    image:"image/702.jpg",
category: "Ice Cream",

    price: 2.99,
    
    
  },
  {
    id: 10,
    name: "Rocky Road Ice Cream",
    image:"image/607.jpg",

category: "Ice Cream",
    price: 2.99,
    
  
  },
  {
    id: 11,
    name: "Vanilla Macarons (5 Pack)",
    image:"image/608.jpg",

category: "Macaron",
    price: 11.99,
    
   
  },

  {
    id: 12,
    name: "Lemon Cupcakes (4 Pack)",
    image:"image/609.jpg",

category: "Cupcake",
    price: 12.99,
    
    
  },

];

products.forEach(
  ({ name, id,  image, category, price}) => {
    dessertCards.innerHTML += ` 
    
      <div class="dessert-card">
       
       <h2>${name}</h2>
       
        <img src="${image}"></img> 
        
       <p class=" "> Category: ${category}</p>

        <p class="dessert-price">$${price}</p>
        
        <button 
          id="${id}"
          class="btn add-to-cart-btn">Add to cart
        </button>
        
      </div>
     
    `;
  }
);


class ShoppingCart {
    constructor(){

        this.items = [];
        
        this.taxRate = 8.78;
        this.total = 0;
        

    }

   addItem(id, products) {

    const product = products.find((item) => item.id === id);

       const {name, image, category, price,} = product;
       this.items.push(product);

       const totalCountPerProduct = {};
       this.items.forEach((dessert)=>{
        totalCountPerProduct[dessert.id] = (totalCountPerProduct[dessert.id]  || 0) + 1;
       })

   const currentProductCount = totalCountPerProduct[product.id];
   const currentProductCountSpan = document.getElementById(`product-count-for-id${id}`);

    
   currentProductCount > 1
   ? currentProductCountSpan.textContent = `${currentProductCount}x`
   : productsContainer.innerHTML += `
    
  
   
   <div id="dessert${id}" class="product">

   <p>
   <span class="product-count" id="product-count-for-id${id}"></span>${name}</p>

   <img style="width:100px; height:100px"src="${image}"></img>
   
   <p>$${price}</p>
   
   </div>
   

   
   `;


   }

   getCounts(){
    return this.items.length;
   }

   clearCart(){
    if(!this.items.length){
      alert("your shopping cart is already empty");
      return;
    }

     const isCartCleared = confirm(
      "are you sure you want to clear all items from your shopping cart?"
     );

     if(isCartCleared){
      this.items=[];
      this.total = 0;
      productsContainer.innerHTML = "";
      totalNumberOfItems.textContent = 0;
      cartSubTotal.textContent = 0;
      cartTotal.textContent = 0;
      cartTaxes.textContent = 0;

     }


   }


calculateTaxes(amount){
  return parseFloat(((this.taxRate / 100) * amount).toFixed(2))
}

calculateTotal(){
  const subtotal= this.items.reduce((total, item) => total + item.price, 0);
  const tax = this.calculateTaxes(subtotal);
  this.total = subtotal + tax;
  cartSubTotal.textContent = `$${subtotal.toFixed(2)}`;
  cartTaxes.textContent = `$${tax.toFixed(2)}`;
  cartTotal.textContent = `$${this.total.toFixed(2)}`;
  return this.total;
}


}



 

const cart = new ShoppingCart();

const addToCartBtns = document.getElementsByClassName("add-to-cart-btn");

[...addToCartBtns].forEach(
  (btn)=>{
    btn.addEventListener("click", (event)=>{
      cart.addItem(Number(event.target.id), products);
      totalNumberOfItems.textContent = cart.getCounts();
      cart.calculateTotal();
    })
  }
);



clearCartBtn.addEventListener("click", 
cart.clearCart.bind(cart)

)













cartBtn.addEventListener("click", ()=> {
    isCartShowing = !isCartShowing;
   showHideCartSpan.textContent = isCartShowing ? "hide" : "show";
   cartContainer.style.display = isCartShowing ? "block" : "none";
})