# Back-end Movie app

## Prerequisites

- [NodeJS (version 14.17)](https://nodejs.org/en/)

## Dependencies

- [express.js](https://expressjs.com/)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)
- [bcrypt](https://www.npmjs.com/package/bcrypt)
- [body-parser](https://www.npmjs.com/package/body-parser)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [multer](https://www.npmjs.com/package/multer)
- [nodemailer](https://nodemailer.com/about/)
- [request](https://www.npmjs.com/package/request)
- [themoviedbAPI](https://developers.themoviedb.org/3/getting-started/introduction)

## Installation backend

1. Get the backend

2. Install NPM packages

   ```sh
   cd back-end
   npm i
   ```

3. Run the server (port 3000 by default)

   ```sh
   nodemon server
   ```

## Routes

### Authentification routes

- `http://localhost:3000/users/signup` POST method for sign up `body{nickname:"string", email:"string",password:"string"}`
- `http://localhost:3000/users/login` POST method for log in `body{email:"string",password:"string"}`
- `http://localhost:3000/users/forgot-password` POST method for log in `body{email:"string"}`
- `http://localhost:3000/users/reset-password` POST method to verify secret code `body{resetPasswordNumber:number}`
- `http://localhost:3000/users/modify-password` POST method to change user password `body{_id:number,password:"string"}`
- `http://localhost:3000/users/modify-avatar/:id` POST method to change user avatar `params:_id`
- `http://localhost:3000/users/verifytoken` GET method verify is jwt is valid `headers: {'Authorization':Bearer jwt}`

### Movies routes

- `http://localhost:3000/movies/trending/:page` GET the weekly trending movies. `page:number`
- `http://localhost:3000/movies/:id` GET the primary information about a movie. `id:number`
- `http://localhost:3000/movies/:id/credits` Get the cast and crew for a movie. `id:number`
- `http://localhost:3000/movies/:id/videos` GET the videos that have been added to a movie. `id:number`
- `http://localhost:3000/movies/:id/similar` GET a list of similar movies. `id:number`
- `http://localhost:3000/movies/genres` GET the list of official genres for movies.
- `http://localhost:3000/movies/top-rated/:page` GET the list of top rated movies. `page:number`
- `http://localhost:3000/movies/now-playing/:page` GET the list of movies in theater. `page:number`
- `http://localhost:3000/movies/upcoming/:page` GET a list of upcoming movies in theatres. `page:number`
- `http://localhost:3000/movies/search/:movie/:page`GET method to search movies.
  . `movie:string page:number`
- `http://localhost:3000/movies/popular/:page` Get a list of the current popular movies on TMDB. This list updates daily. `page:number`discover/:page/:genres
- `http://localhost:3000/movies/discover/:page/:genres` Discover movies by different types of data. `page:number/genres:number` use id separated by a comma for genres ex:'11,12,25'
- `http://localhost:3000/movies/actor/:id` Get the primary person details by id. `id:number`
- `http://localhost:3000/movies/actor/:id/movies` Get the movie credits for a person. `id:number`

### Comment routes

- `http://localhost:3000/comment/:movie_id` GET comments for a specific movie `params:id`
- `http://localhost:3000/comment/newComment` POST method to add a comment for a specific movie `body{author:"string",author_id:"string",comment: "string",movie_id: number,avatar:"string"}`
- `http://localhost:3000/comment/deleteComment` DELETE method to remove a comment for a specific movie `body{author_id:"string",_id:number}`
- `http://localhost:3000/comment/updateComment` POST method to modify a comment `body {author_id:"string",_id:number, comment: "string"}`
