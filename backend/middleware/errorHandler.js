
const  errorHandler = (err, req, res, next) => {
    if (!err) {
      next();  
    }

    const statusCode = err.status || 500;

    const message = err.message || 'Erreur interne du serveur';

    const errorStack = {
        message: message,
        status: statusCode,
        path: req.originalUrl,
        method: req.method,
    };

    console.error(errorStack);

    return res.status(statusCode).json({ error: errorStack });
};


const notFoundHandler = (req, res, next) => {
    console.log("Page not found");
    // next({ status: 404, message: 'Route non trouvée' });
    res.send("Page not found");
};

module.exports = { errorHandler, notFoundHandler };
