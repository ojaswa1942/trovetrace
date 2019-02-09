// const checkRequestForAnswer = (ques, message) => {
// 	if(message.toLowerCase().includes((ques.answer).toLowerCase()))
// 		return true;
// 	else return false;
// }

// const checkRequestForBonus = (ques, message) => {

// }

const provideResponseForCorrectHint = (req, res, dbTrace, message) => {
	return res.status(200).json({
		success: false,
		successHint: true,
		message: message
	});
}

const provideResponseForCorrectAnswer = (ifid, res, dbTrace, qid ,timeDiff, player) => {
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
						successHint: false,
						end: false,
						score: player[0].score + 100,
						qid: newQuest[0].qid,
						quesImage: newQuest[0].img,
						quesImageURL: newQuest[0].img_url,
						question: newQuest[0].question,
						hint: 0,
						hintMessage: newQuest[0].hint,
						hintImage: newQuest[0].hint_img,
						hintImageURL: newQuest[0].hint_img_url
					};
				}
				else{
					quesInfo = {
						success: true,
						successHint: false,
						end: true,
						hint: 0,
						score: player[0].score + 100,
						qid: qid+1,
						question: `That's all folks!`
					};
				}
				return res.status(200).json(quesInfo);
			})
			.then(trx.commit)
		})
		.catch(trx.rollback)
	})
	.catch(err => {console.log(err); res.status(400).json('Something is wrong');});
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
							msg=message.toLowerCase();
							if(qid === 1){
								if(msg.includes('skip') || msg.includes('continue') || msg.includes('solve')){
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
								}
							}
							else if(qid === 2){
								if(!msg.localeCompare("nurturing"))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 3){
								if(!msg.localeCompare('smartverysmart'))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 4){
								if(msg.includes('formula'))
									return provideResponseForCorrectHint(ifid, res, dbTrace, "Y = X*(X^X)");
								else if(!msg.localeCompare('5764801'))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 5){
								if(msg.includes('always'))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 6){
								if(!msg.localeCompare("ant man was here"))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 7){
								if(msg.includes('doctor strange'))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 8){
								if(!msg.localeCompare("a.b.v. - i.i.i.t. gwalior"))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							else if(qid === 9){
								if(msg.includes('word'))
									return provideResponseForCorrectHint(ifid, res, dbTrace, "AKASH, MONKEY, QUICK");
								else if(msg.includes('brrgrbg') || msg.includes('blue red red green red blue green') )
									return provideResponseForCorrectHint(ifid, res, dbTrace, "3");
								else if(!msg.localeCompare("pokeball kite mjolnir"))
									return provideResponseForCorrectAnswer(ifid, res, dbTrace, qid, timeDiff, player);
							}
							
							return res.status(200).json({
								success: false,
								successHint: false,
								score: player[0].score
							});
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