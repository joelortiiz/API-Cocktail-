//import Cocktail from "./cocktailsclass";

// Elementos
const cardscocktails = document.getElementById("cardscocktails");
let fragment = document.createDocumentFragment("DIV")


const cargarCocktailsAsync = async () => {
  const res = await fetch("http://localhost:3000/apicocktails/cocktails/all");
  const data = await res.json();


  let arrayaux = []
  for (let i = 0; i <= 12; i++) {
    let random = Math.floor(Math.random() * 72)
    let existe = arrayaux.find(cocktail => cocktail.nameCocktail == data.cocktails[random].nameCocktail);
    if (!existe) {
      arrayaux.push(data.cocktails[random])
    }

  }
  console.log(data.cocktails)
  showPopularCocktails(arrayaux)
}


// Mostras 12 cocteles aleatorios al comienzo y no pueden estar repetidos
const showPopularCocktails = (cocktails) => {

  // FALTAN COSAS ESTA ES LA ESTRUCUTRA DE COMO SE MUESTRA UN COCKTAIL POPULAR
  let contador = 0
  let arrayCocktels = [];
  cocktails.forEach(element => {

    // Si el juego no existe en la lista, se agrega al array y lo guarda en localStorage

    let cocktailsObj = new Cocktail(
      element.idCocktail, element.nameCocktail,
      element.videoCocktail, element.nameCategory,
      element.isAlcoholic, element.nameGlass,
      element.instructions, element.imageCocktail,
      element.ingredientsCocktail
    )
    arrayCocktels.push(cocktailsObj)
    //  Article para el card
    let cocktail = document.createElement("ARTICLE");
    cocktail.classList.add("cocktail");

    // !!!!!!!!!!!!!!!!!!PISTA: Me quedo con el id del cocktail para poder consultar posteriormente!!!!!!!!!!!!!!!!!!!!!
    cocktail.title = cocktailsObj._idCocktail;

    // Imagen del cocktail de fondo con efecto
    let mainimgcocktail = document.createElement("IMG");
    mainimgcocktail.classList.add("cocktail__main-img");
    mainimgcocktail.src = cocktailsObj._imageCocktail
    cocktail.appendChild(mainimgcocktail);

    // main
    let maincocktail = document.createElement("MAIN");
    maincocktail.classList.add("cocktail__content");

    // Nombre del cocktail
    // MAS PISTA!!!!! 
    let mainnamecocktail = document.createElement("H3");
    mainnamecocktail.classList.add("cocktail__title");

    
    let arrVotos = JSON.parse(localStorage.getItem('favoritos')) ?? []

    let existeFav = arrVotos.find(cocktail =>{
      if(cocktail.nombre == cocktailsObj._nameCocktail){
        return cocktail.votos
      }})
   // console.log(existeFav)
    if (existeFav) {
      mainnamecocktail.classList.add("cocktail__votes");
      mainnamecocktail.textContent =
        cocktailsObj._nameCocktail.substring(0, 18) +
        " - " +
          existeFav.votos+
        " votos";
    } else {
      mainnamecocktail.textContent = cocktailsObj._nameCocktail.substring(0, 25);
    }
    maincocktail.appendChild(mainnamecocktail);

    // header para maquetar imagen y textos del cocktail
    let headercocktail = document.createElement("HEADER");
    headercocktail.classList.add("cocktail__header");
    maincocktail.appendChild(headercocktail);

    // Div para maquetar textos del cocktail
    let divcocktail = document.createElement("DIV");
    divcocktail.classList.add("cocktail__div");
    headercocktail.appendChild(divcocktail);

    // Categoria del Cocktail
    let mainnamecategory = document.createElement("P");
    mainnamecategory.classList.add("cocktail__text");
    mainnamecategory.innerHTML = `<span class="cocktail__subtitle">Categoría: &nbsp</span>
     ${cocktailsObj.nameCategory.substring(0, 20)}`;
    divcocktail.appendChild(mainnamecategory);

    // Vaso del Cocktail
    let mainnameglass = document.createElement("P");
    mainnameglass.classList.add("cocktail__text");
    mainnameglass.innerHTML = `<span class="cocktail__subtitle">Tipo Vaso: &nbsp</span>
     ${cocktailsObj._nameGlass.substring(0, 15)}`;
    divcocktail.appendChild(mainnameglass);

    // Cocktail alcohólico o no
    let mainnamealcoholic = document.createElement("P");
    mainnamealcoholic.classList.add("cocktail__text");
    mainnamealcoholic.innerHTML = `<span class="cocktail__subtitle">Con Acohol: &nbsp</span>${cocktailsObj._isAlcoholic}`;
    divcocktail.appendChild(mainnamealcoholic);

    // Imagen del cocktail
    let imgcocktail = document.createElement("IMG");
    imgcocktail.classList.add("cocktail__img");
    imgcocktail.src = cocktailsObj.imageCocktail;
    imgcocktail.alt = `Imagen de ${cocktailsObj._nameCocktail}`;
    headercocktail.appendChild(imgcocktail);

    // Instrucciones preparación Cocktail
    let maininstructions = document.createElement("P");
    maininstructions.classList.add(
      "cocktail__text",
      "cocktail__text--instructions"
    );
    maininstructions.innerHTML = `<div class="cocktail__subtitle cocktail__subtitle--header">Preparación</div>
    ${cocktailsObj._instructions.substring(0, 175)}`;
    maincocktail.appendChild(maininstructions);

    // Div ingredientes
    let divsingredientcocktail = document.createElement("DIV");
    divsingredientcocktail.classList.add(
      "cocktail__text",
      "cocktail__text--ingredients"
    );
    divsingredientcocktail.innerHTML = `<div class="cocktail__subtitle cocktail__subtitle--header">Ingredientes</div>`;
    maincocktail.appendChild(divsingredientcocktail);

    // console.log(cocktailsObj._ingredientsCocktail)
    let ingredientes = cocktailsObj.ingredientsCocktail
    ingredientes.forEach((ingredient) => {
      let pingredient = document.createElement("P");
      pingredient.classList.add(
        "cocktail__text",
        "cocktail__text--ingredientsp"
      );
      pingredient.textContent = ingredient.measure + " - " + ingredient.name;
      divsingredientcocktail.appendChild(pingredient);
    });

    // Añadimos elementos
    cocktail.appendChild(maincocktail);
    fragment.appendChild(cocktail);
    contador++;

  })

  cardscocktails.appendChild(fragment);
};

const aniadirFavoritos = (e) => {
  if (e.target.nodeName === "IMG") {
    let imagen = e.target
    console.log("click")
    console.log(imagen.parentElement.title)
    let id = imagen.parentElement.title

    cargarCocktailsID(id);

  }
}

const cargarCocktailsID = async (id) => {

  const res = await fetch(`http://localhost:3000/apicocktails/cocktails/${id}`);
  const data = await res.json();

  //console.log(data[0].idCocktail)

  let nombrecocktail = data[0].nameCocktail
  let categoriacocktail = data[0].nameCategory
  let vasococktail = data[0].nameGlass
  let imagencocktail = data[0].imageCocktail

  const cocktailsFav = JSON.parse(localStorage.getItem('favoritos')) ?? [];

  // Creamos nuevo elemento en formato JSON
  let cocktelnuevo = {
    nombre: nombrecocktail,
    categoria: categoriacocktail,
    vaso: vasococktail,
    imagen: imagencocktail,
    votos: 1,
  }

  let existe = cocktailsFav.find(cocktail => cocktail.nombre == cocktelnuevo.nombre);

  if (!existe) {
    cocktailsFav.push(cocktelnuevo)
  } else {

    cocktailsFav.find(cocktail => {
      if (cocktail.nombre == cocktelnuevo.nombre) {
        cocktail.votos += 1
      }
    })

  }
  localStorage.setItem('favoritos', JSON.stringify(cocktailsFav))
}
document.addEventListener("DOMContentLoaded", cargarCocktailsAsync)
cardscocktails.addEventListener("click", aniadirFavoritos)


