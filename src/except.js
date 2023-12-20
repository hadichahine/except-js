function handle(exception, typeHandlesMap){
    const handlingManifest = typeHandlesMap
        .find((element) => exception instanceof element.exception)
    if(handlingManifest)
        handlingManifest.handler()
    else throw exception
}

module.exports = {
    create(name){
        const ExceptJSException = class extends Error {
            constructor(message){
                super(message)
                this.name = name
                this.message = message
            }
        }
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