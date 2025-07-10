import { CollectionConfig } from 'payload/types';

const Doctors: CollectionConfig = {
  slug: 'doctors',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'specialization', 'email', 'status', 'experience'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'phone',
      type: 'text',
      required: true,
    },
    {
      name: 'specialization',
      type: 'select',
      required: true,
      options: [
        { label: 'Cardiology', value: 'cardiology' },
        { label: 'Neurology', value: 'neurology' },
        { label: 'Orthopedics', value: 'orthopedics' },
        { label: 'Pediatrics', value: 'pediatrics' },
        { label: 'Internal Medicine', value: 'internal-medicine' },
        { label: 'Emergency Medicine', value: 'emergency-medicine' },
        { label: 'Ophthalmology', value: 'ophthalmology' },
        { label: 'Dermatology', value: 'dermatology' },
        { label: 'Psychiatry', value: 'psychiatry' },
        { label: 'Oncology', value: 'oncology' },
      ],
    },
    {
      name: 'experience',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'education',
      type: 'array',
      fields: [
        {
          name: 'degree',
          type: 'text',
          required: true,
        },
        {
          name: 'institution',
          type: 'text',
          required: true,
        },
        {
          name: 'year',
          type: 'number',
        },
      ],
    },
    {
      name: 'certifications',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'issuingOrganization',
          type: 'text',
        },
        {
          name: 'issueDate',
          type: 'date',
        },
        {
          name: 'expiryDate',
          type: 'date',
        },
      ],
    },
    {
      name: 'bio',
      type: 'richText',
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'availability',
      type: 'group',
      fields: [
        {
          name: 'days',
          type: 'select',
          hasMany: true,
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
          name: 'startTime',
          type: 'text',
        },
        {
          name: 'endTime',
          type: 'text',
        },
      ],
    },
    {
      name: 'consultationFee',
      type: 'number',
      min: 0,
    },
    {
      name: 'facility',
      type: 'relationship',
      relationTo: 'facilities',
    },
    {
      name: 'district',
      type: 'relationship',
      relationTo: 'districts',
      required: true,
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
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
        { label: 'On Leave', value: 'on-leave' },
      ],
      defaultValue: 'active',
    },
  ],
};

export default Doctors;