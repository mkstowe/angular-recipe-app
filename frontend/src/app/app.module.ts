import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MealPlanComponent } from './meal-plan/meal-plan/meal-plan.component';
import { RecipeBookComponent } from './recipe-book/recipe-book/recipe-book.component';
import { RecipeViewComponent } from './recipe-book/recipe-view/recipe-view.component';
import { RecipeCardComponent } from './recipe-book/recipe-card/recipe-card.component';
import { ShoppingListComponent } from './shopping-list/shopping-list/shopping-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AddRecipeComponent } from './recipe-book/add-recipe/add-recipe.component';
import { FormsModule, NgForm } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideDirective } from './click-outside.directive';



@NgModule({
  declarations: [
    AppComponent,
    MealPlanComponent,
    RecipeBookComponent,
    RecipeViewComponent,
    RecipeCardComponent,
    ShoppingListComponent,
    NavbarComponent,
    AddRecipeComponent,
    ClickOutsideDirective,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
