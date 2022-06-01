import { footerHTML } from '../componentsJs/footer.js'
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





let mainContainer = document.getElementById("mainContainer");
let dishesMainContainer = document.getElementById("dishesMainContainer");


let crossButtonInSearchPage = document.getElementById("crossButtonInSearchPage");
crossButtonInSearchPage.addEventListener("click", function() {
    window.location.href = "./index.html";
})

let restaurantButton = document.getElementById("restaurantButton");
restaurantButton.addEventListener("click", function() {
    dishesButton.style.borderBottom = "1px solid white"
    restaurantButton.style.color = "grey"
    restaurantButton.style.color = "black"
    restaurantButton.style = "black"
    restaurantButton.style.borderBottom = "3px solid #fc8019"

    dishesMainContainer.style.display = "none";
    mainContainer.style.display = "grid";

})

let dishesButton = document.getElementById("dishesButton");
dishesButton.addEventListener("click", function() {
    dishesButton.style.color = "black"
    dishesButton.style.borderBottom = "3px solid #fc8019"
    restaurantButton.style.color = "grey"
    restaurantButton.style.borderBottom = "1px solid white"

    mainContainer.style.display = "none";
    dishesMainContainer.style.display = "block";
})

let filterlist = document.getElementById("ulList");
// console.log(filterlist)
let filtertypes = document.getElementById("filtertypes");
filtertypes.addEventListener("click", function() {
    filterlist.style.display = "block";
})
let filterIcon1 = document.getElementById("filterIcon1");
filterIcon1.addEventListener("click", function() {
    filterlist.style.display = "block";
})




document.getElementById("searchInput").addEventListener("input", () => {
    //   console.log(inputText);
    debounce(getList(), 1000);
    debounce(dishesList, 1000);

});

async function getList() {
    try {
        let search = document.getElementById("searchInput").value;
        let result = await fetch(
            `http://localhost:3000/Restaurants/?q=${search}`
        );
        // console.log(result);
        let data = await result.json();
        // console.log(data);
        displayData(data);
        allFilters(data);
    } catch (error) {
        console.log(error);
    }
}





async function dishesList() {
    let search = document.getElementById("searchInput").value;
    try {
        let result = await fetch(`http://localhost:3000/Restaurants/?q=${search}`);
        // console.log(result);
        let data = await result.json();
        // console.log(data);
        // console.log(data.categories);
        data.forEach(element => {
            // console.log(element)
            func(element, data);
        });
        // displayDishesData(data.categories)
    } catch (error) {
        console.log(error);
    }
}



let timerId;

function debounce(fun, wait) {
    if (timerId) {
        clearTimeout(timerId);
    }
    timerId = setTimeout(() => {
        fun();
    }, wait);
}

document.getElementById("relevence").addEventListener("click", function() {
    filtertypes.innerText = "Relevence";
    filterlist.style.display = "none";
    filtertypes.style.marginLeft = "7px"
})

function allFilters(data) {
    document.getElementById('lowToHigh').addEventListener('click', function() {
        data.sort(function(a, b) { return a.approxPrice - b.approxPrice })
        displayData(data);
        filtertypes.innerText = "ByPrice  ";
        filterlist.style.display = "none";
        filtertypes.style.marginLeft = "30px"
    })


    document.getElementById('ratingsSort').addEventListener('click', function() {
        data.sort(function(a, b) { return b.ratings - a.ratings })
        displayData(data);
        filtertypes.innerText = "Rating   ";
        filterlist.style.display = "none";
        filtertypes.style.marginLeft = "35px"

    })

    document.getElementById('deliveryTimeSort').addEventListener('click', function() {
        data.sort(function(a, b) { return a.approxDeliveryTime - b.approxDeliveryTime })
        displayData(data);
        filterlist.style.display = "none";
        filtertypes.innerText = "Delivery ";
        filtertypes.style.marginLeft = "31px"
    })
}


function displayData(datas) {
    mainContainer.innerHTML = "";
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

        let approxDeliveryTime = document.createElement("p");
        approxDeliveryTime.textContent = `${data.approxDeliveryTime} MINS`;

        let approxPriceElement = document.createElement("p");
        approxPriceElement.textContent = `₹${data.approxPrice} FOR TWO`;

        let hrElement = document.createElement("hr");


        let offerElement = document.createElement("p");
        offerElement.setAttribute("class", "offerContainer")
        offerElement.textContent = `40% off | Use WELCOME40 `;
        offerElement.style.color = "#8A584B"
        ratingDeliveryApproxPrice.append(ratingsElement, approxDeliveryTime, approxPriceElement, )
        card.append(imageElement, restaurantNameElement, cuisineElement, ratingDeliveryApproxPrice, hrElement, offerElement);
        mainContainer.append(card);

    });


}


function func(data, rdata) {
    // console.log(data.ratings)
    data.categories.forEach(element => {
        // console.log(element)
        displayDishesData(element, rdata)

    });
}
let retaurentDishesContainer = document.getElementById("retaurentDishesContainer");

function displayDishesData(data, rdata) {
    dishesMainContainer.innerHTML = "";
    //  let cards = document.createElement("div");

    //  let rnameElement = document.createElement("h3");
    //   rnameElement.textContent = rdata.name;

    //   let cuisinesElement = document.createElement("p");
    //   cuisinesElement.textContent = rdata.cuisine;

    //   let paraContainer = document.createElement("div");
    //   paraContainer.setAttribute("id", "parasCont");

    //   let ratingsElement =document.createElement("p");
    //   ratingsElement.textContent = rdata.ratings;

    //   let timeElement = document.createElement("p");
    //   timeElement.textContent= rdata.approxDeliveryTime;

    //   let priceElement = document.createElement("p");
    //   priceElement.textContent = rdata.approxPrice;

    //  paraContainer.append(ratingsElement, timeElement, priceElement);
    //  cards.append(rnameElement, cuisinesElement, paraContainer);
    //  retaurentDishesContainer.append(cards);

    data.categoryItems.forEach(data => {
        let card = document.createElement("div");
        card.setAttribute("id", "cardcontainer")
        let paraBox = document.createElement("div");
        paraBox.setAttribute("id", "paraBoxContainer");
        let imgBox = document.createElement("div");
        imgBox.setAttribute("id", "imgBoxContainer")

        let imageElement = document.createElement("img");
        imageElement.src = data.subimage;
        //  console.log(imageElement);

        let nameElenemt = document.createElement("h3");
        nameElenemt.textContent = data.name;
        //  console.log(name)

        let priceElement = document.createElement("p");
        priceElement.textContent = data.price;

        let detaileElement = document.createElement("p");
        detaileElement.textContent = data.details;
        detaileElement.setAttribute("class", "lastPara")

        imgBox.append(imageElement);
        paraBox.append(nameElenemt, priceElement, detaileElement);

        card.append(paraBox, imgBox);
        dishesMainContainer.append(card)
    });

}

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