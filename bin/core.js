#!/usr/bin/env node

const chalk = require("chalk")
const semver = require("semver")

const fs = require("fs")
const path = require("path")
const slash = require("slash")
const minimist = require("minimist")

const cli = require("commander")
// const loadCommander = require("../utils/loadCommander")

cli.version(require("../package.json").version).usage("<command> [options]")

cli
  .command("create <app-name>")
  .description("create a new project")
  .option("-r", "--router", "router")
  .action((name, cmd) => {
    require("../lib/create")(name, cmd)
  })

cli.arguments("<command>").action(cmd => {
  cli.outputHelp()
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`))
  console.log()
})

cli.on("--help", () => {
  console.log()
  console.log(
    `  Run ${chalk.cyan(
      `vue <command> --help`
    )} 해리야 도와줘.`
  )
  console.log()
})

cli.parse(process.argv)
