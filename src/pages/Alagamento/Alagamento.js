import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './Alagamento.module.css'
import { motion } from 'framer-motion';

// MUI
import Button from '@mui/material/Button';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { CircularProgress } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

// Services 
import fetchAlagamentos from '../../services/fetchAlagamentos'

// Utils
import { dataUtils } from '../../utils/dataUtils'

function Alagamento() {

    const { id } = useParams()
    const { formatDataString } = dataUtils()
    const [alagamento, setAlagamento] = useState()

    useEffect(() => {
        async function fetchData() {
            const data = await fetchAlagamentos(localStorage.getItem('@Auth:token'))
            setAlagamento((data.filter(a => a.idalagamento.toString() === id))[0])
        }
        fetchData()
    }, [id])

    return (
        <motion.div
            initial={{ x: window.innerWidth }}
            animate={{ x: window.innerWidth - window.innerWidth }}
            exit={{ x: -window.innerWidth }}
            className={styles.container}>
            {alagamento ? (
                <>
                    <div className={styles.info}>
                        <Button>
                            <Link to='/' className={styles.back}>
                                <ArrowBackIosIcon fontSize='small' />
                                Voltar
                            </Link>
                        </Button>
                        <h1 className={styles.campo}><InfoIcon />Informações</h1>
                        <div className={styles.localizacao}>
                            <div className={styles.campo}>
                                <span>Bairro</span>
                                <h3>{alagamento.bairro}</h3>
                            </div>
                            <div className={styles.campo}>
                                <span>Endereço</span>
                                <h3>{alagamento.endereco}</h3>
                            </div>
                            <div className={styles.campo}>
                                <span>Referêcnia</span>
                                <h3>{alagamento.referencia}</h3>
                            </div>
                            <div className={styles.campo}>
                                <span>CEP</span>
                                <h3>{alagamento.cep}</h3>
                            </div>

                        </div>
                        <div className={styles.caracteristicas}>
                            <div className={styles.campo}>
                                <span>Classificacao</span>
                                <h3>{alagamento.classificacao}</h3>
                            </div>
                            <div className={styles.campo}>
                                <span>Intensidade</span>
                                <h3>{alagamento.intensidade}</h3>
                            </div>
                        </div>
                        <div className={styles.campo}>
                            <span>Data</span>
                            <h3>{formatDataString(alagamento.data)}</h3>
                        </div>
                    </div>
                    
                    <div className={styles.imageList}>
                        <h1 className={styles.images}>Imagens</h1>
                        <>
                            {alagamento && alagamento.url.map((i, k) => (
                                <img className={styles.image} src={i} key={k} alt="Foto Alagamento" />
                            ))}
                        </>
                    </div>
                </>
            ) : (
                <CircularProgress size={100} />
            )}

        </motion.div>
    )
}

export default Alagamento