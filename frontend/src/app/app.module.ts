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
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { AngularSplitModule } from 'angular-split';
import { RecipeFormComponent } from './recipe-book/recipe-form/recipe-form.component';

@NgModule({
  declarations: [
    AppComponent,
    MealPlanComponent,
    RecipeBookComponent,
    RecipeViewComponent,
    RecipeCardComponent,
    ShoppingListComponent,
    NavbarComponent,
    ClickOutsideDirective,
    RecipeFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularSplitModule,
    ReactiveFormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
