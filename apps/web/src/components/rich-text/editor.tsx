import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'

import EditorToolbar from './toolbar/editor-toolbar'
import '@/styles/prose-mirror.css'

interface EditorProps {
  content: string
  placeholder?: string
  onChange: (value: string) => void
}

export const Editor = ({ content, placeholder, onChange }: EditorProps) => {
  const editor = useEditor({
    extensions: [StarterKit],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  if (!editor) return <></>

  return (
    <div className="prose dark:prose-invert relative w-full max-w-none rounded-md border border-input bg-background">
      <EditorToolbar editor={editor} />
      <div className="editor">
        <EditorContent editor={editor} placeholder={placeholder} />
      </div>
    </div>
  )
}
