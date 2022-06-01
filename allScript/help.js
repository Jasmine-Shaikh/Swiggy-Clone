import { footerHTML } from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();


let rightHelp = document.getElementById("rightHelp");
let legelHelppage = document.getElementById("legalHelppage");
let faqsHelpPage = document.getElementById("faqsHelpPage");

let partnerOnboardingHelp = document.getElementById("partnerOnboardingHelp");
partnerOnboardingHelp.addEventListener("click", function() {
    legalHelp.style.backgroundColor = "#edf1f7";
    legalHelp.style.color = "grey"
    faqshelp.style.backgroundColor = "#edf1f7";
    faqshelp.style.color = "grey"
    partnerOnboardingHelp.style.backgroundColor = "white";
    partnerOnboardingHelp.style.color = "black"

    faqsHelpPage.style.display = "none"
    legelHelppage.style.display = "none"
    rightHelp.style.display = "block";

})

let legalHelp = document.getElementById("legalHelp");
legalHelp.addEventListener("click", function() {
    faqshelp.style.backgroundColor = "#edf1f7";
    faqshelp.style.color = "grey"
    partnerOnboardingHelp.style.backgroundColor = "#edf1f7";
    partnerOnboardingHelp.style.color = "grey"
    legalHelp.style.backgroundColor = "white";
    legalHelp.style.color = "black"

    rightHelp.style.display = "none";
    faqsHelpPage.style.display = "none"
    legelHelppage.style.display = "block"
})

let faqshelp = document.getElementById("faqshelp");
faqshelp.addEventListener("click", function() {
    partnerOnboardingHelp.style.backgroundColor = "#edf1f7";
    partnerOnboardingHelp.style.color = "grey"
    legalHelp.style.backgroundColor = "#edf1f7";
    legalHelp.style.color = "grey"
    faqshelp.style.backgroundColor = "white";
    faqshelp.style.color = "black"

    rightHelp.style.display = "none";
    legelHelppage.style.display = "none"
    faqsHelpPage.style.display = "block"

})


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