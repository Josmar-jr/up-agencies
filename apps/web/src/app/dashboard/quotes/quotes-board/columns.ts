import colors from 'tailwindcss/colors'
import { STATUS } from './types'

interface Column {
  id: STATUS
  title: string
  color: string
  background: string
}

export const columns: Column[] = [
  {
    id: 'AWAITING',
    title: 'AGUARDANDO',
    color: colors.amber[500],
    background: colors.amber[100],
  },
  {
    id: 'QUOTING',
    title: 'EM COTAÇÃO',
    color: colors.blue[500],
    background: colors.blue[50],
  },
  {
    id: 'AWAITING_CLIENT',
    title: 'AGUARDANDO CLIENTE',
    color: colors.orange[600],
    background: colors.orange[100],
  },
  {
    id: 'APPROVED',
    title: 'APROVADO',
    color: colors.green[600],
    background: colors.emerald[50],
  },
  {
    id: 'REJECTED',
    title: 'REPROVADO',
    color: colors.red[600],
    background: colors.red[100],
  },
]
