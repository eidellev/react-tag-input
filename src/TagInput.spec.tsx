import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { TagInput } from './TagInput';

describe('Tag input', () => {
  it('Should render without errors', () => {
    // eslint-disable-next-line
    render(<TagInput value={[]} onChange={() => {}} />);
  });

  it('Should render the value', async () => {
    const { findAllByTestId } = render(
      // eslint-disable-next-line
      <TagInput value={['first', 'second', 'third']} onChange={() => {}} />,
    );
    const tags = await findAllByTestId('tag');
    expect(tags.length).toBe(3);
  });

  it('Should render suggestion', async () => {
    const { findAllByTestId } = render(
      <TagInput
        value={['first', 'second', 'third']}
        // eslint-disable-next-line
        onChange={() => {}}
        options={['option1', 'option2']}
      />,
    );
    const tags = await findAllByTestId('option');
    expect(tags.length).toBe(2);
  });

  it('Should render suggestion', async () => {
    const { findAllByTestId } = render(
      <TagInput
        value={['first', 'second', 'third']}
        // eslint-disable-next-line
        onChange={() => {}}
        options={['option1', 'option2']}
      />,
    );
    const tags = await findAllByTestId('option');
    expect(tags.length).toBe(2);
  });

  it('Should insert a new tag when hitting enter', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<TagInput value={[]} onChange={onChange} />);
    const input = await findByTestId('new-tag-input');
    fireEvent.change(input, { target: { value: 'tag' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).toBeCalledWith(['tag']);
  });

  it('Should not insert the tag more than once', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<TagInput value={['tag']} onChange={onChange} />);
    const input = await findByTestId('new-tag-input');
    fireEvent.change(input, { target: { value: 'tag' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).not.toBeCalled();
  });

  it('Should not insert an empty tag', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<TagInput value={['tag']} onChange={onChange} />);
    const input = await findByTestId('new-tag-input');
    fireEvent.change(input, { target: { value: '' } });
    fireEvent.keyDown(input, { key: 'Enter' });

    expect(onChange).not.toBeCalled();
  });

  it('Should insert a new tag when hitting tab', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<TagInput value={[]} onChange={onChange} />);
    const input = await findByTestId('new-tag-input');
    fireEvent.change(input, { target: { value: 'tag' } });
    fireEvent.keyDown(input, { key: 'Tab' });

    expect(onChange).toBeCalledWith(['tag']);
  });

  it('Should remove a tag when hitting backspace', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<TagInput value={['tag']} onChange={onChange} />);
    const input = await findByTestId('new-tag-input');

    fireEvent.keyDown(input, { key: 'Backspace' });

    expect(onChange).toBeCalledWith([]);
  });

  it('Should remove a tag when clicking the "x" button', async () => {
    const onChange = jest.fn();
    const { findByTestId } = render(<TagInput value={['tag']} onChange={onChange} />);
    const button = await findByTestId('remove-tag-button');

    fireEvent.click(button);

    expect(onChange).toBeCalledWith([]);
  });
});
