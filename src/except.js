module.exports = {
    create(type){
        const CustomException = class { constructor(){this.type = type} }
        CustomException.type = type
        return CustomException
    },
    handle(exception, expectedExceptionClass, handler){
        if(expectedExceptionClass.type === exception.type)
            handler()
    }
}