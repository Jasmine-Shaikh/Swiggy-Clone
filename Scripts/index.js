let restaurantListContainer = document.getElementById("restaurantListContainer");


async function displayRestuarantList() {

    let res = await fetch(`http://localhost:3000/Restaurants`);
    let restaurantList = await res.json();
    let data = JSON.parse(JSON.stringify(restaurantList));

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

    let filterSubmit = document.getElementById("filterSubmit");

    filterSubmit.addEventListener("click", (event) => {
        event.preventDefault();
        let filterDish = document.querySelectorAll('.filterDish');
        console.log(filterDish)
        let filter;
        filterDish.forEach((e) => {
            if (e.checked) {
                filter = e.value;
            }
        });


        let filteredList = data.filter(function(e) {


            return e.cuisine.includes(filter)

        })

        filterModal.style.display = "none";
        displayAvailableRestaurants(filteredList);

    });

    function displayAvailableRestaurants(restaurantList) {

        document.querySelector('#restaurantListContainer').innerHTML = "";

        restaurantList.forEach((restaurant) => {
            let restaurantCard = document.createElement("div");
            restaurantCard.setAttribute('class', 'restaurantCard');


            let restaurantImgAnchor = document.createElement("a");
            restaurantImgAnchor.href = "../restaurantPage.html";

            restaurantImgAnchor.addEventListener('click', function() {
                    
                    localStorage.setItem('restaurantId', restaurant.id);
            });

            let restaurantImg = document.createElement("img");
            restaurantImg.src = restaurant.image;

            restaurantImgAnchor.append(restaurantImg)

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
            offerDetails.innerText = "40% off  | Use WELCOME40";
            offerDetails.setAttribute('class', 'offerDetails')

            let quickViewDiv = document.createElement('div');

            let quickViewBtn = document.createElement('button');
            quickViewBtn.innerHTML = "QUICK VIEW";
            quickViewDiv.setAttribute('class', 'quickViewDiv');

            let menuBoxContainer = document.createElement('div');
            menuBoxContainer.setAttribute('class', 'menuBoxContainer');

            let clickCount = 0;

            quickViewBtn.addEventListener('click', function() {

                if (clickCount % 2 === 0) {

                    let menuBox = document.createElement('div');
                    menuBox.setAttribute('id', 'menuBox');

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
                    menuBoxContainer.append(menuBox)

                } else {
                    document.getElementById('menuBox').remove();
                }

                clickCount++;
            })


            restaurantCard.append(menuBoxContainer)
            offerBox.append(offerIcon, offerDetails);

            quickViewDiv.append(quickViewBtn);

            ratingsBox.append(ratingStar, ratings);

            ratingDeliveryPriceBox.append(ratingsBox, approxDeliveryTime, approxPrice);

            restaurantCard.append(restaurantImgAnchor, restaurantName, cuisine, ratingDeliveryPriceBox, offerBox, quickViewDiv);

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


// -----------------------------------Index Page JS Ends----------------------------------
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

import { footerHTML } from '../Components/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

// import { overlayHTML, signUpHtml, loginHTML, showLoginBox, showSignupBox, initialPosition } from '../Components/signupLogin.js'

// document.getElementById('import1').innerHTML = overlayHTML();
// document.getElementById('import2').innerHTML = signUpHtml();
// document.getElementById('import3').innerHTML = loginHTML();

// document.querySelector('#overlay').addEventListener('click', initialPosition);
// document.querySelector('#closeBtnForSignup').addEventListener('click', initialPosition);
// document.querySelector('#closeBtnForLogin').addEventListener('click', initialPosition);
// document.querySelector('#loginBtn').addEventListener('click', showLoginBox);
// document.querySelector('#signupBtn').addEventListener('click', showSignupBox);

// import { popupHTML, showAlertPopupOverlay, showAlertPopupBody, closeAlertPopup1, closeAlertPopup2 } from '../Components/popup.js';
// document.getElementById('alertBoxUpperDiv1').innerHTML = popupHTML();
// document.getElementById('alertBoxUpperDiv2').innerHTML = popupHTML();
// document.querySelector('#alertBoxUpperDiv1>.alertBox>.closePopup').addEventListener('click', closeAlertPopup1);
// document.querySelector('#alertBoxUpperDiv2>.alertBox>.closePopup').addEventListener('click', closeAlertPopup2);

// let userSignupForm = document.querySelector('#userSignupForm');
// let userLoginForm = document.querySelector('#userLoginForm');

// userSignupForm.addEventListener('submit', (event) => {
//     event.preventDefault();
//     let userPhoneNumber = document.getElementById('userPhoneNumber').value;
//     let userName = document.getElementById('userName').value;
//     let userEmail = document.getElementById('userEmail').value;
//     let userPassword = document.getElementById('userPassword').value;
//     let userCart = [];
//     let userAddresses = [];

//     let userDetails = {
//             userName,
//             userEmail,
//             userPhoneNumber,
//             userPassword,
//             userCart,
//             userAddresses
//         }
//         // console.log(userDetails);
//     checkUserOnServers(userDetails);


// });

// function checkUserOnServers(userDetails) {
//     getDataFromDataBase().then((result) => {
//         // console.log(result);
//         let ifUserAlreadyInDB = false;
//         result.forEach(element => {
//             if (userDetails.userEmail == element.userEmail || userDetails.userPhoneNumber == element.userPhoneNumber) {
//                 ifUserAlreadyInDB = true;
//             }
//         });
//         if (!ifUserAlreadyInDB) {
//             postUserToDataBase(userDetails).then(() => {
//                 // alert('Account created successfully\nPlease Login');
//                 // setTimeout(() => {
//                 initialPosition();
//                 showAlertPopupBody('Account created successfully\nPlease login');
//                 // },1000);
//             }).catch(() => {
//                 // alert('Error');
//                 showAlertPopupOverlay('Something went wrong !! try again');
//             });

//             // showAlertPopupBody('Account created successfully\nPlease login');


//         } else {
//             // alert('User already exists');
//             showAlertPopupOverlay('User already exists');
//         }
//     }).catch((error) => {
//         console.log(error);
//     })
// }

// async function postUserToDataBase(userDetails) {
//     try {
//         let post = await fetch(`http://localhost:3000/Users`, {
//             method: "POST",
//             body: JSON.stringify(userDetails),
//             headers: { "Content-Type": "application/json" }
//         });
//         let response = await post.json();
//         // console.log(response);
//     } catch (error) {
//         console.log(error);
//     }
// }

// async function getDataFromDataBase() {
//     try {
//         let result = await fetch(`http://localhost:3000/Users`);
//         let response = await result.json();
//         return response;
//     } catch (error) {
//         console.log(error);
//     }
// }


async function getSingleDataFromDataBase(id) {
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`);
        let response = await result.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

// userLoginForm.addEventListener('submit', () => {
//     event.preventDefault();
//     let enteredEmailOrPhoneNumber = document.getElementById('enteredEmailOrPhoneNumber').value;
//     let enteredPassword = document.getElementById('enteredPassword').value;

//     // console.log(enteredEmailOrPhoneNumber, enteredPassword);
//     getDataFromDataBase().then((result) => {
//         // console.log(result);
//         let checkUserData = false;
//         let userID = -1;
//         result.forEach(element => {
//             if ((enteredEmailOrPhoneNumber == element.userEmail || enteredEmailOrPhoneNumber == element.userPhoneNumber) && enteredPassword == element.userPassword) {
//                 checkUserData = true;
//                 userID = element.id;
//             }
//         });
//         let localData = [checkUserData, userID];
//         if (checkUserData) {
//             // alert('Login Successful');
//             showAlertPopupBody('Login successful');
//             localStorage.setItem('userProfile', JSON.stringify(localData));
//             // showProfileSection();
//             setTimeout(showProfileSection, 1500)
//             initialPosition();
//         } else {
//             // alert('Invalid Credentials');
//             showAlertPopupOverlay('Invalid credentials');
//         }
//     }).catch((error) => {
//         console.log(error);
//     })

// });



// document.querySelector('#loggedUpperDiv').addEventListener('mouseenter', () => {
//     document.getElementById('logoutDropDown').style.display = 'block';
//     document.getElementById('colorChange').style.color = '#FC8019';
// });

// document.querySelector('#loggedUpperDiv').addEventListener('mouseleave', () => {
//     document.getElementById('logoutDropDown').style.display = 'none';
//     document.getElementById('colorChange').style.color = '#282c3f';
// });

// document.querySelector('#logoutBtn').addEventListener('click', () => {
//     localStorage.setItem('userProfile', JSON.stringify([false, -1]));
//     showProfileSection();
// })



// //////////////////////////////////

// document.getElementById('goToLoginBox').addEventListener('click', () => {
//         // initialPosition();
//         showLoginBox();
//     })
//     // document.getElementById('goToSignupBox').addEventListener('click', () => {
//     //     // initialPosition();
//     //     console.log('hii');
//     //     showSignupBox();
//     // })

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