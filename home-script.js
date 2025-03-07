// Load Shop Name
document.addEventListener("DOMContentLoaded", function() {
    let shopName = localStorage.getItem("shopName");
    document.getElementById("shopNameDisplay").innerText = shopName ? shopName : "Your Shop";
    loadStock();
    showDailyTip();
});

// Stock Management (Local Storage)
let stock = JSON.parse(localStorage.getItem("stock")) || [];

// Add Stock
function addStock() {
    let itemName = document.getElementById("itemName").value;
    let itemStock = parseInt(document.getElementById("itemStock").value);

    if (itemName && itemStock > 0) {
        stock.push({ name: itemName, quantity: itemStock });
        localStorage.setItem("stock", JSON.stringify(stock));
        loadStock();
        alert("Stock Added!");
    } else {
        alert("Enter valid stock details.");
    }
}

// Load Stock List in Dropdown
function loadStock() {
    let stockList = document.getElementById("stockList");
    stockList.innerHTML = "";
    stock.forEach((item, index) => {
        let option = document.createElement("option");
        option.value = index;
        option.textContent = `${item.name} (Stock: ${item.quantity})`;
        stockList.appendChild(option);
    });
}

// Sell Items
function sellItem() {
    let selectedIndex = document.getElementById("stockList").value;
    let sellQuantity = parseInt(document.getElementById("sellQuantity").value);

    if (selectedIndex !== "" && sellQuantity > 0 && stock[selectedIndex].quantity >= sellQuantity) {
        stock[selectedIndex].quantity -= sellQuantity;
        localStorage.setItem("stock", JSON.stringify(stock));
        loadStock();
        alert("Item Sold!");
    } else {
        alert("Invalid quantity or insufficient stock.");
    }
}

// Expense Management
let dailyExpenses = parseInt(localStorage.getItem("dailyExpenses")) || 0;

function addExpense() {
    let expense = parseInt(document.getElementById("expenseInput").value);
    if (expense > 0) {
        dailyExpenses += expense;
        localStorage.setItem("dailyExpenses", dailyExpenses);
        alert("Expense Added!");
    } else {
        alert("Enter a valid expense amount.");
    }
}

// Open/Close Shop
let isShopOpen = localStorage.getItem("isShopOpen") === "true";
let dayCount = parseInt(localStorage.getItem("dayCount")) || 0;

function toggleShop() {
    isShopOpen = !isShopOpen;
    localStorage.setItem("isShopOpen", isShopOpen);
    document.getElementById("shopStatus").innerText = isShopOpen ? "Shop is Open" : "Shop is Closed";

    if (!isShopOpen) {
        dayCount++;
        localStorage.setItem("dayCount", dayCount);
        showSummary();
    }
}

// Show Summary (Pop-up Animation)
function showSummary() {
    let summaryPopup = document.getElementById("summaryPopup");
    let summaryDetails = document.getElementById("summaryDetails");

    let totalStock = stock.reduce((sum, item) => sum + item.quantity, 0);

    summaryDetails.innerHTML = `
        <strong>Shop Days Opened:</strong> ${dayCount}<br>
        <strong>Remaining Stock:</strong> ${totalStock} items<br>
        <strong>Total Expenses:</strong> ₹${dailyExpenses}
    `;

    summaryPopup.style.display = "block";
}

// Close Summary Pop-up
function closePopup() {
    document.getElementById("summaryPopup").style.display = "none";
}

// Daily Store Tips
let storeTips = [
    "Offer discounts to loyal customers!",
    "Keep your shop well-organized to attract more customers.",
    "Use digital payments for faster transactions.",
    "Track expenses daily to manage profits better.",
    "Always greet your customers with a smile!"
];

function showDailyTip() {
    let today = new Date().getDate();
    let tipIndex = today % storeTips.length;
    document.getElementById("dailyTip").innerText = storeTips[tipIndex];
}
