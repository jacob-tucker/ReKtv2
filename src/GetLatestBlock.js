import React, { useState } from "react"
import "./App.css"
import * as fcl from "@onflow/fcl"

const GetLatestBlock = () => {
    const [data, setData] = useState(null)

    const runGetLatestBlock = async (event) => {
        event.preventDefault()

        const response = await fcl.send([
            fcl.getLatestBlock(),
        ])

        setData(await fcl.decode(response))
    }

    return (
        <div class="Card">
            <button onClick={runGetLatestBlock}>Get Latest Block</button>

            {data && <div class="Code">{JSON.stringify(data, null, 2)}</div>}
        </div>
    )
}

export default GetLatestBlock