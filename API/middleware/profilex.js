 const handleProfile=(req,res,db,dbTrace)=>{
	const email = req.email;
	let events;
 	db.select('*').from('users').where({email})
	.then(user => {
		if(user.length){
			const {ifid} = user[0];
 			dbTrace.select('*').from('players').where({ifid})
 			.then(player =>{
 				let userGame;
				let userInfo = {
					ifid: user[0].ifid,
					name: user[0].name,
					confirm: user[0].confirm
				};
				if(player.length){
 					dbTrace('questions').select('*').where({qid: player[0].qid})
					.then((ques) => {
						if(ques.length){
							userGame = {
								score: player[0].score,
								qid: player[0].qid,
								hint: player[0].hint,
								question: ques[0].question,
								quesImage: ques[0].img,
								quesImageURL: ques[0].img_url,
								hintMessage: ques[0].hint,
								hintImage: ques[0].hint_img,
								hintImageURL: ques[0].hint_img_url
							};
						}
						else {
							userGame = {
								score: player[0].score,
								qid: player[0].qid,
								hint: player[0].hint,
								question: `That's all folks!`,
								quesImage: ques[0].img,
								quesImageURL: ques[0].img_url,
								hintMessage: ques[0].hint,
								hintImage: ques[0].hint_img,
								hintImageURL: ques[0].hint_img_url
							};
						}
						let userData = {
							user: userInfo,
							userGame: userGame
						};
						return res.status(200).json(userData);
					})
 				}
 				else {
 					userGame = {
 						score: 0,
 						qid: 0,
 						hint: 0,
 						question: null,
 						quesImage: 0,
						quesImageURL: null,
						hintMessage: null,
						hintImage: 0,
						hintImageURL: null
 					};
	 				let userData = {
						user: userInfo,
						userGame: userGame
					};
					return res.status(200).json(userData);
			    }
 			})
		}
		else
			res.status(404).json('No such user');
	})
	.catch(err => {
		console.log('Profilex', err); 
		res.status(400).json('Something is wrong');});
}

module.exports={
	handleProfile: handleProfile
}