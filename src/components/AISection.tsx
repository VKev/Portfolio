import { ArrowUpRight, BookOpen, Brain, Cpu, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { translations, type Language } from '../constants/translations';

interface AISectionProps {
    lang?: Language;
}

const focusIcons = [Sparkles, Brain, Cpu];

const getHalfText = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return '';
    const half = Math.max(1, Math.floor(trimmed.length / 2));
    const boundary = trimmed.lastIndexOf(' ', half);
    const end = boundary > 0 ? boundary : half;
    return trimmed.slice(0, end).trim();
};

const AISection: React.FC<AISectionProps> = ({ lang = 'en' }) => {
    const t = translations[lang].ai;
    const [expandedAbstracts, setExpandedAbstracts] = useState<Record<string, boolean>>({});
    const focusCount = t.focus.length;
    const focusCountLabel = focusCount < 10 ? `0${focusCount}` : `${focusCount}`;
    const techGroups = (t as { tech_groups?: { label: string; items: string[] }[] }).tech_groups;

    const toggleAbstract = (key: string) => {
        setExpandedAbstracts(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="space-y-10">
            <header className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 animate-fade-in">
                <div>
                    <h2 className="text-xl font-bold tracking-tighter uppercase transition-colors bg-black text-white dark:bg-white dark:text-black px-2 inline-block mb-1">
                        {t.header}
                    </h2>
                    <div className="text-xs text-gray-500 font-mono">{t.subheader}</div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {t.badges.map((badge: string) => (
                        <span
                            key={badge}
                            className="px-3 py-1 border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/30 text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-300"
                        >
                            {badge}
                        </span>
                    ))}
                </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                <div className="xl:col-span-5 space-y-8">
                    <section className="bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800 p-8 backdrop-blur-[6px] animate-slide-up">
                        <div>
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-1.5 h-6 bg-black dark:bg-white" />
                                    <h3 className="font-bold uppercase tracking-wider">{t.focus_title}</h3>
                                </div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                                    Tracks {focusCountLabel}
                                </div>
                            </div>
                            <div className="space-y-4">
                                {t.focus.map((item: { label: string; items: string[] }, index: number) => {
                                    const Icon = focusIcons[index % focusIcons.length];
                                    const indexLabel = index + 1 < 10 ? `0${index + 1}` : `${index + 1}`;
                                    return (
                                        <div
                                            key={item.label}
                                            className="group border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/30 p-4 transition-colors hover:border-black dark:hover:border-white"
                                        >
                                            <div className="flex items-center justify-between gap-4">
                                                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                                                    <span className="w-8 h-8 border border-gray-200 dark:border-gray-700 flex items-center justify-center text-[10px] font-bold text-gray-400 dark:text-gray-500">
                                                        {indexLabel}
                                                    </span>
                                                    <Icon size={14} />
                                                    {item.label}
                                                </div>
                                            </div>
                                            <div className="mt-3 flex flex-wrap gap-2">
                                                {item.items.map((entry) => (
                                                    <span
                                                        key={entry}
                                                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 bg-white/40 dark:bg-black/10"
                                                    >
                                                        {entry}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>

                    <section className="bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800 p-8 backdrop-blur-[6px] animate-slide-up">
                        <div className="flex items-center justify-between mb-6">
                            <div className="flex items-center gap-3">
                                <div className="w-1.5 h-6 bg-black dark:bg-white" />
                                <h3 className="font-bold uppercase tracking-wider">{t.tech_title}</h3>
                            </div>
                            <div className="w-2 h-2 rounded-full bg-black dark:bg-white animate-pulse transition-colors" />
                        </div>
                        {techGroups && techGroups.length > 0 ? (
                            <div className="space-y-4">
                                {techGroups.map(group => (
                                    <div key={group.label}>
                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">
                                            {group.label}
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {group.items.map(tech => (
                                                <span
                                                    key={tech}
                                                    className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-black/20 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 transition-colors hover:border-black dark:hover:border-white cursor-default"
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-wrap gap-2">
                                {t.tech_items.map((tech: string) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1.5 border border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-black/20 text-xs font-bold uppercase tracking-wider text-gray-600 dark:text-gray-300 transition-colors hover:border-black dark:hover:border-white cursor-default"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>
                </div>

                <div className="xl:col-span-7 space-y-6">
                    <section className="bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800 p-8 backdrop-blur-[6px] animate-slide-up">
                        <div className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-800">
                            <h3 className="font-bold uppercase tracking-wider">{t.papers_title}</h3>
                            <div className="text-xs text-gray-500 font-mono">{t.papers_subtitle}</div>
                        </div>
                        <div className="relative mt-8">
                            <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-200 dark:bg-gray-800" />
                            <div className="space-y-10">
                                {t.papers.map((paper: {
                                    id: string;
                                    period: string;
                                    venue: string;
                                    title: string;
                                    badges: string[];
                                    contributions: string[];
                                    code_url: string;
                                }, index: number) => {
                                    const paperKey = `${paper.id}-${index}`;
                                    const fullAbstract = paper.contributions.join(' ');
                                    const preview = getHalfText(fullAbstract);
                                    const isExpanded = Boolean(expandedAbstracts[paperKey]);
                                    const showEllipsis = !isExpanded && fullAbstract.length > preview.length;
                                    const displayText = isExpanded ? fullAbstract : preview;

                                    return (
                                        <article key={`${paper.title}-${index}`} className="relative pl-8">
                                            <div className="absolute left-[2px] top-6 w-2.5 h-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-black" />
                                            <div className="border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-black/30 p-6 transition-colors">
                                                <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                                                    <div>
                                                        <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                                                            {paper.venue}
                                                        </div>
                                                        <h4 className="mt-2 text-xl md:text-2xl font-bold dark:text-white transition-colors text-justify leading-snug">
                                                            {paper.title}
                                                        </h4>
                                                    </div>
                                                    <div className="flex flex-col items-start lg:items-end gap-2">
                                                        {paper.badges.map((badge) => (
                                                            <span
                                                                key={`${paper.title}-${badge}`}
                                                                className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-300 bg-white/60 dark:bg-black/20"
                                                            >
                                                                {badge}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                                                    <span>{paper.period}</span>
                                                    <span className="flex items-center gap-2">
                                                        <BookOpen size={14} />
                                                        {paper.id}
                                                    </span>
                                                </div>

                                                <div className="mt-4">
                                                    <div className="text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                                                        {t.details_contrib_title}
                                                    </div>
                                                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed text-justify">
                                                        {displayText}{showEllipsis ? '...' : ''}
                                                    </p>
                                                </div>

                                                <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                                                    <button
                                                        type="button"
                                                        onClick={() => toggleAbstract(paperKey)}
                                                        className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider px-3 py-2 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 bg-white/70 dark:bg-black/20 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                                                    >
                                                        {isExpanded ? t.view_less : t.view_more}
                                                    </button>
                                                    <a
                                                        href={paper.code_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black dark:text-white hover:gap-3 transition-all"
                                                    >
                                                        {t.code_label} <ArrowUpRight size={14} />
                                                    </a>
                                                </div>
                                            </div>
                                        </article>
                                    );
                                })}
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default AISection;
