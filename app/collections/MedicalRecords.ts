import { CollectionConfig } from 'payload/types';

const MedicalRecords: CollectionConfig = {
  slug: 'medical-records',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['patient', 'doctor', 'type', 'date', 'title'],
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
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Diagnosis', value: 'diagnosis' },
        { label: 'Prescription', value: 'prescription' },
        { label: 'Lab Result', value: 'lab-result' },
        { label: 'Imaging Report', value: 'imaging' },
        { label: 'Surgery Report', value: 'surgery' },
        { label: 'Consultation Notes', value: 'consultation' },
        { label: 'Discharge Summary', value: 'discharge' },
        { label: 'Referral', value: 'referral' },
      ],
    },
    {
      name: 'date',
      type: 'date',
      required: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
    },
    {
      name: 'diagnosis',
      type: 'array',
      fields: [
        {
          name: 'condition',
          type: 'text',
          required: true,
        },
        {
          name: 'icdCode',
          type: 'text',
        },
        {
          name: 'severity',
          type: 'select',
          options: [
            { label: 'Mild', value: 'mild' },
            { label: 'Moderate', value: 'moderate' },
            { label: 'Severe', value: 'severe' },
            { label: 'Critical', value: 'critical' },
          ],
        },
        {
          name: 'status',
          type: 'select',
          options: [
            { label: 'Active', value: 'active' },
            { label: 'Resolved', value: 'resolved' },
            { label: 'Chronic', value: 'chronic' },
            { label: 'Under Treatment', value: 'under-treatment' },
          ],
        },
      ],
    },
    {
      name: 'vitalSigns',
      type: 'group',
      fields: [
        {
          name: 'bloodPressure',
          type: 'text',
        },
        {
          name: 'heartRate',
          type: 'number',
        },
        {
          name: 'temperature',
          type: 'number',
        },
        {
          name: 'respiratoryRate',
          type: 'number',
        },
        {
          name: 'oxygenSaturation',
          type: 'number',
        },
        {
          name: 'weight',
          type: 'number',
        },
        {
          name: 'height',
          type: 'number',
        },
        {
          name: 'bmi',
          type: 'number',
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
        {
          name: 'type',
          type: 'select',
          options: [
            { label: 'Image', value: 'image' },
            { label: 'PDF Report', value: 'pdf' },
            { label: 'Lab Result', value: 'lab' },
            { label: 'X-Ray', value: 'xray' },
            { label: 'Other', value: 'other' },
          ],
        },
      ],
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
      name: 'followUpInstructions',
      type: 'textarea',
      admin: {
        condition: (data) => data.followUpRequired,
      },
    },
    {
      name: 'isConfidential',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'accessLevel',
      type: 'select',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Patient Only', value: 'patient' },
        { label: 'Medical Staff Only', value: 'staff' },
        { label: 'Restricted', value: 'restricted' },
      ],
      defaultValue: 'patient',
    },
  ],
};

export default MedicalRecords;