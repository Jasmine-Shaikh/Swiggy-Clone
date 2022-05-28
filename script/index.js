
import {footerHTML} from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();


//  async function fetchAndDisplayData(){
//    let url = `http://localhost:3000/Restaurants/${2}`;
//    let res = await fetch(url);
//    console.log(res);
//    let data = await res.json();
//    console.log(data);
//    displayData(data);
//    console.log(data.categories)
//    data.categories.forEach(element => {
//      console.log(element);
//      displayData(element);
//    });
  //  console.log(data.categories.categoryName

//  }


document.querySelector("li").innerText.addEventListener("click",
function(category){
  console.log(category)
   getData(2,category);
})




async function getData(id,category){
  let result = await fetch(`http://localhost:3000/Restaurants/${id}`);
  let ans = await result.json();
  console.log(ans.categories);
  printData(ans.categories,category);
}

function printData(allCategories,category){
  console.log(allCategories,category)
  allCategories.forEach(element => {
      console.log(element);
      if(element.categoryName == category){
          displayData(element);
      }
  });
}

// function displayData(data){
//   document.getElementById('main').innerHTML='';
//   data.forEach(element => {
//       var div = document.createElement('div');

//       var name = document.createElement('h2');
//       name.innerText = element.name;

//       var price = document.createElement('p');
//       price.innerText = 'Price'+ element.price;

//       var details = document.createElement('p');
//       details.innerText = element.details;

//       div.append(name,price,details);

//       document.getElementById('main').append(div);

//   })
// }



  let show = document.getElementById("show");

  function displayData(data){
    document.getElementById('show').innerHTML='';
    data.categoryItems.forEach(user => {
      
      let box = document.createElement('div');
      let imageContainer = document.createElement("div")
      imageContainer.setAttribute('class',"imageCant")
      let paraContainer = document.createElement("div")
      paraContainer.setAttribute('class',"paraCant")
  
      let imageElement = document.createElement('img');
      imageElement.src = user.image;
  
      let titleElement = document.createElement('h3');
      titleElement.innerText = user.name;
   

      let priceElement = document.createElement('p');
      priceElement.innerText = user.price;

      let descElement = document.createElement('p');
      descElement.style.color = "grey";
      descElement.innerText = user.details;
      
      imageContainer.append(imageElement)
      paraContainer.append(titleElement,priceElement, descElement)
      box.append(paraContainer,imageContainer);
      show.append(box);
    });
  }
  
  // fetchAndDisplayData();
  