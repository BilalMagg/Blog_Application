
const  errorHandler = (err, req, res, next) => {
    
    const statusCode = err.status || 500;

    const message = err.message || 'Erreur interne du serveur';

    const errorStack = {
        message: message,
        status: statusCode,
        path: req.originalUrl,
        method: req.method,
    };

    console.error(errorStack);

    res.status(statusCode).json({ error: errorStack });
};


const notFoundHandler = (req, res, next) => {
    next({ status: 404, message: 'Route non trouvée' });
};

export default { errorHandler, notFoundHandler };
