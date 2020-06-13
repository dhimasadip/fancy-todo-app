module.exports = (err,req,res,next) => {

    let err_code, err_msg

    switch (err.str_code) {
        case 'INVALID_TOKEN':
            err_code = 400
            err_msg = 'Invalid Token'
            break
        case 'TOKEN_NOT_FOUND':
            err_code = 404
            err_msg = 'Token not found'
            break
        case 'INTERNAL_SERVER_ERROR':
            err_code = 500
            err_msg = 'Internal server error'
            break
        case 'USER_NOT_FOUND':
            err_code = 404
            err_msg = 'User not found'
            break
        case 'UNAUTHORIZED':
            err_code = 403
            err_msg = 'Unauthorized'
            break
        case 'TODO_NOT_FOUND':
            err_code = 404
            err_msg = 'Todo not found'
            break
        case 'EMAIL_NOT_FOUND':
            err_code = 404
            err_msg = 'Email not found'
            break
        case 'INCORRECT_PASSWORD':
            err_code = 400
            err_msg = 'Incorrect Password'
            break
        case 'REGISTRATION_VALIDATION':
            err_code = 400
            err_msg = err.err_data
            break
        case 'TODO_VALIDATION':
            err_code = 400
            err_msg = err.err_data
            break
            
    }

    res.status(err_code).json({
        err_code,
        str_code: err.str_code,
        err_msg
    })
}