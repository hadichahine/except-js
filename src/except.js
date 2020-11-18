module.exports = {
    create(type){
        const ExceptJSException = class {
            constructor(message){
                this.type = type
                this.message = message
            }
        }
        ExceptJSException.type = type
        return ExceptJSException
    },
    handle(exception, typeHandlesMap){
        const handlingManifest = typeHandlesMap
            .find((element) => element.exception.type === exception.type)
        if(handlingManifest)
            handlingManifest.handler()
        else throw exception
    }
}