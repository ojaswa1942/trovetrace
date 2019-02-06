const handleHint = (req,res,db,dbTrace)=>{
	const email = req.email;
 	db.select('*').from('users').where({email})
	.then(user => {
		if(user.length){
			const {ifid} = user[0];
			dbTrace('players').select('*').where({ifid})
			.then(player => {
				const {hint, qid} = player[0];
				if(hint){
					dbTrace('questions').select('*').where({qid})
					.then(ques => {
						return res.status(200).json(ques[0].hint);
					})
				}
				else {
					dbTrace.transaction(trx2 => {
						return trx2('players')
						.update({hint: 1})
						.where({ifid})
						.then(() => {
							return trx2('questions').select('*').where({qid})
							.then(ques => {
								return res.status(200).json(ques[0].hint);
							})
							.then(trx2.commit)
						})
						.catch(trx2.rollback)
					})
				}
			})
		}
		else res.status(400).json('Something is terribly wrong!')
	})
	.catch(err => res.status(400).json('Something is wrong'))
}
module.exports={
	handleHint: handleHint
};