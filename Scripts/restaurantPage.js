import { popupHTML, closeAlertPopup2, showAlertPopupBody } from '../Components/popup.js';
document.getElementById('alertBoxUpperDiv2').innerHTML = popupHTML();
document.querySelector('#alertBoxUpperDiv2>.alertBox>.closePopup').addEventListener('click', closeAlertPopup2);

import { footerHTML } from '../Components/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

var restaurantId = localStorage.getItem('restaurantId');

// console.log(restaurantId);

async function getSingleDataFromDataBase(restaurantId) {
    const response = await fetch(`http://localhost:3000/restaurants/${restaurantId}`);
    const data = await response.json();
    // console.log(data);
    // return data;
    DisplayData(data);
}

getSingleDataFromDataBase(restaurantId);

async function getSingleUserDataFromDataBase(id) {
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`);
        let response = await result.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

function showProfileSection() {
    let loggedUserData = JSON.parse(localStorage.getItem('userProfile')) || [];
    // console.log(loggedUserData);
    if (loggedUserData[0]) {
        getSingleUserDataFromDataBase(loggedUserData[1]).then((response) => {
            document.querySelector('#signInA').innerHTML = `<img id="profileImgIcon" src="https://www.transparentpng.com/thumb/user/single-user-icon-png-free--rLHSHx.png" alt="">${response.userName}`;

        }).catch((error) => {
            console.log(error);
        });
    } else {

        document.querySelector('#signInA').innerHTML = `<img id="profileImgIcon" src="https://www.transparentpng.com/thumb/user/single-user-icon-png-free--rLHSHx.png" alt="">Guest`;
    }
};

showProfileSection();

function DisplayData(data){
    document.querySelector('#restaurantImageDiv>img').src = data.image;
    document.getElementById('restaurantDetailsDivName').innerText = data.name;
    document.getElementById('restaurantDetailsDivCuisine').innerText = data.cuisine;
    document.getElementById('restaurantDetailsDivAddress').innerText = data.address;
    document.querySelector('#restaurantRating>h4').innerText = '★ '+data.ratings;
    document.querySelector('#restaurantDeliveryTime>h4').innerText = data.approxDeliveryTime + ' mins';
    document.querySelector('#restaurantCost>h4').innerText = '₹ '+data.approxPrice;
    document.getElementById('categoryList').innerHTML = '';
    data.categories.forEach(element => {
        var listItem = document.createElement('li');
        listItem.innerText = element.categoryName;
        listItem.setAttribute('class', 'list-group-item');
        if(element.categoryName == 'Recommended'){
            showFoodItemsInBox(listItem,element);
        }
        listItem.addEventListener('click',()=>{
            showFoodItemsInBox(listItem,element);
        })

        document.getElementById('categoryList').append(listItem);
    });
}

function changeOthersColorAndBorder (){
    document.querySelectorAll('.list-group-item').forEach(element => {
        element.style.color = '#000';
        element.style.border = 'none';
        element.style.fontWeight = '400';
    });
}

function showFoodItemsInBox(listItem,element){
    changeOthersColorAndBorder();
            listItem.style.color = '#fc8019';
            listItem.style.borderRight = '2px solid #fc8019';
            listItem.style.fontWeight = '600';
            document.getElementById('categoryHeading').innerText = element.categoryName;
            document.getElementById('totalItemsCountInCategory').innerText = `${element.categoryItems.length} items`;
            document.getElementById('totalItemsInCategory').innerHTML = '';
            element.categoryItems.forEach(item => {
                var itemDiv = document.createElement('div');
                itemDiv.setAttribute('class', 'foodItemCard');

                var name = document.createElement('h5');
                name.innerText = item.name;
                name.setAttribute('class', 'foodItemName');

                var price = document.createElement('p')
                price.innerText = '₹ '+item.price;
                price.setAttribute('class', 'foodItemPrice');

                var description = document.createElement('p');
                description.innerText = item.details;
                description.setAttribute('class', 'foodItemDescription');

                var addToCartBtn = document.createElement('button');
                addToCartBtn.innerText = 'Add to Cart';
                addToCartBtn.setAttribute('class', 'addToCartBtn');
                addToCartBtn.addEventListener('click',()=>{
                    addToCart(item);
                    showCartAtNavBar();
                });

                itemDiv.append(name, price, description,addToCartBtn);
                document.getElementById('totalItemsInCategory').append(itemDiv);
            });
}

async function addToCart(item){
    // console.log(item);
    let loggedUserData = JSON.parse(localStorage.getItem('userProfile'));
    if(loggedUserData[0]){
        var userData = await getSingleUserDataFromDataBase(loggedUserData[1]);
        // console.log(userData);
        // let cartObject = item;
        // cartObject.count = 1;
        var userCart = userData.userCart;
        // console.log(userCart);
        var checkItemInCart = false;
        userCart.forEach(element => {
            if(element.name == item.name){
                element.count++;
                checkItemInCart = true;
            }
        });
        if(!checkItemInCart){
            item.count = 1;
            userCart.push(item);
        }
        postCartInDataBase(userCart,loggedUserData[1]);
        // console.log(userCart);
    }
    else{
        // alert('login to add to cart');
        showAlertPopupBody('Please Login');
    }

    // console.log(cartObject);  
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

async function postCartInDataBase(userCart,id){
    try {
        var response = await fetch(`http://localhost:3000/Users/${id}`,{
            method: 'PATCH',
            body : JSON.stringify({
                userCart: userCart
            }),
            headers: {"Content-Type": "application/json"}
        });
        // event.preventDefault();
        // showCartAtNavBar();
    } catch (error) {
        console.log(error)
    }
}

