const jwt = require('jsonwebtoken');
const secret = 'iAmVeryBadAtThis';

const handleSignin = (req,res,db,dbTrace,bcrypt,xss)=>{
	const xssOptions = {
		whiteList: [],
		stripIgnoreTag: [],
		stripIgnoreTagBody: ['script']
	};
	const {password} = req.body;
	const email = xss(req.body.username, xssOptions);
	// const email = req.body.username;
		if(!email || !password)
	{
		return res.status(400).json('Incorrect form submission');
	}

	db.select('email', 'password').from('credentials')
	.where({email})
	.then(data => {
		if(data.length){
			bcrypt.compare(password, data[0].password, function(err, result) {
				if(result)
					{
						return db.select('*').from('users')
						.where({email})
						.then(user =>{
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
										userGame = {
											score: player[0].score,
											qid: player[0].qid,
											hint: player[0].hint,
											question: ques[0].question
										};
										let userData = {
											user: userInfo,
											userGame: userGame
										};
										const payload = {email};
								        const token = jwt.sign(payload, secret, {
								        	expiresIn: '30d'
								        });
								        res.status(200).cookie('token', token, { maxAge: 2419200000, httpOnly: true }).json(userData)
									})
				 				}

				 				else {
				 					userGame = {
				 						score: 0,
				 						qid: 0,
				 						hint: 0,
				 						question: null
				 					};
					 				let userData = {
										user: userInfo,
										userGame: userGame
									};
								 	const payload = {email};
							        const token = jwt.sign(payload, secret, {
							        	expiresIn: '30d'
							        });
							        res.status(200).cookie('token', token, { maxAge: 2419200000, httpOnly: true }).json(userData)
							    }
				 			})
				 		})
						.catch(err => res.status(400).json('Invalid User'))
					}
				else
					return res.status(400).json("Invalid Credentials");
		 	})
		}
		else res.status(400).json("Invalid Credentials");
	})
	.catch(err=> {console.log(err); res.status(400).json('Some error occurred')})	
}

module.exports={
	handleSignin: handleSignin
};