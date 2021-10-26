import React from 'react';
import { render } from '@testing-library/react';
import { TagInput } from './TagInput';

describe('Tag input', () => {
  it('Should render without errors', () => {
    // eslint-disable-next-line
    render(<TagInput value={[]} onChange={() => {}} />);
  });
});
