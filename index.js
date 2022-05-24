let restaurantsAvailable = [{
    "img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/obppgtgqevlsog4v7asi",
    "title": "Basil Pesto Paneer Pizza (Thin Crust)",
    "price": "292",
    "desc": "Basil Pesto Paneer Pizza (Thin Crust)"
  }, {
    "img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/euaev67hctjnqi0a5p26" ,
    "title":"Caramelized Onion & Feta Cheese Pizza (Thin Crust)",
    "price": "169",
    "desc":"Caramelized Onion & Feta Cheese Pizza (Thin Crust)"
  }, {
    "img": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/l0udrkr0xchcdka2eaei",
    "title": "Match-day Veg Pizza Fest",
    "price": 327,
    "desc": "Feast on thin crust Mother earth pizza and premium classic margherita pizza during an eventful match",
  }, {
    "img": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/obppgtgqevlsog4v7asi",
    "title": "Caramelized Onion & Feta Cheese Pizza (Thin Crust)",
    "price": 215,
    "desc": " Caramelized Onion & Feta Cheese Pizza (Thin Crust)",
   }, {
     "img":"https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/xs2yrrmbov3ix9bmhnnq",
     "title":"Italian Pink Sauce Penne Pasta with Paprika",
     "price": 200,
    "desc":"Pasta tossed in rich & cheesy sauce with Italian herbs & vegetables with a touch of Chef's special condiments",
   }, {
    "img": "https://res.cloudinary.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/lw0w9wdv7poaipovtewi",
    "title": "Elaichi Kesar Kulfi",
    "price": 352,
    "desc": "Rich and creamy kulfi, made with whole milk, healthy khandasari sugar, saffron and cardamom. Allergen information: Dairy."
   
 

  
  }]


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
      descElement.innerText = user.desc;
      
      
      imageContainer.append(imageElement)
      paraContainer.append(titleElement,priceElement, descElement)
      box.append(paraContainer,imageContainer);
      show.append(box);
    });
  }
  displayData(restaurantsAvailable);
  