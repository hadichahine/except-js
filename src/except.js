module.exports = {
    create(type){
        const CustomException = class { constructor(){this.type = type} }
        CustomException.type = type
        return CustomException
    },
    handle(exception, typeHandlesMap){
        const handlingManifest = typeHandlesMap
            .find((element) => element.exception.type === exception.type)
        if(handlingManifest)
            handlingManifest.handler()
        else throw exception
    }
}