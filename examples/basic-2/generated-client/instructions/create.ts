// This file was automatically generated. DO NOT MODIFY DIRECTLY.
/* eslint-disable */
import { TransactionInstruction, PublicKey, AccountMeta } from "@solana/web3.js"
import BN from "bn.js"
import * as borsh from "@coral-xyz/borsh"

export interface CreateArgs {
  authority: PublicKey
}

export interface CreateArgsJSON {
  authority: string
}

export interface CreateAccounts {
  counter: PublicKey
  user: PublicKey
  systemProgram: PublicKey
}

export interface CreateAccountsJSON {
  counter: string
  user: string
  systemProgram: string
}

export interface CreateInstruction {
  args: CreateArgs
  accounts: CreateAccounts
}

export interface CreateInstructionJSON {
  args: CreateArgsJSON
  accounts: CreateAccountsJSON
}

const layout = borsh.struct([borsh.publicKey("authority")])

export class Create {
  static readonly ixName = "create"
  readonly ixName = Create.ixName
  static readonly identifier: Buffer = Buffer.from([
    24, 30, 200, 40, 5, 28, 7, 119,
  ])

  constructor(
    readonly programId: PublicKey,
    readonly instructionData: CreateInstruction
  ) {}

  static isIdentifierEqual(ixData: Buffer): boolean {
    return ixData.subarray(0, 8).equals(Create.identifier)
  }

  static fromDecoded(
    programId: PublicKey,
    args: CreateArgs,
    flattenedAccounts: PublicKey[]
  ): Create {
    const accounts = {
      counter: flattenedAccounts[0],
      user: flattenedAccounts[1],
      systemProgram: flattenedAccounts[2],
    }
    return new Create(programId, { args, accounts })
  }

  static decode(
    programId: PublicKey,
    ixData: Uint8Array,
    flattenedAccounts: PublicKey[]
  ): Create {
    return Create.fromDecoded(
      programId,
      layout.decode(ixData, Create.identifier.length),
      flattenedAccounts
    )
  }

  toAccountMetas(): AccountMeta[] {
    return [
      {
        pubkey: this.instructionData.accounts.counter,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: this.instructionData.accounts.user,
        isSigner: true,
        isWritable: true,
      },
      {
        pubkey: this.instructionData.accounts.systemProgram,
        isSigner: false,
        isWritable: false,
      },
    ]
  }

  build() {
    const buffer = Buffer.alloc(1000)
    const len = layout.encode(
      {
        authority: this.instructionData.args.authority,
      },
      buffer
    )
    const data = Buffer.concat([Create.identifier, buffer]).slice(0, 8 + len)
    const ix = new TransactionInstruction({
      keys: this.toAccountMetas(),
      programId: this.programId,
      data,
    })
    return ix
  }

  toArgsJSON(): CreateArgsJSON {
    const args = {
      authority: this.instructionData.args.authority,
    }
    return {
      authority: args.authority.toString(),
    }
  }

  toAccountsJSON(): CreateAccountsJSON {
    return {
      counter: this.instructionData.accounts.counter.toString(),
      user: this.instructionData.accounts.user.toString(),
      systemProgram: this.instructionData.accounts.systemProgram.toString(),
    }
  }

  toJSON(): CreateInstructionJSON {
    return { args: this.toArgsJSON(), accounts: this.toAccountsJSON() }
  }
}
