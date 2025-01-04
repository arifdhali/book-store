const ErrorMiddleWare = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: res.message || "Internal server error",
    })

}

module.exports = ErrorMiddleWare;