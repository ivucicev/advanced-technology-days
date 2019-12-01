exports.handler = async function(event, context) {
    console.log('Memory bound method - start');
    const large = Buffer.alloc(100 * 1024 * 1024, 'X');
    setTimeout(() => {
        const len = large.length; // close over the Buffer for 1s to try to foil V8's optimizations and bloat memory
        console.log(len);
    }, 1000).unref();
    const response = {
        statusCode: 200,
        body: JSON.stringify('ATD - memory bound - Allocated 100MB')
    };
    console.log('Memory bound method - end');
    if (Math.floor(Math.random() * 100) + 1 < 7) {
        throw new Error('Something went wrong!');
    }
    return response;
};
