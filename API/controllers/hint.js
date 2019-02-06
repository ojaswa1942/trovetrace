const toUTC = (now) => {
	var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	return utc;
}

const handleHint = (req,res,db,dbTrace)=>{
	const email = req.email;
 	db.select('*').from('users').where({email})
	.then(user => {
		if(user.length){
			const {ifid} = user[0];
			dbTrace('players').select('*').where({ifid})
			.then(player => {
				const {hint, qid} = player[0];
				const timeDiff = (toUTC(new Date()) - toUTC(player[0].timestamp) );
				if(hint){
					dbTrace('questions').select('*').where({qid})
					.then(ques => {
						return res.status(200).json(ques[0].hint);
					})
				}
				else {
					dbTrace.transaction(trx2 => {
						return trx2('players')
						.update({hint: 1, time_taken: timeDiff})
						.decrement({score: 20})
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