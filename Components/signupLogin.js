function overlayHTML(){
    return `<div id="overlay">
        <div id="alertBoxUpperDiv1" class="alertBoxUpperDiv"></div>
    </div>`
}

function signUpHtml(){
    return `<div id="signupDiv">
    <div>
        <span id="closeBtnForSignup">X</span>
        <div class="signLogHead">Sign up</div>
        <div class="signLogPara">or <a id="goToLoginBox">login to your account</a></div>
        <img class="signLogImg" width="100" height="105" alt="" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r">
    </div>
        <form id="userSignupForm">
            <div class="form">
                <input type="tel" required id="userPhoneNumber" class="form__input" autocomplete="off" placeholder=" ">
                <label for="userPhoneNumber" class="form__label">Phone number</label>
              </div>
              <div class="form">
                <input type="text" required id="userName" class="form__input" autocomplete="off" placeholder=" ">
                <label for="userName" class="form__label">Name</label>
              </div>
            <div class="form">
                <input type="email" required id="userEmail" class="form__input" autocomplete="off" placeholder=" ">
                <label for="userEmail" class="form__label">Email</label>
              </div>
              <div class="form">
                <input type="password" required id="userPassword" class="form__input" autocomplete="off" placeholder=" ">
                <label for="userPassword" class="form__label">Password</label>
            </div>
            <a id="referralLine" href="#">Have a referral code?</a>
            <div>
                <input class="submitBtn" type="submit" value="CONTINUE">
                <div class="termConditionLine">By creating an account, I accept the Terms & Conditions & Privacy Policy</div>
            </div>
        </form>
</div>`
}

function loginHTML(){
    return `<div id="loginDiv">
    <div>
        <span id="closeBtnForLogin">X</span>
        <div class="signLogHead">Login</div>
        <div class="signLogPara">or <a id="goToSignupBox">create a new account</a></div>
        <img class="signLogImg" width="100" height="105" alt="" src="https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/Image-login_btpq7r">
    </div>
    <form id="userLoginForm">
        <div class="form">
            <input type="text" required id="enteredEmailOrPhoneNumber" class="form__input" autocomplete="off" placeholder=" ">
            <label for="enteredEmail" class="form__label">Email / Phone number</label>
          </div>
          <div class="form">
            <input type="password" required id="enteredPassword" class="form__input" autocomplete="off" placeholder=" ">
            <label for="enteredPassword" class="form__label">Password</label>
        </div>
        <div style="margin-top: 20px;">
            <input class="submitBtn" type="submit" value="CONTINUE">
            <div class="termConditionLine">By clicking on Login, I accept the Terms & Conditions & Privacy Policy</div>
        </div>
    </form>
</div>`
}

function showLoginBox(){
    let overlay = document.querySelector('#overlay');
    overlay.style.display = 'block';
    let login = document.querySelector('#loginDiv');
    login.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
}

function showSignupBox(){
    let div = document.querySelector('#overlay');
    div.style.display = 'block';
    let signupDiv = document.querySelector('#signupDiv');
    signupDiv.style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
}

function initialPosition(){
    document.querySelector('#overlay').style.display = 'none';
    document.querySelector('#loginDiv').style.display = 'none';
    document.querySelector('#signupDiv').style.display = 'none';
    document.querySelector('body').style.overflow = 'scroll';
    document.querySelector('#userSignupForm').reset();
    document.querySelector('#userLoginForm').reset();
    document.querySelector('#userAddressForm').reset();
    document.querySelectorAll('.locationType').forEach(element =>{
        element.style.backgroundColor = 'white';
        element.style.color = 'black';
    })
    document.querySelector('#addressDiv').style.display = 'none';
};


export {overlayHTML, signUpHtml, loginHTML, showLoginBox, showSignupBox, initialPosition};