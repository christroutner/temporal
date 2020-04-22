/*

*/

const fs = require('fs')

const Temporal = require('temporal-js')
const temporal = new Temporal(true)

const { Command, flags } = require('@oclif/command')

let _this

const TEMPORAL_SERVER = 'https://api.temporal.cloud/'

class Upload extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    _this.temporal = temporal
  }

  async run () {
    const { flags } = this.parse(Upload)

    const goodFlags = this.validateInput(flags)
    if (!goodFlags) throw new Error('Problem with input flags.')

    // Login and get the JWT token.
    await _this.login(flags)

    const hash = await _this.upload(flags)
    console.log(`hash: ${hash}`)
  }

  async upload (flags) {
    try {
      const filename = flags.file
      console.log(`filename: ${filename}`)

      const time = flags.time
      console.log(`time: ${time}`)

      // const rndStr = (10000 * Math.random()).toString()
      // const buf = new Buffer(rndStr)

      const hash = await _this.temporal.uploadPublicFile(
        fs.createReadStream(filename),
        flags.time
      )

      return hash
    } catch (err) {
      console.log('Error in upload(): ', err)
      throw err
    }
  }

  async login (flags) {
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

      const file = flags.file
      if (!file) {
        console.log('File name must be specified.')
        return false
      }

      const time = flags.time
      if (!time) {
        console.log('Pin time not specified. Defaulting to 1 month for pin time.')
        flags.time = 1
      }

      return true
    } catch (err) {
      console.error('Error in validateInput()')
      throw err
    }
  }
}

Upload.description = `Upload a file to IPFS
...
Uploads a file to Temporal servers to be served over IPFS.
`

Upload.flags = {
  user: flags.string({ char: 'u', description: 'User name' }),
  pass: flags.string({ char: 'p', description: 'Password' }),
  file: flags.string({ char: 'f', description: 'File name' }),
  time: flags.string({ char: 't', description: 'Number of months to pin the file.' })
}

module.exports = Upload
