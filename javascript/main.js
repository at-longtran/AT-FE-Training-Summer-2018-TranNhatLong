var products = [
  {
    id : "product1",
    img: "image/samsung-galaxy-a8-star-2018-600x600.jpg",
    name: "Samsung Galaxy A8 Star",
    price: 13990000
  },
  {
    id : "product2",
    img: "image/samsung-galaxy-note8-hh-600x600-600x600.jpg",
    name: "Samsung Galaxy Note 8",
    price: 22490000
  },
  {
    id : "product3",
    img: "image/iphone-x-256gb-gray-600x600.jpg",
    name: "iPhone X 256GB Gray",
    price: 34790000
  },
  {
    id : "product4",
    img: "image/samsung-galaxy-a6-2018-2-600x600.jpg",
    name: "Samsung Galaxy A6 (2018)",
    price: 6990000
  },
  {
    id : "product5",
    img: "image/iphone-8-plus-hh-600x600.jpg",
    name: "iPhone 8 Plus 64GB",
    price: 23990000
  },
  {
    id : "product6",
    img: "image/huawei-nova-3e-2-600x600.jpg",
    name: "Huawei Nova 3e",
    price: 6990000
  },
  {
    id : "product7",
    img: "image/ipad-6th-wifi-128-gb-2-600x600.jpg",
    name: "iPad Wifi 128 GB (2018)",
    price: 11990000
  },
  {
    id : "product8",
    img: "image/iphone-6-32gb-gold-hh-600x600.jpg",
    name: "iPhone 6 32GB",
    price: 7490000
  },            
];

if (localStorage.getItem("cart") == undefined) {
  localStorage.cart = JSON.stringify([]);
}
var numberCartedItem = getLocalItem("totalCart");
var listCartedId = JSON.parse(localStorage.cart); 

window.onload = function() {
  updateNumberCarted(numberCartedItem);
  if(location.href.indexOf("product") >= 0) {
    showProduct();
    addEventForProductItem();
  } else {
    showCart();
    addEventForRemoveButton();
  }
}
function getLocalItem(key) {
  console.log(localStorage.getItem(key));
  if (!localStorage.getItem(key)) {
    setLocalItem(key, 0);
    return 0;
  }
  return localStorage.getItem(key); 
}
function setLocalItem(key, value) {
  localStorage.setItem(key, value);
}

function showProduct() {
  var jsonToUlContent = "";
  for (var i = 0; i < products.length; i++) {
    var itemContent = `<li class="product-item" id="${products[i].id}">
      <div>
        <img src="${products[i].img}" alt="">
        <h3 class="product-item-title">${products[i].name}</h3>
        <p class="product-item-price">${products[i].price}</p>
        <button class="product-item-button">Add to cart</button>
      </div>
    </li>`;
    jsonToUlContent += itemContent;
  }
  this.document.getElementsByClassName('product-list')[0].innerHTML = jsonToUlContent;
}

function showCart() {
  var jsonToRowContent = "";
    
  for (x in products) {
    if (listCartedId.indexOf(products[x].id) >= 0) {
      var itemContent = `<tr>
            <td>
              <div class="product-item-carted" id="${products[x].id}">
                <img src="${products[x].img}" alt="">
                <h3 class="product-item-title">${products[x].name}</h3>
                <p class="product-item-price">${products[x].price}</p>
              </div>
            </td>
            <td>1</td>
            <td><button class="remove-btn"></button></td>
          </tr>`;
      jsonToRowContent += itemContent;
    }
  }
  document.getElementsByTagName('tbody')[0].innerHTML = jsonToRowContent;
}

function addEventForProductItem() {
  var productItems = document.querySelectorAll('.product-item .product-item-button');
  var totalItem = productItems.length;
  for (var i = 0; i < totalItem; i++) { //don't use for in due to other key not numberic
    var idProduct = productItems[i].parentElement.parentElement.id;
    if (listCartedId.indexOf(idProduct) >= 0) {
      productItems[i].disabled = true;
    }
    productItems[i].addEventListener("click", function () {
      // console.log(this.parentElement.parentElement.id);
      // localStorage.cart.push(this.parentElement.parentElement.id);//localStorage only supports strings
      listCartedId.push(this.parentElement.parentElement.id);
      localStorage.setItem("cart", JSON.stringify(listCartedId));
      this.disabled = true;

      updateNumberCarted(++numberCartedItem);
    });
  }  
}

function updateNumberCarted(totalItem) {
  document.getElementById('cartedNumber').innerHTML = numberCartedItem;
  setLocalItem("totalCart",numberCartedItem);
}

function addEventForRemoveButton() {
  var productItemsCarted = document.querySelectorAll('.product-item-carted');
  var totalItemCarted = productItemsCarted.length;
  for (let i = 0; i < totalItemCarted; i++) {
    var idProduct = productItemsCarted[i].id;
    productItemsCarted[i].parentElement.parentElement.getElementsByClassName('remove-btn')[0]
    .addEventListener("click", function () {
      listCartedId.splice(listCartedId.indexOf(idProduct), 1);
      localStorage.setItem("cart", JSON.stringify(listCartedId));
      this.parentElement.parentElement.remove();
      updateNumberCarted(--numberCartedItem);
    });
  }  
}
