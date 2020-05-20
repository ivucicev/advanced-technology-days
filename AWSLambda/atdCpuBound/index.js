const crypto = require('crypto');

const atd = 'ATD';

exports.handler = async function(event, context) {
    console.log('CPU-Bound Method - start');
    const key = Math.random() < 0.5 ? 'advanced-technology-days' : 'serverless';
    const hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    hmac.setEncoding('base64');
    hmac.end(Date.now.toString());
    const response = {
        statusCode: 200,
        body: JSON.stringify('A hashed date for you! ' + hmac.read())
    };
    console.log('CPU-Bound Method - end');
    if (Math.floor(Math.random() * 100) + 1 < 7) {
        throw new Error('Something went wrong!');
    }
    return response;
};

// hndlr - function to be executed
// event -data sendt during labda function invocation
// context-object - methodsa available to interact with runtime information
