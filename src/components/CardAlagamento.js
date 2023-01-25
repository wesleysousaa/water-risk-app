import React from 'react'
import styles from './CardAlagamento.module.css'

// MUI
import ReportIcon from '@mui/icons-material/Report';
import WarningIcon from '@mui/icons-material/Warning';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import RemoveRoadIcon from '@mui/icons-material/RemoveRoad';
import ZoomInMapIcon from '@mui/icons-material/ZoomInMap';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';

//Context
import { useAuthContext } from '../hooks/useAuthContext';
import { useAlagamentos } from '../contexts/AlagamentosContext'

// Services
import { deleteAlagamento } from '../services/deleteAlagamento';
import { Link } from 'react-router-dom';

// Utils
import { dataUtils } from '../utils/dataUtils'

function CardAlagamento({ a }) {

  const { user } = useAuthContext()
  const { formatDataString } = dataUtils()
  const { alagamentos, setAlagamentos } = useAlagamentos()

  async function removeAlagamento() {
    await deleteAlagamento(a.a.idalagamento, localStorage.getItem('@Auth:token'))
    setAlagamentos(alagamentos.filter(al => al.idalagamento !== a.a.idalagamento))
  }

  return (
    <Card className={styles.card}>
      <CardMedia
        sx={{ height: 140 }}
        image={a.a.url[0]}
        title="Alagamento Imagem"
      />
      <CardContent className={styles.cardContent}>
        <h2>{a.a.endereco}</h2>
        <div className={styles.badges}>
          <p
            className={a.a.intensidade === 'Grave' ? styles.grave : a.a.intensidade === 'Moderado' ? styles.moderado : styles.leve}
          >
            {a.a.intensidade === 'Grave' ? (<ReportIcon />) : a.a.intensidade === 'Moderado' ? (<WarningIcon />) : (<HealthAndSafetyIcon />)} {a.a.intensidade}
          </p>
          <p
            className={styles.classificacao}
          >
            {a.a.classificacao === 'Intransitável' ? (<RemoveRoadIcon />) : (<ZoomInMapIcon />)} {a.a.classificacao}
          </p>
        </div>
        <p>{a.a.bairro}, {a.a.referencia}</p>
        <span>{formatDataString(a.a.data)}</span>
      </CardContent>
      <CardActions>
        <Link className={styles.seeMore} to={`/alagamento/${a.a.idalagamento}`}><Button size="small">Ver mais</Button></Link>
        {user && a.a.idusuario === user.idusuario &&
          <Link to='/' className={styles.remove} >
            <Button
              size="small"
              onClick={removeAlagamento}>
              Excluir
            </Button>
          </Link>}
      </CardActions>
    </Card>
  )
}

export default CardAlagamento