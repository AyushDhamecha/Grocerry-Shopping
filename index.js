import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js";

const appSettings = {
    databaseURL: "https://grocerry-ccac0-default-rtdb.asia-southeast1.firebasedatabase.app/"
};

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDB = ref(database, "shoppingList");

const inputFieldEl = document.getElementById("input-field");
const addButtonEl = document.getElementById("add-button");
const shoppingListEl = document.getElementById("shopping-list");

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value;
    push(shoppingListInDB, inputValue);
    clearItems();
});

onValue(shoppingListInDB,function(snapshot){
    if(!snapshot.exists()){
        shoppingListEl.innerHTML="No Items added....yet"
    }
    else {

    let itemsarray=Object.entries(snapshot.val());
    clearShoppingListEl();
    for(let i=0;i<itemsarray.length;i++){
        let currentItem=itemsarray[i];
        let currentItemId=currentItem[0];
        let currentItemValue=currentItem[1];
        renderValue(currentItem);
    } 
    
    }
    
});

function clearShoppingListEl(){
    shoppingListEl.innerHTML="";
}

function clearItems(){
    inputFieldEl.value="";
}

function renderValue(item){
    let itemId=item[0]
    let itemValue=item[1]

    let newEl = document.createElement("li");
    newEl.textContent = itemValue;
    
    newEl.addEventListener("click", function() {
        let exactLocationOfItemInDB = ref(database, `shoppingList/${itemId}`);
        remove(exactLocationOfItemInDB);
    });
    
    shoppingListEl.append(newEl);
}
