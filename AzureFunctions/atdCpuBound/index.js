const crypto = require('crypto');

module.exports = async function(context, req) {
    context.log('CPU-Bound Method - start');
    const key = Math.random() < 0.5 ? 'advanced-technology-days' : 'serverless';
    const hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    hmac.setEncoding('base64');
    hmac.end(Date.now.toString(), () => {
        context.log('CPU-Bound Method - end');
        if (Math.floor(Math.random() * 100) + 1 < 7) {
            throw new Error('Something went wrong!');
        }
        context.res = { body: 'A hashed date for you! ' + hmac.read() };
    });
};
