const { verify } = require("jsonwebtoken");

module.exports = {
	checkToken: (req, res, next) => {
		let token = req.get("authorization");
		if(token){
			token = token.slice(7);
			verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
				if(err){
					res.json({
						success: 0,
						data: "Invalid token"
					});
				} else {
					next();
				}
			})
		} else {
			res.json({
				success: 0,
			 	data: "Access denied! unauthorized user"
			})
		}
	}
}