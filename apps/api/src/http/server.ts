import fastifyCors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import { env } from '@up-agencies/env'
import fastify from 'fastify'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
} from 'fastify-type-provider-zod'

import { errorHandler } from './error-handler'

import { createAccount } from './routes/auth/create-account'
import { authenticateWithPassword } from './routes/auth/authenticate-with-password'
import { getProfile } from './routes/auth/get-profile'
import { requestPasswordRecover } from './routes/auth/request-password-recover'
import { updatePassword } from './routes/auth/update-password'
import { getAgency } from './routes/agency/get-agency'
import { getMembership } from './routes/agency/get-membership'
import { getMembers } from './routes/members/get-members'
import { sendInvites } from './routes/invites/send-invites'
import { acceptInvite } from './routes/invites/accept-invite'
import { getInvites } from './routes/invites/get-invites'
import { updateUserAccount } from './routes/auth/update-account'
import { createPerson } from './routes/people/create-person'
import { listPeople } from './routes/people/list-people'
import { getPersonById } from './routes/people/get-people-by-id'
import { deletePeople } from './routes/people/delete-people'
import { createQuote } from './routes/quotes/create-quote'
import { listQuotes } from './routes/quotes/list-quotes'
import { moveQuote } from './routes/quotes/move-quote'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setSerializerCompiler(serializerCompiler)
app.setValidatorCompiler(validatorCompiler)

app.setErrorHandler(errorHandler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'Next.js SaaS',
      description: 'Full-stack SaaS with multi-tenant & RBAC.',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
})

app.register(fastifyCors)

app.register(createAccount)
app.register(authenticateWithPassword)
app.register(getProfile)
app.register(requestPasswordRecover)
app.register(updatePassword)
app.register(updateUserAccount)

// Agency
app.register(getAgency)
app.register(getMembership)

// Member
app.register(getMembers)

// Invite
app.register(sendInvites)
app.register(acceptInvite)
app.register(getInvites)

// People
app.register(createPerson)
app.register(deletePeople)
app.register(listPeople)
app.register(getPersonById)

// Quote
app.register(createQuote)
app.register(listQuotes)
app.register(moveQuote)

app.listen({ port: env.SERVER_PORT }).then(() => {
  console.log('HTTP server running! 🔥')
})
