# Find A Meal

Find a meal project is made to provide the user the ability to find a meal they love to eat and provide them with the full ingredients and instructions so that any individual could be able to cook, even when they have never done cooking in their life. This project also provides nutritional details of the meal that the user will be searching for so the user know how much of nutritional values the chosen meal contains.

## User Story

```
AS A user
- I WANT to find a meal with the instructions on how to cook that meal and what ingredients is need to prepare the meal with its nutritional values
- SO THAT I can cook a meal according to my nutritional requirements
```

## Acceptance Criteria

```
GIVEN I am searching for a meal
WHEN I enter the meal name and click the search button
THEN I am presented with a multiple results of meal related with my search values
WHEN I click on one of the result meal
THEN I am presented with a popup modal
WHEN I check the modal
THEN I am presented with a Image of the meal and the ingredient and instructions to cook that meal. And also the nutritional values for that particular meal
WHEN I click on the close button of popup modal
THEN I should see the previous page with my old meal search results
```

# Assets

## The following animation demonstrates the application functionality:

### 1. Home page with page tile and search bar and button

![A user is provided with a front page where a user see the title of the page and a section to enter their search value and a button to search for the result of that value](./assets/images/Project%20-%20Start%20Page.gif)

#

### 2. User input and search results

![A user enter the value for search and upon clicking the search button will be able to see multiple results](./assets/images/input%20-%20search%20result.gif)

#

### 3. Popup Modal with a close button on right side. Modals shows the meal tile, image, ingredients, instructions and nutritional values

![A user is provided with a Popup Modal with a close button on right side. Modals shows the meal tile, image, ingredients, instructions and nutritional values](./assets/images/Modal-details.gif)

#
## API Functionality 

## The MealDB

### Fetch the MealDb API, to search for recipes by meal name

    Access Point: `https://www.themealdb.com/api/json/v1/1/search.php?s=${term}

The ${term} parameter is determined by the search value that was entered in the search bar. If it is a valid search request, the API will respond with all recipes that contain that term.
These fetch results are used to populate the search results page.
We than create an on-click event listener that will obtain the selected recipe cards recipeID.

The recipesID value is used in the used in the below API to fetch the full recipe details.

    Access Point: https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeID}`

Giving us the ingredients and instructions. We will than use these details to append to the recipe info card pop up

## EDAMAM API 

### Full Recipe Analysis Method – POST Request

Returns the nutritional information based on a POST request of the body section containing the recipe content. 

    Access Point: ‘https://api.edamam.com/api/nutrition-details?app_id=’

The POST request submits the body parameters we specified that contains the recipe details. We set our POST body parameters to be the recipe title and ingredient list.

    {“title” ("title"), “ingr”: (Array["ingredient List"])}

The Ingredients List is sent as a JSON string object, containing the ingredients and measure values obtained from the mealdb API as objects.

The response is returned from the API containing the nutritional analysis for the recipe based on the information provided. 

#

# Installation

- download the zip file, or use GitHub's guidelines to clone the repository from the GitHub repository provided in links section below

# Links

Below is the link related to the project:

- Deployed application - https://rochak-ms.github.io/find-a-meal/

- GitHub repository - https://github.com/rochak-ms/find-a-meal

# Credits

- [Bulma CSS framework](https://bulma.io/documentation/)
- [The Meal API](https://www.themealdb.com/api.php).
- [Edamam Nutrition API](https://www.edamam.com/).

# License

MIT License

# Contributors

- Rochak: https://github.com/rochak-ms
- Gina: https://github.com/GEEZEE91
- Jerrome: https://github.com/JerromeL

#

`© 2022 Find A Meal -- Group-5(Rochak, Gina, Jerrome) Project-1`
