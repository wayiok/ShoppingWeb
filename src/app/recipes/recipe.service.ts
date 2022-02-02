import {Recipe} from "./recipe.model";
import {EventEmitter, Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";

@Injectable()
export class RecipeService {

    private recipes: Recipe[] = [
        new Recipe(
            'Hamburguer',
            'Fast Fodd',
            'data:image/jpeg;base64,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',
            [
                new Ingredient('Bread',8),
                new Ingredient('Meat', 3)
            ]),
        new Recipe(
            'Pizza',
            'Italian Food',
            'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&webp=true&resize=300,272',
            [
                new Ingredient('Eggs',8),
                new Ingredient('Chickes Breast', 3)
            ]),
    ];

    recipeSelected = new EventEmitter<Recipe>();

    constructor(private shoppingListService: ShoppingListService) {
    }

    getRecipe() {
        return this.recipes.slice();
    }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.shoppingListService.addIngredients(ingredients);
    }

}