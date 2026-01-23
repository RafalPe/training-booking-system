import BookingPage from './pages/BookingPage';
import { ToastProvider } from './context/ToastContext';

function App() {
  return (
    <ToastProvider>
      <main className="flex min-h-screen justify-center px-4 py-20">
        <BookingPage />
      </main>
    </ToastProvider>
  );
}

export default App;
