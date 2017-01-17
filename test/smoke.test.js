/**
* Simple smoke test testing the pair of chai moch an should
*/

// set up the assertion dialect
const should = require('chai').should()


describe('Unit testing with mocha', () => {
  it('accepts the should dialect', () => {
    return (1+1).should.equal(2)
  })
})

describe('unit testing with mocha', () => {
  it('should fail on invalid test', () => {
    (1+2).should.equal(2)
  })
})
