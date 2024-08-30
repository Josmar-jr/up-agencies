import { PersonType } from '@/utils/constants'
import {
  BriefcaseBusiness,
  Check,
  Plane,
  SquareUser,
  Waypoints,
} from 'lucide-react'
import { ReactNode } from 'react'

export const labels: Record<PersonType, string> = {
  CLIENT: 'Cliente',
  PASSENGER: 'Passageiro',
  REPRESENTATIVE: 'Representante',
  SUPPLIER: 'Fornecedor',
}

export const statuses = [
  {
    value: 'backlog',
    label: 'Backlog',
    icon: <div />,
  },
  {
    value: 'todo',
    label: 'Todo',
    icon: <div />,
  },
  {
    value: 'in progress',
    label: 'In Progress',
    icon: <div />,
  },
  {
    value: 'done',
    label: 'Done',
    icon: <div />,
  },
  {
    value: 'canceled',
    label: 'Canceled',
    icon: <div />,
  },
]

interface Category {
  value: keyof typeof PersonType
  label: string
  icon: React.ComponentType<{ className?: string }>
}

export const categories: Category[] = [
  {
    label: 'Cliente',
    value: 'CLIENT',
    icon: SquareUser,
  },
  {
    label: 'Passageiro',
    value: 'PASSENGER',
    icon: Plane,
  },
  {
    label: 'Representante',
    value: 'REPRESENTATIVE',
    icon: Waypoints,
  },
  {
    label: 'Fornecedor',
    value: 'SUPPLIER',
    icon: BriefcaseBusiness,
  },
]
