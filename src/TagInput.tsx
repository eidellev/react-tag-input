import React, { useRef } from 'react';
import ColorHash from 'color-hash';
import './TagInput.css';

const colorHash = new ColorHash();
const defaultCompleteKeys = ['Enter', 'Tab', ','];

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
   * Keys that create a new tag
   */
  completeKeys?: string[];
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
  const {
    value = [],
    onChange,
    options = [],
    colorize,
    placeholder,
    completeKeys = defaultCompleteKeys,
  } = props;
  const inputRef = useRef<HTMLInputElement>(null);
  const onKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    const { key } = event;

    if (completeKeys.includes(key)) {
      let { value: newTagValue } = inputRef.current;
      newTagValue = newTagValue.trim();

      event.preventDefault();

      if (!newTagValue.length) {
        return;
      }

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
          data-testid="tag"
          key={tag}
          style={colorize ? { backgroundColor: colorHash.hex(tag) } : {}}
        >
          {tag}
          <button
            data-testid="remove-tag-button"
            className="remove-tag-button"
            onClick={() => removeTag(tag)}
          >
            &times;
          </button>
        </span>
      ))}

      <input
        data-testid="new-tag-input"
        className="new-tag"
        type="text"
        onKeyDown={onKeyDown}
        ref={inputRef}
        list="tags"
        placeholder={placeholder}
      />

      <datalist id="tags">
        {options.map((option) => (
          <option key={option} value={option} data-testid="option">
            {option}
          </option>
        ))}
      </datalist>
    </div>
  );
};
