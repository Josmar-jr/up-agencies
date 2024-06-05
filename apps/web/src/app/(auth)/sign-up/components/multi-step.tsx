import { motion } from 'framer-motion'
import colors from 'tailwindcss/colors'

export interface MultiStepProps {
  currentStep?: number
}

export function MultiStep({ currentStep = 1 }: MultiStepProps) {
  return (
    <div className="mt-4">
      <span className="text-sm text-muted-foreground">
        Passo {currentStep} de 2
      </span>
      <div className="mb-1 grid grid-cols-2 gap-2">
        {Array.from({ length: 2 }, (_, i) => i + 1).map((step) => {
          const status =
            currentStep === step
              ? 'active'
              : currentStep < step
                ? 'inactive'
                : 'complete'

          return (
            <motion.div
              animate={status}
              key={step}
              className="relative h-1 rounded-sm bg-zinc-200"
            >
              <motion.div
                animate={status}
                variants={{
                  inactive: {
                    width: 0,
                  },
                  active: {
                    width: '100%',
                    backgroundColor: colors.purple[600],
                  },
                  complete: {
                    width: '100%',
                    backgroundColor: colors.purple[600],
                    transition: {
                      delay: 0,
                      duration: 0.3,
                    },
                  },
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.2,
                  type: 'spring',
                  ease: 'circOut',
                }}
                className="absolute inset-0 w-0 rounded-sm"
              />
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
