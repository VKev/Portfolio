import { MapPin, Mail, Github, Linkedin, Facebook, Navigation, Calendar } from 'lucide-react';
import { translations, type Language } from '../constants/translations';
import avatarImage from '../assets/avatar.webp';

interface SidebarProps {
  lang?: Language;
}

const Sidebar: React.FC<SidebarProps> = ({ lang = 'en' }) => {
  const t = translations[lang].sidebar;

  return (
    <div className="h-full flex flex-col p-8 border-r border-gray-200 dark:border-gray-800 bg-white/10 dark:bg-black/10 backdrop-blur-[6px] relative transition-colors duration-300">
      <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-black dark:border-white/50 -translate-x-[1px] -translate-y-[1px] transition-colors" />
      <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-black dark:border-white/50 translate-x-[1px] -translate-y-[1px] transition-colors" />

      {/* Profile Image */}
      <div className="mb-8 flex justify-center">
        <div className="w-48 h-48 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-800 border-4 border-white dark:border-gray-700 shadow-lg relative transition-all duration-500">
          <img
            src={avatarImage}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold tracking-tighter mb-2 dark:text-white transition-colors">HUỲNH VƯƠNG KHANG (vkev)</h1>
        <div className="inline-block px-3 py-1 bg-gray-100 dark:bg-gray-800 uppercase text-xs tracking-widest text-gray-600 dark:text-gray-300 rounded-sm transition-colors">
          {t.role}
        </div>
      </div>

      {/* Info Section */}
      <div className="space-y-8 flex-1">
        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">{t.origin}</h3>
          <div className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 transition-colors">
            <MapPin size={16} />
            Vietnam
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">{t.location}</h3>
          <div className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 transition-colors">
            <Navigation size={16} />
            Ho Chi Minh City
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">{t.birth}</h3>
          <div className="flex items-center gap-2 text-sm font-medium dark:text-gray-200 transition-colors">
            <Calendar size={16} />
            Jun 24, 2004
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-2 tracking-wider">{t.contact}</h3>
          <a href="mailto:khanghv2406@gmail.com" className="flex items-center gap-2 text-sm font-medium hover:text-blue-600 dark:text-gray-200 dark:hover:text-white transition-colors">
            <Mail size={16} />
            khanghv2406@gmail.com
          </a>
        </div>

        {/* Education Section */}
        <div>
          <div className="uppercase text-xs font-bold text-gray-400 dark:text-gray-500 tracking-wider mb-2">{t.edu}</div>
          <div className="space-y-4">
            {t.edu_items.map((item, idx) => (
              <div key={idx} className="relative pl-4 border-l border-gray-200 dark:border-gray-800">
                <div className="absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full bg-black dark:bg-white ring-4 ring-white dark:ring-black"></div>
                <div className="text-[10px] font-bold text-gray-500 dark:text-gray-500 mb-0.5 transition-colors">{item.time}</div>
                <h4 className="font-bold text-sm leading-tight mb-0.5 dark:text-white transition-colors">{item.school}</h4>
                <div className="text-xs text-gray-600 dark:text-gray-400 transition-colors">{item.degree}</div>
                <div className="text-[10px] font-bold text-gray-500 dark:text-gray-500 mt-1 transition-colors">{item.gpa}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-4 mt-8 pt-8 border-t border-gray-100 dark:border-gray-800 justify-center transition-colors">
        <a href="https://github.com/VKev" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 transition-colors dark:text-white">
          <Github size={20} />
        </a>
        <a href="https://www.linkedin.com/in/khang-huynh-aa766b37b/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 transition-colors dark:text-white">
          <Linkedin size={20} />
        </a>
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="p-2 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700 transition-colors dark:text-white">
          <Facebook size={20} />
        </a>
      </div>

      <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-black dark:border-white/50 -translate-x-[1px] translate-y-[1px] transition-colors" />
      <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-black dark:border-white/50 translate-x-[1px] translate-y-[1px] transition-colors" />
    </div>
  );
};

export default Sidebar;
