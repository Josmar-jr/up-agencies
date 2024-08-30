'use client'
import { Calendar, CircleStop, File, Star, UserRound } from 'lucide-react'
import { AssigneQuote } from '../assignee-quote'
import { StatusQuote } from '../status-quote'
import { ResizableTextarea } from '@/components/ui/resizable-textarea'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Image02, Sparkles } from '@/icons'
import { Editor } from '@/components/rich-text/editor'
import { useState } from 'react'
import { toast } from 'sonner'
import Image from 'next/image'

export function GeneralInfo() {
  const [isShowDescription, setIsShowDescription] = useState(false)
  const [value, setValue] = useState('hello world ')

  function handleAddDescription() {
    setIsShowDescription(true)
  }

  function handleGenerateWithAI() {
    toast.warning(
      'Só é possível gerar contéudos através de AI com o plano pago 🪄'
    )
  }

  return (
    <>
      <Image
        src="/paris.webp"
        alt="cover image"
        width={0} // Pode ser 0 ou removido
        height={0} // Pode ser 0 ou removido
        sizes="100vw"
        style={{
          width: '100%',
          height: '180px',
          objectFit: 'cover',
        }}
      />
      <div className="px-8">
        {/* <div className="space-x-2">
          <Button variant="secondary" className="h-7 gap-1 px-2 text-xs">
            <Star className="size-4" />
          </Button>
          <Button variant="secondary" className="h-7 gap-1 px-2 text-xs">
            <Image02 className="size-4" />
          </Button>
        </div> */}

        <div className="pb-8 pt-4">
          <ResizableTextarea
            placeholder="Título da cotação"
            className="block w-full resize-none overflow-hidden hyphens-auto break-words border-none bg-transparent pr-1 text-2xl font-medium text-accents-7 outline-none"
            // Three lines
            maxLength={168}
          />
        </div>

        <div className="grid grid-cols-6 gap-x-2 text-sm">
          <div className="flex items-center gap-1.5 text-accents-5">
            <CircleStop className="size-4" />
            <span>Status</span>
          </div>
          <span className="col-span-2">
            <StatusQuote />
          </span>

          <div className="flex items-center gap-1.5 text-accents-5">
            <UserRound className="size-4" />
            <span>Responsáveis</span>
          </div>
          <span className="col-span-2">
            <AssigneQuote />
          </span>

          <div className="flex items-center gap-1.5 text-accents-5">
            <Calendar className="size-4" />
            <span>Data</span>
          </div>
          <span className="col-span-2">
            <AssigneQuote />
          </span>

          <div className="flex items-center gap-1.5 text-accents-5">
            <Calendar className="size-4" />
            <span>Data</span>
          </div>
          <span className="col-span-2">
            <AssigneQuote />
          </span>
        </div>

        {isShowDescription ? (
          <div className="mb-4 mt-9">
            <Editor
              content={value}
              onChange={setValue}
              placeholder="Write your post here..."
            />
          </div>
        ) : (
          <Card className="mb-4 mt-9 px-2 py-3">
            <Button
              onClick={handleAddDescription}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-1.5 px-1.5 font-normal text-accents-5"
            >
              <File className="size-4" />
              Adicionar descrição
            </Button>
            <Button
              onClick={handleGenerateWithAI}
              variant="ghost"
              size="sm"
              className="w-full justify-start gap-1.5 px-1.5 font-normal text-accents-5"
            >
              <Sparkles className="size-4 text-primary" />
              Escrever com AI
            </Button>
          </Card>
        )}
      </div>
    </>
  )
}
