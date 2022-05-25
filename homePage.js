let restaurantListContainer = document.getElementById("restaurantListContainer");


async function displayRestuarant() {

    let res = await fetch(`http://localhost:3000/Restaurants`);
    let restaurantList = await res.json();

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
        approxDeliveryTime.innerText = restaurant.approxDeliveryTime;

        let approxPrice = document.createElement('p');
        approxPrice.innerText = restaurant.approxPrice;

        let offerBox = document.createElement('div');
        offerBox.setAttribute('class', 'offerBox');


        let offerIcon = document.createElement('img');
        offerIcon.src = 'https://cdn-icons-png.flaticon.com/512/272/272535.png';

        let offerDetails = document.createElement('p');
        offerDetails.innerText = "40% off  | Use TRYNEW";
        offerDetails.setAttribute('class', 'offerDetails')

        let quickViewDiv = document.createElement('div');

        let quickViewBtn = document.createElement('button');
        quickViewBtn.innerHTML = "QUICK VIEW"



        offerBox.append(offerIcon, offerDetails);

        quickViewDiv.append(quickViewBtn);

        ratingsBox.append(ratingStar, ratings);

        ratingDeliveryPriceBox.append(ratingsBox, approxDeliveryTime, approxPrice);

        restaurantCard.append(restaurantImg, restaurantName, cuisine, ratingDeliveryPriceBox, offerBox, quickViewDiv);

        document.getElementById('restaurantListContainer').append(restaurantCard);

    })

    document.getElementById('noOfRestaurants').innerHTML = `${restaurantList.length} restaurants`
};

displayRestuarant();