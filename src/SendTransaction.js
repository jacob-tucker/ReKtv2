import React, { useState } from "react"
import * as fcl from "@onflow/fcl"

const simpleTransaction = `
transaction {
  execute {
    log("Hello World!!")
  }
}
`

const SendTransaction = () => {
    const [status, setStatus] = useState("Not started")
    const [transaction, setTransaction] = useState(null)

    const sendTransaction = async (event) => {
        event.preventDefault()

        setStatus("Resolving...")

        const blockResponse = await fcl.send([
            fcl.getLatestBlock(),
        ])

        const block = await fcl.decode(blockResponse)

        try {
            const tx = await fcl.send([
                fcl.transaction(simpleTransaction),
                fcl.proposer(fcl.currentUser().authorization),
                fcl.payer(fcl.currentUser().authorization),
                fcl.ref(block.id),
            ])

            const { transactionId } = tx

            setStatus(`Transaction (${transactionId}) sent, waiting for confirmation`)

            const unsub = fcl
                .tx(transactionId)
                .subscribe(transaction => {
                    setTransaction(transaction)

                    if (fcl.tx.isSealed(transaction)) {
                        setStatus(`Transaction (${transactionId}) is Sealed`)
                        unsub()
                    }
                })
        } catch (error) {
            console.error(error)
            setStatus("Transaction failed")
        }
    }

    return (
        <div class="Card">
            <div class="Header">send transaction</div>

            <div class="Code">{simpleTransaction}</div>

            <button onClick={sendTransaction}>
                Send
      </button>

            <div class="Code">Status: {status}</div>

            {transaction && <div class="Code">{JSON.stringify(transaction, null, 2)}</div>}
        </div>
    )
}

export default SendTransaction