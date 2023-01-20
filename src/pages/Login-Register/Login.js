import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import styles from './LoginRegister.module.css'
import { motion } from 'framer-motion';

// MUI 
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import KeyIcon from '@mui/icons-material/Key';
import LoadingButton from '@mui/lab/LoadingButton';
import LoginIcon from '@mui/icons-material/Login';
import { useSnackbar } from 'notistack';

// Hooks
import { useAuth } from '../../hooks/useAuth';

function Login() {

  const [email, setEmail] = useState('')
  const [senha, setSenha] = useState('')
  const { Login, loading } = useAuth()
  const { enqueueSnackbar } = useSnackbar()

  async function handleLogin(e) {
    e.preventDefault()
    const res = await Login(email, senha)
    if (res) {
      enqueueSnackbar('Email ou senha incorretos', { variant: 'error' })
    }
  }

  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{ x: window.innerWidth - window.innerWidth }}
      exit={{ x: -window.innerWidth }}
      className={styles.container}>
      <form className={styles.formLogin}>
        <h1>Login</h1>

        <div className={styles.inputGroup}>
          <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField value={email} id="input-email" label="Email" variant="standard" className={styles.inputs} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className={styles.inputGroup}>
          <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
          <TextField value={senha} id="input-password" type='password' label="Senha" variant="standard" className={styles.inputs} onChange={(e) => setSenha(e.target.value)} />
        </div>

        <div className={styles.inputGroup}>
          <LoadingButton
            color="info"
            onClick={(e) => handleLogin(e)}
            loading={loading}
            loadingPosition="start"
            startIcon={<LoginIcon />}
            variant="contained"
          >Entrar</LoadingButton>
        </div>
        <p>
          Não possui cadastro?
          <span>
            <Link to='/register'>
              Clique Aqui
            </Link>
          </span>
        </p>
      </form>
    </motion.div>
  )
}

export default Login

