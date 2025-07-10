import { CollectionConfig } from 'payload/types';

const CMSContent: CollectionConfig = {
  slug: 'cms-content',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'type', 'isActive', 'updatedAt'],
  },
  access: {
    create: ({ req: { user } }) => user?.role === 'admin',
    read: () => true,
    update: ({ req: { user } }) => user?.role === 'admin',
    delete: ({ req: { user } }) => user?.role === 'admin',
  },
  fields: [
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
        { label: 'Hero Section', value: 'hero' },
        { label: 'About Section', value: 'about' },
        { label: 'Services Section', value: 'services' },
        { label: 'Contact Section', value: 'contact' },
        { label: 'Footer Section', value: 'footer' },
        { label: 'Testimonials', value: 'testimonials' },
        { label: 'FAQ', value: 'faq' },
        { label: 'News/Blog', value: 'news' },
        { label: 'Emergency Info', value: 'emergency' },
      ],
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      maxLength: 200,
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
      name: 'ctaButton',
      type: 'group',
      fields: [
        {
          name: 'text',
          type: 'text',
        },
        {
          name: 'url',
          type: 'text',
        },
        {
          name: 'style',
          type: 'select',
          options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Secondary', value: 'secondary' },
            { label: 'Outline', value: 'outline' },
          ],
          defaultValue: 'primary',
        },
      ],
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        description: 'Additional metadata for the content section',
      },
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
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

export default CMSContent;