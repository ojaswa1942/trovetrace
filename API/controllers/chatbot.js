const checkRequestForAnswer = (ques, message) => {
	if(message.toLowerCase().includes((ques.answer).toLowerCase()))
		return true;
	else return false;
}

const checkRequestForBonus = (ques, message) => {
	
}

const toUTC = (now) => {
	var utc = new Date(now.getTime() + now.getTimezoneOffset() * 60000);
	return utc;
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
			dbTrace.select('*').from('players').where({ifid})
			.then(player => {
				console.log(player[0].qid, 'Attempt =>', message, '<=', user[0].name, user[0].college);
				if(player.length){
					const {qid} = player[0];
					const timeDiff = (toUTC(new Date()) - toUTC(player[0].timestamp) );
					dbTrace.select('*').from('questions').where({qid})
					.then(ques => {
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
													score: player[0].score + 100,
													qid: newQuest[0].qid,
													question: newQuest[0].question,
													hint: 0
												};
											}
											else{
												quesInfo = {
													success: true,
													end: true,
													hint: 0,
													score: player[0].score + 100,
													qid: qid+1,
													question: `That's all folks!`
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
									success: false,
									score: player[0].score
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
}

module.exports={
	handleChatbotResponse: handleChatbotResponse,
};