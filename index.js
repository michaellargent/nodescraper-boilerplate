/*
NodeScraper - Boilerplate

Simple boilerplate code for recursively consuming web data
and saving/sanitizing/mutating data into a mongo database.

@MichaelLargent
2019-08-12


INVOCATION:
 //development mode (set the appropriate variables in config to your mongodb running locally)
 node . || node {{fullpath}}
 //production mode (again set the appropriate variables in config to your mongo uri)
 NODE_ENV=production node . || NODE_ENV=production node {{fullpath}}
*/

const mongoose = require('mongoose');
const config= require('./config');

const env = {
	runAfterFailures: 0,
	retries: config.RETRIES
};
const dboptions = {
	useNewUrlParser: true,
	useCreateIndex: true,
	useFindAndModify: false,
	poolSize: 10,
	bufferMaxEntries: 0,
	connectTimeoutMS: 5000,
	socketTimeoutMS: 30000,
	family: 4
};
let db;

const main = async(dbConnected)=>{
 try{
		if (!dbConnected){
			db = await mongoose.connect(config.MONGODB_URI, dboptions);
			console.log(`Database connection open.`);
  }
  
  //[...do async/await stuff here]

  //recursion check
		//if ( env.{{some variable that is mutated}} ){
			//return main(true);
		//}else{
			// console.log("Done.");
			// mongoose.connection.close();
			// return;
		// }
 } catch (e){
		console.error(`An error happened: `, e);
		//check if we can retry
		if ( env.retries!==null && env.retries > env.runAfterFailures ){
			++env.runAfterFailures;
			console.log(`Retrying [${env.runAfterFailures} of ${env.retries}]`);
			return main(true);
		}
		//close the DB connection if all retries are exhausted
		mongoose.connection.close();
		return;
	}
};

main();
