import './App.css';
import FlierGenerator from './features/flier/FlierGenerator';

const App = () => (
  <div className="min-h-screen bg-brand-paper py-12">
    <div className="mx-auto max-w-4xl px-4 text-center">
      <p className="text-xs font-bold tracking-[0.2em] text-brand-coral uppercase">
        I'll be attending
      </p>
      <h1 className="mt-2 font-display text-4xl font-extrabold text-brand-ink sm:text-5xl">
        Make your convention flier
      </h1>
      <p className="mt-3 text-brand-muted">
        Add your photo and name, then download it or share it straight to
        WhatsApp.
      </p>
    </div>

    <div className="mt-10 px-4">
      <FlierGenerator />
    </div>
  </div>
);

export default App;
