import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import parseIngredient from 'parse-ingredient';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Types } from 'mongoose';
import { Recipe } from 'src/app/shared/models/recipe.model';

@Component({
  selector: 'app-recipe-form',
  templateUrl: './recipe-form.component.html',
  styleUrls: ['./recipe-form.component.scss'],
})
export class RecipeFormComponent implements OnInit {
  form: FormGroup;
  fileSelected: boolean = false;
  selectedFile: File;
  fileName: string;
  notAnImage: boolean = false;
  imgPath: string;
  showValidationErrors: boolean = false;
  editMode: boolean;
  recipe: Recipe;
  selectedRecipeId: string;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private recipeService: RecipeService,
    private location: Location
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: [''],
      ingredients: [''],
      steps: [''],
      prepHours: [''],
      prepMinutes: [''],
      cookHours: [''],
      cookMinutes: [''],
      servings: [''],
      calories: [''],
      notes: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.editMode = data['editMode'];

      if (this.editMode) {
        this.route.params.subscribe((params) => {
          if (params['recipeId']) {
            this.selectedRecipeId = params['recipeId'];
            this.recipeService
              .getRecipe(this.selectedRecipeId)
              .subscribe((recipe: any) => {
                this.recipe = recipe[0];
                this.setFormValues();

                if (this.recipe._imgId) {
                  this.recipeService
                    .getRecipeImage(this.recipe._imgId)
                    .subscribe((img: any) => {
                      if (img.path) {
                        this.imgPath =
                          'http://localhost:3000/uploads/' + img.path;
                        this.fileName = img.path;
                        this.fileSelected = true;
                      }
                    });
                }
              });
          }
        });
      }
    });
  }

  back() {
    this.location.back();
  }

  setFormValues() {
    if (!this.recipe) return;

    this.form.controls['name'].setValue(this.recipe.title);
    this.form.controls['description'].setValue(this.recipe.description);
    this.form.controls['prepHours'].setValue(this.recipe.prepTime['hours']);
    this.form.controls['prepMinutes'].setValue(this.recipe.prepTime['minutes']);
    this.form.controls['cookHours'].setValue(this.recipe.cookTime['hours']);
    this.form.controls['cookMinutes'].setValue(this.recipe.cookTime['minutes']);
    this.form.controls['servings'].setValue(this.recipe.servings);
    this.form.controls['calories'].setValue(this.recipe.calories);
    this.form.controls['notes'].setValue(this.recipe.notes);
  }

  onFileSelected(event) {
    this.fileSelected = true;

    let imgTypes = ['jpg', 'jpeg', 'png', 'gif', 'tiff', 'bpg', 'webp'];
    if (imgTypes.indexOf(event.target.files[0].name.split('.').pop()) === -1) {
      this.notAnImage = true;
    } else {
      this.notAnImage = false;
      this.selectedFile = event.target.files[0];
      this.fileName = this.selectedFile.name;
    }
  }

  removeFile() {
    this.fileSelected = false;
    this.notAnImage = false;
    this.fileName = '';
  }

  parseIngredients(ingredients: string) {
    return parseIngredient(ingredients);
  }

  submit() {
    if (this.form.invalid) return (this.showValidationErrors = true);

    let newRecipe = {
      title: this.form.get('name')?.value,
      description: this.form.get('description')?.value,
      imgId: null,
      steps: this.form
        .get('steps')
        ?.value.split('\n')
        .filter((o) => o)
        .map((step) => ({ description: step })),
      prepTime: {
        hours: this.form.get('prepHours')?.value,
        minutes: this.form.get('prepMinutes')?.value,
      },
      cookTime: {
        hours: this.form.get('cookHours')?.value,
        minutes: this.form.get('cookMinutes')?.value,
      },
      servings: this.form.get('servings')?.value,
      calories: this.form.get('calories')?.value,
      notes: this.form.get('notes')?.value,
    };

    if (this.fileSelected && this.selectedFile) {
      const formData = new FormData();
      formData.append('recipeImage', this.selectedFile);
      this.recipeService.uploadFile(formData).subscribe((response: any) => {
        newRecipe.imgId = response._id;
        if (!this.editMode) {
          this.submitRecipe(newRecipe);
        } else {
          this.updateRecipe(newRecipe);
        }
      });
    } else {
      newRecipe.imgId = null;
      if (!this.editMode) {
        this.submitRecipe(newRecipe);
      } else {
        this.updateRecipe(newRecipe);
      }
    }
  }

  submitRecipe(newRecipe) {
    console.log(newRecipe._imgId)
    this.recipeService.addRecipe(newRecipe).subscribe((response: any) => {
      this.recipeService
        .addIngredients(
          response['_id'],
          this.parseIngredients(this.form.get('ingredients')?.value)
        )
        .subscribe();
      this.router.navigateByUrl(`recipes/${response._id}`);
    });
  }

  updateRecipe(newRecipe) {
    console.log('here');
    this.recipeService
      .updateRecipe(this.selectedRecipeId, newRecipe)
      .subscribe((response: any) => {
        this.recipeService
          .updateIngredients(
            this.selectedRecipeId,
            this.parseIngredients(this.form.get('ingredients')?.value)
          )
          .subscribe();
        this.router.navigateByUrl(`recipes/${this.selectedRecipeId}`);
      });
  }
}
