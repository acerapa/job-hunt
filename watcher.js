const fs = require('fs')
const path = require('path')
const { spawn } = require('child_process')

// improvements: Terminal log colors
const reset = '\x1b[0m'
const red = '\x1b[31m'
const green = '\x1b[32m'
const yellow = '\x1b[33m'
const blue = '\x1b[34m'

// TODO: Look check for real file changes

const helpersPath = path.join(__dirname, '/shared/helpers')
const responsePath = path.join(__dirname, '/shared/response')
const typesPath = path.join(__dirname, '/shared/types')
const validatorsPath = path.join(__dirname, '/shared/validators')
const indexPath = path.join(__dirname, '/shared/index.ts')

let timeout
const handler = (eventType, filename) => {
  clearTimeout(timeout)

  timeout = setTimeout(() => {
    // run the shared builder command
    const child = spawn('yarn', ['build-shared'], { shell: true })
    child.stdout.on('data', (data) => {
      console.log(`stdout: ${green} ${data} ${green}`)
    })
    child.stderr.on('data', (data) => {
      console.log(`stderr: ${yellow} ${data} ${yellow}`)
    })
    child.on('close', (code) => {
      console.log(`${reset} child process exited with code ${code} ${reset}`)
    })
  }, 100)
}

fs.watch(helpersPath, handler)
fs.watch(responsePath, handler)
fs.watch(typesPath, handler)
fs.watch(validatorsPath, handler)
fs.watch(indexPath, handler)

console.log(
  `Watching this paths:
  ${blue}
    \n${helpersPath},
    \n${responsePath},
    \n${typesPath},
    \n${validatorsPath},
    \n${indexPath}
    ${blue}
  `
)
