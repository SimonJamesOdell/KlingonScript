// tlhIngan Hol mu'mey Daq pong'e'
maH Dung = ghom.Sam("Dung") ?? ghom.Sam("title");
maH ra_wI = ghom.Sam("ra_wI") ?? ghom.Sam("btn");
maH mI_jan = ghom.Sam("mI_jan") ?? ghom.Sam("count");
vIt mI_num = 0;

pat qon() {
  Dung.Qon = "Qapla' tlhIngan-Script";
  mI_jan.Qon = "mI': " + mI_num;
}

if (Dung && ra_wI && mI_jan) {
  ra_wI.Qon = "yIvang";
  ra_wI.QIch("click", () => {
    mI_num = mI_num + 1;
    jatlh("mI' vIghur:", mI_num);
    qon();
  });

  qon();
} else {
  jatlh("De' ghajbe' Daq: IDs not found");
}
