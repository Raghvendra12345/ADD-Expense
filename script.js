const ul = document.createElement("ul");
document.body.appendChild(ul);

// load expenses on page load
window.addEventListener("DOMContentLoaded", loadExpenses);

document.querySelector("button").addEventListener("click", addExpense);

function addExpense(e) {
  e.preventDefault();

  const amount = document.getElementById("number").value;
  const description = document.getElementById("text").value;
  const category = document.getElementById("category").value;

  if (!amount || !description) return;

  const expense = {
    id: Date.now(),
    amount,
    description,
    category
  };

  const expenses = getExpenses();
  expenses.push(expense);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  displayExpense(expense);
  clearInputs();
}

function loadExpenses() {
  const expenses = getExpenses();
  expenses.forEach(displayExpense);
}

function displayExpense(expense) {
  const li = document.createElement("li");
  li.id = expense.id;

  li.innerHTML = `
    ${expense.amount} - ${expense.description} - ${expense.category}
    <button onclick="editExpense(${expense.id})">Edit</button>
    <button onclick="deleteExpense(${expense.id})">Delete</button>
  `;

  ul.appendChild(li);
}

function deleteExpense(id) {
  let expenses = getExpenses();
  expenses = expenses.filter(exp => exp.id !== id);
  localStorage.setItem("expenses", JSON.stringify(expenses));

  document.getElementById(id).remove();
}

function editExpense(id) {
  const expenses = getExpenses();
  const expense = expenses.find(exp => exp.id === id);

  document.getElementById("number").value = expense.amount;
  document.getElementById("text").value = expense.description;
  document.getElementById("category").value = expense.category;

  deleteExpense(id);
}

function getExpenses() {
  return JSON.parse(localStorage.getItem("expenses")) || [];
}

function clearInputs() {
  document.getElementById("number").value = "";
  document.getElementById("text").value = "";
}
