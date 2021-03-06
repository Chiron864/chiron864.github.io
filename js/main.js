var fruitSelect = document.getElementById("fruitSelect");
var dairySelect = document.getElementById("dairySelect");
var vegetableSelect = document.getElementById("vegetableSelect");
var proteinSelect = document.getElementById("proteinSelect");
var grainSelect = document.getElementById("grainSelect");
var otherSelect = document.getElementById("otherSelect");

var addbutton = document.getElementById("addButton");
var removeButton = document.getElementById("removeButton");
var year = document.getElementById("year");

let fruitArray = localStorage.getItem('fruit') ? JSON.parse(localStorage.getItem('fruit')) : [];
let vegetableArray = localStorage.getItem('vegetable') ? JSON.parse(localStorage.getItem('vegetable')) : [];
let dairyArray = localStorage.getItem('dairy') ? JSON.parse(localStorage.getItem('dairy')) : [];
let proteinArray = localStorage.getItem('protein') ? JSON.parse(localStorage.getItem('protein')) : [];
let grainArray = localStorage.getItem('grain') ? JSON.parse(localStorage.getItem('grain')) : [];
let otherArray = localStorage.getItem('other') ? JSON.parse(localStorage.getItem('other')) : [];

localStorage.setItem('fruit', JSON.stringify(fruitArray));
localStorage.setItem('vegetable', JSON.stringify(vegetableArray));
localStorage.setItem('dairy', JSON.stringify(dairyArray));
localStorage.setItem('protein', JSON.stringify(proteinArray));
localStorage.setItem('grain', JSON.stringify(grainArray));
localStorage.setItem('other', JSON.stringify(otherArray));

function resetSelect() {
  fruitSelect.size = fruitSelect.length;
  dairySelect.size = dairySelect.length;
  vegetableSelect.size = vegetableSelect.length;
  proteinSelect.size = proteinSelect.length;
  grainSelect.size = grainSelect.length;
  otherSelect.size = otherSelect.length;
}

function removeOptions(selectbox){
    var i;
    //console.log(selectbox);
    for(i = selectbox.options.length; i > 0; i--){
      //console.log(i);
        selectbox.remove(i);
    }
}

var myForm = document.getElementById("myForm");

myForm.addEventListener("submit", saveFood);

function getKey(){
  if(fruitRadio.checked) {
    return "fruit";
  }else if(vegetableRadio.checked) {
    return "vegetable";
  }else if(dairyRadio.checked) {
    return "dairy";
  }else if(proteinRadio.checked) {
    return "protein";
  }else if(grainRadio.checked) {
    return "grain";
  }else if(otherRadio.checked) {
    return "other";
  }else{
    return "none";
  }
}

function getSelect(stringSelect){
  if (stringSelect === "fruitSelect"){
    select = fruitSelect;
  }else if (stringSelect === "vegetableSelect"){
    select = vegetableSelect;
  }else if (stringSelect === "dairySelect"){
    select = dairySelect;
  }else if (stringSelect === "proteinSelect"){
    select = proteinSelect;
  }else if (stringSelect === "grainSelect"){
    select = grainSelect;
  }else if (stringSelect === "otherSelect"){
    select = otherSelect;
  }else{
    //console.log(stringSelect);
    return null;
  }
}

//Saving Foods

function saveFood(e){
  // Get form values
  var foodInput = document.getElementById("textBox").value;
  var expInput = document.getElementById("expirationInput").value;

  var array = {
    food: foodInput,
    exp: expInput
  }

  // Local Storage & JSON
  if (foodInput){
    if (expInput){
      // If the array is null
      key = getKey();
      //console.log("key", key, getKey());
      if(key !== "none"){
        //console.log("key", key, getKey);
        if(localStorage.getItem(key) === null){
          //Init array
          var arrays = [];
          //Add to array
          arrays.push(array);
          // Set to localStorage
          localStorage.setItem(key, JSON.stringify(arrays));
          //Reset Select Element
          resetSelect();

          // Re-fetch foods
          fetchFood();
        }else{
          // Get foods from localStorage
          var arrays = JSON.parse(localStorage.getItem(key));
          // Add book to array
          arrays.push(array);
          //Reset to localStorage
          localStorage.setItem(key, JSON.stringify(arrays));
          //Reset Select Element
          resetSelect();

          // Re-fetch foods
          fetchFood();
        }
      }else{
        alert("select a food group");
      }

      //Prevent from from submitting
      e.preventDefault();
    }else{
      alert("Please enter an expiration date");
    }
  }else{
    alert("Please enter a food");
  }
}

//Delete Foods
removeButton.addEventListener("click", deleteFood);

function deleteFood(){
  var foodArray = ["fruit", "vegetable", "dairy", "protein", "grain", "other"];
  for(foodGroup = 0; foodGroup < localStorage.length; foodGroup++){
    key = foodArray[foodGroup];
    //Get foods from localStorage
    //console.log("key", key, "foodGroup", foodGroup);
    var arrays = JSON.parse(localStorage.getItem(key));
    for(food = 0; food < arrays.length; food++){
      // Loop through Foods
      stringSelect = key + "Select";
      getSelect(stringSelect);
      //console.log("select", select);
      if (select.selectedIndex !== 0) {
        if (food === select.selectedIndex-1) {
          ////console.log(arrays, fruitSelect.selectedIndex);
          //console.log("array before: ", arrays);
          var selectedIndex = select.selectedIndex;
          //console.log(selectedIndex);
          arrays.splice(selectedIndex-1, 1);
          //console.log("array after: ", arrays);
          //Reset to localStorage
          ////console.log(arrays, fruitSelect.selectedIndex);
          //console.log("stringified arrays", JSON.stringify(arrays), "foodGroup", foodGroup);
          localStorage.setItem(key, JSON.stringify(arrays));

          //Reset Select Element
          resetSelect();

          // Re-fetch foods
          fetchFood();
      }
    }else{
      //console.log("food group highlighted");
    }
    }
  }
}

function monthDays(){
  var dd = new Date();
  var d = new Date(dd.getFullYear(), dd.getMonth()+1, 0);
  console.log(d.getDate());
  return d.getDate();
}

//Fetch foods
function fetchFood(){
  //Find today's Date
  var today = new Date();
  //console.log(today);
  var dd = today.getDate();
  var then = new Date(today.getFullYear(),
   today.getMonth(),
   today.getDate());
  var tempddd = today.getDate();
  console.log(tempddd);
  var ddd = tempddd+7;
  var mmm = then.getMonth()+1;
  var days = monthDays();
  if(ddd > days){
    ddd = ddd - days;
    mmm++;
  }
  var yyyyy = then.getFullYear();
  if(mmm > 12){
    mmm = mmm - 12;
    yyyyy++;
  }
  if(ddd<10) {
    ddd = '0' + ddd;
}

  if(mmm<10) {
      mmm = '0' + mmm;
  }

  if(yyyyy<10){
    yyyyy = '0' + yyyyy;
  }
  //console.log("ddd",ddd);
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();
  if(dd<10) {
    dd = '0'+dd
}

  if(mm<10) {
      mm = '0'+mm
  }
  var today = yyyy + '-' + mm + '-' + dd;
  var today2 = yyyyy + '-' + mmm + '-' + ddd;
  //console.log(today, today2, exp);
  for(foodGroup = 0; foodGroup < localStorage.length; foodGroup++){
    var foodArray = ["fruit", "vegetable", "dairy", "protein", "grain", "other"];
    key = foodArray[foodGroup];
    //Get foods from localStorage
    //console.log("key", key);
    var arrays = JSON.parse(localStorage.getItem(key));
    stringSelect = key + "Select";
    getSelect(stringSelect);
    //console.log("select", select);
    //Build output
    removeOptions(select);
    year.innerHTML = yyyy;
    if(arrays !== null){
      for(var i = 0; i < arrays.length; i++){
        //console.log(arrays);
        var food = arrays[i].food;
        var exp = arrays[i].exp;


        console.log(exp);
        var expMonthDay = exp.substring(5, exp.length);
        console.log(expMonthDay);

        var option = document.createElement('option');
        option.text = food + "  " + expMonthDay;
        option.value = exp;

        //If the expiration date is today
        if(today >= exp){
          option.className = "red";
          //console.log("red", today, exp);
        }else if(today2 >= exp){
          option.className = "yellow";
          //console.log("yellow",today2, exp);
        }else{
          option.className = "green";
          //console.log("green",today, today2, exp);
        }

        select.add(option);
      }
    resetSelect();
    }
  }
}
