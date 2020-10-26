import {objectType} from '@nexus/schema'

export const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.deletedAt()
  },
})
