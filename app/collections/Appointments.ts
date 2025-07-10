import { CollectionConfig } from 'payload/types';

const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'appointmentTitle',
    defaultColumns: ['patient', 'doctor', 'date', 'time', 'status', 'type'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator' || user?.role === 'patient',
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
    delete: ({ req: { user } }) => user?.role === 'admin' || user?.role === 'moderator',
  },
  fields: [
    {
      name: 'appointmentTitle',
      type: 'text',
      admin: {
        hidden: true,
      },
      hooks: {
        beforeChange: [
          ({ data }) => {
            return `${data.patient?.name || 'Patient'} - ${data.doctor?.name || 'Doctor'} - ${data.date}`;
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
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'time',
      type: 'text',
      required: true,
    },
    {
      name: 'duration',
      type: 'number',
      defaultValue: 30,
      min: 15,
      max: 120,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Consultation', value: 'consultation' },
        { label: 'Follow-up', value: 'follow-up' },
        { label: 'Emergency', value: 'emergency' },
        { label: 'Check-up', value: 'check-up' },
        { label: 'Procedure', value: 'procedure' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      options: [
        { label: 'Scheduled', value: 'scheduled' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'In Progress', value: 'in-progress' },
        { label: 'Completed', value: 'completed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'No Show', value: 'no-show' },
        { label: 'Rescheduled', value: 'rescheduled' },
      ],
      defaultValue: 'scheduled',
    },
    {
      name: 'priority',
      type: 'select',
      options: [
        { label: 'Low', value: 'low' },
        { label: 'Normal', value: 'normal' },
        { label: 'High', value: 'high' },
        { label: 'Urgent', value: 'urgent' },
      ],
      defaultValue: 'normal',
    },
    {
      name: 'symptoms',
      type: 'textarea',
    },
    {
      name: 'notes',
      type: 'richText',
    },
    {
      name: 'prescriptions',
      type: 'relationship',
      relationTo: 'prescriptions',
      hasMany: true,
    },
    {
      name: 'testResults',
      type: 'relationship',
      relationTo: 'test-results',
      hasMany: true,
    },
    {
      name: 'followUpRequired',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'followUpDate',
      type: 'date',
      admin: {
        condition: (data) => data.followUpRequired,
      },
    },
    {
      name: 'paymentStatus',
      type: 'select',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Paid', value: 'paid' },
        { label: 'Refunded', value: 'refunded' },
      ],
      defaultValue: 'pending',
    },
    {
      name: 'totalAmount',
      type: 'number',
      min: 0,
    },
  ],
};

export default Appointments;