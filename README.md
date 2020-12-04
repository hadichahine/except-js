# except-js

except-js provides the necessary abstractions for handling exceptions
of different types within multiple catch statements. This is pretty standard on strongly typed languages like Java.

# Usage

## Polished Syntax
```javascript
const { create, handle } = require('except-js')

const Exception1Test = create('Exception1Test')
const Exception2Test = create('Exception2Test')

function helloWorld(){
    throw new ExceptionTest('ExceptionTest here!')
}

try {
    helloWorld()
}catch(exception){
    except(exception)
        .on(Exception1Test)
        .do(() => {
            console.log('[Exp1] Message:', exception.message)
        })
        .on(Exception2Test)
        .do(() => {
            console.log('[Excp2] Message:', exception.message)
        })
        .done()
}
```


## Traditional Syntax
```javascript
const { create, handle } = require('except-js')

const ExceptionTest = create('ExceptionTest')

function helloWorld(){
    throw new ExceptionTest('ExceptionTest here!')
}

try {
    helloWorld()
}catch(exception){
    handle(exception, [
        {
            exception: ExceptionTest,
            handler: () => {
                console.log('Message:', exception.message)
            }
        }
    ])
}
```

<u>Note:</u> If no matching handler is passed, the exception is thrown again. This is a design decision in order to preserve the decoupling of the sender from the receiver of the exception (exception propagation across the stack).

# License

MIT
