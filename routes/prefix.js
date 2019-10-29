module.exports = function (express, app) {
    // https://medium.com/@zahiruldu/nodejs-route-prefixing-in-expressjs-65196adb3167
    app.prefix = express.Router.prefix =
        function (path, configure) {
            var router = express.Router();
            this.use(path, router);
            configure(router);
            return router;
        };
}