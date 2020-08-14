const { create, handle } = require('except-js')

test('test that exception is handled correctly when 1 handle is used.', () => {
    const TestException = create('TestException')
    let isHandlerRun = false
    try {
        throw new TestException()
    }catch(exception){
        handle(exception,
            [{
                exception:TestException,
                handler() {
                    isHandlerRun = true
                },
            }])
    }
    expect(isHandlerRun).toBe(true)
})

test('test that exception is handled correctly when 2 handles are used.', () => {
    const FirstException = create('FirstException')
    const SecondException = create('SecondException')
    let isFirstHandlerRun = false, isSecondHandlerRun = false
    try {
        throw new SecondException()
    }catch(exception){
        handle(exception,
            [
                {
                    exception: FirstException,
                    handler(){
                        isFirstHandlerRun = true
                    }
                },
                {
                    exception: SecondException,
                    handler(){
                        isSecondHandlerRun = true
                    }
                }
            ])
    }
    expect(isFirstHandlerRun).toBe(false)
    expect(isSecondHandlerRun).toBe(true)
})

test('test that exception is thrown again when no compatible handlers matched.', () => {
    const TestException = create('TestException')
    let isHandlerRun = false
    expect(() => {
        try {
            throw 'an error string'
        }catch(exception){
            handle(exception,
                [{
                    exception: TestException,
                    handler() {
                        isHandlerRun = true
                    },
            }])
        }
    }).toThrowError('an error string')
    expect(isHandlerRun).toBe(false)
})
