import React from 'react';
import { Building, Code, Utensils, Wrench } from 'lucide-react';

interface CompanyIconProps {
  category: 'tech' | 'web' | 'food' | 'auto';
  className?: string;
}

const CompanyIcon: React.FC<CompanyIconProps> = ({ category, className = '' }) => {
  const iconProps = { className: `h-6 w-6 mr-2 text-gray-500 ${className}` };
  switch (category) {
    case 'tech': return <Building {...iconProps} />;
    case 'web': return <Code {...iconProps} />;
    case 'food': return <Utensils {...iconProps} />;
    case 'auto': return <Wrench {...iconProps} />;
    default: return <Building {...iconProps} />;
  }
};

export default CompanyIcon; 