
module.exports = function (express, app) {
    app.prefix = express.Router.prefix =
        function (path, configure) {
            var router = express.Router();
            this.use(path, router);
            configure(router);
            return router;
        };
}