// src/app/page.js (or .jsx)
'use client';

import dynamic from 'next/dynamic';

const EnquiryForm = dynamic(() => import('../app/EnquiryForm/EnquiryForm'), {
  ssr: false, // ✅ Now this is allowed since we marked file as 'use client'
});

export default function HomePage() {
  return <EnquiryForm />;
}
