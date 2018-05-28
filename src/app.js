import React from 'react'
import { Hello } from './content'

import styles from './app.mod.scss'


const App = () => {
    return (
        <div className={styles.rootNode}>
            <Hello />
        </div>
    )
}

export default App
