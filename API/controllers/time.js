const handleHighScore = (req,res,db)=>{
 	db.select('*').from('players')
 	.orderBy('score', 'desc')
 	.orderBy('time_taken', 'asc')
 	.then(ranks => {
 		res.status(200).json(ranks);
	})
	.catch(err => res.status(400).json('Something is wrong'))
}
module.exports={
	handleHighScore: handleHighScore
};