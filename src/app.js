import React from 'react'
import { Hello } from './content'

import styles from './app.mod.scss'


fetch('./env.json')
    .then(env => {
        console.log('env', env)
        return env.json()
    })
    .then(env => console.log('success', env))
    .catch(err => console.log('fail', err))

const App = () => {
    return (
        <div className={styles.rootNode}>
            <Hello />
        </div>
    )
}

export default App
