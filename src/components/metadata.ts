// src/app/Metadata.tsx
'use client';

import { useEffect } from 'react';

interface MetadataProps {
  title: string;
  description: string;
}

const Metadata: React.FC<MetadataProps> = ({ title, description }) => {
  useEffect(() => {
    document.title = title;
    const metaDescription = document.querySelector("meta[name='description']");
    if (metaDescription) {
      metaDescription.setAttribute("content", description);
    }
  }, [title, description]);

  return null; // This component does not render anything
};

export default Metadata;