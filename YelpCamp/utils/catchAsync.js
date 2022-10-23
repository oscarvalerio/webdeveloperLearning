// This function the only thing it does is to catch an error and pass it to next
// then it can be called from app JS to handle errors there
module.exports = func => {
    return(req, res, next) => {
        func(req, res, next).catch(next);
    }
}