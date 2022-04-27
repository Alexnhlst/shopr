import { getData } from "./fetch.js";
const url = "../../php/";
// ANCHOR Helper functions
export let getHTMLElement = (name, type) => {
  if (type == "id") {
    name = `#${name}`;
    return document.querySelector(name);
  } else if (type == "class") {
    name = `.${name}`;
    return document.querySelector(name);
  }
};

let utf2html = (str) => {
  return [...str]
    .map((char) =>
      char.codePointAt() > 127 ? `&#${char.codePointAt()};` : char
    )
    .join("");
};

// ANCHOR Categories
let createSelector = () => {
  const selector = document.createElement("div");
  selector.classList.add("selector");
  selector.innerHTML = `<div class="selector-text><h2></h2></div>`;
  const selectorsContainer = getHTMLElement("selector", "id");
  selectorsContainer.appendChild(selector);
};
getData("../../php/categories.php").then((result) => {
  const selectorsContainer = getHTMLElement("selector", "id");
  let selectors = result.filter((element) => {
    return element.color !== null;
  });
  selectors.map((element) => {
    createSelector();
    let id = element.id - 1;
    selectorsContainer.children[id].style.backgroundColor = element.color;
    selectorsContainer.children[id].innerHTML = `<h2>${element.name}</h2>`;
  });
});

// ANCHOR Info boxes
let createInfoContainer = () => {
  const infoContainer = document.createElement("div");
  const infoRoot = getHTMLElement("info-boxes", "id");
  infoContainer.setAttribute("id", "info-container");
  infoRoot.appendChild(infoContainer);
};

createInfoContainer();

let createInfoBox = (i) => {
  const boxContainer = document.createElement("div");
  const infoContainer = getHTMLElement("info-container", "id");
  boxContainer.innerHTML = `<div class="info-box">
            <div class="box" id="box-icon-${i}">
              <i class="fas"></i>
            </div>
            <div class=info-text" id="info-text-${i}">
              <h2></h2>
              <p></p>
            </div>`;
  infoContainer.appendChild(boxContainer);
  return boxContainer;
};
getData(`${url}info.php`).then((result) => {
  for (let i = 0; i < result.length; i++) {
    const infoContainer = getHTMLElement("info-container", "id");
    createInfoBox(i);
    infoContainer
      .querySelector(`#box-icon-${i}`)
      .children[0].classList.add(result[i].icon);
    infoContainer.querySelector(`#info-text-${i}`).children[0].innerHTML =
      result[i].title;
    infoContainer.querySelector(`#info-text-${i}`).children[1].innerHTML =
      result[i].content;
  }
});

// ANCHOR Review
let createReview = () => {
  let review = getHTMLElement("review", "id");
  let reviewText = document.createElement("h2");
  reviewText.setAttribute("class", "section-title");
  reviewText.innerHTML = "Customer reviews";
  review.appendChild(reviewText);
  let reviewContainer = document.createElement("div");
  reviewContainer.setAttribute("id", "review-container");
  review.appendChild(reviewContainer);
  let reviewContent = document.createElement("div");
  reviewContent.innerHTML = `<div class="customer-info">
            <div id="customer-img">
              <div class="customer-img"></div>
            </div>
            <div id="customer-name">
              <h3></h3>
            </div>
            <div id="customer-rating"></div>
            <div id="customer-review">
              <p>
              </p>
            </div>
          </div>`;
  reviewContainer.appendChild(reviewContent);
  return reviewContent;
};
getData(`${url}review.php`).then((result) => {
  let review = createReview();
  review
    .querySelector("#customer-img")
    .querySelector(
      ".customer-img"
    ).style.backgroundImage = `url("${result[0].img}")`;
  review.querySelector("#customer-name").querySelector("h3").innerHTML =
    result[0].name;
  review.querySelector("#customer-review").querySelector("p").innerHTML =
    result[0].review;
});

// ANCHOR Herobox
let createHerobox = () => {
  let herobox = getHTMLElement("main-hero", "id");
  const heroContainer = document.createElement("div");
  heroContainer.classList.add("hero-container");
  heroContainer.innerHTML = `
    <div class="decoration">
      <div class="decoration-img"></div>
      <h2 class="hero-subtitle"></h2>
    </div>
    <div class="hero-title">
      <h2 class="title-content"></h2>
    </div>
    <div class="hero-offer">
      <h3 class="offer-content"></h3>
    </div>
    <div class="hero-btn">
      <button id="main-btn">
        <h2 class="btn-text">Sign up</h2>
      </button>
      <button id="secondary-btn">
        <h2 class="btn-text">Shop now</h2>
      </button>
    </div>
    <div class="slider"></div>
  `;
  let heroImg = document.createElement("div");
  heroImg.setAttribute("id", "hero-img");
  let decoration1 = document.createElement("div");
  decoration1.setAttribute("id", "hero-decoration-1");
  let decoration2 = document.createElement("div");
  decoration2.setAttribute("id", "hero-decoration-2");

  herobox.appendChild(heroContainer);
  herobox.appendChild(heroImg);
  herobox.appendChild(decoration1);
  herobox.appendChild(decoration2);
  return heroContainer;
};
let createImageContainer = () => {
  let heroImg = getHTMLElement("hero-img", "id");
  console.log(heroImg);
  let imgContainer = document.createElement("div");
  imgContainer.setAttribute("id", "main-img");
  heroImg.appendChild(imgContainer);
  return imgContainer;
};
getData(`${url}herobox.php`)
  .then((result) => {
    let herobox = createHerobox();
    herobox.querySelector(".hero-subtitle").innerHTML = result[0].subtitle;
    herobox.querySelector(".title-content").innerHTML = result[0].title;
    herobox.querySelector(".offer-content").innerHTML = result[0].description;
  })
  .then(
    getData(`${url}images.php`).then((result) => {
      let imgContainer = createImageContainer();
      console.log(imgContainer);
      const sheet = new CSSStyleSheet();
      sheet.replaceSync(
        `#main-img { background-image: url("${result[4].src}"); background-repeat: no-repeat;  background-size: contain; width: 80%; height: 80%; }`
      );
      document.adoptedStyleSheets = [sheet];
      // let style = document.createElement("style");
      // style.innerHTML = `#main-img { background-image: url("${result[4].src}"); background-repeat: no-repeat;  background-size: contain; width: 80%; height: 80%; }`;
      // console.log(style);
      // imgContainer.className = style;
    })
  );

// .then(() => {
//   createImageContainer();
// });

// getData(`${url}images.php`).then((result) => {
//   let imgContainer = document.querySelector(".hero-img");
//   console.log(imgContainer);
//   imgContainer.style.backgroundImage = `url("${result[4].src}")`;
//   console.log(imgContainer.style);
// });

// ANCHOR Offer box
let createOfferBox = () => {
  let offerHero = getHTMLElement("offer-hero", "id");
  let offerDecoration = document.createElement("div");
  offerDecoration.setAttribute("id", "offer-decoration");
  offerHero.appendChild(offerDecoration);
  let offerContainer = document.createElement("div");
  offerContainer.setAttribute("class", "offer-container");
  offerContainer.innerHTML = `
  <div class="decoration">
    <h2 class="offer-title">Offer of the day</h2>
    <div class="decoration-img"></div>
  </div>
  <div class="offer-img">
    <div id="product-img"></div>
  </div>
  <div class="offer-name">
    <h1 id="product-name"></h1>
  </div>
  <div class="offer-description">
    <h3 id="product-description"></h3>
  </div>
  <div class="offer-info">
    <h2 id="product-price"></h2>
    <div class="btn-container">
      <h2 id="product-quantity"></h2>
      <button class="offer-btn" id="minus-btn"></button>
      <button class="offer-btn" id="plus-btn"></button>
      <button class="offer-btn" id="cart-btn>
        <i class="fa-solid fa-cart-shopping"></i>
      </button>
    </div>
  </div>`;
  offerHero.appendChild(offerContainer);
};
getData(`${url}product.php`).then((result) => {
  createOfferBox();
  let offerContainer = getHTMLElement("offer-container", "class");
  let currentOffer = result[Math.floor(Math.random() * result.length)];
  [currentOffer].map((element) => {
    let keys = Object.keys(element);
    let values = Object.values(element);
    let price = values[5];
    const url = "https://api.getgeoapi.com/v2/currency/convert";
    const accessKey = "af3efa9c340a63680531c47b3bce428753c943f2";
    const converData = async (url) => {
      try {
        const response = await fetch(
          `${url}?api_key=${accessKey}&from=EUR&to=USD&amount=${price}&format=json`
        );
        const result = response.json();
        return result;
      } catch (e) {
        console.log(e);
      }
    };
    converData(url).then((result) => {
      console.log(result.rates.USD.rate_for_amount);
      offerContainer.querySelector(
        keys[4]
      ).style.background = `url("${values[4]}") no-repeat center`;
      offerContainer.querySelector(keys[1]).innerHTML = values[1];
      offerContainer.querySelector(keys[2]).innerHTML = values[2];
      offerContainer.querySelector(keys[5]).innerHTML = `${
        Math.round(result.rates.USD.rate_for_amount * 100) / 100
      }$ `;
      offerContainer.querySelector("#product-quantity").innerHTML = 2;
    });
  });
});

let createNavbar = () => {
  let navBar = document.createElement("section");
  navBar.setAttribute("id", "main-nav-container");
  navBar.innerHTML = `<div class="nav-logo">
          <div class="icon"></div>
            <h3 class="nav-text">Shopr</h3>
        </div>
        <div class="nav-search">
          <div id="search-container">
            <div class="nav-input">
              <input type="text" placeholder="Search" />
            </div>
            <div class="search-icon">
              <i class="fa-solid fa-magnifying-glass"></i>
            </div>
          </div>
          <button class="nav-btn" id="settings">
            <i class="fa-solid fa-gear"></i>
          </button>
        </div>
        <div class="nav-settings">
          <button class="usr-btn" id="secondary-btn">
            <h2 class="btn-text">Sign up</h2>
          </button>
          <button class="usr-btn" id="main-btn">
            <h2 class="btn-text">Log in</h2>
          </button>
        </div>`;
  let mainNav = getHTMLElement("main-nav", "id");
  mainNav.appendChild(navBar);
  // let date = new Date();
  // date = `${date.getDay()} ${date.toLocaleString("default", {
  //   month: "long",
  // })} ${date.getFullYear()}`;
  // const navBar = document.createElement("div");
};
createNavbar();

let createMap = () => {
  let mapContainer = document.createElement("div");
  mapContainer.setAttribute("class", "map-container");
  mapContainer.innerHTML = `<div id="map" style="width: 100%; height:100%; border-radius: 10px"></div>`;
  let mapSection = getHTMLElement("map-section", "class");

  mapSection.appendChild(mapContainer);
  mapboxgl.accessToken =
    "pk.eyJ1IjoiYWxleG5obHN0IiwiYSI6ImNsMWh5ZjJxZDFoczIzYmxuZXVkYThjNjAifQ.ooy50WvU2t2I0QM7Fsjoyg";
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/alexnhlst/cl1hysle300k114o3c5nefy0k",
    center: [0, 0],
    zoom: 0,
  });
  map.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    })
  );
};

createMap();

// ANCHOR Footer
let createFooter = () => {
  let footer = getHTMLElement("main-footer", "id");
  let footerContainer = document.createElement("div");
  footerContainer.setAttribute("class", "footer-container");
  footer.appendChild(footerContainer);
};

createFooter();
const url2 = "https://api.getgeoapi.com/v2/currency/convert";
// const accessKey = "af3efa9c340a63680531c47b3bce428753c943f2";
// let req = new XMLHttpRequest();
// req.addEventListener("load", () => {
//   console.log(req.responseText);
// });
// req.open(
//   "GET",
//   `${url2}?api_key=${accessKey}&from=EUR&to=USD&amount=10&format=json`
// );
// req.send();
//

let createMobileNavbar = () => {
  let body = getHTMLElement("body", "id");
  let date = new Date();
  let nav = document.querySelector("#main-nav");
  date = `${date.getDay()} ${date
    .toLocaleString("default", { month: "long" })
    .toLowerCase()} ${date.getFullYear()}`;
  let mobileNavContainer = document.createElement("section");
  mobileNavContainer.setAttribute("id", "mobile-nav-container");
  nav.appendChild(mobileNavContainer);
  let navBar = document.createElement("div");
  navBar.setAttribute("class", "mobile-user-info");
  navBar.innerHTML = `
          <div class="mobile-welcome">
            <h2 class="mobile-title">Hello {{John Doe}}</h2>
            <p class="mobile-date">${date}</p>
          </div>
          <div class="nav-user-img"></div>
        `;
  mobileNavContainer.appendChild(navBar);
};

let hideElement = (e, visibility) => {
  if (visibility == "show") {
    e.style.display = "block";
  } else if (visibility == "hide") {
    e.style.display = "none";
  }
};

// let mainNavContainer = getHTMLElement("main-nav", "id").children[0];
// let mainNavContainer = document.querySelector("#main-nav").children[0];
// // console.log(mainNavContainer);
// // hideElement(mainNavContainer, "hide");
// // createMobileNavbar();

// let mediaQuery = window.matchMedia("(max-width: 600px)");
// let mobileQuery = (e) => {
//   if (e.matches) {
//     hideElement(mainNavContainer, "hide");
//     createMobileNavbar();
//   } else {
//     hideElement(getHTMLElement("mobile-nav", "id"), "hide");
//     hideElement(mainNavContainer, "show");
//   }
// };

// console.log(mainNav);
