const pool = require("../../config/database");

module.exports = {
	create: (data, callBack) => {
		pool.query(`insert into registration(fname, lname, email, password) values(?,?,?,?)`,
			[
				data.fname,
				data.lname,
				data.email,
				data.pass
			],
			(error, results, fields) => {
				if(error){
					return callBack(error); 
				}
				return callBack(null, results);
			}
		);
	},
	getUsers: callBack => {
		pool.query(`select id,fname,lname,email from registration`,
			[],
			(error, results,fields) => {
				if(error){
					return callBack(error); 
				}
				return callBack(null, results);
			}
		);
	},
	getUserByUserId: (id, callBack) => {
		pool.query(`select id,fname,lname,email from registration where id=?`,
			[id],
			(error, results,fields) => {
				if(error){
					return callBack(error); 
				}
				return callBack(null, results[0]);
			}
		);
	},
	updateUser: (data, callBack) => {
		pool.query(`update registration set fname=?, lname=?, email=?, password=? where id=?`,
			[
				data.fname,
				data.lname,
				data.email,
				data.pass,
				data.id
			],
			(error, results, fields) => {
				if(error){
					return callBack(error); 
				}
				return callBack(null, results);
			}
		);
	},
	deleteUser: (id, callBack) => {
		pool.query(`delete from registration where id=?`,
			[id],
			(error, results, fields) => {
				if(error){
					return callBack(error); 
				}
				return callBack(null, results);
			}
		);
	},
	getUserByUserEmail: (email, callBack) => {
		pool.query(`select * from registration where email=?`,
			[email],
			(error, results,fields) => {
				if(error){
					return callBack(error); 
				}
				return callBack(null, results[0]);
			}
		);
	},
};