import { CollectionConfig } from 'payload/types';

const Facilities: CollectionConfig = {
  slug: 'facilities',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'type', 'district', 'rating', 'isActive'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
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
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'General Hospital', value: 'general-hospital' },
        { label: 'Specialized Hospital', value: 'specialized-hospital' },
        { label: 'Emergency Hospital', value: 'emergency-hospital' },
        { label: 'Clinic', value: 'clinic' },
        { label: 'Diagnostic Center', value: 'diagnostic-center' },
        { label: 'Pharmacy', value: 'pharmacy' },
      ],
    },
    {
      name: 'district',
      type: 'relationship',
      relationTo: 'districts',
      required: true,
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
      name: 'gallery',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
        },
      ],
    },
    {
      name: 'contactInfo',
      type: 'group',
      fields: [
        {
          name: 'phone',
          type: 'text',
          required: true,
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
          name: 'website',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'location',
      type: 'group',
      fields: [
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
        {
          name: 'mapUrl',
          type: 'text',
        },
      ],
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
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
      ],
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
        {
          name: 'icon',
          type: 'text',
          admin: {
            description: 'Lucide icon name',
          },
        },
      ],
    },
    {
      name: 'operatingHours',
      type: 'group',
      fields: [
        {
          name: 'is24x7',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'schedule',
          type: 'array',
          admin: {
            condition: (data) => !data.is24x7,
          },
          fields: [
            {
              name: 'day',
              type: 'select',
              options: [
                { label: 'Monday', value: 'monday' },
                { label: 'Tuesday', value: 'tuesday' },
                { label: 'Wednesday', value: 'wednesday' },
                { label: 'Thursday', value: 'thursday' },
                { label: 'Friday', value: 'friday' },
                { label: 'Saturday', value: 'saturday' },
                { label: 'Sunday', value: 'sunday' },
              ],
            },
            {
              name: 'openTime',
              type: 'text',
            },
            {
              name: 'closeTime',
              type: 'text',
            },
            {
              name: 'isClosed',
              type: 'checkbox',
              defaultValue: false,
            },
          ],
        },
      ],
    },
    {
      name: 'capacity',
      type: 'group',
      fields: [
        {
          name: 'beds',
          type: 'number',
          min: 0,
        },
        {
          name: 'icuBeds',
          type: 'number',
          min: 0,
        },
        {
          name: 'emergencyBeds',
          type: 'number',
          min: 0,
        },
        {
          name: 'operatingRooms',
          type: 'number',
          min: 0,
        },
      ],
    },
    {
      name: 'rating',
      type: 'number',
      min: 0,
      max: 5,
      defaultValue: 0,
    },
    {
      name: 'reviewCount',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'isEmergencyFacility',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'acceptsInsurance',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'parkingAvailable',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
};

export default Facilities;