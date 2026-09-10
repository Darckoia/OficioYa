import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { VitrineForm } from '@/components/forms/VitrineForm';

vi.mock('sonner', () => ({
  toast: Object.assign(vi.fn(), {
    success: vi.fn(),
    error: vi.fn()
  })
}));

describe('VitrineForm', () => {
  it('shows zod errors and resets after a successful submit', async () => {
    render(<VitrineForm />);

    fireEvent.click(screen.getByRole('button', { name: /crear vitrina demo/i }));

    expect(await screen.findByText(/Ingresa el nombre del negocio/i)).toBeInTheDocument();
    expect(screen.getByText(/Usa solo números, espacios, \+ o guiones/i)).toBeInTheDocument();
    expect(screen.getByText(/Describe brevemente qué quieres vender/i)).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/Negocio/i), { target: { value: 'Ferretería Norte' } });
    fireEvent.change(screen.getByLabelText(/WhatsApp de ventas/i), { target: { value: '+56 9 1234 5678' } });
    fireEvent.change(screen.getByLabelText(/Objetivo comercial/i), {
      target: { value: 'Quiero mostrar packs con instalación incluida.' }
    });

    fireEvent.click(screen.getByRole('button', { name: /crear vitrina demo/i }));

    await waitFor(() => {
      expect(screen.queryByText(/Ingresa el nombre del negocio/i)).not.toBeInTheDocument();
    });

    expect(screen.getByLabelText(/Negocio/i)).toHaveValue('');
    expect(screen.getByLabelText(/WhatsApp de ventas/i)).toHaveValue('');
    expect(screen.getByLabelText(/Objetivo comercial/i)).toHaveValue('');
  });
});
