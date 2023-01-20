import React, { useEffect, useState } from 'react'
import styles from './Home.module.css'
import { motion } from 'framer-motion';

// MUI
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import { useSnackbar } from 'notistack';

import {Dialog} from '@mui/material';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Divider from '@mui/material/Divider';
import Slider from '@mui/material/Slider';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

import AddBoxIcon from '@mui/icons-material/AddBox';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import AssignmentIcon from '@mui/icons-material/Assignment';

// Services 
import fetchAlagamentos from '../../services/fetchAlagamentos';
import insertAlagamento from '../../services/insertAlagamento';

//Hooks
import { useAuthContext } from '../../hooks/useAuthContext'

// Components
import CardAlagamento from '../../components/CardAlagamento';

// Utils
import { dataUtils } from '../../utils/dataUtils'

// Contexts
import { useAlagamentos } from '../../contexts/AlagamentosContext';

function Home() {

  const { alagamentos, setAlagamentos } = useAlagamentos()
  const [open, setOpen] = useState(false)
  const { user } = useAuthContext()
  const { formatDataStringY } = dataUtils()

  const [classificacao, setClassificacao] = useState('Localizado')
  const [intensidade, setIntensidade] = useState('Moderado')
  const [cep, setCep] = useState('')
  const [endereco, setEndereco] = useState('')
  const [bairro, setBairro] = useState('')
  const [referencia, setReferencia] = useState('')
  const [data, setData] = useState('')
  const [imagens, setImagens] = useState([])

  const [atual, setAtual] = useState(false)
  const { enqueueSnackbar } = useSnackbar()

  const [loading, setLoading] = useState(false)

  const [scene, setScene] = useState('Todos')

  const marks = [
    {
      value: 1,
      label: 'Leve'
    },
    {
      value: 2,
      label: 'Moderado'
    }, {
      value: 3,
      label: 'Grave'
    }
  ]

  useEffect(() => {
    async function fetchData() {
      const response = await fetchAlagamentos(localStorage.getItem('@Auth:token'))
      if (!response.message) {
        setAlagamentos(response)
      }
    }
    fetchData()
  }, [loading, setAlagamentos, scene, alagamentos])

  function handleClose() {
    setOpen(false)
  }

  function handleOpen() {
    setOpen(true)
  }

  function handleClassificacao(e, newClassificacao) {
    setClassificacao(newClassificacao)
  }

  function valueText(value) {
    let str = value === 1 ? 'Leve' : value === 2 ? 'Moderado' : 'Grave'
    setIntensidade(str)
    return str
  }

  async function handleSubmit() {
    setLoading(true)
    if ((cep.trim().length === 0) || (bairro.trim().length === 0) || (endereco.trim().length === 0) || (referencia.trim().length === 0)) {
      enqueueSnackbar('Todos os campos são Obrigatórios', { variant: 'error', autoHideDuration: 1500 })
    } else if (cep.trim().length !== 8) {
      enqueueSnackbar('O CEP deve ter 8 numeros', { variant: 'error', autoHideDuration: 1500 })
    } else if ((!atual && !(new Date(data)).getDate()) || (new Date(data) > new Date(Date.now()))) {
      enqueueSnackbar('Data inválida', { variant: 'error', autoHideDuration: 1500 })
    } else if (imagens.length < 2) {
      enqueueSnackbar('Selecione no mínimo duas imagens', { variant: 'error', autoHideDuration: 1500 })
    } else if (data === '' && !atual) {
      enqueueSnackbar('Selecione uma data', { variant: 'error', autoHideDuration: 1500 })
    } else {
      let dados = {
        endereco: {
          cep,
          bairro,
          endereco,
          referencia
        },
        classificacao,
        intensidade,
        data: atual ? formatDataStringY(new Date(Date.now())) : data,
        idusuario: user.idusuario
      }
      var formdata = new FormData()
      imagens.map(i => {
        return formdata.append('imagem', i)
      })

      formdata.append('dados', JSON.stringify(dados))
      await insertAlagamento(localStorage.getItem('@Auth:token'), formdata)

      setAtual(false)
      setBairro('')
      setCep('')
      setClassificacao('Localizado')
      setData('')
      setEndereco('')
      setReferencia('')
      setIntensidade(2)
      setImagens([])
      setOpen(false)
    }

    setLoading(false)
  }

  function addImage(i) {
    if (i) {
      let arr = []
      imagens.map((im) => arr.push(im))
      arr.push(i)
      setImagens(arr)
    }
  }

  function handleDeleteImage(key) {
    let arr = imagens.filter(i => i.name !== key)
    setImagens(arr)
    setCep(cep)
  }

  return (
    <motion.div
      initial={{ x: window.innerWidth }}
      animate={{ x: window.innerWidth - window.innerWidth }}
      exit={{ x: -window.innerWidth }}
      className={styles.container}>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="titulo">Novo Alagamento</DialogTitle>
        <DialogContent>
          <DialogContentText id="texto-titulo">
            É interessante que você descreva cada detalhe de forma minunciosa.
          </DialogContentText>
          <div className={styles.dados}>
            <div className={styles.claIntGroup}>
              <div className={styles.group}>
                <p>ESSE ALAGAMENTO É?</p>
                <ToggleButtonGroup
                  color="primary"
                  value={classificacao}
                  exclusive
                  onChange={handleClassificacao}
                  aria-label="Platform"
                >
                  <ToggleButton value="Localizado">Localizado</ToggleButton>
                  <ToggleButton value="Intransitável">Intransitável</ToggleButton>
                </ToggleButtonGroup>
              </div>
              <Divider orientation="vertical" flexItem />
              <div className={styles.group}>
                <p>QUAL A INTENSIDADE?</p>
                <Slider
                  aria-label="Intensidade"
                  defaultValue={2}
                  onChange={(e) => valueText(e.target.value)}
                  step={1}
                  marks={marks}
                  min={1}
                  max={3}
                />
              </div>
            </div>
            <p style={{ marginBottom: '0', marginTop: '1em' }}>ONDE SE LOCALIZA?</p>
            <div className={styles.txtsField}>
              <TextField
                autoFocus
                onChange={(e) => setCep(e.target.value)}
                margin="dense"
                id="cep"
                label="CEP"
                type='number'
                placeholder='Apenas numeros'
                fullWidth
                variant="standard"
              />
              <TextField
                autoFocus
                onChange={(e) => setBairro(e.target.value)}
                margin="dense"
                id="bairro"
                label="Bairro"
                type='text'
                fullWidth
                variant="standard"
              />
            </div>
            <TextField
              autoFocus
              onChange={(e) => setEndereco(e.target.value)}
              margin="dense"
              id="endereco"
              label="Endereço"
              type='text'
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              onChange={(e) => setReferencia(e.target.value)}
              margin="dense"
              id="ref"
              label="Referência"
              type='text'
              fullWidth
              variant="standard"
            />
            <div className={styles.data}>
              <p>Qual a data?</p>
              <div className={styles.dataGroup}>
                <TextField
                  autoFocus
                  onChange={(e) => setData(e.target.value)}
                  margin="dense"
                  id="name"
                  disabled={atual}
                  type='date'
                  fullWidth
                  variant="outlined"
                />
                <FormControlLabel className={styles.atual} checked={atual} onChange={(e) => setAtual(e.target.checked)} control={<Checkbox color='default' />} label="Hoje" />
              </div>
            </div>
            <p>Agora envie pelomenos duas fotos</p>
            <input
              autoFocus
              onChange={(e) => addImage(e.target.files[0])}
              id="image"
              accept="image/*"
              type='file'
            />
            <>
              {imagens && imagens.map((i, k) => (
                <Chip
                  className={styles.imageChip}
                  key={k}
                  label={i.name}
                  onDelete={() => handleDeleteImage(i.name)}
                />
              ))}
            </>
          </div>
        </DialogContent>
        <DialogActions>
          <LoadingButton loading={loading} onClick={handleClose}>Cancelar</LoadingButton>
          <LoadingButton loading={loading} onClick={handleSubmit}>Salvar</LoadingButton>
        </DialogActions>
      </Dialog>
      <div className={styles.tab}>
        <nav className={styles.menuMain}>
          <ul>
            <li onClick={() => setScene('Todos')}><DensitySmallIcon className={styles.icon} />  <span>Todos os Alagamentos </span></li>
            <li onClick={() => setScene('Meus')}><AssignmentIcon className={styles.icon} /> <span>Meus Alagamentos</span></li>
            <li onClick={handleOpen}><AddBoxIcon className={styles.icon} /> <span>Novo</span></li>
          </ul>
        </nav>

        <div className={styles.alagamentos}>
          {alagamentos && alagamentos.map((a, k) => (
            scene === 'Todos' ? (
              <CardAlagamento a={{ a }} key={k} />
            ) : (
              user && a.idusuario === user.idusuario && (
                <CardAlagamento a={{ a }} key={k} />
              )
            )
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default Home