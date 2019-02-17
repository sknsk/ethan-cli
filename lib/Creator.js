const fs = require("fs")
const ejs = require("ejs")
const path = require("path")
const globby = require("globby")
const isBinary = require("isbinaryfile")
const resolve = require("resolve")
const EventEmitter = require("events")

module.exports = class Creator extends EventEmitter {
  constructor(name, context) {
    super()

    this.name = name
    this.context, context
    this.generatorFile = []
  }

  _injectFile(file) {
    this.generatorFile.push(file)
  }

  async create(cliOptions = {}) {
    const { name, context } = this
    const baseDir = extractCallDir()
    this._injectFile(async files => {
      console.log("123")
      const globby = require("globby")
      const source = "./template"
      const ejsOptions = {}
      const _files = await globby(["**/*"], { cwd: source })
      for (const rawPath of _files) {
        consolee.log(rawPath)
        const targetPath = rawPath
          .split("/")
          .map(filename => {
            // dotfiles are ignored when published to npm, therefore in templates
            // we need to use underscore instead (e.g. "_gitignore")
            if (filename.charAt(0) === "_" && filename.charAt(1) !== "_") {
              return `.${filename.slice(1)}`
            }
            if (filename.charAt(0) === "_" && filename.charAt(1) === "_") {
              return `${filename.slice(1)}`
            }
            return filename
          })
          .join("/")
        const sourcePath = path.resolve(source, rawPath)
        const content = renderFile(sourcePath, ejsOptions)
        console.log(targetPath)
        files[targetPath] = content
      }
    })
    console.log(this.generatorFile)
    debugger
  }
}

function renderFile(name, ejsOptions) {
  if (isBinary.sync(name)) {
    return fs.readFileSync(name)
  }

  const template = fs.readFileSync(name, "utf-8")
  console.log(template)
  console.log("-------")
}

function extractCallDir() {
  // extract api.render() callsite file location using error stack
  const obj = {}
  Error.captureStackTrace(obj)
  const callSite = obj.stack.split("\n")[3]
  const fileName = callSite.match(/\s\((.*):\d+:\d+\)$/)[1]
  return path.dirname(fileName)
}
