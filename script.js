const container = document.querySelector(".container");
const count = document.getElementById("count");
const amount = document.getElementById("amount");
const select = document.getElementById("film");
const koltuklar = document.querySelectorAll(".koltuk:not(.rezerve)");

container.addEventListener("click", function (e) {
  if (
    e.target.classList.contains("koltuk") &&
    !e.target.classList.contains("rezerve")
  ) {
    e.target.classList.toggle("secili");
    hesapToplam();
  }
});

select.addEventListener("change", function (e) {
  hesapToplam();
});

function hesapToplam() {
  const seciliKoltuklar = container.querySelectorAll(".koltuk.secili");
  const seciliKoltuklarArr = [];
  const koltuklarArr = [];

  seciliKoltuklar.forEach(function (koltuk) {
    seciliKoltuklarArr.push(koltuk);
  });

  koltuklar.forEach(function (koltuk) {
    koltuklarArr.push(koltuk);
  });

  let seciliKoltukIndexs = seciliKoltuklarArr.map(function (koltuk) {
    return koltuklarArr.indexOf(koltuk);
  });

  let seciliKoltukSayisi = seciliKoltuklar.length;
  count.innerText = seciliKoltukSayisi;
  amount.innerText = seciliKoltukSayisi + select.value;

  saveToLocalStorage(seciliKoltukIndexs);
}
function getFromLocalStorage() {
  const seciliKoltuklar = JSON.parse(localStorage.getItem("seciliKoltuklar"));
  if (seciliKoltuklar != null && seciliKoltuklar.length > 0) {
    koltuklar.forEach(function (koltuk, index) {
      if (seciliKoltuklar.indexOf(index) > -1) {
        koltuk.classList.add("secili");
      }
    });
  }

  const seciliFilmIndex = localStorage.getItem("seciliFilmIndex");
  if (seciliFilmIndex != null) {
    select.selectedIndex = seciliFilmIndex;
  }
}

function saveToLocalStorage(indexs) {
  localStorage.setItem("seciliKoltuklar", JSON.stringify(indexs));
  localStorage.setItem("seciliFilmIndex", select.selectedIndex);
}
