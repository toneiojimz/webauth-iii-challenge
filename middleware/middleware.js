module.exports = (req, res, next) => {
    if (req.session && req.session.loggedIn) {
        return next();
    } else {
        return res.status(401).json({ you: "shall not pass!" });
    }
};