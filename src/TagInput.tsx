import React, { useRef } from 'react';
import ColorHash from 'color-hash';
import './TagInput.css';

const colorHash = new ColorHash();
const completeKeys = ['Enter', 'Tab'];

export interface TagInputProps {
  /**
   * A list of autocomplete suggestion
   * @example ['work', 'personal', 'school']
   */
  options?: string[];
  /**
   * Current value
   * @example ['work', 'personal', 'school']
   */
  value: string[];
  /**
   * Apply a color to each tag based on a hash
   */
  colorize?: boolean;
  /**
   * Placeholder text
   */
  placeholder?: string;
  /**
   * Handle tag input changes
   */
  onChange: (value: string[]) => void;
}

/**
 * Tag input component
 * @example ```jsx
 <TagInput value={value} onChange={(newValue) => setValue(newValue)} options={['project X', 'project Y']} colorize placeholder="Enter a new tag" />
 ```
 */
export const TagInput: React.FunctionComponent<TagInputProps> = (props: TagInputProps) => {
  const { value = [], onChange, options = [], colorize, placeholder } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event;

    if (completeKeys.includes(key)) {
      const { value: newTagValue } = inputRef.current;

      if (!newTagValue.trim().length) {
        return;
      }

      event.preventDefault();

      if (value.includes(newTagValue)) {
        return;
      }

      inputRef.current.value = '';
      onChange([...value, newTagValue]);
    }

    if (key === 'Backspace') {
      const { value: newTagValue } = inputRef.current;

      if (!newTagValue.trim().length) {
        onChange(value.slice(0, value.length - 1));
      }
    }
  };

  function removeTag(removedTag: string) {
    onChange(value.filter((tag) => tag !== removedTag));
  }

  function focusOnInput() {
    inputRef.current.focus();
  }

  return (
    <div className="tag-input" onClick={focusOnInput}>
      {value?.map((tag) => (
        <span
          className="tag"
          key={tag}
          style={colorize ? { backgroundColor: colorHash.hex(tag) } : {}}
        >
          {tag}
          <button className="remove-tag-button" onClick={() => removeTag(tag)}>
            &times;
          </button>
        </span>
      ))}

      <input
        className="new-tag"
        type="text"
        onKeyDown={onKeyDown}
        ref={inputRef}
        list="tags"
        placeholder={placeholder}
      />

      <datalist id="tags">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </datalist>
    </div>
  );
};
