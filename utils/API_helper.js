const request = require('request')
/**
 * fetch external api
 * @param  {string} url 
 * @return {object} json
 */
module.exports = {
	make_API_call : function(url){
		return new Promise((resolve, reject) => {
			request(url, { json: true }, (err, res, body) => {
			  if (err) reject(err)
			  resolve(body)
			});
		})
	}
}