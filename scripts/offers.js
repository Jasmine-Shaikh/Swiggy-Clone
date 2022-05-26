import {footerHTML} from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();

async function fetchAndDisplayData(){
    let url = "http://localhost:3000/Restaurents";
    let res = await fetch(url);
    // console.log(res)
    let data = await res.json();
    let length = data.length;
    // console.log(data)
    displayData(data, length);
   
}


let restaurantButton = document.getElementById("restaurantButton");
restaurantButton.addEventListener("click",function(){
    // border-bottom: 2px solid black;
  restaurantButton.style.borderBottom = "2px solid black"
  dishesButton.style.borderBottom = "1px solid white"
  dishesButton.style.color = "grey"
  restaurantButton.style.color = "black"
  couponsContainer.style.display = "none"
  alltpyesOfRestaurentOffers.style.display = "block";
})

let dishesButton = document.getElementById("dishesButton");
dishesButton.addEventListener("click", function(){
    restaurantButton.style.borderBottom = "1px solid white"
  dishesButton.style.borderBottom = "2px solid black"
  dishesButton.style.color = "black"
  restaurantButton.style.color = "grey"
  alltpyesOfRestaurentOffers.style.display = "none";
  couponsContainer.style.display = "block"
})

// let couponCode = document.getElementById("couponCode");
// let textCopyBotton = document.getElementById("textCopyBotto");

// textCopyBotton.onclick = function(){
//   couponCode.ariaSelected();
//   document.execCommand("copy");
// }


let mainContainer = document.getElementById("restaurantOffers");

function displayData(datas,length){
    let alloffers = document.getElementById("allOffer").innerText = `All offers (${length})`
    // console.log(length);
  datas.forEach(data => {
      let card = document.createElement("div");

      let imageElement = document.createElement("img");
      imageElement.src = data.image;

      let restaurantNameElement = document.createElement("h4");
      restaurantNameElement.textContent = data.name;
      
      let cuisineElement = document.createElement("p");
      cuisineElement.textContent = data.cuisine;
       
      let ratingDeliveryApproxPrice = document.createElement("div")
      ratingDeliveryApproxPrice.setAttribute("class","ratingDeliveryApproxPrice")
      let ratingsElement = document.createElement("p");
      ratingsElement.textContent = data.ratings;

      let deliveryElement = document.createElement("p");
      deliveryElement.textContent = `${data.approxDeliveryTime}`;

      let approxPriceElement = document.createElement("p");
      approxPriceElement.textContent = `₹${data.approxPrice}`;
      
      let hrElement = document.createElement("hr");


      // let offerElement = document.createElement("p");
      // offerElement.setAttribute("class","offerContainer")
      // offerElement.textContent = `${data.offer}% off | Use WELCOME50 `;
      // offerElement.style.color = "#8A584B"
      ratingDeliveryApproxPrice.append(ratingsElement, deliveryElement, approxPriceElement,)
      card.append(imageElement, restaurantNameElement, cuisineElement,ratingDeliveryApproxPrice,hrElement);
      mainContainer.append(card);

  });


}
fetchAndDisplayData();


