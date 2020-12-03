const { create, except } = require('except-js')

test('test that exception is handled correctly when 1 handle is used.', () => {
    const TestException = create('TestException')
    let isHandlerRun = false
    try {
        throw new TestException()
    }catch(exception){
        except(exception)
            .on(TestException)
            .do(() => {
                isHandlerRun = true
            })
            .done()
    }
    expect(isHandlerRun).toBe(true)
})

test('test that exception is thrown again when no compatible handlers matched.', () => {
    const TestException = create('TestException')
    let isHandlerRun = false
    expect(() => {
        try {
            throw 'an error string'
        }catch(exception){
            except(exception)
                .on(TestException)
                .do(() => {
                    isHandlerRun = true
                })
                .done()
        }
    }).toThrowError('an error string')
    expect(isHandlerRun).toBe(false)
})

test('test that exception is thrown again when no compatible handlers matched.', () => {
    const TestException = create('TestException')
    let isHandlerRun = false
    expect(() => {
        try {
            throw 'an error string'
        }catch(exception){
            except(exception)
                .on(TestException)
                .do(() => {
                    isHandlerRun = true
                })
                .done()
        }
    }).toThrowError('an error string')
    expect(isHandlerRun).toBe(false)
})

test('test that exception is handled correctly when 2 handles are used & second exception thrown.', () => {
    const FirstException = create('FirstException')
    const SecondException = create('SecondException')
    let isFirstHandlerRun = false, isSecondHandlerRun = false
    try {
        throw new SecondException()
    }catch(exception){
        except(exception)
            .on(FirstException)
            .do(() => {
                isFirstHandlerRun = true
            })
            .on(SecondException)
            .do(() => {
                isSecondHandlerRun = true
            })
            .done()
    }
    expect(isFirstHandlerRun).toBe(false)
    expect(isSecondHandlerRun).toBe(true)
})

test('test that exception is handled correctly when 2 handles are used & first exception thrown.', () => {
    const FirstException = create('FirstException')
    const SecondException = create('SecondException')
    let isFirstHandlerRun = false, isSecondHandlerRun = false
    try {
        throw new FirstException()
    }catch(exception){
        except(exception)
            .on(FirstException)
            .do(() => {
                isFirstHandlerRun = true
            })
            .on(SecondException)
            .do(() => {
                isSecondHandlerRun = true
            })
            .done()
    }
    expect(isFirstHandlerRun).toBe(true)
    expect(isSecondHandlerRun).toBe(false)
})