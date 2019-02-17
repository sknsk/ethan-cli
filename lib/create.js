const fs = require("fs-extra")
const path = require("path")
const chalk = require("chalk")
const inquirer = require("inquirer")
const Creator = require('./Creator')

async function create(projectName, options) {
  if (options.proxy) {
    process.env.HTTP_PROXY = opitons.proxy
  }

  const cwd = options.cwd || process.cwd()
  const inCurrent = projectName === "."
  const name = inCurrent ? path.relative("../", cwd) : projectName
  const targetDir = path.resolve(cwd, projectName || ".")

  const creator = new Creator(name, targetDir)
  await creator.create(options)
}

module.exports = (...args) => {
  return create(...args).catch(err => {
    console.error("e", err)
    process.exit(1)
  })
}
