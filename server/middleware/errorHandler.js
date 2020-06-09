module.exports = (err,req,res,next) => {

    let err_code, err_msg

    switch (err.str_code) {
        case 'INVALID_TOKEN':
            err_code = 404
            err_msg = 'Invalid Token'
            break
        case 'INTERNAL_SERVER_ERROR':
            err_code = 500
            err_msg = 'Internal server error'
            break
        default:

    }

    res.status(err_code).json({
        err_code,
        str_code: err.str_code,
        err_msg
    })
}