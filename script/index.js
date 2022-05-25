 async function fetchAndDisplayData(){
   let url = "http://localhost:3000/restaurantsAvailable";

   let res = await fetch(url);
   console.log(res);
   let data = await res.json();
   console.log(data);
   displayData(data);
 }

  let show = document.getElementById("show");
  function displayData(data){
    // console.log("hello")
    data.forEach(user => {
      // console.log(user);
      let box = document.createElement('div');
      let imageContainer = document.createElement("div")
      imageContainer.setAttribute('class',"imageCant")
      let paraContainer = document.createElement("div")
      paraContainer.setAttribute('class',"paraCant")
  
      let imageElement = document.createElement('img');
      imageElement.src = user.img;
  
      let titleElement = document.createElement('h3');
      titleElement.innerText = user.title;
      // console.log(nameElement.textContent)

      let priceElement = document.createElement('p');
      priceElement.innerText = user.price;

      let descElement = document.createElement('p');
      descElement.style.color = "grey";
      descElement.innerText = user.desc;
      
      imageContainer.append(imageElement)
      paraContainer.append(titleElement,priceElement, descElement)
      box.append(paraContainer,imageContainer);
      show.append(box);
    });
  }
  // displayData(restaurantsAvailable);
  fetchAndDisplayData();
  