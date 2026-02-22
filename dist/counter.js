// Klingon-Script example for a browser app
const button = document.getElementById("btn");
const counterNode = document.getElementById("count");
let count = 0;

function updateCount() {
  counterNode.textContent = String(count);
  console.log("Current count:", count);
}

button.addEventListener("click", () => {
  count = count + 1;
  updateCount();
});

updateCount();
