function handle(exception, typeHandlesMap){
    const handlingManifest = typeHandlesMap
        .find((element) => element.exception.type === exception.type)
    if(handlingManifest)
        handlingManifest.handler()
    else throw exception
}

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
    handle,
    except(exception){
        const constructNode = (map) => ({
                on(exceptJSType){
                    const handlerManifest = {
                        exception: exceptJSType
                    }
                    return {
                        do(handler){
                            handlerManifest.handler = handler
                            map.push(handlerManifest)
                            return constructNode(map)
                        }
                    }
                },
                done(){
                    handle(exception, map)
                }
            })
        return constructNode([])
    }
}