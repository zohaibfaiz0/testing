// schemas/user.ts
import { type SchemaTypeDefinition } from 'sanity';

export const user: SchemaTypeDefinition = {
  name: 'user',
  title: 'User ',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule) => [
        Rule.required().min(3).max(50),
        Rule.unique().error('Username must be unique')
      ]
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => [
        Rule.required().email().error('Please enter a valid email'),
        Rule.unique().error('Email already exists')
      ]
    },
    {
      name: 'password',
      title: 'Password',
      type: 'string',
      validation: (Rule) => [
        Rule.required().min(8).error('Password must be at least 8 characters long')
      ],
      hidden: true // Hide password in the studio
    },
    {
      name: 'role',
      title: 'User  Role',
      type: 'string',
      options: {
        list: [
          { title: 'User ', value: 'user' },
          { title: 'Admin', value: 'admin' }
        ]
      },
      validation: (Rule) => Rule.required()
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString()
    }
  ],
  preview: {
    select: {
      title: 'username',
      subtitle: 'email'
    }
  }
};