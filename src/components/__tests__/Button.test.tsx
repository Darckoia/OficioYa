import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from '@/components/common/Button';

describe('Button', () => {
  it('triggers the click handler', () => {
    const handleClick = vi.fn();

    render(<Button onClick={handleClick}>Acción</Button>);

    fireEvent.click(screen.getByRole('button', { name: 'Acción' }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
