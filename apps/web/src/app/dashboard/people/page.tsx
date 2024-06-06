import { Info } from 'lucide-react'
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@/components/ui/tooltip'

import { Empty } from './components/empty'
import { DataTable } from './components/list-person-table/data-table'

import { columns } from './components/list-person-table/columns'

const tasks = [
  {
    id: 'TASK-8782',
    title:
      "You can't compress the program without quantifying the open-source SSD pixel!",
    status: 'in progress',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-7878',
    title:
      'Try to calculate the EXE feed, maybe it will index the multi-byte pixel!',
    status: 'backlog',
    label: 'documentation',
    priority: 'medium',
  },
  {
    id: 'TASK-7839',
    title: 'We need to bypass the neural TCP card!',
    status: 'todo',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-5562',
    title:
      'The SAS interface is down, bypass the open-source pixel so we can back up the PNG bandwidth!',
    status: 'backlog',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-8686',
    title:
      "I'll parse the wireless SSL protocol, that should driver the API panel!",
    status: 'canceled',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-1280',
    title:
      'Use the digital TLS panel, then you can transmit the haptic system!',
    status: 'done',
    label: 'bug',
    priority: 'high',
  },
  {
    id: 'TASK-7262',
    title:
      'The UTF8 application is down, parse the neural bandwidth so we can back up the PNG firewall!',
    status: 'done',
    label: 'feature',
    priority: 'high',
  },
  {
    id: 'TASK-1138',
    title:
      "Generating the driver won't do anything, we need to quantify the 1080p SMTP bandwidth!",
    status: 'in progress',
    label: 'feature',
    priority: 'medium',
  },
  {
    id: 'TASK-7184',
    title: 'We need to program the back-end THX pixel!',
    status: 'todo',
    label: 'feature',
    priority: 'low',
  },
  {
    id: 'TASK-5160',
    title:
      "Calculating the bus won't do anything, we need to navigate the back-end JSON protocol!",
    status: 'in progress',
    label: 'documentation',
    priority: 'high',
  },
  {
    id: 'TASK-5618',
    title:
      "Generating the driver won't do anything, we need to index the online SSL application!",
    status: 'done',
    label: 'documentation',
    priority: 'medium',
  },
]

export default function People() {
  return (
    <div className="min-h-screen w-full bg-white">
      <header className="flex h-[49px] w-full items-center border-b px-4">
        <div className="flex items-center gap-1.5">
          <h1 className="text-lg font-medium">Pessoas</h1>
          <Tooltip>
            <TooltipTrigger className="mt-0.5 text-muted-foreground *:size-3">
              <Info />
            </TooltipTrigger>
            <TooltipContent side="right">Pessoas</TooltipContent>
          </Tooltip>
        </div>
      </header>

      <DataTable data={tasks} columns={columns} />
      {/* <div className="h-[calc(100vh-49px)] p-6">
        <Empty />
      </div> */}
    </div>
  )
}
