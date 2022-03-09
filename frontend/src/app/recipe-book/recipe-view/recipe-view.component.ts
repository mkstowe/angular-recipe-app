import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from 'src/app/shared/models/recipe.model';
import { RecipeService } from 'src/app/shared/recipe.service';

@Component({
  selector: 'app-recipe-view',
  templateUrl: './recipe-view.component.html',
  styleUrls: ['./recipe-view.component.scss'],
})
export class RecipeViewComponent implements OnInit {
  @ViewChild('toggleButton') toggleButton: ElementRef;

  @ViewChild('optionsMenu') menu: ElementRef;

  @Input() recipe: Recipe;

  imgPath: string;

  ingredients: any[];

  selectedRecipeId: string;

  isHidden = true;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['recipeId']) {
        this.selectedRecipeId = params['recipeId'];
        this.recipeService.getRecipe(this.selectedRecipeId).subscribe((recipe: any) => {
          this.recipe = recipe[0];
          if (this.recipe._imgId) {
            this.recipeService.getRecipeImage(this.recipe._imgId).subscribe((img: any) => {
              if (img) {
                this.imgPath = 'http://localhost:3000/uploads/' + img.path;
              }
            });
          } else {
            this.imgPath = '';
          }
        });

        this.recipeService.getIngredients(this.selectedRecipeId).subscribe((ingredients: any) => {
          this.ingredients = ingredients;
        });
      }
    });
  }

  toggleOptions() {
    this.isHidden = !this.isHidden;
  }

  closeMenu() {
    this.isHidden = true;
  }

  deleteRecipe() {
    if (this.recipe._imgId) {
      this.recipeService.deleteFile(this.recipe._imgId).subscribe();
    }

    this.recipeService.deleteRecipe(this.recipe._id).subscribe(() => {
      this.router.navigate(['/recipes']);
    });
  }
}
