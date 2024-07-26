export type Id = string | number

export type Column = {
  id: Id
  title: string
  color: string
}

export type STATUS =
  | 'AWAITING'
  | 'QUOTING'
  | 'AWAITING_CLIENT'
  | 'APPROVED'
  | 'REJECTED'

export type Task = {
  id: Id
  columnId: Id
  content: string
  status: STATUS
}
