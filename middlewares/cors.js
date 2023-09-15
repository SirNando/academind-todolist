function enableCors(req, res, next) {
    // Any page is allowed to send requests. In this case * is a wildcard for any site
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST,GET,PATCH,DELETE,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    next();
}


module.exports = enableCors;