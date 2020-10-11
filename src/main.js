class Operation {
  constructor () {
    this.handlers = {}

    this.states = ['pending', 'successfully', 'failed']
    this.state = this.states[0]
  }

  then (callback) {
    this.on('success', callback)
    this.on('fail', callback)
  }

  dispatch (e, value = null) {
    if (e === 'success') {
      this.state = this.states[1]
    } else if (e === 'fail') {
      this.state = this.states[2]
    }

    for (const handler of this.handlers[e] || []) {
      handler(value, e)
    }
  }

  fail (err = new Error('Operation failed')) {
    this.dispatch('fail', err)
  }

  success (value = '') {
    this.dispatch('success', value)
  }

  on (e, handler) {
    if (typeof this.handlers[e] !== 'object') {
      this.handlers[e] = []
    }

    this.handlers[e].push(handler)
  }
}

const waitFor = (operation, callback) => {
  operation.on('success', callback)
  operation.on('fail', callback)
}

const isSuccess = operation => {
  return operation.state === operation.states[1]
}

const waitfor = waitFor

if (window) {
  window.waitFor = waitFor
  window.waitfor = waitfor
  window.Operation = Operation
  window.isSuccess = isSuccess
}
