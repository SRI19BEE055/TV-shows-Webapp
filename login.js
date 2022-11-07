const buttonElement = document.getElementById("submitId");
const userName = "Sridharan"
const passWord = "11042002"
buttonElement.onclick = ()=>{
    const enteredId = document.getElementById("userId").value
    const enteredPassword = document.getElementById("passId").value
    if(enteredId === userName && enteredPassword === passWord ){
        window.open("index.html","_parent");
    }
    else{
        document.getElementById("errorMessage").innerHTML = "Incorrect password or userName"
    }
}