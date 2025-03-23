import express from 'express'
const app = express()
const port = 3000

function react(req, res){
    console.log("React  has been cad");
    
    res.send('Hello Chen!');
}

app.get('/', react)

app.get('/recipes', (req, res) => {
    const recipesJSON = `
    [
      {
        "id": 1,
        "title": "Spaghetti Carbonara",
        "ingredients": [
          "200g spaghetti",
          "100g pancetta",
          "2 large eggs",
          "50g parmesan cheese",
          "Black pepper",
          "Salt"
        ],
        "instructions": "Cook spaghetti, fry pancetta, mix eggs and cheese, combine all with pasta.",
        "preparationTime": 20,
        "difficulty": "Easy"
      },
      {
        "id": 2,
        "title": "Chicken Tikka Masala",
        "ingredients": [
          "500g chicken breast",
          "1 cup yogurt",
          "3 tbsp tikka masala paste",
          "1 onion",
          "400g chopped tomatoes",
          "Fresh coriander"
        ],
        "instructions": "Marinate chicken, sauté onions, add paste, tomatoes, cook chicken, garnish with coriander.",
        "preparationTime": 45,
        "difficulty": "Medium"
      },
      {
        "id": 3,
        "title": "Avocado Toast",
        "ingredients": [
          "2 slices sourdough bread",
          "1 ripe avocado",
          "Salt",
          "Pepper",
          "Lemon juice",
          "Chili flakes"
        ],
        "instructions": "Toast bread, mash avocado with salt, pepper, lemon juice, spread on toast, sprinkle chili flakes.",
        "preparationTime": 10,
        "difficulty": "Easy"
      }
    ]`;
  
    res.json(JSON.parse(recipesJSON));
  });

app.listen(port, () => {
  console.log(`CICD app listening on port ${port}`)
})