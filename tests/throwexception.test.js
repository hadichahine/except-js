const { create, handle } = require('../src/except')

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