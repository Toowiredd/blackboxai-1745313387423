import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { Wizard } from './components/wizard/Wizard';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showWizard, setShowWizard] = useState(false);

  // Check system preference for dark mode
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-royal-marine text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Activity Guide Generator</h1>
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {showWizard ? (
          <Wizard />
        ) : (
          <div className="max-w-4xl mx-auto">
            <div className="card">
              <h2 className="text-2xl font-semibold mb-4">Welcome to Activity Guide Generator</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Create accurate, step-by-step activity guides through our conversational interface.
                Every guide includes verified information with proper citations.
              </p>
              <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row">
                <button 
                  onClick={() => setShowWizard(true)}
                  className="btn-primary"
                >
                  Create New Guide
                </button>
                <button className="btn-secondary">
                  Browse Templates
                </button>
              </div>
            </div>

            {/* Features Section */}
            <div className="mt-12 grid md:grid-cols-2 gap-6">
              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Verified Information</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Every fact in your guide comes with a citation and last-checked date.
                </p>
              </div>
              <div className="card">
                <h3 className="text-lg font-semibold mb-2">Easy to Follow</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Step-by-step instructions with clear formatting and print-ready layout.
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-royal-marine text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 Ty / 88 Dimensions, CC-BY-SA for end-users</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
