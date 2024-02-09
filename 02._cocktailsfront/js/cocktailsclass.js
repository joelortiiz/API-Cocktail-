class Cocktail {
  constructor(idCocktail, nameCocktail, videoCocktail, nameCategory, isAlcoholic, nameGlass, instructions, imageCocktail, ingredientsCocktail) {
      this._idCocktail = idCocktail;
      this._nameCocktail = nameCocktail;
      this._videoCocktail = videoCocktail;
      this._nameCategory = nameCategory; 
      this._isAlcoholic = isAlcoholic; 
      this._nameGlass = nameGlass; 
      this._instructions=instructions;
      this._imageCocktail=imageCocktail;
      this._ingredientsCocktail=ingredientsCocktail;

  }

  get idCocktail() {
      return this._idCocktail;
  }
  set idCocktail(idCocktail) {
      this._idCocktail = idCocktail;
  }

  get nameCocktail() {
      return this._nameCocktail;
  }
  set nameCocktail(nameCocktail) {
      this._nameCocktail = nameCocktail;
  }

  get videoCocktail() {
      return this._videoCocktail;
  }
  set videoCocktail(videoCocktail) {
      this._videoCocktail = videoCocktail;
  }

  get nameCategory() {
      return this._nameCategory;
  }
  set nameCategory(nameCategory) {
      this._nameCategory = nameCategory;
  }

  get isAlcoholic() {
      return this._isAlcoholic;
  }
  set isAlcoholic(isAlcoholic) {
      this._isAlcoholic = isAlcoholic;
  }

  get nameGlass() {
      return this._nameGlass;
  }
  set nameGlass(nameGlass) {
      this._nameGlass = nameGlass;
  }

  get instructions() {
      return this._instructions;
  }
  set instructions(instructions) {
      this._instructions = instructions;
  }
  get imageCocktail() {
    return this._imageCocktail;
}
set imageCocktail(imageCocktail) {
    this._imageCocktail = imageCocktail;
}

get ingredientsCocktail() {
  return this._ingredientsCocktail;
}
set ingredientsCocktail(ingredientsCocktail) {
  this._ingredientsCocktail = ingredientsCocktail;
}
}

//export default Cocktail;

  

