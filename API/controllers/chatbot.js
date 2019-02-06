const checkRequestForAnswer = (ques, message) => {

}


const handleChatbotResponse = (req,res,db,dbTrace,xss)=>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const message = xss(req.body.message, xssOptions).toLowerCase();	
	const email = req.email;

	if(!email || !message)
		throw('Nani?');
 	db.select('*').from('users').where({email})
	.then(user => {
		if(user.length){
			const {ifid} = user[0];
			console.log('Chatbot Attempt =>', message, '<=');
			dbTrace.select('*').from('players').where({ifid})
			.then(player => {
				if(player.length){
					const timeDiff = new Date(2019, 1, 11).getTime() - player[0].timest.getTime();
					const {qid} = player[0];
					dbTrace.select('*').from('questions').where({qid})
					then(ques => {
						if(ques.length){
							let check = checkRequestForAnswer(ques[0], message);
							if(check){
								dbTrace.transaction(trx =>{
									trx('players')
									.where({ifid})
									.increment({
										qid: 1,
										score: 100
									})
									.update({
										hint: 0,
										time_taken: timeDiff
									})
									.then(() => {
										trx('questions').select('*').where({qid: qid+1})
										.then((newQuest) => {
											let quesInfo;
											if(newQuest.length){
												quesInfo = {
													success: true,
													end: false,
													qid: newQuest[0].qid,
													ques: newQuest[0].question
												};
											}
											else{
												quesInfo = {
													success: true,
													end: true,
													qid: qid+1
												};
											}
											res.status(200).json(quesInfo);
										})
										.then(trx.commit)
									})
									.catch(trx.rollback)
								})
							}
							else {
								res.status(200).json({
									success: false
								});
							}
						}
					})
				}
				else
					res.status(400).json('Start the game first!')
			})
		}
		else 
			res.status(400).json('Something is terribly wrong!')
	})
	.catch(err => res.status(400).json('Something is wrong'));

	db.transaction(trx =>{
		console.log('Chatbot Attempt =>', message, '<=');

	 	trx.select('*').from('easter').where({egg})
	 	.then(easterEgg => {
	 		if(easterEgg.length){
	 			trx('users').select('*').where({email})
	 			.then(userData => {
	 				const ifid = userData[0].ifid;
	 				trx('easter_redeem').select('*').where({ifid, egg})
	 				.then(userRedeem => {
	 					if(userRedeem.length){
	 						return res.status(400).json(`Egg already redeemed. Stop loading our servers!`);
	 					}
	 					else {
	 						trx('easter_redeem')
	 						.insert({
	 							ifid, egg,
	 							score: easterEgg[0].score
	 						})
	 						.then(() => {
	 							if(easterEgg[0].score > 200){
	 								trx('easter').where({egg}).decrement('score', 40)
	 								.then(() => {
	 									trx('easter_redeem')
										.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
										.select('easter_redeem.ifid', 'name')
										.sum({total: 'score'})
										.groupBy('easter_redeem.ifid')
										.orderBy('total', 'desc')
										.limit(15)
										.then((leaderboard) => {
											trx('easter_redeem')
											.sum({total: 'score'})
											.where({ifid})
											.then(userScore => {
												const score = {userScore, leaderboard};
												return res.status(200).json(score);
											})
											.then(trx.commit)
										})
	 								})
	 							}
	 							else {
 									trx('easter_redeem')
									.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
									.select('easter_redeem.ifid', 'name')
									.sum({total: 'score'})
									.groupBy('easter_redeem.ifid')
									.orderBy('total', 'desc')
									.limit(15)
									.then((leaderboard) => {
										trx('easter_redeem')
										.sum({total: 'score'})
										.where({ifid})
										.then(userScore => {
											const score = {userScore, leaderboard};
											return res.status(200).json(score);
										})
										.then(trx.commit)
									})
	 							}
	 						})
							.catch(trx.rollback)
	 					}
	 				})
	 			})
	 		}
	 		else{
	 			return res.status(400).json(`You got the wrong egg! Try again?`);
	 		}
	 	})
	})
	.catch(err => res.status(400).json('Something is wrong'));
}

const fetchScore = (req,res,db)=>{
	const {ifid, isLoggedIn} = req.body;
	if(isLoggedIn){
		return db('easter_redeem')
		.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
		.select('easter_redeem.ifid', 'name')
		.sum({total: 'score'})
		.groupBy('easter_redeem.ifid')
		.orderBy('total', 'desc')
		.limit(15)
		.then((leaderboard) => {
			db('easter_redeem')
			.sum({total: 'score'})
			.where({ifid})
			.then(userScore => {
				const score = {userScore, leaderboard};
				return res.status(200).json(score);
			})
		})
		.catch(err => {console.log(err); return res.status(400).json('Something is wrong');});
	}
	else {
		return db('easter_redeem')
		.join('users', 'users.ifid', '=', 'easter_redeem.ifid')
		.select('easter_redeem.ifid', 'name')
		.sum({total: 'score'})
		.groupBy('easter_redeem.ifid')
		.orderBy('total', 'desc')
		.limit(15)
		.then((leaderboard) => {
			return res.status(200).json(leaderboard);
		})
		.catch(err => {console.log(err); return res.status(400).json('Something is wrong');});
	}
}

module.exports={
	handleChatbotResponse: handleChatbotResponse,
	fetchScore: fetchScore
};