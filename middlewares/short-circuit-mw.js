module.exports = (req, res, next) => {
    if (req.query.stop === 'true') {
        return res.status(403).json({message: 'Request stopped by middleware'});
    }
    next();
};
