const appSettings={
    databaseURL: "https://realtime-database-a2503-default-rtdb.asia-southeast1.firebasedatabase.app/"
}
import {initializeApp} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import {ref, getDatabase, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const endorseEl = document.getElementById("endorse-el")
const fromEl = document.getElementById("from-el")
const toEl = document.getElementById("to-el")
const publishBtn = document.getElementById("publish-btn")
let messageEl = document.getElementById("message-el")

const app = initializeApp(appSettings)
const database = getDatabase(app)
const endorsementInDB = ref(database, "Endorsements")

publishBtn.addEventListener("click", function(){ 
    let fromValue = fromEl.value
    let toValue = toEl.value
    let endorseValue = endorseEl.value

    let tempItem = {
        "from" : fromValue,
        "to" : toValue,
        "endorseValue" : endorseValue
    }
    push(endorsementInDB, tempItem)
    clearInputField()
})

onValue(endorsementInDB, function(snapshot){
    if(snapshot.exists()){
        let temp =  Object.entries(snapshot.val())
        messageEl.innerHTML =""
        
        for (let i = 0; i < temp.length; i++) {
            let currentItem = temp[i]
            displayOnScreen(currentItem)
        }
    } else{
        console.log("why isn't it working")
        messageEl.innerText = "Nothing to see here !!"
    }
})

function displayOnScreen(currentItem){
    let currentItemID = currentItem[0]
    let currentItemValue = currentItem[1]
    // console.log(currentItemValue)
    let from = currentItemValue.from
    let msg = currentItemValue.endorseValue
    let to = currentItemValue.to
    
    let displayItem = 
    `<div class= 'message'>
       <p class="tags">To ${to}</p>
       <p id="msg">${msg}</p>
       <p class="tags">From ${from}</p>    
    </div>`
    messageEl.innerHTML += displayItem
    
    messageEl.addEventListener("dblclick", function(){
        let exactLocationOfItemInDB = ref(database, `Endorsements/${currentItemID}`)
        remove(exactLocationOfItemInDB)
    } )
    
}

function clearInputField(){
    endorseEl.value = ""
    fromEl.value = ""
    toEl = ""
}