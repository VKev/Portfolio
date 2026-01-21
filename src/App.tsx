import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Background from './components/Background';
import Navbar from './components/Navbar';
import UnitySection from './components/UnitySection';
import type { Language } from './constants/translations';

type ViewState = 'home' | 'unity' | 'ai' | 'software';
type Theme = 'light' | 'dark';

function App() {
  // Initialize state from hash or default to 'home'
  const [currentView, setCurrentView] = useState<ViewState>(() => {
    const hash = window.location.hash.slice(1);
    if (hash === 'unity' || hash === 'ai' || hash === 'software') {
      return hash as ViewState;
    }
    return 'home';
  });

  const [theme, setTheme] = useState<Theme>('light');
  const [lang, setLang] = useState<Language>('en');

  // Sync hash with currentView
  useEffect(() => {
    const hash = currentView === 'home' ? '' : `#${currentView}`;
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    }
  }, [currentView]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (hash === 'unity' || hash === 'ai' || hash === 'software') {
        setCurrentView(hash as ViewState);
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'vi' : 'en');
  };

  return (
    <div className="min-h-screen text-black dark:text-white font-mono selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black p-4 md:p-12 relative overflow-hidden transition-colors duration-300">
      <Background theme={theme} />

      <Navbar
        currentView={currentView}
        onNavigate={setCurrentView}
        theme={theme}
        toggleTheme={toggleTheme}
        lang={lang}
        toggleLang={toggleLang}
      />

      {/* Top Bar - Simplified since Navbar takes prominence, but keeping metrics */}
      <div className="flex justify-end items-center text-xs tracking-wider text-gray-400 mb-8 uppercase relative z-10">
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline">SYS.ID: 8492</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Bio_Metrics: Normal</span>
          <div className="hidden md:block animate-pulse ml-4">
            /// ACCESSING_DATABASE: {currentView.toUpperCase()}
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto relative z-10 min-h-[600px]">
        {currentView === 'home' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Sidebar Column */}
            <div className="md:col-span-3">
              <Sidebar lang={lang} />
            </div>
            {/* Main Content Column */}
            <div className="md:col-span-9">
              <MainContent lang={lang} />
            </div>
          </div>
        )}

        {currentView === 'unity' && <UnitySection lang={lang} />}

        {currentView !== 'home' && currentView !== 'unity' && (
          <div className="flex flex-col items-center justify-center h-[500px] border border-gray-200 dark:border-gray-800 bg-white/10 dark:bg-black/10 backdrop-blur-[6px] p-12 transition-colors">
            <div className="text-4xl font-bold mb-4 uppercase tracking-tighter">
              {currentView.replace('-', ' ')}
            </div>
            <div className="text-gray-500 font-mono text-sm mb-8">
              &gt;_ MODULE_UNDER_CONSTRUCTION
            </div>
            <div className="w-16 h-1 bg-black dark:bg-white animate-pulse"></div>
          </div>
        )}
      </div>

      {/* Corner Brackets for whole page frame */}
      <div className="fixed top-0 left-0 w-8 h-8 pointer-events-none p-2 border-l-2 border-t-2 border-gray-200 dark:border-gray-800 z-20 transition-colors"></div>
      <div className="fixed top-0 right-0 w-8 h-8 pointer-events-none p-2 border-r-2 border-t-2 border-gray-200 dark:border-gray-800 z-20 transition-colors"></div>
      <div className="fixed bottom-0 left-0 w-8 h-8 pointer-events-none p-2 border-l-2 border-b-2 border-gray-200 dark:border-gray-800 z-20 transition-colors"></div>
      <div className="fixed bottom-0 right-0 w-8 h-8 pointer-events-none p-2 border-r-2 border-b-2 border-gray-200 dark:border-gray-800 z-20 transition-colors"></div>
    </div>
  );
}

export default App;
