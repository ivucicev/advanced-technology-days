const crypto = require('crypto');

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.atdCpuBound = (req, res) => {
    console.log('CPU-Bound Method - start');
    const key = Math.random() < 0.5 ? 'advanced-technology-days' : 'serverless';
    const hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    hmac.setEncoding('base64');
    hmac.end(Date.now.toString(), () => {
        console.log('CPU-Bound Method - end');
        res.send('A hashed date for you! ' + hmac.read());
    });
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.atdMemoryBound = (req, res) => {
    console.log('Memory bound method - start');
    const large = Buffer.alloc(10 * 1024 * 1024, 'X');
    setTimeout(() => {
        const len = large.length; // close over the Buffer for 1s to try to foil V8's optimizations and bloat memory
        console.log(len);
    }, 1000).unref();
    res.send('ATD - memory bound - Allocated 10MB');
    console.log('Memory bound method - end');
};
