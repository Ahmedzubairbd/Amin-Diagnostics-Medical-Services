import { CollectionConfig } from 'payload/types';

const Patients: CollectionConfig = {
  slug: 'patients',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'phone', 'status', 'lastVisit'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'moderator') return true;
      if (user?.role === 'patient') {
        return {
          user: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    update: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
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
      name: 'dateOfBirth',
      type: 'date',
      required: true,
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'address',
      type: 'textarea',
      required: true,
    },
    {
      name: 'emergencyContact',
      type: 'group',
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
          name: 'relationship',
          type: 'text',
        },
      ],
    },
    {
      name: 'medicalHistory',
      type: 'array',
      fields: [
        {
          name: 'condition',
          type: 'text',
          required: true,
        },
        {
          name: 'diagnosedDate',
          type: 'date',
        },
        {
          name: 'notes',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'allergies',
      type: 'array',
      fields: [
        {
          name: 'allergen',
          type: 'text',
          required: true,
        },
        {
          name: 'severity',
          type: 'select',
          options: [
            { label: 'Mild', value: 'mild' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Severe', value: 'severe' },
          ],
        },
        {
          name: 'reaction',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'bloodType',
      type: 'select',
      options: [
        { label: 'A+', value: 'A+' },
        { label: 'A-', value: 'A-' },
        { label: 'B+', value: 'B+' },
        { label: 'B-', value: 'B-' },
        { label: 'AB+', value: 'AB+' },
        { label: 'AB-', value: 'AB-' },
        { label: 'O+', value: 'O+' },
        { label: 'O-', value: 'O-' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Inactive', value: 'inactive' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'lastVisit',
      type: 'date',
    },
    {
      name: 'assignedDoctor',
      type: 'relationship',
      relationTo: 'doctors',
    },
  ],
};

export default Patients;