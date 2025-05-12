// Ambil elemen DOM
const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const balanceEl = document.getElementById("balance");
const incomeEl = document.getElementById("total-income");
const expenseEl = document.getElementById("total-expense");

// Ambil data dari localStorage atau buat array kosong
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// Fungsi untuk menambahkan transaksi ke UI
function addTransactionToDOM(transaction) {
  const item = document.createElement("li");
  item.classList.add("p-3", "rounded", "flex", "justify-between", transaction.type === "income" ? "bg-green-100" : "bg-red-100");
  item.innerHTML = `
    <span>${transaction.description}</span>
    <span>${transaction.type === "income" ? "+" : "-"}Rp${transaction.amount}</span>
  `;
  list.appendChild(item);
}

// Update ringkasan saldo
function updateSummary() {
  const income = transactions
    .filter(t => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);
  const expense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);
  const balance = income - expense;

  balanceEl.textContent = `Rp${balance}`;
  incomeEl.textContent = `Rp${income}`;
  expenseEl.textContent = `Rp${expense}`;
}

// Simpan transaksi & perbarui tampilan
function saveAndRender() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
  list.innerHTML = "";
  transactions.forEach(addTransactionToDOM);
  updateSummary();
}

// Tangani form submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("description").value.trim();
  const amount = +document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (!description || !amount || amount <= 0) {
    alert("Isi deskripsi dan jumlah dengan benar.");
    return;
  }

  const newTransaction = { description, amount, type };
  transactions.push(newTransaction);
  saveAndRender();
  form.reset();
});

// Render saat pertama kali
saveAndRender();
