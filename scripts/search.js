
import {footerHTML} from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();

async function fetchAndDisplayData(){
    let url = "http://localhost:3000/restaurantsAvailable";
    let res = await fetch(url);
    // console.log(res)
    let data = await res.json();
    // console.log(data)
    displayData(data);
   
}

let restaurantButton = document.getElementById("restaurantButton");
restaurantButton.addEventListener("click",function(){
   dishesButton.style.backgroundColor = "";
  dishesButton.style.color = "black"
  restaurantButton.style.backgroundColor="black";
  restaurantButton.style.color = "white"
})

let dishesButton = document.getElementById("dishesButton");
dishesButton.addEventListener("click", function(){
  dishesButton.style.backgroundColor = "black";
  dishesButton.style.color = "white"
  restaurantButton.style.backgroundColor="";
  restaurantButton.style.color = "black"
})



let mainContainer = document.getElementById("mainContainer");
function displayData(datas){
  datas.forEach(data => {
      let card = document.createElement("div");

      let imageElement = document.createElement("img");
      imageElement.src = data.image;

      let restaurantNameElement = document.createElement("h4");
      restaurantNameElement.textContent = data.restaurantName;
      
      let cuisineElement = document.createElement("p");
      cuisineElement.textContent = data.cuisine;
       
      let ratingDeliveryApproxPrice = document.createElement("div")
      ratingDeliveryApproxPrice.setAttribute("class","ratingDeliveryApproxPrice")
      let ratingsElement = document.createElement("p");
      ratingsElement.textContent = data.ratings;

      let deliveryElement = document.createElement("p");
      deliveryElement.textContent = `${data.delivery} MINS`;

      let approxPriceElement = document.createElement("p");
      approxPriceElement.textContent = `₹${data.approxPrice} FOR TWO`;
      
      let hrElement = document.createElement("hr");


      let offerElement = document.createElement("p");
      offerElement.setAttribute("class","offerContainer")
      offerElement.textContent = `${data.offer}% off | Use WELCOME50 `;
      offerElement.style.color = "#8A584B"
      ratingDeliveryApproxPrice.append(ratingsElement, deliveryElement, approxPriceElement,)
      card.append(imageElement, restaurantNameElement, cuisineElement,ratingDeliveryApproxPrice,hrElement, offerElement);
      mainContainer.append(card);

  });


}
let  input = document.getElementById("searchInput");
input.addEventListener("keyup", fetchAndDisplayData)
// displayData(restaurantsAvailable);


