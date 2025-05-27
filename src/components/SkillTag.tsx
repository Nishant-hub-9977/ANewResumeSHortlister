import React from 'react';
import { X } from 'lucide-react';

interface SkillTagProps {
  skill: {
    id: string;
    name: string;
    isRequired?: boolean;
  };
  onRemove?: (id: string) => void;
  isEditable?: boolean;
}

const SkillTag: React.FC<SkillTagProps> = ({
  skill,
  onRemove,
  isEditable = true,
}) => {
  return (
    <div
      className={`inline-flex items-center rounded-full px-3 py-1 text-sm ${
        skill.isRequired
          ? 'bg-blue-100 text-blue-800'
          : 'bg-gray-100 text-gray-800'
      }`}
    >
      <span>{skill.name}</span>
      {isEditable && onRemove && (
        <button
          type="button"
          onClick={() => onRemove(skill.id)}
          className="ml-1.5 flex-shrink-0 h-4 w-4 rounded-full inline-flex items-center justify-center text-gray-500 hover:bg-gray-200 hover:text-gray-700"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default SkillTag;