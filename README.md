# recipe-book
This is a project for frontend development class I had at University.
Please keep in mind that the CSS is minimal, because it wasn't graded :) If I had a bit more time, it would've looked much nicer.

## Functionality
This project uses my REST API created in node.js using MongoDB (in json format) to fetch data regarding recipes and cuisines. 

### recipes view
It is possible to search for a given recipe with a searchbar on top of the "recipes" view. We can also choose only vegan or vegetarian options. It is possible to filter recipes by their time of preparation (<30 minutes, between 30 minutes and an hour, etc.) and to sort by the amount of ingredients needed, alphabetically and by date of creation. We can click on a given recipe to see its details, or on the "X" button to delete it. 
![image](https://user-images.githubusercontent.com/75100203/164701104-43393206-50a7-4b26-b91f-fb968e3f66f8.png)

In the detail view, we are shown the recipe and ingredients needed, and we can delete the recipe by clicking the "X" button, or edit it by clicking the "edit" button.
![image](https://user-images.githubusercontent.com/75100203/164701432-495583c5-86c0-416c-8004-28fc21d48a8a.png)

### adding a new recipe
We can also add new recipes using the form that we access by clicking "Add new recipe" on the right side of navbar.
![image](https://user-images.githubusercontent.com/75100203/164701900-e184ecf9-226f-4e65-b789-4adfa4d61740.png)

### cuisines view
In the cuisines view, we are shown a list of cuisines, in which each one of them has a short description, a list of the most distinctive ingredients of said cuisine, and a list of recipes in the database that are marked as belonging to this cuisine.
![image](https://user-images.githubusercontent.com/75100203/164702351-e0d350e6-9178-4da4-9550-12d7a4b76dfb.png)

We can sort the cuisines by amount of recipes, by amount of ingredients, and alphabetically.
You can also search for a ingredient - I came up with the idea to implement this feature by thinking how many times I bought something for one specific recipe, and now I have some off it left over and have no idea how to use it. So, you can write, for example, "lemongrass" and you will be shown which cuisines use it a lot and maybe that will inspire you for the next meal :)

## Techonologies 
I used React v17.0.2, react-router-dom v6 and Redux for state management. I wrote everything by myself - not using any features of redux toolkit (you can see how in frontend/ducks).

I used some of react-bootstrap features to style the buttons and the form - it is not the prettiest of my projects, I recommend looking at the Pokedex project or project in javascript-labs repository to see some actual CSS game :)
