const api_helper = require('../utils/API_helper')

const API_KEY = process.env.MOVIE_API_KEY

exports.trending = (req, res) => {
	const page = req.params.page
	api_helper.make_API_call(`https://api.themoviedb.org/3/trending/movie/week${API_KEY}&page=${page}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}; 

exports.details = (req,res) =>{
	const movie_id = req.params.id
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/${movie_id}${API_KEY}`)
	.then(response => {
		res.json(response) 
	})
	.catch(error => {
		res.send(error)
	})
}

exports.detailsCredit = (req,res) =>{
	const movie_id = req.params.id
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/${movie_id}/credits${API_KEY}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
	
}

exports.detailsVideo = (req,res)=>{
	const movie_id = req.params.id
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/${movie_id}/videos${API_KEY}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}

exports.detailsRecommendations = (req,res) =>{
	const movie_id = req.params.id
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/${movie_id}/recommendations${API_KEY}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}

exports.genres = (req,res)=>{
	api_helper.make_API_call(`https://api.themoviedb.org/3/genre/movie/list${API_KEY}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}

exports.topRated = (req,res)=>{
	const page = req.params.page
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/top_rated${API_KEY}&page=${page}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}


exports.nowPlaying = (req,res)=>{
	const page = req.params.page
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/now_playing${API_KEY}&page=${page}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}

exports.upComing = (req,res)=>{
	const page = req.params.page
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/upcoming${API_KEY}&page=${page}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}



exports.search = (req,res)=>{
	const movie = req.params.movie
	const page = req.params.page
	api_helper.make_API_call(`https://api.themoviedb.org/3/search/movie${API_KEY}&query=${movie}&page=${page}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}

exports.popular = (req,res)=>{
	const page = req.params.page
	api_helper.make_API_call(`https://api.themoviedb.org/3/movie/popular${API_KEY}&page=${page}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
} 

exports.discover = (req,res)=>{
	const page = req.params.page
	const genreforURL = req.params.genres
	api_helper.make_API_call(`https://api.themoviedb.org/3/discover/movie${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
} 

exports.castingInfo = (req,res)=>{
	const id = req.params.id
	api_helper.make_API_call(`https://api.themoviedb.org/3/person/${id}${API_KEY}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}

exports.castingInfoMovies = (req,res)=>{
	const id = req.params.id
	api_helper.make_API_call(`https://api.themoviedb.org/3/person/${id}/movie_credits${API_KEY}`)
	.then(response => {
		res.json(response)
	})
	.catch(error => {
		res.send(error)
	})
}