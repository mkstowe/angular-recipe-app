const express = require("express");
const app = express();

const { mongoose } = require("./db/mongoose");

const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");

const upload = multer({ dest: "./uploads" });

// Load middleware
app.use(bodyParser.json());

// CORS HEADERS MIDDLEWARE
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header(
		"Access-Control-Allow-Methods",
		"GET, POST, HEAD, OPTIONS, PUT, PATCH, DELETE"
	);
	res.header(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, x-access-token, x-refresh-token, _id"
	);

	res.header(
		"Access-Control-Expose-Headers",
		"x-access-token, x-refresh-token"
	);

	next();
});

// Load mongoose models
const { Recipe, Ingredient } = require("./db/models");

/* ROUTE HANDLERS */

/* LIST ROUTES */

/**
 * GET /recipes
 * Purpose: Get all recipes
 */
app.get("/recipes", (req, res) => {
	Recipe.find()
		.then((recipes) => {
			res.send(recipes);
		})
		.catch((e) => {
			res.send(e);
		});
});

/**
 * GET /recipes/:id
 * Purpose: Get specified recipe
 */
app.get("/recipes/:id", (req, res) => {
	Recipe.find({
		_id: req.params.id,
	}).then((recipe) => {
		res.send(recipe);
	});
});

/**
 * POST /recipes
 * Purpose: Create new recipe
 */
app.post("/recipes", upload.single("recipeImg"), (req, res) => {
	let newRecipe = new Recipe({
		title: req.body.title,
		tags: req.body.tags,
		description: req.body.description,
		img: req.file,
		ingredients: req.body.ingredients,
		steps: req.body.steps,
		notes: req.body.notes,
		servings: req.body.servings,
		servingSize: req.body.servingSize,
		calories: req.body.calories,
		prepTime: req.body.prepTime,
		cookTime: req.body.cookTime,
	});

	newRecipe.save().then((newRecipeDoc) => {
		res.send(newRecipeDoc);
	});
});

/**
 * PATCH /recipes/:id
 * Purpose: Update specified recipe
 */
app.patch("/recipes/:id", upload.single("recipeImg"), (req, res) => {
	Recipe.findOneAndUpdate(
		{
			_id: req.params.id,
		},
		{
			$set: req.body,
		}
	).then(() => {
		res.send({ message: "updated successfully" });
	});
});

/**
 * DELETE /recipes/:id
 * Purpose: Delete specified recipe
 */
app.delete("/recipes/:id", (req, res) => {
	Recipe.findOneAndRemove({
		_id: req.params.id,
	}).then((removedRecipeDoc) => {
		res.send(removedRecipeDoc);
	});
});

/**
 * DELETE /recipes
 * Purpose: Delete all recipes
 */
app.delete("/recipes", (req, res) => {
	Recipe.deleteMany({}).then(() => {
		res.send({ message: "All recipes deleted" });
	});
});

/**
 * GET /recipes/:recipeId/ingredients
 * Purpose: Get ingredients of specified recipe
 */
app.get("/recipes/:recipeId/ingredients", (req, res) => {
	Ingredient.find({
		_recipeId: req.params.recipeId,
	}).then((ingredients) => {
		res.send(ingredients);
	});
});

/**
 * POST /recipes/:recipeId/ingredients
 * Purpose: Create array of ingredients
 */
app.post("/recipes/:recipeId/ingredients", (req, res) => {
	Recipe.findOne({
		_id: req.params.recipeId,
	})
		.then((recipe) => {
			if (recipe) {
				return true;
			}

			return false;
		})
		.then((canCreateIngredients) => {
			if (canCreateIngredients) {
				let ingredients = [];
				Array.from(req.body).forEach((ingredient) => {
					let newIngredient = new Ingredient({
						_recipeId: req.params.recipeId,
						quantity: ingredient.quantity,
						quantity2: ingredient.quantity2,
						unitOfMeasure: ingredient.unitOfMeasure,
						description: ingredient.description,
						isGroupHeader: ingredient.isGroupHeader,
					});
					ingredients.push(newIngredient);
				});

				Ingredient.insertMany(ingredients)
					.then((docs) => {
						res.send(docs);
					})
					.catch((e) => {
						res.status(500).send(e);
					});
			} else {
				res.sendStatus(404);
			}
		});
});

/**
 * PATCH /recipes/:recipeId/ingredients/:ingredientId
 * Purpose: Update specified ingredient
 */
app.patch("/recipes/:recipeId/ingredients/:ingredientId", (req, res) => {
	Recipe.findOne({
		_id: req.params.recipeId,
	})
		.then((recipe) => {
			if (recipe) {
				return true;
			}

			return false;
		})
		.then((canUpdateIngredients) => {
			if (canUpdateIngredients) {
				Ingredient.findOneAndUpdate(
					{
						_id: req.params.ingredientId,
						_recipeId: req.params.recipeId,
					},
					{
						$set: req.body,
					}
				).then(() => {
					res.send({ message: "Updated successfully." });
				});
			} else {
				res.sendStatus(404);
			}
		});
});

/**
 * DELETE /recipes/:recipeId/ingredients/:ingredientId
 * Purpose: Delete specified ingredient
 */
app.delete("/recipes/:recipeId/ingredients/:ingredientId", (req, res) => {
	Recipe.findOne({
		_id: req.params.recipeId,
	})
		.then((recipe) => {
			if (recipe) {
				return true;
			}

			return false;
		})
		.then((canDeleteIngredients) => {
			if (canDeleteIngredients) {
				Ingredient.findOneAndRemove({
					_id: req.params.ingredientId,
					_recipeId: req.params.recipeId,
				}).then((removedIngredientDoc) => {
					res.send(removedIngredientDoc);
				});
			} else {
				res.sendStatus(404);
			}
		});
});

/**
 * DELETE /recipes/:recipeId/ingredients
 * Purpose: Delete all ingredients for specified recipe
 */
app.delete("/recipes/:recipeId/ingredients", (req, res) => {
	Recipe.findOne({
		_id: req.params.recipeId,
	})
		.then((recipe) => {
			if (recipe) {
				return true;
			}

			return false;
		})
		.then((canDeleteIngredients) => {
			if (canDeleteIngredients) {
				Ingredient.deleteMany({ _recipeId: req.params.recipeId }).then(
					() => {
						res.send({ message: "All ingredients deleted" });
					}
				);
			}
		});
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});
