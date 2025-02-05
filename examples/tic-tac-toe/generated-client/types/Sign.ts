// This file was automatically generated. DO NOT MODIFY DIRECTLY.
/* eslint-disable */
import { PublicKey } from "@solana/web3.js"
import BN from "bn.js"
import * as types from "../types"
import * as borsh from "@coral-xyz/borsh"

export interface XJSON {
  kind: "X"
}

export class X {
  static readonly discriminator = 0
  static readonly kind = "X"
  readonly discriminator = 0
  readonly kind = "X"

  toJSON(): XJSON {
    return {
      kind: "X",
    }
  }

  toEncodable() {
    return {
      X: {},
    }
  }
}

export interface OJSON {
  kind: "O"
}

export class O {
  static readonly discriminator = 1
  static readonly kind = "O"
  readonly discriminator = 1
  readonly kind = "O"

  toJSON(): OJSON {
    return {
      kind: "O",
    }
  }

  toEncodable() {
    return {
      O: {},
    }
  }
}

export function fromDecoded(obj: any): types.SignKind {
  if (typeof obj !== "object") {
    throw new Error("Invalid enum object")
  }

  if ("X" in obj) {
    return new X()
  }
  if ("O" in obj) {
    return new O()
  }

  throw new Error("Invalid enum object")
}

export function fromJSON(obj: types.SignJSON): types.SignKind {
  switch (obj.kind) {
    case "X": {
      return new X()
    }
    case "O": {
      return new O()
    }
  }
}

export function layout(property?: string) {
  const ret = borsh.rustEnum([borsh.struct([], "X"), borsh.struct([], "O")])
  if (property !== undefined) {
    return ret.replicate(property)
  }
  return ret
}
