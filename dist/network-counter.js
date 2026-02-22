// tlhIngan Hol mu'mey Daq pong'e'
const Dung = document.getElementById("Dung") ?? document.getElementById("title");
const ra_wI = document.getElementById("ra_wI") ?? document.getElementById("btn");
const mI_jan = document.getElementById("mI_jan") ?? document.getElementById("count");
let mI_num = 0;

function qon() {
  Dung.textContent = "Qapla' tlhIngan-Script";
  mI_jan.textContent = "mI': " + mI_num;
}

if (Dung && ra_wI && mI_jan) {
  ra_wI.textContent = "yIvang";
  ra_wI.addEventListener("click", () => {
    mI_num = mI_num + 1;
    console.log("mI' vIghur:", mI_num);
    qon();
  });

  qon();
} else {
  console.log("De' ghajbe' Daq: IDs not found");
}
