module.exports = function (express, app) {
    /**
     * Get app URL based on config hostname and port.
     * 
     * @returns string
     */
    app.url = (path = '') => {
        let protocol = process.env.SECURE ? 'https' : 'http'

        let host = process.env.HOST || 'localhost'

        let port = process.env.PORT || 80

        if (port != 80) {
            host += `:${port}`
        }

        return `${protocol}://${host}/${path}`
    }
}