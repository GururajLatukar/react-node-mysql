const { create, getUserByUserId, getUsers, updateUser, deleteUser, getUserByUserEmail } = require("./user.service");

const { genSaltSync, hashSync, compareSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
	createUser: (req, res) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.pass = hashSync(body.pass, salt);
		create(body, (err, results) => {
			 if(err){
			 	console.log(err);
			 	return res.status(500).json({
			 		success: 0,
			 		data: "Database connection error"
			 	});
			 }
			 return res.status(200).json({
			 	success: 1,
			 	data: results
			 });
		});
	},
	getUserByUserId: (req, res) => {
		const id = req.params.id;
		getUserByUserId(id, (err, results) => {
			 if(err){
			 	console.log(err);
			 	return;
			 }
			 if(!results){
			 	return res.json({
			 		success: 0,
			 		data: "Records not found"
			 	})
			 }
			 return res.status(200).json({
			 	success: 1,
			 	data: results
			 });
		});
	},
	getUsers: (req, res) => {
		getUsers((err, results) => {
			 if(err){
			 	console.log(err);
			 	return;
			 }
			 return res.status(200).json({
			 	success: 1,
			 	data: results
			 });
		});
	},
	updateUser: (req, res) => {
		const body = req.body;
		const salt = genSaltSync(10);
		body.pass = hashSync(body.pass, salt);
		updateUser(body, (err, results) => {
			 if(err){
			 	console.log(err);
			 	return res.status(500).json({
			 		success: 0,
			 		data: "Database connection error"
			 	});
			 }
			 if(!results.affectedRows){
			 	return res.json({
			 		success: 0,
			 		data: "Records not found"
			 	})
			 }
			 return res.status(200).json({
			 	success: 1,
			 	data: "Record updated"
			 });
		});
	},
	deleteUser: (req, res) => {
		const id = req.params.id;
		deleteUser(id, (err, results) => {
			 if(err){
			 	console.log(err);
			 	return;
			 }
			 if(!results.affectedRows){
			 	return res.json({
			 		success: 0,
			 		data: "Records not found"
			 	})
			 }
			 return res.status(200).json({
			 	success: 1,
			 	data: "Record deleted"
			 });
		});
	},
	login: (req, res) => {
		const body = req.body;
		getUserByUserEmail(body.email, (err, results) => {
			if(err){
			 	console.log(err);
			 	return;
			 }
			 if(!results){
			 	return res.json({
			 		success: 0,
			 		data: "Invalid email or password"
			 	})
			 }
			 const result = compareSync(body.pass, results.password);
			 if(result){
			 	results.password = undefined;
			 	const jsonwebtoken = sign({result: results}, process.env.TOKEN_SECRET_KEY,{
			 		expiresIn: "1h"
			 	});
			 	return res.json({
			 		success: 1,
			 		data: "login successfully",
			 		token: jsonwebtoken
				 });
			 } else {
			 	return res.json({
			 		success: 0,
			 		data: "Invalid email or password"
			 	});
			 }
		});
	}
}