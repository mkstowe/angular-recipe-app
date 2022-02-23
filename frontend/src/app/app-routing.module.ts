import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealPlanComponent } from './meal-plan/meal-plan/meal-plan.component';
import { AddRecipeComponent } from './recipe-book/add-recipe/add-recipe.component';
import { RecipeBookComponent } from './recipe-book/recipe-book/recipe-book.component';
import { RecipeViewComponent } from './recipe-book/recipe-view/recipe-view.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeBookComponent, data: { tab: 1 } },
  { path: 'recipes/add', component: AddRecipeComponent },
  {
    path: 'recipes/:recipeId',
    component: RecipeBookComponent,
    data: { tab: 1 },
  },
  { path: 'meal-plan', component: MealPlanComponent, data: { tab: 2 } },
  { path: 'shopping-list', component: ShoppingListComponent, data: { tab: 2 } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
