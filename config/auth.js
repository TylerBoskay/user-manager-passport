module.exports = {
    ensureAuthentificated: function (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
            req.flash('error-msg', 'Please Login to have access to this resource.');
            res.redirect('/users/login');
        }
    }