#!/usr/bin/env node

import { Idl } from "@coral-xyz/anchor"
import * as fs from "fs"
import * as path from "path"
import { Project } from "ts-morph"
import { genAccounts } from "./accounts"
import { genErrors } from "./errors"
import { genInstructions } from "./instructions"
import { genTypes } from "./types"
import { program } from "commander"
import * as prettier from "prettier"

async function main() {
  program
    .description(
      "Generate solana web3 client code from the specified anchor IDL."
    )
    .argument("<idl>", "anchor IDL file path or '-' to read from stdin")
    .argument("<out>", "output directory")
    .option(
      "--program-id <PROGRAM_ID>",
      "optional program ID to be included in the code"
    )
    .version("anchor-client-gen 0.28.1-beta.11")
    .parse()

  const idlPath = program.args[0]
  const outBase = program.args[1]

  function outPath(filePath: string) {
    return path.join(outBase, filePath)
  }

  const pathOrStdin = idlPath === "-" ? 0 : idlPath
  const idl = JSON.parse(fs.readFileSync(pathOrStdin, "utf-8")) as Idl

  const project = new Project()

  console.log("generating errors...")
  genErrors(project, idl, outPath)
  console.log("generating instructions...")
  genInstructions(project, idl, outPath)
  console.log("generating types...")
  genTypes(project, idl, outPath)
  console.log("generating accounts...")
  genAccounts(project, idl, outPath)

  const files = project.getSourceFiles()

  console.log("formatting...")
  await Promise.all(
    files.map(async (file) => {
      let src = file.getFullText()

      src = prettier.format(src, {
        semi: false,
        singleQuote: false,
        parser: "babel-ts",
      })

      file.replaceWithText(src)
    })
  )

  console.log("writing files...")
  await project.save()
}

main().catch((e) => {
  console.error(e.message)
  process.exit(1)
})
