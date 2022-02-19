import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss'],
})
export class RecipeBookComponent implements OnInit {
  recipes: any[];
  selectedRecipeId: string;
  recipe: Recipe;
  recipesEmpty: boolean;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get('recipeId'));
      if (params.get('recipeId')) {
        this.selectedRecipeId = params.get('recipeId') as string;
        this.recipeService
          .getRecipe(this.selectedRecipeId)
          .subscribe((recipe: any) => {
            this.recipe = recipe[0];
          });
      }
    });

    this.recipeService.getRecipes().subscribe((recipes: any) => {
      this.recipes = recipes;
      if (this.recipes.length > 0) {
        this.recipesEmpty = false;
      } else {
        this.recipesEmpty = true;
      }
    });
  }
}
