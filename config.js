module.exports = {
 ENV: process.env.NODE_ENV || 'development',
 RETRIES: process.env.RETRIES || 3,
 //MONGODB_URI: process.env.NODE_ENV==='production' ? 'mongodb://{{shardedIp}}:{{port}}/{{db}}?retryWrites=true' : 'mongodb://{{localip}}:{{localport}}/{{db}}?retryWrites=true'
};
