/*
curl --request POST 'https://api.temporal.cloud/v2/auth/login' --header 'Content-Type: application/json' --data-raw '{"username": "<your user name>", "password": "<your password>"}'
*/

// const axios = require('axios')

const Temporal = require('temporal-js')
const temporal = new Temporal(true)

const { Command, flags } = require('@oclif/command')

let _this

class Login extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    // _this.axios = axios
    _this.temporal = temporal
  }

  async run () {
    const { flags } = this.parse(Login)

    const goodFlags = this.validateInput(flags)
    if (!goodFlags) throw new Error('Problem with input flags.')

    // const jwt = await _this.login(flags)
    const jwt = await _this.login2(flags)
    console.log('JWT: ', jwt)
  }

  async login2 (flags) {
    try {
      const jwt = await _this.temporal.login(flags.user, flags.pass)
      // console.log(`jwt: ${JSON.stringify(jwt, null, 2)}`)
      return jwt.token
    } catch (err) {
      console.error('Error in login(): ', err)
      throw err
    }
  }

  validateInput (flags) {
    try {
      const user = flags.user
      if (!user) {
        console.log('Username must be specified.')
        return false
      }

      const pass = flags.pass
      if (!pass) {
        console.log('Password must be specified.')
        return false
      }

      return true
    } catch (err) {
      console.error('Error in validateInput()')
      throw err
    }
  }
}

Login.description = `Login and get a JWT token.
...
Log into the Temporal UI with a user name and password to retrieve a JWT token
for issuing additional commands.
`

Login.flags = {
  user: flags.string({ char: 'u', description: 'User name' }),
  pass: flags.string({ char: 'p', description: 'Password' })
}

module.exports = Login
