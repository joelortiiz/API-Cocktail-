// Select categorias
const select_categories = document.getElementById("select_categories");

// Select autores
const select_glasses = document.getElementById("select_glasses");
const tablacocktail_body = document.getElementById("tablacocktail_body");

// Botón crear libro
const btn_allcocktails = document.getElementById("btn_allcocktails");

// Modal
const modal_container = document.getElementById("modal_container");

const btn_newcocktail = document.getElementById("btn_newcocktail");
const btn_modal_aniadir = document.getElementById("btn_modal_aniadir");
const btn_modal_cancelar = document.getElementById("btn_modal_cancelar");

const modal_input_title = document.getElementById("modal_input_title");
const modal_select_glass = document.getElementById("modal_select_glass");
const modal_select_category = document.getElementById("modal_select_category");
const modal_input_content = document.getElementById("modal_input_content");


const cargarOptions =async ()=> {

    const res = await fetch("http://localhost:3000/apicocktails/cocktails/all");
    const data = await res.json();

    let arr = data.cocktails
    let arrAux = []
    let arrAux2 = []

   
 
    arr.forEach(cocktail => {

        let existe = arrAux.find(cocktel => cocktel == cocktail.nameCategory);

        if(!existe){
        arrAux.push(cocktail.nameCategory)
        let optionCat = document.createElement("option")
        optionCat.textContent = cocktail.nameCategory
        select_categories.appendChild(optionCat)

            let optionCatModal = document.createElement("option")
            optionCatModal.textContent = cocktail.nameCategory
            modal_select_category.appendChild(optionCatModal)
        }

        let existe2 = arrAux2.find(cocktel => cocktel == cocktail.nameGlass);
        if(!existe2){
            arrAux2.push(cocktail.nameGlass)
            let optionCat = document.createElement("option")
            optionCat.textContent = cocktail.nameGlass
            select_glasses.appendChild(optionCat)

            let optionGlassModal = document.createElement("option")
            optionGlassModal.textContent = cocktail.nameGlass
            modal_select_glass.appendChild(optionGlassModal)

            }
    });

}

 const nuevoTD = (x) => {
     let nuevacelda = document.createElement("TD");
    nuevacelda.textContent = x;
    return nuevacelda;
  };

const cargarAllCocktails = async ()=> {

    const res = await fetch("http://localhost:3000/apicocktails/cocktails/all");
    const data = await res.json();

    cocktails = data.cocktails
    console.log(cocktails)
    //let th = document.createElement("th")
    cocktails.forEach(cocktail => {
        
        let nombre = nuevoTD(cocktail.nameCocktail)
        let categoria = nuevoTD(cocktail.nameCategory)
        let vaso = nuevoTD(cocktail.nameGlass)
        let br = document.createElement("br")

        let tr = document.createElement("TR");

        
        tr.append(nombre);
        tr.append(categoria);
        tr.append(vaso);
      
        tablacocktail_body.appendChild(tr)
        


    });
    //tablacocktail_body.appendChild(th)


}

const cargarCategorias = async()=> {
    tablacocktail_body.innerHTML=""
    console.log(select_categories.value)
    let e = select_categories.value
    const res = await fetch(`http://localhost:3000/apicocktails/cocktails/categories/${e}`);
    const data = await res.json();

    cocktails = data
    console.log(data)
    //let th = document.createElement("th")
    cocktails.forEach(cocktail => {
        
        let nombre = nuevoTD(cocktail.nameCocktail)
        let categoria = nuevoTD(cocktail.nameCategory)
        let vaso = nuevoTD(cocktail.nameGlass)
        let br = document.createElement("br")

        let tr = document.createElement("TR");

        
        tr.append(nombre);
        tr.append(categoria);
        tr.append(vaso);
      
        tablacocktail_body.appendChild(tr)
        


    });
    //tablacocktail_body.appendChild(th)


}
const cargarVasos = async()=> {
    tablacocktail_body.innerHTML=""
    console.log(select_glasses.value)
    let e = select_glasses.value
    
    const res = await fetch(`http://localhost:3000/apicocktails/cocktails/glasses/${e}`);
    const data = await res.json();

    cocktails = data
    console.log(data)
    //let th = document.createElement("th")
    cocktails.forEach(cocktail => {
        
        let nombre = nuevoTD(cocktail.nameCocktail)
        let categoria = nuevoTD(cocktail.nameCategory)
        let vaso = nuevoTD(cocktail.nameGlass)
        let br = document.createElement("br")

        let tr = document.createElement("TR");

        
        tr.append(nombre);
        tr.append(categoria);
        tr.append(vaso);
      
        tablacocktail_body.appendChild(tr)
        


    });
    //tablacocktail_body.appendChild(th)

}

const mostrarModal =()=> {
    //console.log("hola")
    modal_container.classList.add("modal__mostrar")
}
const ocultarModal =()=> {

    modal_container.classList.remove("modal__mostrar")
}

const nuevoCocktail =()=> {
        fetch("http://localhost:3000/apicocktails/cocktails/", {
          method: "POST",
          body: JSON.stringify({
            nameCocktail: modal_input_title.value,
            nameCategory: modal_select_glass.value,
            nameGlass: modal_select_category.value,
            imageCocktail: "./assets/images/newcocktail.jpg",

          })
        }).then(response => response.json()).then(response => {console.log(response) })
        ocultarModal()
    
}

document.addEventListener("DOMContentLoaded", cargarOptions)
btn_allcocktails.addEventListener("click", cargarAllCocktails)
select_categories.addEventListener("change", cargarCategorias)
select_glasses.addEventListener("change", cargarVasos)
btn_newcocktail.addEventListener("click", mostrarModal)
btn_modal_aniadir.addEventListener("click", nuevoCocktail)
btn_modal_cancelar.addEventListener("click", ocultarModal)
