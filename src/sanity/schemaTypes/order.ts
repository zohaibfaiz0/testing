import { Rule } from '@sanity/types';

export default {
  name: 'order',
  title: 'Orders',
  type: 'document',
  fields: [
    {
      name: 'username',
      title: 'Username',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule: Rule) => Rule.required().email(),
    },
    {
      name: 'address',
      title: 'Delivery Address',
      type: 'string',
      validation: (Rule: Rule) => Rule.required(),
    },
    {
      name: 'products',
      title: 'Products',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          {
            name: 'productId',
            title: 'Product ID',
            type: 'string',
            validation: (Rule: Rule) => Rule.required(),
          },
          {
            name: 'quantity',
            title: 'Quantity',
            type: 'number',
            validation: (Rule: Rule) => Rule.required().min(1),
          },
          {
            name: 'price',
            title: 'Price',
            type: 'number',
            validation: (Rule: Rule) => Rule.required().min(0),
          },
        ],
      }],
    },
    {
      name: 'total',
      title: 'Total Amount',
      type: 'number',
      validation: (Rule: Rule) => Rule.required().min(0),
    },
    {
      name: 'status',
      title: 'Order Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Processing', value: 'processing' },
          { title: 'Shipped', value: 'shipped' },
          { title: 'Delivered', value: 'delivered' },
          { title: 'Cancelled', value: 'cancelled' },
        ],
      },
      initialValue: 'pending',
    },
    {
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Card', value: 'card' },
          { title: 'Cash on Delivery', value: 'cash' },
        ],
      },
    },
    {
      name: 'deliveryOption',
      title: 'Delivery Option',
      type: 'string',
      options: {
        list: [
          { title: 'Standard', value: 'standard' },
          { title: 'Express', value: 'express' },
          { title: 'Next Day', value: 'nextDay' },
        ],
      },
      initialValue: 'standard',
    },
    {
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    },
    {
      name: 'paymentIntentId',
      title: 'Payment Intent ID',
      type: 'string',
    },
  ],
  preview: {
    select: {
      title: 'username',
      subtitle: 'email',
    },
  },
};