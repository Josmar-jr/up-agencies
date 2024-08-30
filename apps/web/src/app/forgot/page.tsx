import { Logo } from '@/components/logo'

import { UpdatePasswordForm } from './components/update-password-form'
import { SendEmailForm } from './components/send-email-form'

interface ForgotProps {
  searchParams: {
    code?: string
  }
}

export default function Forgot({ searchParams }: ForgotProps) {
  const code = searchParams.code

  return (
    <div className="flex min-h-full flex-col">
      <div className="bg-studio flex flex-1 flex-col gap-8 lg:gap-16 xl:gap-32">
        <div className="sticky top-0 mx-auto w-full max-w-7xl px-8 pt-6 sm:px-6 lg:px-8">
          <nav className="relative flex items-center justify-between sm:h-10">
            <Logo />
          </nav>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="flex w-full max-w-[448px] flex-col px-5">
            {code ? <UpdatePasswordForm code={code} /> : <SendEmailForm />}
          </div>
        </div>
      </div>
    </div>
  )
}
