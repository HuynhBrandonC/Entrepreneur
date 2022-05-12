let recipeList = new Array();

class Ingredient {
    constructor(name, cost){
        this.name = name;
        this.cost = cost;
    }
}

class Recipe {
    constructor(name, directions, prepTime, ingredientList = new Array()) { // Prep time will be listed in minutes
      this.name = name;

      this.directions = directions;
      this.prepTime = prepTime;
      recipeList.push(this);
    }
  }

  let ceasarSalad = new Recipe(
'Ceasar Salad',
  '1) ', 
  30)
