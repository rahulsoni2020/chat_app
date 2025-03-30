const response = ({res = {}, code = 200, message = "", data = {}}) =>{
    return res.status(code).json({
        message,
        data
    });
}

module.exports = response;