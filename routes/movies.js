const express = require('express');
const router = express.Router();

const moviesRoutes = require('../controllers/movies');

//verify user is connected with jwt authentification
const auth = require('../middleware/auth');

router.get('/trending/:page' , auth, moviesRoutes.trending) // Get the weekly trending movies
router.get('/:id' ,auth, moviesRoutes.details) //Get the primary information about a movie
router.get('/:id/credits', auth,moviesRoutes.detailsCredit) //Get the cast and crew for a movie.
router.get('/:id/recommendations',auth, moviesRoutes.detailsRecommendations) //Get a list of similar movies
router.get('/:id/videos',auth,moviesRoutes.detailsVideo)
router.get('/genres',auth, moviesRoutes.genres) //Get the list of official genres for movies.
router.get('/top-rated/:page', auth, moviesRoutes.topRated) // Get the list of top-rated movies
router.get('/now-playing/:page', auth, moviesRoutes.nowPlaying) //Get the list of movies in theatres
router.get('/upcoming/:page',auth,moviesRoutes.upComing) //Get a list of upcoming movies in theatres
router.get('/search/:movie/:page',auth, moviesRoutes.search) //GET method to search for a movie
router.get('/popular/:page',auth,moviesRoutes.popular) //Get a list of the current popular movies on TMDB. This list updates daily.
router.get('/discover/:page/:genres',auth,moviesRoutes.discover) //Discover movies by different types of data 
router.get('/actor/:id',auth,moviesRoutes.castingInfo) //Get the primary person details by id.
router.get('/actor/:id/movies',auth,moviesRoutes.castingInfoMovies) //Get the movie credits for a person.

module.exports = router; 