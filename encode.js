#!/usr/bin/env node

const base32 = require('bs32')

const encode = skylink => base32.encode(Buffer.from(skylink, 'base64'))

if (process.argv[2]) {
  try {
    process.stdout.write(encode(process.argv[2]))
  } catch (e) {}
}

module.exports = encode 