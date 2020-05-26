const Clarifai = require('clarifai');

const app = new Clarifai.App({
 apiKey: '9693f9eec2fe42719300cf4c29766c57'
});

const handleApiCall = (req, res) => {
	app.models
	.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
	.then(data => {
		res.json(data);
	})
	.catch(err => res.status(400).json('unable to work with api'))
}	

const handleImage = (req, res, db) => {
	const { id } = req.body;
  	db('users').where('id', '=', id)
  	.increment('entries', 1)
  	.returning('entries')
  	.then(data => {
  		res.json(data[0])
  	})
  	.catch(err => res.status(400).json('unable to get entries'))
}

module.exports = {
	handleApiCall,
	handleImage: handleImage
}