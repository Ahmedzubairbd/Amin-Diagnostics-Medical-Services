import { CollectionConfig } from 'payload/types';

const Prescriptions: CollectionConfig = {
  slug: 'prescriptions',
  admin: {
    useAsTitle: 'prescriptionTitle',
    defaultColumns: ['patient', 'doctor', 'medicationName', 'status', 'startDate'],
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
      name: 'prescriptionTitle',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return `${data.medicationName} - ${data.patient?.name || 'Patient'}`;
          },
        ],
      },
    },
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
      name: 'medicationName',
      type: 'text',
      required: true,
    },
    {
      name: 'genericName',
      type: 'text',
    },
    {
      name: 'dosage',
      type: 'text',
      required: true,
    },
    {
      name: 'frequency',
      type: 'select',
      required: true,
      options: [
        { label: 'Once daily', value: 'once-daily' },
        { label: 'Twice daily', value: 'twice-daily' },
        { label: 'Three times daily', value: 'three-times-daily' },
        { label: 'Four times daily', value: 'four-times-daily' },
        { label: 'Every 4 hours', value: 'every-4-hours' },
        { label: 'Every 6 hours', value: 'every-6-hours' },
        { label: 'Every 8 hours', value: 'every-8-hours' },
        { label: 'Every 12 hours', value: 'every-12-hours' },
        { label: 'As needed', value: 'as-needed' },
        { label: 'Before meals', value: 'before-meals' },
        { label: 'After meals', value: 'after-meals' },
        { label: 'At bedtime', value: 'at-bedtime' },
      ],
    },
    {
      name: 'route',
      type: 'select',
      options: [
        { label: 'Oral', value: 'oral' },
        { label: 'Topical', value: 'topical' },
        { label: 'Injection', value: 'injection' },
        { label: 'Inhalation', value: 'inhalation' },
        { label: 'Eye drops', value: 'eye-drops' },
        { label: 'Ear drops', value: 'ear-drops' },
        { label: 'Nasal', value: 'nasal' },
        { label: 'Rectal', value: 'rectal' },
        { label: 'Sublingual', value: 'sublingual' },
      ],
      defaultValue: 'oral',
    },
    {
      name: 'duration',
      type: 'group',
      fields: [
        {
          name: 'value',
          type: 'number',
          required: true,
        },
        {
          name: 'unit',
          type: 'select',
          options: [
            { label: 'Days', value: 'days' },
            { label: 'Weeks', value: 'weeks' },
            { label: 'Months', value: 'months' },
            { label: 'Ongoing', value: 'ongoing' },
          ],
          defaultValue: 'days',
        },
      ],
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
    },
    {
      name: 'refills',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'refillsRemaining',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'instructions',
      type: 'richText',
      required: true,
    },
    {
      name: 'warnings',
      type: 'array',
      fields: [
        {
          name: 'warning',
          type: 'text',
          required: true,
        },
        {
          name: 'severity',
          type: 'select',
          options: [
            { label: 'Info', value: 'info' },
            { label: 'Warning', value: 'warning' },
            { label: 'Critical', value: 'critical' },
          ],
          defaultValue: 'info',
        },
      ],
    },
    {
      name: 'sideEffects',
      type: 'array',
      fields: [
        {
          name: 'effect',
          type: 'text',
          required: true,
        },
        {
          name: 'frequency',
          type: 'select',
          options: [
            { label: 'Common', value: 'common' },
            { label: 'Uncommon', value: 'uncommon' },
            { label: 'Rare', value: 'rare' },
          ],
        },
      ],
    },
    {
      name: 'startDate',
      type: 'date',
      required: true,
    },
    {
      name: 'endDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Completed', value: 'completed' },
        { label: 'Discontinued', value: 'discontinued' },
        { label: 'On Hold', value: 'on-hold' },
        { label: 'Cancelled', value: 'cancelled' },
      ],
      defaultValue: 'active',
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'normal',
    },
    {
      name: 'pharmacy',
      type: 'group',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
        {
          name: 'phone',
          type: 'text',
        },
        {
          name: 'address',
          type: 'textarea',
        },
      ],
    },
    {
      name: 'cost',
      type: 'group',
      fields: [
        {
          name: 'amount',
          type: 'number',
          min: 0,
        },
        {
          name: 'currency',
          type: 'text',
          defaultValue: '৳',
        },
        {
          name: 'insuranceCovered',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    {
      name: 'isControlledSubstance',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'requiresMonitoring',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'monitoringInstructions',
      type: 'textarea',
      admin: {
        condition: (data) => data.requiresMonitoring,
      },
    },
  ],
};

export default Prescriptions;