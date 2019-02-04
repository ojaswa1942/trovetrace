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
					userGame = {
						score: player[0].score,
						qid: player[0].qid,
						hint: player[0].hint
					};
 				}
 				else {
 					userGame = {
 						score: 0,
 						qid: 0,
 						hint: 0
 					};
 				}
 				let userData = {
					user: userInfo,
					userGame: userGame
				};
				return res.status(200).json(userData);
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