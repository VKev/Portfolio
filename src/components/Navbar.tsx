import React from 'react';
import { Sun, Moon, Globe } from 'lucide-react';
import { translations, type Language } from '../constants/translations';

type NavItem = 'home' | 'unity' | 'ai' | 'software';

interface NavbarProps {
    currentView: NavItem;
    onNavigate: (view: NavItem) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
    lang: Language;
    toggleLang: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate, theme, toggleTheme, lang, toggleLang }) => {
    const t = translations[lang].nav;

    const navItems: { id: NavItem; label: string }[] = [
        { id: 'home', label: t.home },
        { id: 'unity', label: t.unity },
        { id: 'ai', label: t.ai },
        { id: 'software', label: t.software },
    ];

    return (
        <nav className="flex flex-col md:flex-row justify-between items-center mb-12 border-b border-gray-200 dark:border-gray-800 pb-4 pt-4 md:pt-0 relative z-20 bg-white/10 dark:bg-black/10 backdrop-blur-[6px] transition-colors duration-300">
            <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="flex items-center gap-2 font-bold text-xl tracking-tighter">
                    <span className="dark:text-white transition-colors">PORTFOLIO</span>
                </div>

                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                    aria-label="Toggle Theme"
                >
                    {theme === 'light' ? <Moon size={16} /> : <Sun size={16} className="text-white" />}
                </button>

                {/* Language Toggle */}
                <button
                    onClick={toggleLang}
                    className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider hover:bg-gray-200 dark:hover:bg-gray-800 px-2 py-1 rounded transition-colors dark:text-white"
                    aria-label="Toggle Language"
                >
                    <Globe size={14} />
                    <span>{lang}</span>
                </button>
            </div>

            <div className="flex gap-1 md:gap-8 overflow-x-auto max-w-full pb-2 md:pb-0">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`
              text-xs md:text-sm font-bold uppercase tracking-wider px-3 py-2 transition-all relative whitespace-nowrap
              ${currentView === item.id
                                ? 'text-black dark:text-white'
                                : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
                            }
            `}
                    >
                        {currentView === item.id && (
                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-1 bg-black dark:bg-white rounded-full -ml-2 transition-colors"></span>
                        )}
                        {item.label}
                        {currentView === item.id && (
                            <span className="absolute inset-x-0 bottom-0 h-[2px] bg-black dark:bg-white transition-colors"></span>
                        )}
                    </button>
                ))}
            </div>

            <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                {t.status}
            </div>
        </nav>
    );
};

export default Navbar;
