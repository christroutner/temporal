/*
curl --request POST 'https://api.temporal.cloud/v2/auth/login' --header 'Content-Type: application/json' --data-raw '{"username": "<your user name>", "password": "<your password>"}'
*/

const axios = require('axios')

const { Command, flags } = require('@oclif/command')

let _this

const TEMPORAL_SERVER = 'https://api.temporal.cloud/'

class Upload extends Command {
  constructor (argv, config) {
    super(argv, config)

    _this = this

    _this.axios = axios
  }

  async run () {
    const { flags } = this.parse(Upload)

    const goodFlags = this.validateInput(flags)
    if (!goodFlags) throw new Error('Problem with input flags.')

    const hash = await _this.upload(flags)
    console.log(`hash: ${hash}`)
  }

  async upload (flags) {
    try {
      const filename = flags.file
      console.log(`filename: ${filename}`)

      const time = flags.time
      console.log(`time: ${time}`)

      return 'abc123'
    } catch (err) {
      console.log('Error in upload(): ', err)
      throw err
    }
  }

  validateInput (flags) {
    try {
      const file = flags.file
      if (!file) {
        console.log('File name must be specified.')
        return false
      }

      const time = flags.time
      if (!time) {
        console.log('Pin time not specified. Defaulting to 1 month for pin time.')
        flags.time = 1
        return false
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
  file: flags.string({ char: 'f', description: 'File name' }),
  time: flags.string({ char: 't', description: 'Number of months to pin the file.' })
}

module.exports = Upload
