import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import parseIngredient from 'parse-ingredient';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  showValidationErrors: boolean;

  constructor(
    private router: Router,
    private recipeService: RecipeService,
    private location: Location
  ) {}

  ngOnInit(): void {}

  onFormSubmit(form: NgForm) {
    if (form.invalid) return (this.showValidationErrors = true);

    let newRecipe = {
      title: form.value.name,
      description: form.value.description,
      prepTime: {
        hours: form.value.prepHours,
        minutes: form.value.prepMinutes,
      },
      cookTime: {
        hours: form.value.cookHours,
        minutes: form.value.cookMinutes,
      },
      servings: form.value.servings,
      calories: form.value.calories,
      notes: form.value.notes,
    };


    this.recipeService.addRecipe(newRecipe).subscribe((response: any) => {
      this.recipeService.addIngredients(response['_id'], this.parseIngredients(form.value.ingredients)).subscribe();
      this.router.navigateByUrl(`/recipes/${response['_id']}`);
    });

  }

  back() {
    this.location.back();
  }

  parseIngredients(ingredients: string) {
return parseIngredient(ingredients, { normalizeUOM: true });
  }
}
