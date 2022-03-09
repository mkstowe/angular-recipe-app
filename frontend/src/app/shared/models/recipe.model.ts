export class Recipe {
  _id: string;

  title: string;

  description: string;

  _imgId: string;

  steps: [Object];

  prepTime: {
    hours: number;
    minutes: number;
  };

  cookTime: {
    hours: number;
    minutes: number;
  };

  servings: number;

  calories: number;

  notes: string;
}
