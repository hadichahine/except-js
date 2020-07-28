const { create, handle } = require('../src/except')

test('test that exception is handled correctly.', () => {
    const TestException = create('TestException')
    let isHandlerRun
    try {
        throw new TestException()
    }catch(exception){
        handle(exception, TestException, () => {
            isHandlerRun = true
        })
    }
    expect(isHandlerRun).toBe(true)
})