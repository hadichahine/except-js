const { create, handle } = require('../src/except')

beforeAll(() => {
    expect.extend({
        toThrowCustomException(recievedException, exceptionClass){
            let run
            handle(recievedException, exceptionClass, () => {
                run = true
            })
            return run ? {pass: true, message: 'handled successfully.'} :
                         {pass: false, message: 'not handled successfully.'} 
        }
    })
});

test('test that exception is handled correctly.', () => {
    const TestException = create('TestException')
    expect(() => {
        throw new TestException()
    }).toThrowCustomException(TestException)
})