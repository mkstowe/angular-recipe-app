import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
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
  imgPath: String;
  ingredients: any[];
  selectedRecipeId: string;
  isHidden = true;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      if (params.get('recipeId')) {

        this.selectedRecipeId = params.get('recipeId') as string;
        this.recipeService
        .getRecipe(this.selectedRecipeId)
        .subscribe((recipe: any) => {
          this.recipe = recipe[0];
          if (this.recipe._imgId) {
          this.recipeService.getRecipeImage(this.recipe._imgId).subscribe((img: any) => {
            if (img) {
              this.imgPath = "http://localhost:3000/uploads/" + img.path;
            }
          });
        }
          });

        this.recipeService
          .getIngredients(this.selectedRecipeId)
          .subscribe((ingredients: any) => {
            this.ingredients = ingredients;
          });
      }
    });
  }

  toggleOptions() {
    this.isHidden = !this.isHidden;
  }

  closeMenu(e: Event) {
    this.isHidden = true;
  }

  deleteRecipe() {
    this.recipeService.deleteRecipe(this.recipe['_id']).subscribe((res: any) => {
      this.router.navigate(['/recipes']);
    });
  }
}
