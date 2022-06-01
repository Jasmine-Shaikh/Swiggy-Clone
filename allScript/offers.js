import { footerHTML } from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();

async function fetchAndDisplayData() {
    let url = "http://localhost:3000/Restaurants";
    let res = await fetch(url);
    // console.log(res)
    let data = await res.json();
    let length = data.length;
    // console.log(data)
    displayData(data, length);

}


let restaurantButton = document.getElementById("restaurantButton");
restaurantButton.addEventListener("click", function() {
    // border-bottom: 2px solid black;
    restaurantButton.style.borderBottom = "2px solid black"
    dishesButton.style.borderBottom = "1px solid white"
    dishesButton.style.color = "grey"
    restaurantButton.style.color = "black"
    couponsContainer.style.display = "none"
    alltpyesOfRestaurentOffers.style.display = "block";
})

let dishesButton = document.getElementById("dishesButton");
dishesButton.addEventListener("click", function() {
    restaurantButton.style.borderBottom = "1px solid white"
    dishesButton.style.borderBottom = "2px solid black"
    dishesButton.style.color = "black"
    restaurantButton.style.color = "grey"
    alltpyesOfRestaurentOffers.style.display = "none";
    couponsContainer.style.display = "block"
})
// console.log(alltpyesOfRestaurentOffers);
// console.log(couponsContainer)

// let couponCode = document.getElementById("couponCode").innerText;
// console.log(couponCode);


// couponCode.addEventListener
// document.getElementById("textCopyBotton").addEventListener("click",function(){
//    couponCode.ariaSelected();
//    document.execCommand("copy");
// })

// textCopyBotton.onclick = function(){
//   couponCode.ariaSelected();
//   document.execCommand("copy");
// } 

// couponCode.addEventListener("click", ()=>{
//   textCopyBotton.classList.add("avtive");
//   copyToClipboard();
// })



let mainContainer = document.getElementById("restaurantOffers");

function displayData(datas, length) {
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
        ratingDeliveryApproxPrice.setAttribute("class", "ratingDeliveryApproxPrice")
        let ratingsElement = document.createElement("p");
        ratingsElement.textContent = data.ratings;

        let deliveryElement = document.createElement("p");
        deliveryElement.textContent = `${data.approxDeliveryTime} MINS`;

        let approxPriceElement = document.createElement("p");
        approxPriceElement.textContent = `₹${data.approxPrice} FOR TWO`;

        let hrElement = document.createElement("hr");

        let offerElement = document.createElement("p");
        offerElement.setAttribute("class", "offerContainer")
        offerElement.textContent = `40% off | Use WELCOME40 `;
        offerElement.style.color = "#8A584B"
        ratingDeliveryApproxPrice.append(ratingsElement, deliveryElement, approxPriceElement, )
        card.append(imageElement, restaurantNameElement, cuisineElement, ratingDeliveryApproxPrice, hrElement, offerElement);
        mainContainer.append(card);
    });


}
fetchAndDisplayData();


// -----------------Update name--------------------
function showProfileSection() {
    let loggedUserData = JSON.parse(localStorage.getItem('userProfile')) || [];
    // console.log(loggedUserData);
    if (loggedUserData[0]) {
        getSingleDataFromDataBase(loggedUserData[1]).then((response) => {
            document.querySelector('#signInA').innerHTML = `<img id="profileImgIcon" src="https://www.transparentpng.com/thumb/user/single-user-icon-png-free--rLHSHx.png" alt="">${response.userName}`;

        }).catch((error) => {
            console.log(error);
        });
    } else {

        document.querySelector('#signInA').innerHTML = `<img id="profileImgIcon" src="https://www.transparentpng.com/thumb/user/single-user-icon-png-free--rLHSHx.png" alt="">Guest`;
    }
};

showProfileSection();

async function getSingleDataFromDataBase(id) {
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`);
        let response = await result.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getSingleUserDataFromDataBase(id) {
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`);
        let response = await result.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

function showCartAtNavBar(){
    let loggedUserData = JSON.parse(localStorage.getItem('userProfile'));
    if(loggedUserData[0]){
        getSingleUserDataFromDataBase(loggedUserData[1]).then((response) => {
            document.querySelector('#noOfCartItems').style.display = 'block';
            document.querySelector('#noOfCartItems').innerText = response.userCart.length;
        }).catch((error) => {
            console.log(error);
        });
    }
}
showCartAtNavBar();