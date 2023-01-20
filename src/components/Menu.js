import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Menu.module.css'

// Hooks
import { useAuth } from '../hooks/useAuth'
import { useAuthContext } from '../hooks/useAuthContext'

function Menu() {

    const { exit } = useAuth()
    const { user } = useAuthContext()

    return (
        <nav className={styles.menu}>
            <Link to='/' ><h1>Water <span> Risk </span></h1></Link>
            <ul>
                {user && (
                    <li>
                        <Link to='/login' onClick={exit}>Sair</Link>
                    </li>
                )}
            </ul>
        </nav>
    )
}

export default Menu