const logger = async (req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log(`Request body: ${JSON.stringify(req.body)}`);
    console.log(`Request query: ${JSON.stringify(req.query)}`);
    console.log(`Request params: ${JSON.stringify(req.params)}`);
    console.log(`Request cookies: ${JSON.stringify(req.cookies)}`);
    console.log(`---------------------------------`);
    next();
};

module.exports = logger;