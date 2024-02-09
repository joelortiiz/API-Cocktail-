const cardsfavorites = document.getElementById("cardsfavorites");
const favorite__btnvaciar = document.getElementById("favorite__btnvaciar");

let fragment = document.createDocumentFragment("DIV")

const showFavorites = () => {
  // FALTAN COSAS ESTA ES LA ESTRUCUTRA DE COMO SE MUESTRA UN FAVORITO
  let arrFavoritos = JSON.parse(localStorage.getItem('favoritos')) ?? []

  if (!arrFavoritos.length <= 0) {
    console.log(arrFavoritos)
    arrFavoritos.forEach(favorite => {


      // article
      let articlefavorites = document.createElement("ARTICLE");
      articlefavorites.classList.add("cardfavorite");

      // image
      let imagefavorites = document.createElement("IMG");
      imagefavorites.classList.add("favorite__img");
      imagefavorites.src = favorite.imagen;
      imagefavorites.alt = favorite.imagen;
      articlefavorites.appendChild(imagefavorites);

      // section
      let sectionfavorite = document.createElement("SECTION");
      sectionfavorite.classList.add("favorite__section");
      // articlefavorites.appendChild(sectionfavorite);

      //  name
      let namefavorite = document.createElement("P");
      namefavorite.classList.add("favorite__text");
      namefavorite.textContent = "Nombre: ";
      namefavorite.innerHTML = `<span class="favorite__subtitle">Nombre: ${favorite.nombre}</span>`;
      sectionfavorite.appendChild(namefavorite);

      // Categoria
      let namecategory = document.createElement("P");
      namecategory.classList.add("favorite__text");
      namecategory.innerHTML = `<span class="favorite__subtitle">Categoría: ${favorite.categoria}</span>`;
      sectionfavorite.appendChild(namecategory);

      // Vaso
      let nameglass = document.createElement("P");
      nameglass.classList.add("favorite__text");
      nameglass.innerHTML = `<span class="favorite__subtitle">Tipo Vaso: ${favorite.vaso}</span>`;
      sectionfavorite.appendChild(nameglass);

      // Votos
      let votes = document.createElement("P");
      votes.classList.add("favorite__text");
      votes.innerHTML = `<span class="favorite__subtitle">Votos: ${favorite.votos}</span>`;
      sectionfavorite.appendChild(votes);

      //button
      let button = document.createElement("BUTTON");
      button.classList.add("favorite__btnborrar");

      button.textContent = "Eliminar";
      sectionfavorite.appendChild(button);
      articlefavorites.appendChild(sectionfavorite);

      fragment.appendChild(articlefavorites)

      console.log(favorite.imagen)
    });
  } else {
    let h2 = document.createElement("H2")
    h2.textContent = "NO HAY FAVORITOS";
    h2.style.textAlign = ("center")
    h2.style.fontSize = "4rem"
    h2.style.marginTop = "4rem"
    h2.classList.add("favorite__text")
    fragment.appendChild(h2)
  };
  cardsfavorites.appendChild(fragment)
}

const eliminarFavorito = (e) => {
  if (e.target.nodeName && e.target.textContent) {

    let localStorageAux = JSON.parse(localStorage.getItem('favoritos'))
    console.log(localStorageAux)
    //console.log(e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent)
    let nombreCocktelEliminar = e.target.previousElementSibling.previousElementSibling.previousElementSibling.previousElementSibling.textContent
    //console.log(JSON.stringify(nombreCocktelEliminar))
    nombreCocktelEliminar = nombreCocktelEliminar.substring(8)


    let NuevoArrFav = [];
    localStorageAux.forEach(cocktail => {


      if (cocktail.nombre != nombreCocktelEliminar) {
        NuevoArrFav.push(cocktail)
        
      }
      // console.log("--------")
      // console.log(cocktail.nombre)
      // console.log(nombreCocktelEliminar)
    })
    // console.log(NuevoArrFav)
    localStorage.removeItem('favoritos')
    localStorage.setItem('favoritos', JSON.stringify(NuevoArrFav))


  }
  //fragment.removeChild()
  e.target.parentElement.parentElement.style.display="none"
}

const borrarLocalStorage = (e) => {
  localStorage.removeItem('favoritos')
  console.log(e.target.parentElement.nextElementSibling.style.display="none")
  let h2 = document.createElement("H2")
    h2.textContent = "NO HAY FAVORITOS";
    h2.style.textAlign = ("center")
    h2.style.fontSize = "4rem"
    h2.style.marginTop = "4rem"
    h2.classList.add("favorite__text")
    fragment.appendChild(h2)
}
document.addEventListener("DOMContentLoaded", showFavorites)
document.addEventListener("click", eliminarFavorito)
favorite__btnvaciar.addEventListener("click", borrarLocalStorage)

