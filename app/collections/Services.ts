import { CollectionConfig } from 'payload/types';

const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'price', 'isActive'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
    },
    {
      name: 'category',
      type: 'select',
      required: true,
      options: [
        { label: 'Emergency Care', value: 'emergency' },
        { label: 'Specialty Care', value: 'specialty' },
        { label: 'Diagnostic Services', value: 'diagnostic' },
        { label: 'Preventive Care', value: 'preventive' },
        { label: 'Surgical Services', value: 'surgical' },
        { label: 'Rehabilitation', value: 'rehabilitation' },
      ],
    },
    {
      name: 'icon',
      type: 'text',
      admin: {
        description: 'Lucide icon name (e.g., heart, brain, eye)',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'feature',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'pricing',
      type: 'group',
      fields: [
        {
          name: 'startingPrice',
          type: 'number',
          min: 0,
        },
        {
          name: 'maxPrice',
          type: 'number',
          min: 0,
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: '৳',
        },
        {
          name: 'priceNote',
          type: 'text',
        },
      ],
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'typical',
          type: 'text',
          admin: {
            description: 'e.g., "30-45 min", "1-2 hours"',
          },
        },
        {
          name: 'note',
          type: 'text',
        },
      ],
    },
    {
      name: 'availability',
      type: 'group',
      fields: [
        {
          name: 'schedule',
          type: 'text',
          admin: {
            description: 'e.g., "Mon-Fri", "24/7", "By Appointment"',
          },
        },
        {
          name: 'districts',
          type: 'relationship',
          relationTo: 'districts',
          hasMany: true,
        },
        {
          name: 'facilities',
          type: 'relationship',
          relationTo: 'facilities',
          hasMany: true,
        },
      ],
    },
    {
      name: 'relatedDoctors',
      type: 'relationship',
      relationTo: 'doctors',
      hasMany: true,
    },
    {
      name: 'prerequisites',
      type: 'array',
      fields: [
        {
          name: 'requirement',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'aftercare',
      type: 'richText',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isEmergency',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'requiresAppointment',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'seoTitle',
      type: 'text',
    },
    {
      name: 'seoDescription',
      type: 'textarea',
      maxLength: 160,
    },
  ],
};

export default Services;