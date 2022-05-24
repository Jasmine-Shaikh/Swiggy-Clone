
    let randomTextHeading = document.getElementById('randomTextHeading');
    let randomText = ['Hungry?', 'Game night?','Unexpected guests?', 'Late night at office?', 'Cooking gone wrong?', 'Movie marathon?'];
    let index = 1;
    randomTextHeading.innerText = randomText[index];
    setInterval(() => {
        if(index == randomText.length-1){
            index = 0;
        }
        randomTextHeading.innerText = randomText[index];
        index++;
    },2000);
    
    showProfileSection();

import {footerHTML} from '../Components/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import {overlayHTML, signUpHtml, loginHTML, showLoginBox, showSignupBox, initialPosition} from '../Components/signupLogin.js'

document.getElementById('import1').innerHTML = overlayHTML();
document.getElementById('import2').innerHTML = signUpHtml();
document.getElementById('import3').innerHTML = loginHTML();

document.querySelector('#overlay').addEventListener('click', initialPosition);
document.querySelector('#closeBtnForSignup').addEventListener('click', initialPosition);
document.querySelector('#closeBtnForLogin').addEventListener('click', initialPosition);
document.querySelector('#loginBtn').addEventListener('click', showLoginBox);
document.querySelector('#signupBtn').addEventListener('click', showSignupBox);


let userSignupForm = document.querySelector('#userSignupForm');
let userLoginForm = document.querySelector('#userLoginForm');

userSignupForm.addEventListener('submit', () => {
    event.preventDefault();
    let userPhoneNumber = document.getElementById('userPhoneNumber').value;
    let userName = document.getElementById('userName').value;
    let userEmail = document.getElementById('userEmail').value;
    let userPassword = document.getElementById('userPassword').value;
    let userCart = [];

    let userDetails = {
        userName,
        userEmail,
        userPhoneNumber,
        userPassword,
        userCart
    }
    // console.log(userDetails);
    checkUserOnServers(userDetails);
    

});

function checkUserOnServers(userDetails){
    getDataFromDataBase().then((result) => {
        // console.log(result);
        let ifUserAlreadyInDB = false;
        result.forEach(element => {
            if(userDetails.userEmail == element.userEmail || userDetails.userPhoneNumber == element.userPhoneNumber){
                ifUserAlreadyInDB =true;
            }
        });
        if(!ifUserAlreadyInDB){
            postUserToDataBase(userDetails).then(()=>{
                alert('Account created successfully\nPlease Login');
            }).catch(() => {
                alert('Error');
            });
        }
        else{
            alert('User already exists');
        }
    }).catch((error) => {
        console.log(error);
    })
}

async function postUserToDataBase(userDetails){
    try {
        let post = await fetch(`http://localhost:3000/Users`,{
            method : "POST",
            body : JSON.stringify(userDetails),
            headers : {"Content-Type" : "application/json"}
        });
        // let response = await post.json();
        // console.log(response);
    } catch (error) {
        console.log(error);
    }
}

async function getDataFromDataBase(){
    try {
        let result = await fetch(`http://localhost:3000/Users`);
        let response = await result.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

async function getSingleDataFromDataBase(id){
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`);
        let response = await result.json();
        return response;
    } catch (error) {
        console.log(error);
    }
}

userLoginForm.addEventListener('submit', () => {
    event.preventDefault();
    let enteredEmailOrPhoneNumber = document.getElementById('enteredEmailOrPhoneNumber').value;
    let enteredPassword = document.getElementById('enteredPassword').value;

    // console.log(enteredEmailOrPhoneNumber, enteredPassword);
    getDataFromDataBase().then((result) => {
        // console.log(result);
        let checkUserData = false;
        let userID=-1;
        result.forEach(element => {
            if((enteredEmailOrPhoneNumber == element.userEmail || enteredEmailOrPhoneNumber == element.userPhoneNumber) && enteredPassword == element.userPassword){
                checkUserData =true;
                userID = element.id;
            }
        });
        let localData = [checkUserData,userID];
        if(checkUserData){
            alert('Login Successful');
            initialPosition();
            localStorage.setItem('userProfile',JSON.stringify(localData));
            showProfileSection();
        }
        else{
            alert('Invalid Credentials');
        }
    }).catch((error) => {
        console.log(error);
    })
    
});

function showProfileSection(){
    let loggedUserData = JSON.parse(localStorage.getItem('userProfile'))||[];
    // console.log(loggedUserData);
    if(loggedUserData[0]){
        getSingleDataFromDataBase(loggedUserData[1]).then( (response) => {
            document.querySelector('#navButtonUpperDiv').style.display = 'none';
            document.querySelector('#loggedUpperDiv').style.display = 'block';
            document.querySelector('#loggedUser>div>button').innerText = response.userName;

        }).catch((error) => {
            console.log(error);
        });
    }
    else{
        document.querySelector('#loggedUpperDiv').style.display = 'none';
        document.querySelector('#navButtonUpperDiv').style.display = 'block';
    }
};

document.querySelector('#loggedUpperDiv').addEventListener('mouseenter', () => {
    document.getElementById('logoutDropDown').style.display = 'block';
});

document.querySelector('#loggedUpperDiv').addEventListener('mouseleave', () => {
    document.getElementById('logoutDropDown').style.display = 'none';
});

document.querySelector('#logoutBtn').addEventListener('click', () => {
    localStorage.setItem('userProfile',JSON.stringify([false, -1]));
    showProfileSection();
})