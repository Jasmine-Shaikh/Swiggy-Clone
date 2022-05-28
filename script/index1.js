
import {footerHTML} from '../componentsJs/footer.js'
document.getElementById('footerPart').innerHTML = footerHTML();

import { navbarHTML } from '../componentsJs/navbar.js';
document.getElementById("navbarContainer").innerHTML = navbarHTML();






let category = document.querySelectorAll(".allListOfFilters");

// console.log(category);

category.forEach(element => {
  // console.log(element);
  element.addEventListener("click",function(){
    console.log(element.innerText)
    let data = element.innerText;
    // fetchAndDisplayData(data);
    getData(data);
  })
});



// function prints(category){
//   console.log(category)
  





async function getData(data){
  let result = await fetch(`http://localhost:3000/Restaurants/2/?q=${data}`);
  let ans = await result.json();
  console.log(ans.categories);
  printData(ans.categories,data);
}

function printData(allCategories,category){
  console.log(allCategories,category)
  allCategories.forEach(element => {
      console.log(element);
      if(element.categoryName == category){
        console.log(element)
          displayData(element);

      }
  });
}

//  async function fetchAndDisplayData(data1){
//    let url = `http://localhost:3000/Restaurants/2/?q=${data1}`
//  async function fetchAndDisplayData(){
//    let url = `http://localhost:3000/Restaurants/${2}`;

//    let res = await fetch(url);
//    console.log(res);
//    let data = await res.json();
//    console.log(data);
//    displayData(data);
  //  console.log(data.categories)
  //  data.categories.forEach(element => {
  //    console.log(element);
  //    displayData(element);
  //  });
  //  console.log(data.categories.categoryName)
//  }

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
    show.innerHTML = "";
    document.getElementById('show').innerHTML='';
    data.categoryItems.forEach(user => {
      
      let box = document.createElement('div');
      let imageContainer = document.createElement("div")
      imageContainer.setAttribute('class',"imageCant")
      let paraContainer = document.createElement("div")
      paraContainer.setAttribute('class',"paraCant")
  
      let imageElement = document.createElement('img');
      imageElement.src = user.image;
      
      let addItems = document.createElement("button");
      addItems.textContent = "ADD";
      // addItems.setAttribute("id","addItems");
      addItems.classList.add('addItems');

      let itemAdditionAndSubtraction = document.createElement("div");
      itemAdditionAndSubtraction.setAttribute("id", "itemAdditionAndSubtraction");

      let SubtractionBtn = document.createElement("button");
      SubtractionBtn.setAttribute("id","SubtractionBtn")
      SubtractionBtn.innerText = "-";
     
      let countContainer = document.createElement("p");
      countContainer.setAttribute("id","countContainer");
      countContainer.innerText = "1";

      let additionBtn = document.createElement("button");
      additionBtn.setAttribute("id","additionBtn");
      additionBtn.innerText = "+";
  
      let titleElement = document.createElement('h3');
      titleElement.innerText = user.name;
   

      let priceElement = document.createElement('p');
      priceElement.innerText = user.price;

      let descElement = document.createElement('p');
      descElement.style.color = "grey";
      descElement.innerText = user.details;

      itemAdditionAndSubtraction.append(SubtractionBtn, countContainer, additionBtn);
      
      imageContainer.append(imageElement,addItems,itemAdditionAndSubtraction);
      paraContainer.append(titleElement,priceElement, descElement)
      box.append(paraContainer,imageContainer);
      show.append(box);
    });
  }
  // let addItems = document.querySelector(".addItems");
  // console.log(addItems);

  // let additionBtn = document.getElementById("additionBtn");
  // console.log(additionBtn)
  // let text = document.createElement("text");
  // console.log(text)