import { CollectionConfig } from 'payload/types';

const TestResults: CollectionConfig = {
  slug: 'test-results',
  admin: {
    useAsTitle: 'testName',
    defaultColumns: ['patient', 'testName', 'testType', 'date', 'status', 'priority'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
    read: ({ req: { user } }) => {
      if (user?.role === 'admin' || user?.role === 'moderator') return true;
      if (user?.role === 'patient') {
        return {
          patient: {
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
      name: 'patient',
      type: 'relationship',
      relationTo: 'patients',
      required: true,
    },
    {
      name: 'doctor',
      type: 'relationship',
      relationTo: 'doctors',
      required: true,
    },
    {
      name: 'appointment',
      type: 'relationship',
      relationTo: 'appointments',
    },
    {
      name: 'testName',
      type: 'text',
      required: true,
    },
    {
      name: 'testType',
      type: 'select',
      required: true,
      options: [
        { label: 'Blood Test', value: 'blood' },
        { label: 'Urine Test', value: 'urine' },
        { label: 'Imaging (X-Ray, CT, MRI)', value: 'imaging' },
        { label: 'Biopsy', value: 'biopsy' },
        { label: 'Cardiac Test', value: 'cardiac' },
        { label: 'Pathology', value: 'pathology' },
        { label: 'Microbiology', value: 'microbiology' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'testDate',
      type: 'date',
      required: true,
    },
    {
      name: 'resultDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Ordered', value: 'ordered' },
        { label: 'Sample Collected', value: 'collected' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Reviewed', value: 'reviewed' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'ordered',
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
        { label: 'STAT', value: 'stat' },
      ],
      defaultValue: 'normal',
    },
    {
      name: 'results',
      type: 'group',
      fields: [
        {
          name: 'values',
          type: 'array',
          fields: [
            {
              name: 'parameter',
              type: 'text',
              required: true,
            },
            {
              name: 'value',
              type: 'text',
              required: true,
            },
            {
              name: 'unit',
              type: 'text',
            },
            {
              name: 'normalRange',
              type: 'text',
            },
            {
              name: 'flag',
              type: 'select',
              options: [
                { label: 'Normal', value: 'normal' },
                { label: 'High', value: 'high' },
                { label: 'Low', value: 'low' },
                { label: 'Critical', value: 'critical' },
              ],
            },
          ],
        },
        {
          name: 'interpretation',
          type: 'richText',
        },
        {
          name: 'recommendations',
          type: 'richText',
        },
      ],
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        {
          name: 'file',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'description',
          type: 'text',
        },
      ],
    },
    {
      name: 'technician',
      type: 'text',
    },
    {
      name: 'reviewedBy',
      type: 'relationship',
      relationTo: 'doctors',
    },
    {
      name: 'reviewDate',
      type: 'date',
    },
    {
      name: 'criticalValues',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'notificationSent',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'downloadCount',
      type: 'number',
      defaultValue: 0,
      admin: {
        readOnly: true,
      },
    },
  ],
};

export default TestResults;