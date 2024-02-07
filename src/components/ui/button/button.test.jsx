import { render, fireEvent } from '@testing-library/react';
import { Button } from './button';

describe('Button component', () => {
  it('should render button with text correctly', () => {
    const { getByText } = render(<Button>Click me</Button>);
    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('should render button without text correctly', () => {
    const { queryByText } = render(<Button />);
    expect(queryByText('')).toBeInTheDocument();
  });

  it('should render disabled button correctly', () => {
    const { getByRole } = render(<Button disabled>Disabled</Button>);
    expect(getByRole('button')).toBeDisabled();
  });

  it('should render loading button correctly', () => {
    const { getByTestId } = render(<Button loading>Loading...</Button>);
    expect(getByTestId('loader')).toBeInTheDocument();
  });

  it('should call callback function when button is clicked', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click me</Button>);
    fireEvent.click(getByText('Click me'));
    expect(onClick).toHaveBeenCalled();
  });
});