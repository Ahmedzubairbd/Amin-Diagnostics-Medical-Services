import { buildConfig } from 'payload/config';
import { webpackBundler } from '@payloadcms/bundler-webpack';
import { mongooseAdapter } from '@payloadcms/db-mongodb';
import { slateEditor } from '@payloadcms/richtext-slate';
import path from 'path';

// Collections
import Users from './app/collections/Users';
import Patients from './app/collections/Patients';
import Doctors from './app/collections/Doctors';
import Appointments from './app/collections/Appointments';
import MedicalRecords from './app/collections/MedicalRecords';
import TestResults from './app/collections/TestResults';
import Prescriptions from './app/collections/Prescriptions';
import Services from './app/collections/Services';
import CMSContent from './app/collections/CMSContent';
import Districts from './app/collections/Districts';
import Facilities from './app/collections/Facilities';

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- Amin Portal CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
  },
  editor: slateEditor({}),
  collections: [
    Users,
    Patients,
    Doctors,
    Appointments,
    MedicalRecords,
    TestResults,
    Prescriptions,
    Services,
    CMSContent,
    Districts,
    Facilities,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || 'mongodb://localhost:27017/healthcare-cms',
  }),
  cors: ['http://localhost:3000', 'https://your-domain.com'],
  csrf: ['http://localhost:3000', 'https://your-domain.com'],
});
