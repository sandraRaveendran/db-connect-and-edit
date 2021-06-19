const Router = require('express-promise-router');

const controller = require('./moviesController');

module.exports = () => {
    const router = Router({ mergeParams: true });
    router.route('/listMovies').get(controller.listMovies);
    router.route('/create').post(controller.createNewMovie);
    router.route('/searchTitle/:title').get(controller.searchMovieTitle);
    router.route('/updateDetails/:id').put(controller.updateMovieDetails);
    router.route('/deleteMovie/:id').delete(controller.deleteMovie);
    return router;
}