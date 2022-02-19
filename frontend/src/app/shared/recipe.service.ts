import { Injectable } from '@angular/core';
import { Recipe } from './models/recipe.model';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  recipes: Recipe[] = [];

  constructor(private webReqService: WebRequestService) {}

  getRecipes() {
    return this.webReqService.get('recipes');
  }

  getRecipe(id: string) {
    return this.webReqService.get(`recipes/${id}`);
  }

  addRecipe(payload: Object) {
    return this.webReqService.post('recipes', payload);
  }

  updateRecipe(id: String, payload: Object) {
    return this.webReqService.patch(`recipes/${id}`, payload);
  }

  deleteRecipe(id: String) {
    return this.webReqService.delete(`recipes/${id}`);
  }

  getIngredients(recipeId: String) {
    return this.webReqService.get(`recipes/${recipeId}/ingredients`);
  }

  addIngredients(recipeId: String, payload: [any]) {
    return this.webReqService.post(`recipes/${recipeId}/ingredients`, payload);
  }

  updateIngredient(recipeId: String, ingredientId: String, payload: Object) {
    return this.webReqService.patch(
      `recipes/${recipeId}/ingredients/${ingredientId}`,
      payload
    );
  }

  deleteIngredient(recipeId: String, ingredientId: String) {
    return this.webReqService.delete(
      `recipes/${recipeId}/ingredients/${ingredientId}`
    );
  }
}
