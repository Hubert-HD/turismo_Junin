// Barra de navegacion

var navbar = document.getElementsByClassName('fijo')[0];
var login = document.getElementsByClassName('modal__login')[0];
var idioma = document.getElementsByClassName('modal__idioma')[0];

window.onscroll = function() {
  if (window.pageYOffset > 0) {
    navbar.classList.add('fijo--scroll');
  } else {
    navbar.classList.remove('fijo--scroll');
  }
}

function loginDesplegable() {
  if (login.style.display === 'none') {
    login.style.display = 'block';
  } else {
    login.style.display = 'none';
  }
}

function idiomaDesplegable() {
  if (idioma.style.display === 'none') {
    idioma.style.display = 'block';
  } else {
    idioma.style.display = 'none';
  }
}

/*-----------------------------------------------------------------------------------------*/
// Lista desplegable
var slides = document.getElementsByClassName('slide');
let slideAutomatico;
var n = 1;
var numSlide = document.getElementsByClassName("slide").length;
showSlides(n);

function showSlides(slideIndex) {
  n = slideIndex;
  var i;
  var slides = document.getElementsByClassName("slide");
  var dots = document.getElementsByClassName("dot");
  
  for (i = 0; i < slides.length; i++)
    slides[i].style.display = "none";  
  slides[slideIndex - 1].style.display = "flex";

  for (i = 0; i < dots.length; i++) {
    if(i % slides.length == slideIndex - 1){
      dots[i].className = dots[i].className + " dot--active";
    }
    else{
      dots[i].className = dots[i].className.replace(" dot--active", "");
    }
  }
  clearInterval(slideAutomatico);
  slideAutomatico = setInterval(cambiarSlide, 5000);
}

function cambiarSlide(){
  n += 1;
  if(n == numSlide + 1)
    n = 1;
  showSlides(n);
}

/*-----------------------------------------------------------------------------------------*/
// Lista desplegable

let selectionArray = document.querySelectorAll(".selection");

selectionArray.forEach((selection) =>{
  let box = selection.querySelector(".selection__box");
  let optionList = selection.querySelector(".selection__option");
  let itemArray = selection.querySelectorAll(".selection__option__item");
  let content = selection.querySelector(".selection__box__content");
  let icon = selection.querySelector(".selection__box__icon");
  
  itemArray.forEach((item) => {
    item.addEventListener("click", (e) => {
      content.innerHTML = e.currentTarget.innerHTML;
      if(optionList.classList.contains("selection__option--open")){
        optionList.classList.replace("selection__option--open", "selection__option--close");
        icon.classList.replace("selection__box__icon--up", "selection__box__icon--down");
      }
      if(content.classList.contains("selection__box__content--void")){
        content.classList.replace("selection__box__content--void", "selection__box__content--full");
      }
    });
  });
  box.addEventListener("click", () => {
    if(optionList.classList.contains("selection__option--close") && !selection.classList.contains("selection--disabled")){
      optionList.classList.replace("selection__option--close", "selection__option--open");
      icon.classList.replace("selection__box__icon--down", "selection__box__icon--up");
    }
    else{
      optionList.classList.replace("selection__option--open", "selection__option--close");
      icon.classList.replace("selection__box__icon--up", "selection__box__icon--down");
    }
  });
});

window.addEventListener("click", (e) =>{
  const element = e.target;
  selectionArray.forEach((selection) =>{
    let optionList = selection.querySelector(".selection__option");
    let icon = selection.querySelector(".selection__box__icon");
    if(!selection.contains(element) && optionList.classList.contains("selection__option--open")){
      optionList.classList.replace("selection__option--open", "selection__option--close");
      icon.classList.replace("selection__box__icon--up", "selection__box__icon--down");
    }
  });
});

// Lista de distritos Destinos
function generarDistritos(provincia){
  let selection = document.getElementById("distritoSelection");
  let content = selection.querySelector(".selection__box__content");
  let optionList = selection.querySelector(".selection__option");
  let icon = selection.querySelector(".selection__box__icon");
  
  if(content != "Distrito" && document.getElementById("provincia").innerHTML != provincia){
    if(content.classList.contains("selection__box__content--full")){
      content.classList.replace("selection__box__content--full", "selection__box__content--void");
      content.innerHTML = "Distrito";
    }
  }
  selection.classList.remove("selection--disabled");
  fetch(`../api/distritos?provincia=${provincia}`)
  .then(response => response.json())
  .then(data => {
    let distritoArray = data;
    let distritosHTML = "";
    for (let i = 0; i < distritoArray.length; i++)
      distritosHTML += '<div class="selection__option__item">' + distritoArray[i] + '</div>'
    document.getElementById("distritoList").innerHTML = distritosHTML;

    let itemArray = document.getElementById("distritoList").querySelectorAll(".selection__option__item");
    itemArray.forEach((item) => {
      item.addEventListener("click", (e) => {
        content.innerHTML = e.currentTarget.innerHTML;
        if(optionList.classList.contains("selection__option--open")){
          optionList.classList.replace("selection__option--open", "selection__option--close");
          icon.classList.replace("selection__box__icon--up", "selection__box__icon--down");
        }
        if(content.classList.contains("selection__box__content--void")){
          content.classList.replace("selection__box__content--void", "selection__box__content--full");
        }
      });
    });
  });
}

/*-----------------------------------------------------------------------------------------*/

function consultarLugares(){
  let provincia = document.getElementById("provincia").innerText;
  let distrito = document.getElementById("distrito").innerText;
  let categoria = document.getElementById("categoria").innerText;
  if(provincia == "Provincia" && distrito == "Distrito" && categoria == "Categoria"){
    document.getElementById("error").style.display = "block";
  }
  else{
    document.getElementById("error").style.display = "none";
    let resultado = document.getElementById("resultadosLugares");
    fetch(`../api/destinos?provincia=${provincia}&distrito=${distrito}&categoria=${categoria}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      let resultadoHTML = "";
      let cards = data;
      if(cards.length == 0){
        resultadoHTML = `
        <div class="resultados">
          <h4 class="resultados__titulo">Resultados</h4>
          <h4 class="resultados__respuesta">No se encontraron coincidencias</h4>
        </div>`;
        fetch(`../api/recomendaciones?provincia=${provincia}&distrito=${distrito}&categoria=${categoria}`)
        .then(response => response.json())
        .then(data => {
          let cards = data;
          let cardsHTML = "";
          cards.forEach(({link, nombre, provincia, categoria, corazones}) => {
            cardsHTML += `
            <div class="card">
              <div class="card__imagen">
                <img class="card__imagen__img" src=${link} alt="${nombre}.png">
                <h5 class="card__imagen__titulo">${nombre}</h5>
                <p class="card__imagen__lugar">${provincia}</p>
              </div>
              <div class="card__descripcion">
                <div class="etiqueta">
                  <span class="etiqueta__icono"><i class="fas fa-tag"></i></span>
                  <span class="etiqueta__clase">${categoria}</span>
                </div>
                <div class="corazon">
                  <span class="corazon__icon"><i class="fas fa-heart"></i></span>
                  <span class="corazon__numero">${corazones}</span>
                </div>
                <a class="flecha" href="./${nombre}/"><i class="fas fa-arrow-right"></i></a>
              </div>
            </div>
            `;
          });
          resultadoHTML += `
          <h4 class="recomendados__titulo">Recomendados para ti</h4>
          <div class="recomendados">
            <span class="recomendados__button--izquierda"><i class="fas fa-chevron-left"></i></span>
            <div class="recomendados__galeria">
              ${cardsHTML}
            </div>
            <span class="recomendados__button--derecha"><i class="fas fa-chevron-right"></i></span>
          </div>`;
          resultado.innerHTML = resultadoHTML;
          activarRecomendaciones();
        });
      }
      else{
        let cardsHTML = "";
        cards.forEach(({link, nombre, provincia, categoria, corazones}) => {
          cardsHTML += `
          <div class="card">
            <div class="card__imagen">
              <img class="card__imagen__img" src=${link} alt="${nombre}.png">
              <h5 class="card__imagen__titulo">${nombre}</h5>
              <p class="card__imagen__lugar">${provincia}</p>
            </div>
            <div class="card__descripcion">
              <div class="etiqueta">
                <span class="etiqueta__icono"><i class="fas fa-tag"></i></span>
                <span class="etiqueta__clase">${categoria}</span>
              </div>
              <div class="corazon">
                <span class="corazon__icon"><i class="fas fa-heart"></i></span>
                <span class="corazon__numero">${corazones}</span>
              </div>
              <a class="flecha" href="./${nombre}/"><i class="fas fa-arrow-right"></i></a>
            </div>
          </div>
          `;
        });
      
        resultadoHTML += `
        <div class="resultados">
          <h4 class="resultados__titulo">Resultados</h4>
          <div class="resultados__galeria">
            ${cardsHTML}
          </div>
        </div>
        `;
      }
      resultado.innerHTML = resultadoHTML;
    });
  }

}

function activarRecomendaciones(){
  let recomendadosArray =  document.querySelectorAll(".recomendados");
  recomendadosArray.forEach((recomendados) =>{
    let galeria = recomendados.querySelector(".recomendados__galeria");
    let btn_izq = recomendados.querySelector(".recomendados__button--izquierda");
    let btn_der = recomendados.querySelector(".recomendados__button--derecha");
    let card = recomendados.querySelector(".card");
    btn_izq && (btn_izq.style.display = (galeria.scrollLeft == 0)? "none": "flex");
    btn_der && (btn_der.style.display = (galeria.scrollWidth - galeria.scrollLeft == galeria.clientWidth) ? "none": "flex");
    
    galeria && galeria.addEventListener("scroll", () =>{
      btn_izq.style.display = (galeria.scrollLeft == 0)? "none": "flex";
      btn_der.style.display = (galeria.scrollWidth - galeria.scrollLeft == galeria.clientWidth) ? "none": "flex";
    });
  
    btn_der && btn_der.addEventListener("click",() => {
      galeria.scrollLeft += card.clientWidth + 30;
    });
    btn_izq && btn_izq.addEventListener("click",() => {
      galeria.scrollLeft += -card.clientWidth - 30;
    });
    
  });
}

activarRecomendaciones();


// MAPA
function iniciarMap(){
  let nombre = document.querySelector(".slide__titulo").innerHTML;
  fetch(`../../api/coordenadas?nombre=${nombre}`)
  .then(response => response.json())
  .then(data => {
    let coord = {lat: data.latitud, lng: data.longuitud};
    let map = new google.maps.Map(document.getElementById('map'), {
      zoom: 15,
      center: coord
    });
    let marker = new google.maps.Marker({
      position: coord,
      map: map,
      title: 'Mapa Cargado!'
    });
  });
}