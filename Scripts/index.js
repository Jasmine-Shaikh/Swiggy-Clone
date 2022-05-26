let restaurantListContainer = document.getElementById("restaurantListContainer");


async function displayRestuarantList() {

    let res = await fetch(`http://localhost:3000/Restaurants`);
    let restaurantList = await res.json();
    let data = JSON.parse(JSON.stringify(restaurantList));
    console.log(data)

    document.getElementById('lowToHigh').addEventListener('click', function() {

        data.sort(function(a, b) { return a.approxPrice - b.approxPrice }

        )
        displayAvailableRestaurants(data)
    })

    document.getElementById('highToLow').addEventListener('click', function() {

        data.sort(function(a, b) { return b.approxPrice - a.approxPrice }

        )
        displayAvailableRestaurants(data)
    })

    document.getElementById('ratingsSort').addEventListener('click', function() {

        data.sort(function(a, b) { return b.ratings - a.ratings }

        )
        displayAvailableRestaurants(data)
    })

    document.getElementById('deliveryTimeSort').addEventListener('click', function() {

        data.sort(function(a, b) { return a.approxDeliveryTime - b.approxDeliveryTime }

        )
        displayAvailableRestaurants(data)
    })

    function displayAvailableRestaurants(restaurantList) {

        document.querySelector('#restaurantListContainer').innerHTML = "";

        restaurantList.forEach((restaurant) => {
            let restaurantCard = document.createElement("div");
            restaurantCard.setAttribute('class', 'restaurantCard');

            let restaurantImg = document.createElement("img");
            restaurantImg.src = restaurant.image;

            let restaurantName = document.createElement('p');
            restaurantName.innerText = restaurant.name;
            restaurantName.setAttribute('class', 'restaurantName');


            let cuisine = document.createElement('p');
            cuisine.innerText = restaurant.cuisine.join(", ");
            cuisine.setAttribute('class', 'cuisine');

            let ratingDeliveryPriceBox = document.createElement("div");
            ratingDeliveryPriceBox.setAttribute('class', 'ratingDeliveryPriceBox');

            let ratingsBox = document.createElement('div');
            ratingsBox.setAttribute('class', 'ratings');

            let ratingStar = document.createElement('img');
            ratingStar.src = ""

            let ratings = document.createElement('p');
            ratings.innerText = restaurant.ratings;

            let approxDeliveryTime = document.createElement('p');
            approxDeliveryTime.innerText = `${restaurant.approxDeliveryTime} MINS`;

            let approxPrice = document.createElement('p');
            approxPrice.innerText = `Rs.${restaurant.approxPrice} FOR TWO`;

            let offerBox = document.createElement('div');
            offerBox.setAttribute('class', 'offerBox');


            let offerIcon = document.createElement('img');
            offerIcon.src = 'https://cdn-icons-png.flaticon.com/512/272/272535.png';

            let offerDetails = document.createElement('p');
            offerDetails.innerText = "40% off  | Use TRYNEW";
            offerDetails.setAttribute('class', 'offerDetails')

            let quickViewDiv = document.createElement('div');

            let quickViewBtn = document.createElement('button');
            quickViewBtn.innerHTML = "QUICK VIEW";
            quickViewDiv.setAttribute('class', 'quickViewDiv');


            let menuBox = document.createElement('div');
            menuBox.setAttribute('class', 'menuBox');

            let menuTitle = document.createElement('h3');
            menuTitle.textContent = "MENU";

            let menuAdd = document.createElement('h6');
            menuAdd.textContent = restaurant.address;

            let menuCategoriesBox = document.createElement('div');
            menuCategoriesBox.setAttribute('class', 'menuCategoriesBox');

            restaurant.categories.forEach((e) => {

                let categoryName = document.createElement('h6');
                categoryName.textContent = e.categoryName;

                menuCategoriesBox.append(categoryName);
            })

            menuBox.append(menuTitle, menuAdd, menuCategoriesBox)




            offerBox.append(offerIcon, offerDetails);

            quickViewDiv.append(quickViewBtn);

            ratingsBox.append(ratingStar, ratings);

            ratingDeliveryPriceBox.append(ratingsBox, approxDeliveryTime, approxPrice);

            restaurantCard.append(restaurantImg, restaurantName, cuisine, ratingDeliveryPriceBox, offerBox, quickViewDiv, menuBox);

            document.getElementById('restaurantListContainer').append(restaurantCard);

        })

        document.getElementById('noOfRestaurants').innerHTML = `${restaurantList.length} restaurants`
    }

    displayAvailableRestaurants(restaurantList);

};

displayRestuarantList();

// ---------------------Filter Modal-------------------

var filterModal = document.getElementById("filterModal");

var btn = document.getElementById("filters");

var span = document.getElementsByClassName("close")[0];


btn.onclick = function() {
    filterModal.style.display = "block";
}

span.onclick = function() {
    filterModal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == filterModal) {
        filterModal.style.display = "none";
    }
}

// ----------------Filter----------------------

// let filterDishes = document.getElementById("filterSubmitBox");

// filterDishes.addEventListener("click", (event) => {

//     let filter = event.target.checked;
//     if (filter) {
//         let filterCriteria = event.target.value;

//         let updatedProductList = productList.filter((prod) => {
//             if (filterCriteria === "Roadster") {
//                 return prod.brand == "Roadster";
//             } else if (filterCriteria === "WROGN") {
//                 return prod.brand == "WROGN";
//             } else if (filterCriteria === "HRX by Hrithik Roshan") {
//                 return prod.brand == "HRX by Hrithik Roshan";
//             } else if (filterCriteria === "Louis Philippe Sport") {
//                 return prod.brand == "Louis Philippe Sport";
//             } else if (filterCriteria === "Puma") {
//                 return prod.brand == "Puma";
//             } else {
//                 return true;
//             }
//         });
//         displayProducts(updatedProductList);
//     }
// });