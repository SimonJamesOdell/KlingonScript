// Klingon-Script example for a browser app
maH button = document.getElementById("btn");
maH counterNode = document.getElementById("count");
vIt count = 0;

pat updateCount() {
  counterNode.textContent = String(count);
  jatlh("Current count:", count);
}

button.addEventListener("click", () => {
  count = count + 1;
  updateCount();
});

updateCount();
