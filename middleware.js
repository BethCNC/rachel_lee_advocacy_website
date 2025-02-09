module.exports = function(req, res, next) {
    // Handle paths that start with /src or /public
    if (req.url.startsWith('/src') || req.url.startsWith('/public')) {
        req.url = req.url.replace(/^\/src|^\/public/, '');
    }
    next();
}; 