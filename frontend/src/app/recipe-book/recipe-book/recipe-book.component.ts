import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.scss'],
})
export class RecipeBookComponent implements OnInit {
  recipes: Recipe[];

  selectedRecipeId: string;

  recipe: Recipe;

  recipesEmpty: boolean;

  sidebarHidden: boolean = false;

  @ViewChild('sidebar') sidebar: ElementRef;

  constructor(private recipeService: RecipeService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('recipeId')) {
        this.selectedRecipeId = params.get('recipeId') as string;
        this.recipeService.getRecipe(this.selectedRecipeId).subscribe((recipe: any) => {
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

  toggleSidebar() {
    this.sidebarHidden = !this.sidebarHidden;
  }
}
