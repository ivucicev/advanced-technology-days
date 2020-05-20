module.exports = async function(context, req) {
    context.log('Memory bound method - start');
    const large = Buffer.alloc(100 * 1024 * 1024, 'X');
    setTimeout(() => {
        const len = large.length;
        context.log(len);
    }, 1000).unref();
    context.res = {
        body: 'ATD - memory bound - Allocated 100MB'
    };
    if (Math.floor(Math.random() * 100) + 1 < 7) {
        throw new Error('Something went wrong!');
    }
    context.log('Memory bound method - end');
};
