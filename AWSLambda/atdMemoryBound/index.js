exports.handler = async function(event, context) {
    console.log('Memory bound method - start');
    const large = Buffer.alloc(10 * 1024 * 1024, 'X');
    setTimeout(() => {
        const len = large.length; // close over the Buffer for 1s to try to foil V8's optimizations and bloat memory
        console.log(len);
    }, 1000).unref();
    const response = {
        statusCode: 200,
        body: JSON.stringify('ATD - memory bound - Allocated 10MB')
    };
    console.log('Memory bound method - end');
    return response;
};
