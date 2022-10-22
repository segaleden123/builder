import React from 'react'

const Main = ({handleLogout}) => {
    return (
        <section className="main">
            <nav>
                <h2>Welcome</h2>
                <button onClick={handleLogout}>Logout</button>
            </nav>
        </section>
    )
}

export default Main;