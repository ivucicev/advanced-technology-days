const crypto = require('crypto');

exports.cpuBound = (req, res) => {
    console.log('CPU-Bound Method - start');
    const key = Math.random() < 0.5 ? 'advanced-technology-days' : 'serverless';
    const hmac = crypto.createHmac('sha512WithRSAEncryption', key);
    hmac.setEncoding('base64');
    hmac.end(Date.now.toString(), () => {
        console.log('CPU-Bound Method - end');
        res.send('A hashed date for you! ' + hmac.read());
    });
};

exports.memoryBound = (req, res) => {
    console.log('Memory bound method - start');
    const large = Buffer.alloc(10 * 1024 * 1024, 'X');
    setTimeout(() => {
        const len = large.length; // close over the Buffer for 1s to try to foil V8's optimizations and bloat memory
        console.log(len);
    }, 1000).unref();
    res.send('ATD - memory bound - Allocated 10MB');
    console.log('Memory bound method - end');
};
