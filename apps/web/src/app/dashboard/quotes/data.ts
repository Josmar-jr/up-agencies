import colors from 'tailwindcss/colors'
import { STATUS } from './quotes-board/types'

export interface SelectStatus {
  label: string
  value: STATUS
  color: string
}

export const listStatus: SelectStatus[] = [
  {
    value: 'AWAITING',
    label: 'AGUARDANDO',
    color: colors.amber[500],
  },
  {
    value: 'QUOTING',
    label: 'EM COTAÇÃO',
    color: colors.blue[500],
  },
  {
    value: 'AWAITING_CLIENT',
    label: 'AGUARDANDO CLIENTE',
    color: colors.orange[600],
  },
  {
    value: 'APPROVED',
    label: 'APROVADO',
    color: colors.green[600],
  },
  {
    value: 'REJECTED',
    label: 'REPROVADO',
    color: colors.red[600],
  },
]
