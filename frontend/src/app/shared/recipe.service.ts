import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from './models/ingredient.model';
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

  addIngredients(recipeId: String, payload: any[]) {
    return this.webReqService.post(`recipes/${recipeId}/ingredients`, payload);
  }

  updateIngredient(recipeId: String, ingredientId: String, payload: Object) {
    return this.webReqService.patch(
      `recipes/${recipeId}/ingredients/${ingredientId}`,
      payload
    );
  }

  updateIngredients(recipeId: string, payload: Object) {
    return this.webReqService.patch(`recipes/${recipeId}/ingredients`, payload);
  }

  deleteIngredient(recipeId: String, ingredientId: String) {
    return this.webReqService.delete(
      `recipes/${recipeId}/ingredients/${ingredientId}`
    );
  }

  uploadFile(formData: FormData) {
    return this.webReqService.post('upload', formData);
  }

  getRecipeImage(imgId: String) {
    return this.webReqService.get(`uploads/${imgId}`);
  }

  deleteFile(imgId: String) {
    return this.webReqService.delete(`uploads/${imgId}`);
  }
}
