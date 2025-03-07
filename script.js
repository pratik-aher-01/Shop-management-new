// User Database (Local Storage)
let users = JSON.parse(localStorage.getItem("users")) || [];

// Login Function
function login() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let user = users.find(user => user.username === username && user.password === password);
    
    if (user) {
        localStorage.setItem("loggedInUser", username);
        window.location.href = "shop-setup.html";
    } else {
        alert("Invalid login credentials!");
    }
}

// Register Function (Simulated)
function register() {
    let username = prompt("Enter a new username:");
    let password = prompt("Enter a new password:");

    if (username && password) {
        users.push({ username, password });
        localStorage.setItem("users", JSON.stringify(users));
        alert("Registration successful! Now login.");
    }
}

// Save Shop Name
function saveShopName() {
    let shopName = document.getElementById("shopNameInput").value;
    if (shopName.trim() !== "") {
        localStorage.setItem("shopName", shopName);
        window.location.href = "home.html";
    } else {
        alert("Please enter a valid shop name!");
    }
}
