const handleNewGame = (req,res,db,dbTrace)=>{
	const email = req.email;
 	db.select('*').from('users').where({email})
	.then(user => {
		if(user.length){
			const {ifid, name, college} = user[0];
			dbTrace.transaction(trx2 => {
				return trx2('players')
				.insert({ifid, name, college})
				.then(() => {
					return trx2('questions').select('*').where({qid: 1})
					.then((ques) => {
						let quesInfo = {
							qid: ques[0].qid,
							question: ques[0].question,
							hintMessage: ques[0].hint,
						};
						return res.status(200).json(quesInfo);
					})
					.then(trx2.commit)
				})
				.catch(trx2.rollback)
			})
		}
		else res.status(400).json('Something is terribly wrong!')
	})
	.catch(err => res.status(400).json('Something is wrong'))
}
module.exports={
	handleNewGame: handleNewGame
};