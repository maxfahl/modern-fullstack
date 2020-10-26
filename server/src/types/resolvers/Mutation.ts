import {APP_SECRET, getUserId} from '../../utils'
import {USER_SIGNED_IN, USER_UPDATED} from './Subscription'
import {compare, hash} from 'bcryptjs'
import {inputObjectType, mutationType, stringArg} from '@nexus/schema'

import {sign} from 'jsonwebtoken'

export const UserInputType = inputObjectType({
  name: 'UserCreateInput',
  definition(t) {
    t.string('email', {
      required: true,
    })
    t.string('password', {
      required: true,
    })
  },
})

// export const UserUpdateInputType = inputObjectType({
//   name: 'UserUpdateInput',
//   definition(t) {
//     t.string('email')
//   },
// })

export const Mutation = mutationType({
  definition(t) {
    t.field('signUp', {
      type: 'AuthPayload',
      args: {
        user: 'UserCreateInput',
      },
      resolve: async (_parent, {user}, ctx) => {
        const {email, password,} = user
        const hashedPassword = await hash(password, 10)
        const created = await ctx.prisma.user.create({
          data: {
            email,
            password: hashedPassword,
          },
        })

        return {
          token: sign({userId: created.id}, APP_SECRET),
          user: created,
        }
      },
    })

    t.field('signIn', {
      type: 'AuthPayload',
      args: {
        email: stringArg({nullable: false}),
        password: stringArg({nullable: false}),
      },
      resolve: async (_parent, {email, password}, ctx) => {
        const {pubsub} = ctx

        const user = await ctx.prisma.user.findOne({
          where: {
            email,
          },
        })
        if (!user) {
          throw new Error(`No user found for email: ${email}`)
        }
        const passwordValid = await compare(password, user.password)
        if (!passwordValid) {
          throw new Error('Invalid password')
        }
        pubsub.publish(USER_SIGNED_IN, user)
        return {
          token: sign({userId: user.id}, APP_SECRET),
          user,
        }
      },
    })
  }
})
