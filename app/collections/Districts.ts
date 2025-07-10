import { CollectionConfig } from 'payload/types';

const Districts: CollectionConfig = {
  slug: 'districts',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'isActive', 'totalFacilities', 'totalDoctors'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'name',
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
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'location',
      type: 'group',
      fields: [
        {
          name: 'division',
          type: 'text',
          defaultValue: 'Khulna',
        },
        {
          name: 'country',
          type: 'text',
          defaultValue: 'Bangladesh',
        },
        {
          name: 'coordinates',
          type: 'group',
          fields: [
            {
              name: 'latitude',
              type: 'number',
            },
            {
              name: 'longitude',
              type: 'number',
            },
          ],
        },
      ],
    },
    {
      name: 'statistics',
      type: 'group',
      fields: [
        {
          name: 'totalFacilities',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'totalDoctors',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'totalPatients',
          type: 'number',
          defaultValue: 0,
        },
        {
          name: 'emergencyResponseTime',
          type: 'text',
          admin: {
            description: 'Average emergency response time (e.g., "15 min")',
          },
        },
      ],
    },
    {
      name: 'emergencyServices',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'phone',
          type: 'text',
          required: true,
        },
        {
          name: 'availability',
          type: 'text',
          defaultValue: '24/7',
        },
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Ambulance', value: 'ambulance' },
            { label: 'Emergency Hotline', value: 'hotline' },
            { label: 'Blood Bank', value: 'blood-bank' },
            { label: 'Poison Control', value: 'poison-control' },
            { label: 'Fire Service', value: 'fire-service' },
          ],
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'mainPhone',
          type: 'text',
        },
        {
          name: 'emergencyPhone',
          type: 'text',
        },
        {
          name: 'email',
          type: 'email',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'specialties',
      type: 'array',
      fields: [
        {
          name: 'specialty',
          type: 'text',
          required: true,
        },
        {
          name: 'doctorCount',
          type: 'number',
          defaultValue: 0,
        },
      ],
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
    },
  ],
};

export default Districts;