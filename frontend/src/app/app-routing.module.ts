import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealPlanComponent } from './meal-plan/meal-plan/meal-plan.component';
import { RecipeBookComponent } from './recipe-book/recipe-book/recipe-book.component';
import { RecipeFormComponent } from './recipe-book/recipe-form/recipe-form.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';

const routes: Routes = [
  { path: 'recipes', component: RecipeBookComponent, data: { tab: 1 } },
  { path: 'recipes/add', component: RecipeFormComponent, data: { editMode: 0 } },
  {
    path: 'recipes/:recipeId',
    component: RecipeBookComponent,
    data: { tab: 1 },
  },
  { path: 'recipes/:recipeId/edit', component: RecipeFormComponent, data: { editMode: 1 } },
  { path: 'meal-plan', component: MealPlanComponent, data: { tab: 2 } },
  { path: 'shopping-list', component: ShoppingListComponent, data: { tab: 2 } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
