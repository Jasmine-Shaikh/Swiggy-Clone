import {footerHTML} from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();



let partnerOnboardingHelp = document.getElementById("partnerOnboardingHelp");
partnerOnboardingHelp.addEventListener("click",function(){
   legalHelp.style.backgroundColor = "#edf1f7";
   legalHelp.style.color = "grey"
   faqshelp.style.backgroundColor = "#edf1f7";
   faqshelp.style.color = "grey"
  partnerOnboardingHelp.style.backgroundColor="white";
  partnerOnboardingHelp.style.color = "black"
})

let legalHelp = document.getElementById("legalHelp");
legalHelp.addEventListener("click", function(){
    faqshelp.style.backgroundColor = "#edf1f7";
    faqshelp.style.color = "grey"
    partnerOnboardingHelp.style.backgroundColor="#edf1f7";
    partnerOnboardingHelp.style.color = "grey"
    legalHelp.style.backgroundColor = "white";
    legalHelp.style.color = "black"

})
let faqshelp = document.getElementById("faqshelp");
faqshelp.addEventListener("click", function(){
    partnerOnboardingHelp.style.backgroundColor="#edf1f7";
    partnerOnboardingHelp.style.color = "grey"
    legalHelp.style.backgroundColor = "#edf1f7";
    legalHelp.style.color = "grey"
    faqshelp.style.backgroundColor = "white";
    faqshelp.style.color = "black"
//   restaurantButton.style.backgroundColor="";
//   restaurantButton.style.color = "black"
})