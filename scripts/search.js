
import {footerHTML} from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();

// async function fetchAndDisplayData(){
//     let url = "http://localhost:3000/restaurantsAvailable";
//     let res = await fetch(url);
//     // console.log(res)
//     let data = await res.json();
//     // console.log(data)
//     displayData(data);
   
// }

let restaurantButton = document.getElementById("restaurantButton");
restaurantButton.addEventListener("click",function(){
  dishesButton.style.borderBottom = "1px solid white"
  restaurantButton.style.color = "grey"
  restaurantButton.style.color = "black"
  restaurantButton.style = "black"
  restaurantButton.style.borderBottom = "3px solid #fc8019"

})

let dishesButton = document.getElementById("dishesButton");
dishesButton.addEventListener("click", function(){
  dishesButton.style.color = "black"
  dishesButton.style.borderBottom = "3px solid #fc8019"
  restaurantButton.style.color = "grey"
  restaurantButton.style.borderBottom = "1px solid white"
})




document.getElementById("searchInput").addEventListener("input", () => {
  //   console.log(inputText);
  debounce (getList,1000);
  });

  async function getList (search) {
    try {
      let search = document.getElementById("searchInput").value;
      let result = await fetch(
        `http://localhost:3000/Restaurents`
      );
      console.log(result);
      let data = await result.json();
      console.log(data);
      displayData(data);
    } catch (error) {
      console.log(error);
    }
  }


  let timerId;
  function debounce (fn,wait){
      if(timerId){
          clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
          fn();
      },wait);
  }


  // async function dishesList() {
  //   try {
  //     let result = await fetch(`http://localhost:3000/Restaurents`);
  //     console.log("res" + result);
  //     let data = await result.json();
  //     console.log("data" + data);
  //     console.log("category" + data.categories);
  //     displayDishesData(data.categories)
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }



let mainContainer = document.getElementById("mainContainer");
function displayData(datas){
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

      let approxDeliveryTime = document.createElement("p");
      approxDeliveryTime.textContent = `${data.approxDeliveryTime}`;

      let approxPriceElement = document.createElement("p");
      approxPriceElement.textContent = `₹${data.approxPrice}`;
      
      let hrElement = document.createElement("hr");


      let offerElement = document.createElement("p");
      offerElement.setAttribute("class","offerContainer")
      // offerElement.textContent = `${data.offer}% off | Use WELCOME50 `;
      // offerElement.style.color = "#8A584B"
      ratingDeliveryApproxPrice.append(ratingsElement, approxDeliveryTime, approxPriceElement,)
      card.append(imageElement, restaurantNameElement, cuisineElement,ratingDeliveryApproxPrice,hrElement, offerElement);
      mainContainer.append(card);

  });


}
// let  input = document.getElementById("searchInput");
// input.addEventListener("keyup", fetchAndDisplayData)
// displayData(restaurantsAvailable);

// let dishesMainContainer = document.getElementById("dishesMainContainer");
// function displayDishesData(data){
//    data.forEach(data => {
//       let card = document.createElement("div");
//       let paraBox = document.createElement("div");
//       let imgBox = document.createElement("div");

//       let imageElement = document.createElement("img");
//       imageElement.src = data.subimage;
//       console.log(imageElement);

//       let nameElenemt = document.createElement("h3");
//       nameElenemt.textContent = data.categoryItems.name;
//       console.log(name)

//       let priceElement = document.createElement("p");
//       priceElement.textContent = data.categoryItems.price;

//       let detaileElement = document.createElement("p");
//       detaileElement.textContent = data.categoryItems.details;

//       imgBox.append(imageElement);
//       paraBox.append(nameElenemt, priceElement, detaileElement);

//       card.append(paraBox, imgBox);
//       dishesMainContainer(card)
//    });

// }
// dishesList();
