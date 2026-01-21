import { Award, Circle, ArrowRight, Globe, ChevronDown, Trophy } from 'lucide-react';
import { translations, type Language } from '../constants/translations';
import { useState } from 'react';

interface MainContentProps {
    lang?: Language;
}

const MainContent: React.FC<MainContentProps> = ({ lang = 'en' }) => {
    const t = translations[lang].home;
    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full">
            {/* Left Column: Intro + Hobbies */}
            <div className="lg:col-span-2 flex flex-col gap-8">
                {/* Intro Section */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-12 relative group hover:shadow-lg transition-all duration-300">
                    <div className="text-sm font-mono mb-4 text-gray-500 dark:text-gray-400">
                        {t.intro.init}
                    </div>
                    <h2 className="text-6xl font-black tracking-tighter mb-2 dark:text-white transition-colors">
                        {t.intro.hello}
                    </h2>
                    <h2 className="text-6xl font-black tracking-tighter text-gray-300 dark:text-gray-600 mb-8 transition-colors">
                        {t.intro.world}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed mb-8 transition-colors">
                        {t.intro.desc}
                    </p>
                    <div className="flex gap-4">
                        <a href="#" className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-xs font-bold uppercase tracking-wider backdrop-blur-md dark:text-gray-200 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                            {t.intro.badge1}
                        </a>
                        <a href="#" className="px-4 py-2 border border-gray-200 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50 text-xs font-bold uppercase tracking-wider backdrop-blur-md dark:text-gray-200 transition-colors hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black">
                            {t.intro.badge2}
                        </a>
                    </div>
                </div>

                {/* Hobbies Section */}
                <div className="flex flex-col gap-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Hobby 1 */}
                        {/* Hobby 1 */}
                        <a href="https://www.linkedin.com/in/khang-huynh-aa766b37b/details/certifications/" target="_blank" rel="noopener noreferrer" className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-6 relative hover:border-black dark:hover:border-white transition-colors group block">
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t.hobbies.h1_label}</span>
                                <Award className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white transition-colors">{t.hobbies.h1_title}</h3>

                            <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wider group-hover:gap-3 transition-all">
                                {t.hobbies.view_cert} <ArrowRight size={14} />
                            </div>
                        </a>

                        {/* Hobby 2 */}
                        <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-6 relative hover:border-black dark:hover:border-white transition-colors group">
                            <div className="flex justify-between items-start mb-12">
                                <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t.hobbies.h2_label}</span>
                                <Globe className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 dark:text-white transition-colors">{t.hobbies.h2_title}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors whitespace-pre-wrap">{t.hobbies.h2_desc}</p>
                        </div>
                    </div>

                    {/* Hobby 3 - Full Width - Dropdown */}
                    <div
                        className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-6 relative hover:border-black dark:hover:border-white transition-colors group cursor-pointer"
                        onClick={() => setIsExpanded(!isExpanded)}
                    >
                        <div className="flex justify-between items-start mb-4">
                            <span className="text-xs font-bold text-gray-400 dark:text-gray-500 uppercase">{t.hobbies.h3_label}</span>
                            <div className="flex gap-4">
                                <Trophy className="text-gray-400 group-hover:text-black dark:group-hover:text-white transition-colors" />
                                <ChevronDown className={`text-gray-400 group-hover:text-black dark:group-hover:text-white transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                            </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 dark:text-white transition-colors">{t.hobbies.h3_title}</h3>

                        <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                            <ul className="list-disc pl-5 space-y-2">
                                {(t.hobbies as any).h3_items?.map((item: { text: string, link: string }, idx: number) => (
                                    <li key={idx} className="text-sm text-gray-600 dark:text-gray-400 transition-colors leading-relaxed">
                                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="hover:text-black dark:hover:text-white hover:underline transition-colors">
                                            {item.text}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Column: Tech Stack + Experience Log */}
            <div className="lg:col-span-1 flex flex-col gap-8">
                {/* Tech Stack */}
                {/* Tech Stack */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-8 shadow-sm transition-colors">
                    <div className="mb-6 dark:text-white transition-colors">
                        <h3 className="font-bold uppercase tracking-wider">{t.tech}</h3>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {['C#', '.NET', 'Unity', 'Python', 'PyTorch', 'AWS', 'Cloudflare', 'TypeScript', 'HLSL', 'Git', 'CI/CD', 'Docker', 'Terraform'].map((tech) => (
                            <span key={tech} className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 transition-colors hover:border-black dark:hover:border-white cursor-default">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>



                {/* Experience Log */}
                <div className="bg-white/10 dark:bg-black/10 backdrop-blur-[6px] border border-gray-200 dark:border-gray-800 p-8 flex-1 transition-colors">
                    <div className="flex justify-between items-center mb-8 dark:text-white transition-colors">
                        <h3 className="font-bold uppercase tracking-wider">{t.exp}</h3>
                        <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse transition-colors" />
                    </div>

                    <div className="relative pl-4 border-l border-gray-200 dark:border-gray-800 space-y-12 transition-colors">
                        {t.exp_items.map((item, idx) => (
                            <div key={idx} className="relative">
                                <div className="absolute -left-[21px] top-1 bg-white dark:bg-black p-1 transition-colors">
                                    <Circle size={10} className={`text-gray-300 dark:text-gray-700 transition-colors ${idx === 0 ? 'fill-white dark:fill-black stroke-black dark:stroke-white' : ''}`} />
                                </div>
                                <div className="text-xs font-bold text-gray-500 dark:text-gray-500 mb-1 transition-colors">{item.time}</div>
                                <h4 className="font-bold text-lg leading-none mb-1 dark:text-white transition-colors">{item.role}</h4>
                                <div className="text-sm text-gray-500 dark:text-gray-400 mb-3 transition-colors">{item.company}</div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed transition-colors">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainContent;
