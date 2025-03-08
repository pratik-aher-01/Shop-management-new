// Data Initialization
let products = JSON.parse(localStorage.getItem('products')) || [];
let sales = JSON.parse(localStorage.getItem('sales')) || [];
let customers = JSON.parse(localStorage.getItem('customers')) || [];

// DOM Elements
const sections = document.querySelectorAll('.section');
const navBtns = document.querySelectorAll('.nav-btn');
const inventoryForm = document.getElementById('inventoryForm');
const salesForm = document.getElementById('salesForm');
const customerForm = document.getElementById('customerForm');

// Event Listeners
document.addEventListener('DOMContentLoaded', initApp);
navBtns.forEach(btn => btn.addEventListener('click', showSection));
inventoryForm.addEventListener('submit', handleInventoryForm);
salesForm.addEventListener('submit', handleSalesForm);
customerForm.addEventListener('submit', handleCustomerForm);

// Initialize Application
function initApp() {
    updateInventoryTable();
    updateSalesTable();
    updateCustomersTable();
    populateProductDropdown();
    updateDashboard();
}

// Section Navigation
function showSection(e) {
    const sectionId = e.target.dataset.section;
    sections.forEach(section => {
        section.classList.remove('active');
        if(section.id === sectionId) section.classList.add('active');
    });
}

// Inventory Management
function handleInventoryForm(e) {
    e.preventDefault();
    const newProduct = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: parseFloat(document.getElementById('productPrice').value),
        quantity: parseInt(document.getElementById('productQuantity').value)
    };
    products.push(newProduct);
    localStorage.setItem('products', JSON.stringify(products));
    updateInventoryTable();
    populateProductDropdown();
    this.reset();
}

function updateInventoryTable() {
    const tbody = document.querySelector('#inventoryTable tbody');
    tbody.innerHTML = products.map(product => `
        <tr>
            <td>${product.name}</td>
            <td>$${product.price.toFixed(2)}</td>
            <td>${product.quantity}</td>
            <td>
                <button class="btn-danger" onclick="deleteProduct(${product.id})">Delete</button>
                <button class="btn-warning" onclick="editProduct(${product.id})">Edit</button>
            </td>
        </tr>
    `).join('');
}

function deleteProduct(id) {
    products = products.filter(product => product.id !== id);
    localStorage.setItem('products', JSON.stringify(products));
    updateInventoryTable();
    populateProductDropdown();
}

// Sales Management
function handleSalesForm(e) {
    e.preventDefault();
    const productId = parseInt(document.getElementById('saleProduct').value);
    const quantity = parseInt(document.getElementById('saleQuantity').value);
    
    const product = products.find(p => p.id === productId);
    if(!product || product.quantity < quantity) {
        alert('Not enough stock!');
        return;
    }

    product.quantity -= quantity;
    const newSale = {
        date: new Date().toLocaleString(),
        productId: productId,
        productName: product.name,
        quantity: quantity,
        total: quantity * product.price
    };

    sales.push(newSale);
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('products', JSON.stringify(products));
    updateSalesTable();
    updateInventoryTable();
    this.reset();
}

function updateSalesTable() {
    const tbody = document.querySelector('#salesTable tbody');
    tbody.innerHTML = sales.map(sale => `
        <tr>
            <td>${sale.date}</td>
            <td>${sale.productName}</td>
            <td>${sale.quantity}</td>
            <td>$${sale.total.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Customer Management
function handleCustomerForm(e) {
    e.preventDefault();
    const newCustomer = {
        id: Date.now(),
        name: document.getElementById('customerName').value,
        phone: document.getElementById('customerPhone').value,
        totalPurchases: 0
    };
    customers.push(newCustomer);
    localStorage.setItem('customers', JSON.stringify(customers));
    updateCustomersTable();
    this.reset();
}

function updateCustomersTable() {
    const tbody = document.querySelector('#customersTable tbody');
    tbody.innerHTML = customers.map(customer => `
        <tr>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>$${customer.totalPurchases.toFixed(2)}</td>
        </tr>
    `).join('');
}

// Dashboard Updates
function updateDashboard() {
    document.getElementById('totalProducts').textContent = products.length;
    document.getElementById('todaySales').textContent = `$${calculateDailySales()}`;
    document.getElementById('totalCustomers').textContent = customers.length;
}

function calculateDailySales() {
    const today = new Date().toDateString();
    return sales
        .filter(sale => new Date(sale.date).toDateString() === today)
        .reduce((total, sale) => total + sale.total, 0)
        .toFixed(2);
}

// Helper Functions
function populateProductDropdown() {
    const select = document.getElementById('saleProduct');
    select.innerHTML = products.map(product => 
        `<option value="${product.id}">${product.name} (${product.quantity} in stock)</option>`
    ).join('');
}

// Edit Product (Basic Implementation)
function editProduct(id) {
    const product = products.find(p => p.id === id);
    document.getElementById('productName').value = product.name;
    document.getElementById('productPrice').value = product.price;
    document.getElementById('productQuantity').value = product.quantity;
    deleteProduct(id); // Simple implementation for demo purposes
}
