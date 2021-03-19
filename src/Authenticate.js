import React, { useState, useEffect } from "react"
import "./App.css"
import * as fcl from "@onflow/fcl"

const SignInOutButton = ({ user: { loggedIn } }) => {
    const signInOrOut = async (event) => {
        event.preventDefault()

        if (loggedIn) {
            fcl.unauthenticate()
        } else {
            fcl.authenticate()
        }
    }

    return (
        <button onClick={signInOrOut}>
            {loggedIn ? 'Sign Out' : 'Sign In/Up'}
        </button>
    )
}

const CurrentUser = () => {
    const [user, setUser] = useState({})

    useEffect(() =>
        fcl
            .currentUser()
            .subscribe(user => setUser({ ...user }))
        , [])

    return (
        <div class="Card">
            <SignInOutButton user={user} />
            <p>Your Blockchain Address: {user.addr}</p>
        </div>
    )
}

export default CurrentUser