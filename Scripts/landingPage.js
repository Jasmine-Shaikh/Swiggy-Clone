
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

import {footerHTML} from '../Componants/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import {overlayHTML, signUpHtml, loginHTML, showLoginBox, showSignupBox, initialPosition} from '../Componants/signupLogin.js'

document.getElementById('import1').innerHTML = overlayHTML();
document.getElementById('import2').innerHTML = signUpHtml();
document.getElementById('import3').innerHTML = loginHTML();

document.querySelector('#overlay').addEventListener('click', initialPosition);
document.querySelector('#closeBtnForSignup').addEventListener('click', initialPosition);
document.querySelector('#closeBtnForLogin').addEventListener('click', initialPosition);
document.querySelector('#loginBtn').addEventListener('click', showLoginBox);
document.querySelector('#signupBtn').addEventListener('click', showSignupBox);