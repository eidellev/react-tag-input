import React from 'react';
import './TagInput.css';

export interface TagInputProps {
  options?: string[];
  value: string[];
  className?: string;
}

export const TagInput: React.FunctionComponent<TagInputProps> = (props: TagInputProps) => {
  return (
    <div className="tag-input">
      <div className="nested"></div>
    </div>
  );
};
