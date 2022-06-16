// document.querySelector('#profileBox').addEventListener('mouseenter', () => {
//     let loggedUserData = JSON.parse(localStorage.getItem('userProfile'))||[];
//     if(loggedUserData[0]){
//         document.getElementById('logoutDiv').style.display = 'block';
//     }
// });

// document.querySelector('#profileBox').addEventListener('mouseleave', () => {
//     document.getElementById('logoutDiv').style.display = 'none';
// });

// document.querySelector('#logoutBtn').addEventListener('click', () => {
//     localStorage.setItem('userProfile',JSON.stringify([false, -1]));
//     showProfileSection();
// });
showProfileSection();
let printedAddressCount = 0;

document.querySelector('#loggedUpperDiv').addEventListener('mouseenter', () => {
    document.getElementById('logoutDropDown').style.display = 'block';
    document.getElementById('colorChange').style.color = '#FC8019';
});

document.querySelector('#loggedUpperDiv').addEventListener('mouseleave', () => {
    document.getElementById('logoutDropDown').style.display = 'none';
    document.getElementById('colorChange').style.color = '#282c3f';

});

document.querySelector('#logoutBtn').addEventListener('click', () => {
    localStorage.setItem('userProfile',JSON.stringify([false, -1]));
    // showProfileSection();
    window.location.reload();
})

function showProfileSection(){
    let loggedUserData = JSON.parse(localStorage.getItem('userProfile'))||[];
    // console.log(loggedUserData);
    if(loggedUserData[0]){
        getSingleDataFromDataBase(loggedUserData[1]).then( (response) => {
            document.querySelector('#navButtonUpperDiv').style.display = 'none';
            document.querySelector('#loggedUpperDiv').style.display = 'block';
            document.querySelector('#loggedUser>div>button').innerText = response.userName;
            if(printedAddressCount<=1){
                showGridDivs(response.userAddresses);
            }

        }).catch((error) => {
            console.log(error);
        });
    }
    else{
        document.querySelector('#loggedUpperDiv').style.display = 'none';
        document.querySelector('#navButtonUpperDiv').style.display = 'block';
    }
};

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
    
    import { popupHTML, showAlertPopupOverlay, showAlertPopupBody, closeAlertPopup1,closeAlertPopup2 } from '../Components/popup.js';
    document.getElementById('alertBoxUpperDiv1').innerHTML = popupHTML();
    document.getElementById('alertBoxUpperDiv2').innerHTML = popupHTML();
    document.querySelector('#alertBoxUpperDiv1>.alertBox>.closePopup').addEventListener('click', closeAlertPopup1);
    document.querySelector('#alertBoxUpperDiv2>.alertBox>.closePopup').addEventListener('click', closeAlertPopup2);
    
    let userSignupForm = document.querySelector('#userSignupForm');
    let userLoginForm = document.querySelector('#userLoginForm');
    
    userSignupForm.addEventListener('submit', (event) => {
        event.preventDefault();
        let userPhoneNumber = document.getElementById('userPhoneNumber').value;
        let userName = document.getElementById('userName').value;
        let userEmail = document.getElementById('userEmail').value;
        let userPassword = document.getElementById('userPassword').value;
        let userCart = [];
        let userAddresses = [];
    
        let userDetails = {
            userName,
            userEmail,
            userPhoneNumber,
            userPassword,
            userCart,
            userAddresses
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
                    // alert('Account created successfully\nPlease Login');
                    // setTimeout(() => {
                        initialPosition();
                        showAlertPopupBody('Account created successfully\nPlease login');
                    // },1000);
                }).catch(() => {
                    // alert('Error');
                    showAlertPopupOverlay('Something went wrong !! try again');
                });
                
                    // showAlertPopupBody('Account created successfully\nPlease login');
                
    
            }
            else{
                // alert('User already exists');
                showAlertPopupOverlay('User already exists');
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
            let response = await post.json();
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
                // alert('Login Successful');
                showAlertPopupBody('Login successful');
                localStorage.setItem('userProfile',JSON.stringify(localData));
                // showProfileSection();
                setTimeout(showProfileSection,1500)
                initialPosition();
                setTimeout(showCartItems,2000)
            }
            else{
                // alert('Invalid Credentials');
                showAlertPopupOverlay('Invalid credentials');
            }
        }).catch((error) => {
            console.log(error);
        })
        
    });    

    let addressedIsSelectedOrNot = false;

document.getElementById('wallet').addEventListener('click',() => {
var checkUserDataInLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
       if(!checkUserDataInLocalStorage[0]){
           showAlertPopupBody('Please Login')
       }
       else if(!addressedIsSelectedOrNot){
           showAlertPopupBody('Select delivery address');
       }
       else{
        let element = document.getElementById('wallet');
        element.style.backgroundColor = '#FFFFFF';
        document.querySelector('#wallet>span').style.fontSize = '17px';
        document.querySelector('#wallet>span').style.color = '#282c3f';
        document.getElementById('walletIcon').setAttribute('src','./walletIcon1.png')
        document.getElementById('walletItemBox').style.display = 'block';
        document.getElementById('paymentgateway').style.display = 'none';
 
        document.getElementById('card').style.backgroundColor = '#EDF1F7';
        document.getElementById('banking').style.backgroundColor = '#EDF1F7';
        document.getElementById('upi').style.backgroundColor = '#EDF1F7';
 
     document.querySelector('#card>span').style.fontSize = '16px';
     document.querySelector('#banking>span').style.fontSize = '16px';
     document.querySelector('#upi>span').style.fontSize = '16px';
 
     document.querySelector('#card>span').style.color = '#686b78';
     document.querySelector('#banking>span').style.color = '#686b78';
     document.querySelector('#upi>span').style.color = '#686b78';
     
     document.getElementById('cardIcon').src = './CardIcon.png';
     document.getElementById('bankingIcon').src = './netBankingIcon.png';
     document.getElementById('upiIcon').src = './upiIcon.png';
 
     document.getElementById('bankingItemBox').style.display = 'none';
     document.getElementById('cardItemBox').style.display = 'none';
     document.getElementById('upiItemBox').style.display = 'none';
 
     document.getElementById('changingPart').innerText = 'Other banks';
       }
    // console.log('hii');
})

document.getElementById('card').addEventListener('click',() => {
var checkUserDataInLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
    if(!checkUserDataInLocalStorage[0]){
        showAlertPopupBody('Please Login')
    }
    else if(!addressedIsSelectedOrNot){
        showAlertPopupBody('Select delivery address');
    }
    else{
        let element = document.getElementById('card');
    document.getElementById('cardDetailsForm').reset();
    element.style.backgroundColor = '#FFFFFF';
    document.querySelector('#card>span').style.fontSize = '17px';
    document.querySelector('#card>span').style.color = '#282c3f';
    document.getElementById('cardIcon').setAttribute('src','./CardIcon1.png')
    document.getElementById('cardItemBox').style.display = 'block';
    document.getElementById('paymentgateway').style.display = 'none';

    document.getElementById('wallet').style.backgroundColor = '#EDF1F7';
    document.getElementById('banking').style.backgroundColor = '#EDF1F7';
    document.getElementById('upi').style.backgroundColor = '#EDF1F7';

    document.querySelector('#wallet>span').style.fontSize = '16px';
    document.querySelector('#banking>span').style.fontSize = '16px';
    document.querySelector('#upi>span').style.fontSize = '16px';

    document.querySelector('#wallet>span').style.color = '#686b78';
    document.querySelector('#banking>span').style.color = '#686b78';
    document.querySelector('#upi>span').style.color = '#686b78';

    document.getElementById('walletIcon').src = './walletIcon.png';
    document.getElementById('bankingIcon').src = './netBankingIcon.png';
    document.getElementById('upiIcon').src = './upiIcon.png';

    document.getElementById('walletItemBox').style.display = 'none';
    document.getElementById('bankingItemBox').style.display = 'none';
    document.getElementById('upiItemBox').style.display = 'none';
    document.getElementById('changingPart').innerText = 'Other banks';
    }

 // console.log('hii');
})

document.getElementById('banking').addEventListener('click',() => {
var checkUserDataInLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
    if(!checkUserDataInLocalStorage[0]){
        showAlertPopupBody('Please Login')
    }
    else if(!addressedIsSelectedOrNot){
        showAlertPopupBody('Select delivery address');
    }
    else{
        let element = document.getElementById('banking');
    element.style.backgroundColor = '#FFFFFF';
    document.querySelector('#banking>span').style.fontSize = '17px';
    document.querySelector('#banking>span').style.color = '#282c3f';
    document.getElementById('bankingIcon').setAttribute('src','./netBankingIcon1.png')
    document.getElementById('bankingItemBox').style.display = 'block';
    document.getElementById('paymentgateway').style.display = 'none';

    document.getElementById('wallet').style.backgroundColor = '#EDF1F7';
    document.getElementById('card').style.backgroundColor = '#EDF1F7';
    document.getElementById('upi').style.backgroundColor = '#EDF1F7';

    document.querySelector('#wallet>span').style.fontSize = '16px';
    document.querySelector('#card>span').style.fontSize = '16px';
    document.querySelector('#upi>span').style.fontSize = '16px';

    document.querySelector('#wallet>span').style.color = '#686b78';
    document.querySelector('#card>span').style.color = '#686b78';
    document.querySelector('#upi>span').style.color = '#686b78';

    document.getElementById('cardIcon').src = './CardIcon.png';
    document.getElementById('upiIcon').src = './upiIcon.png';
    document.getElementById('walletIcon').src = './walletIcon.png';

    document.getElementById('walletItemBox').style.display = 'none';
    document.getElementById('cardItemBox').style.display = 'none';
    document.getElementById('upiItemBox').style.display = 'none';
    document.getElementById('changingPart').innerText = 'Other banks';
    }

 // console.log('hii');
})

document.getElementById('upi').addEventListener('click',() => {
var checkUserDataInLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
    if(!checkUserDataInLocalStorage[0]){
        showAlertPopupBody('Please Login')
    }
    else if(!addressedIsSelectedOrNot){
        showAlertPopupBody('Select delivery address');
    }
    else{
        let element = document.getElementById('upi');
    element.style.backgroundColor = '#FFFFFF';
    document.getElementById('upiDetailsForm').reset();
    document.querySelector('#upi>span').style.fontSize = '17px';
    document.querySelector('#upi>span').style.color = '#282c3f';
    document.getElementById('upiIcon').setAttribute('src','./upiIcon1.png')
    document.getElementById('upiItemBox').style.display = 'block';
    document.getElementById('paymentgateway').style.display = 'none';

    document.getElementById('wallet').style.backgroundColor = '#EDF1F7';
    document.getElementById('card').style.backgroundColor = '#EDF1F7';
    document.getElementById('banking').style.backgroundColor = '#EDF1F7';

    document.querySelector('#wallet>span').style.fontSize = '16px';
    document.querySelector('#card>span').style.fontSize = '16px';
    document.querySelector('#banking>span').style.fontSize = '16px';

    document.querySelector('#wallet>span').style.color = '#686b78';
    document.querySelector('#card>span').style.color = '#686b78';
    document.querySelector('#banking>span').style.color = '#686b78';

    document.getElementById('cardIcon').src = './CardIcon.png';
    document.getElementById('bankingIcon').src = './netBankingIcon.png';
    document.getElementById('walletIcon').src = './walletIcon.png';

    document.getElementById('walletItemBox').style.display = 'none';
    document.getElementById('cardItemBox').style.display = 'none';
    document.getElementById('bankingItemBox').style.display = 'none';
    document.getElementById('changingPart').innerText = 'Other banks';
    }


 // console.log('hii');
});

document.querySelector('#bankSelectBar').addEventListener('mouseenter',() => {
    document.getElementById('downArrowSign').style.color = '#fc8019'
    document.querySelector('.dropDownBanks').style.display = 'block'
})
document.querySelector('.dropDownBanks').addEventListener('mouseleave',() => {
    document.getElementById('downArrowSign').style.color = ''
    document.querySelector('.dropDownBanks').style.display = 'none'
})

let boxes = document.querySelectorAll(".droppDownDivBoxes");
// console.log(boxes);

boxes.forEach(element => {
    element.addEventListener('click',(event) => {
        // console.log(event.target.innerText);
        document.getElementById('changingPart').innerText = event.target.innerText;
    document.querySelector('.dropDownBanks').style.display = 'none'

    })
})

let bankBoxes = document.querySelectorAll('.upperBankInnerBox');

bankBoxes.forEach(element => {
    // console.log(element)
    element.addEventListener('click',() => {
        document.getElementById('hdfc').style.border = '1px solid #e9e9eb';
        document.getElementById('icici').style.border = '1px solid #e9e9eb';
        document.getElementById('sbi').style.border = '1px solid #e9e9eb';
        document.getElementById('axis').style.border = '1px solid #e9e9eb';
        document.getElementById('kotak').style.border = '1px solid #e9e9eb';
    element.style.border = '1px solid #60b246'

    })
})

let cardForm = document.getElementById('cardDetailsForm');
// console.log(cardForm);
cardForm.addEventListener('submit',() => {
    event.preventDefault();
    let cardNumberSize = document.getElementById('cardNumber').value;
    let validthrough = document.getElementById('cardValidity').value;
    let cardcvv = document.getElementById('cardCVV').value;

    // console.log(cardNumberSize.length, validthrough.length, cardcvv.length)
    
    if(cardNumberSize.length != 16 || validthrough.length != 4 ||cardcvv.length != 3){
        // console.log('invalid')
        showAlertPopupBody('Invalid credentials');
    }
    else{
        showAlertPopupBody('Please Wait...');
        setTimeout(()=>{
            document.getElementById('thanksPopup').style.display = 'block';
        },2000);
        setTimeout(()=>{
            document.getElementById('thanksPopup').style.display = 'none';
            doEmptyCart((JSON.parse(localStorage.getItem('userProfile')))[1]);
            document.getElementById('cardDetailsForm').reset();

        },4000)

    }
})

async function doEmptyCart(id){
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`,{
            method : 'PATCH',
            body : JSON.stringify({
                userCart : []
            }),
            headers : {"Content-Type" : "application/json"}
        })
    } catch (error) {
        console.log(error);
    }
}

document.getElementById('newAddress').addEventListener('click',()=>{
    // console.log('hello');
    var checkUserDataInLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
    if(!checkUserDataInLocalStorage[0]){
      showAlertPopupBody('Please Login')
    }
    else{
        let overlay = document.querySelector('#overlay');
    overlay.style.display = 'block';
    document.getElementById('addressDiv').style.display = 'block';
    document.querySelector('body').style.overflow = 'hidden';
    }
    
})

let selectedLocationType = undefined;

document.getElementById('typeHome').addEventListener('click', () => {
    document.getElementById('typeHome').style.backgroundColor = 'black';
    document.getElementById('typeHome').style.color = 'white';
    document.getElementById('typeWork').style.backgroundColor = 'white';
    document.getElementById('typeOthers').style.backgroundColor = 'white';
    document.getElementById('typeWork').style.color = 'black';
    document.getElementById('typeOthers').style.color = 'black';
    // console.log(event)
    selectedLocationType = event.target.innerText;
// console.log(selectedLocationType);

})
document.getElementById('typeWork').addEventListener('click', () => {
    document.getElementById('typeWork').style.backgroundColor = 'black';
    document.getElementById('typeWork').style.color = 'white';
    document.getElementById('typeHome').style.backgroundColor = 'white';
    document.getElementById('typeOthers').style.backgroundColor = 'white';
    document.getElementById('typeHome').style.color = 'black';
    document.getElementById('typeOthers').style.color = 'black';
    // console.log(event)
    selectedLocationType = event.target.innerText;
// console.log(selectedLocationType);
    
})
document.getElementById('typeOthers').addEventListener('click', () => {
    document.getElementById('typeOthers').style.backgroundColor = 'black';
    document.getElementById('typeOthers').style.color = 'white';
    document.getElementById('typeWork').style.backgroundColor = 'white';
    document.getElementById('typeHome').style.backgroundColor = 'white';
    document.getElementById('typeWork').style.color = 'black';
    document.getElementById('typeHome').style.color = 'black';
    // console.log(event)
    selectedLocationType = event.target.innerText;
// console.log(selectedLocationType);
    
})

document.querySelector('#closeBtnForAddressDiv').addEventListener('click', () =>{
    initialPosition();
    selectedLocationType = undefined;
});

document.querySelector('#userAddressForm').addEventListener('submit', ()=>{
    event.preventDefault();
    if(selectedLocationType == undefined){
        showAlertPopupOverlay('Select Location Type');
    }
    else{
        // console.log('hii');
         let addressDetails = {
            flatNumber : document.getElementById('enteredFlatNumber').value,
            landmark : document.getElementById('enteredLandmark').value,
            location : document.getElementById('enteredLocation').value,
            locationType : selectedLocationType
         }
         var checkUserDataInLocalStorage = JSON.parse(localStorage.getItem('userProfile'));
        // console.log(flatNumber,landmark,location,locationType);
        // console.log(addressDetails)
        getSingleDataFromDataBase(checkUserDataInLocalStorage[1]).then((result)  => {
            // console.log(result);
            let allAddresses = result.userAddresses;
            allAddresses.push(addressDetails);
            putAddressDataToDataBase(allAddresses,checkUserDataInLocalStorage[1]);
            initialPosition();
        }).catch((error) => {
            console.log(error);
        });
    }
})

async function putAddressDataToDataBase(allAddresses,id){
    try {
        let result = await fetch(`http://localhost:3000/Users/${id}`,{
            method : 'PATCH',
            body : JSON.stringify({
                userAddresses : allAddresses
            }),
            headers : {"Content-Type" : "application/json"}
        })
    } catch (error) {
        console.log(error)
    }
}

if((JSON.parse(localStorage.getItem('userProfile')))[0]){
    getSingleDataFromDataBase((JSON.parse(localStorage.getItem('userProfile')))[1]).then((result)=>{
        showGridDivs(result.userAddresses);
    })
}


function showGridDivs(data){
    printedAddressCount++;
    
    if(printedAddressCount<=1){
        var count = 1;
        data.forEach(element => {
            var div = document.createElement('div');
            div.setAttribute('class','dynamicAddressDiv')
            div.setAttribute('id',`dynamicDiv${count}`)
            
            var innerDiv = document.createElement('div');

            var locationTypeHead = document.createElement('h3');
            locationTypeHead.innerText = element.locationType;
            
            var fullAdd = document.createElement('p');
            fullAdd.innerText = `${element.flatNumber},${element.landmark},${element.location}`;
            
            var btnDiv = document.createElement('button');
            btnDiv.setAttribute('class','deliverHereBtn')
            btnDiv.innerText = 'DELIVER HERE'
            btnDiv.setAttribute('id',count)
            
            btnDiv.addEventListener('click',(event)=>{
                // changeBorder(event.target.id);
                const id = event.target.id;
                const length = data.length;

                addressedIsSelectedOrNot = true;
                // console.log(id,data.length);
                changeBorder(id,length)
                // dynamicDivId = count;
                // console.log(count);
                // console.log(`dynamicDiv${count}`);
                
            })
            count++;
            
            innerDiv.append(locationTypeHead,fullAdd,btnDiv);
            div.append(innerDiv);
            document.getElementById('addresses').append(div);
            
        })
        // totalAddressesLength = count;
    }
}

// console.log(totalAddressesLength)
function changeBorder(id,length){
    for(var i=1;i<=length;i++){
        if(i==id){
            document.querySelector(`#dynamicDiv${i}`).style.borderColor = '#60b246';
        }
        else{
            document.querySelector(`#dynamicDiv${i}`).style.borderColor = '#e9e9eb';
        }
    }
    // console.log(id,length)
}
if(JSON.parse(localStorage.getItem('userProfile'))[0]){
    showCartItems();
}

function showCartItems(){
    getSingleDataFromDataBase(JSON.parse(localStorage.getItem('userProfile'))[1]).then(result => {
        // console.log(result.userCart);
        if(result.userCart.length>0){
            document.getElementById('emptyCart').style.display = 'none';
            document.getElementById('divForCartDataUpperDiv').style.display = 'block';
            document.getElementById('saveMoneyBox').style.display = 'block';
            document.getElementById('rightSideUpperBoxForCartDiv3Up').style.display = 'block';
            showCartDataInBox(result.userCart);
        }
    })
}

function showCartDataInBox(cartData){
    document.getElementById('divForCartData').innerHTML = '';
    let itemTotal = 0;
    cartData.forEach(element => {
        itemTotal+=(element.count*element.price);
        var div = document.createElement('div');
        div.setAttribute('class','singleCartItemBox');

        var name = document.createElement('span')
        name.innerText = element.name;
        name.setAttribute('class','nameSpan');

        var price = document.createElement('span');
        price.innerText = `${element.count} * ${element.price} = ₹${element.count*element.price}`
        price.setAttribute('class','priceSpan');

        div.append(name,price);
        document.getElementById('divForCartData').append(div)
    })
    document.getElementById('ItemTotal').innerText = '₹'+itemTotal;
    document.getElementById('charges').innerText = '₹'+Math.round(((itemTotal/100)*5));
    document.getElementById('totalPayableAmount').innerText = '₹'+(itemTotal+Math.round(((itemTotal/100)*5)));
    // document.getElementById('savedMoney').innerText = 52;
}


// let offerArray = ['masai30','akash25','jasmine100']
let promoApplyCount = 0;
document.getElementById('applyPromoCode').addEventListener('click',()=>{
    let promocode = document.getElementById('promoCodeValue').value;
    let totalAmount = (document.getElementById('totalPayableAmount').innerText).substring(1);

    if(promoApplyCount>=1){
        showAlertPopupBody('Already Applied')
        return;
    }
    if(promocode==''){
        showAlertPopupBody('Invalid Credentials')
        return;
    }
    // console.log(promocode,totalAmount.substring(1));
    if(promocode == 'masai30'){
        document.getElementById('promoCodeValue').value ='';
        promoApplyCount++;
        let discount = Math.round((totalAmount/100)*30)
        document.getElementById('offByPromo').innerText = "- ₹"+discount;
        document.getElementById('savedMoney').innerText = (52+discount);
        document.getElementById('totalPayableAmount').innerText = '₹'+(totalAmount-discount);
        document.getElementById('offerDiv').style.display='block';
        return;
    }
    else if(promocode== 'welcome40'){
        document.getElementById('promoCodeValue').value ='';
        promoApplyCount++;
        let discount = Math.round((totalAmount/100)*40);
        document.getElementById('savedMoney').innerText = (52+discount);
        document.getElementById('offByPromo').innerText = "- ₹"+discount;
        document.getElementById('totalPayableAmount').innerText = '₹'+(totalAmount-discount);
        document.getElementById('offerDiv').style.display='block';

        return;
    }
    else{
        showAlertPopupBody('Invalid Promo Code')
    }
})

document.getElementById('goToLoginBox').addEventListener('click', () => {
    // initialPosition();
    showLoginBox();
})

document.querySelector('.navBox').addEventListener('click',()=>{
    window.location.href = 'help.html';
    // console.log('hii');
})