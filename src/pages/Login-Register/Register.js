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
import BadgeIcon from '@mui/icons-material/Badge';
import { useSnackbar } from 'notistack';

// Hooks
import { useAuth } from '../../hooks/useAuth'

function Register() {

    const { registerUser, loading } = useAuth()

    const [senha, setSenha] = useState('')
    const [confirmSenha, setConfirmSenha] = useState('')
    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const { enqueueSnackbar } = useSnackbar()


    async function handleRegister(e) {
        e.preventDefault()

        let regexEmail = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/


        if (nome.trim().length === 0 || senha.trim().length === 0 || email.trim().length === 0 || confirmSenha.trim().length === 0) {
            enqueueSnackbar('Todos os campos são obrigatórios', { variant: 'error' })
        }else if(!(regexEmail.test(email))){
            enqueueSnackbar('Digite um email válido', { variant: 'error' })
        } else if (senha.trim().length < 8) {
            enqueueSnackbar('A senha deve ter mais de 8 caracteres', { variant: 'error' })
        } else if (senha !== confirmSenha) {
            enqueueSnackbar('As senhas devem ser iguais', { variant: 'error' })
        } else {
            const res = await registerUser(nome, email, senha)
            if (res) {
                enqueueSnackbar('Email já cadastrado', { variant: 'error' })
            }
        }
    }

    return (
        <motion.div
            initial={{ x: window.innerWidth }}
            animate={{ x: window.innerWidth - window.innerWidth }}
            exit={{ x: -window.innerWidth }}

            className={styles.container}>
            <form className={styles.formLogin}>
                <h1>Registro</h1>
                <div className={styles.inputGroup}>
                    <BadgeIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField value={nome} id="input-name" label="Nome" variant="standard" className={styles.inputs} onChange={(e) => setNome(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <TextField value={email} id="input-email" label="Email" variant="standard" className={styles.inputs} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputGroup}>
                    <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                    <div className={styles.confirmSenha}>
                        <TextField value={senha} id="input-password" type='password' label="Senha" variant="standard" className={styles.inputPassword} onChange={(e) => setSenha(e.target.value)} />
                        <TextField value={confirmSenha} id="input-confirm-password" type="password" label="Confirme a senha" variant="standard" className={styles.inputPassword} onChange={(e) => setConfirmSenha(e.target.value)} />
                    </div>
                </div>
                <div className={styles.inputGroup}>
                    <LoadingButton
                        color="info"
                        onClick={(e) => handleRegister(e)}
                        loading={loading}
                        loadingPosition="start"
                        startIcon={<LoginIcon />}
                        variant="contained"
                    >Cadastrar</LoadingButton>
                </div>
                <p>
                    Já possui cadastro?
                    <span>
                        <Link to='/login'>
                            Clique Aqui
                        </Link>
                    </span>
                </p>
            </form>
        </motion.div>
    )
}

export default Register