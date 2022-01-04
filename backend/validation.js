const validate = (params) => {
    for(let i=0; i<params.length; i++){
        if(params[i] === undefined){
            return false;
        }
    }
    return true;
}
module.exports = validate;