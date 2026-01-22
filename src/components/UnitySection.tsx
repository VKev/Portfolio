import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ArrowRight, User, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { translations, type Language } from '../constants/translations';
import tempusia1 from '../assets/tempusia1.webp';
import tempusia2 from '../assets/tempusia2.webp';
import tempusia3 from '../assets/tempusia3.webp';
import tempusia4 from '../assets/tempusia4.webp';
import footReplacement1 from '../assets/FootReplacement1.webp';
import footReplacement2 from '../assets/FootReplacement2.webp';
import storygame1 from '../assets/storygame1.webp';
import storygame2 from '../assets/storygame2.webp';
import storygame3 from '../assets/storygame3.webp';
import storygame4 from '../assets/storygame4.webp';
import storygame5 from '../assets/storygame5.webp';
import storygame6 from '../assets/storygame6.webp';
import storygame8 from '../assets/storygame8.webp';
import storygame9 from '../assets/storygame9.webp';
import battleground1 from '../assets/battleground1.webp';
import battleground2 from '../assets/battleground2.webp';
import shadercode1 from '../assets/shadercode1.webp';
import shadercode2 from '../assets/shadercode2.webp';
import shadercode3 from '../assets/shadercode3.webp';
import shadercode4 from '../assets/shadercode4.webp';
import shadercode5 from '../assets/shadercode5.webp';

const LIGHTBOX_CACHE_KEY = 'unity-lightbox-cache-v1';
const MAX_CACHE_ENTRIES = 15;
const MAX_CACHE_ITEM_BYTES = 800 * 1024; // keep entries modest to avoid localStorage overflow

interface UnitySectionProps {
    lang?: Language;
}

interface Project {
    id: string;
    category: 'GAME' | 'COMMUNITY';
    quarter: string;
    year: string;
    image: string;
    link: string;
    tags: string[];
    title?: string;
    desc?: string;
    description?: string;
    role?: string;
    gallery?: string[];
}

type CacheEntry = {
    dataUrl: string;
    size: number;
    ts: number;
};

const readCache = (): Record<string, CacheEntry> => {
    if (typeof window === 'undefined') return {};
    try {
        const raw = window.localStorage.getItem(LIGHTBOX_CACHE_KEY);
        return raw ? JSON.parse(raw) : {};
    } catch (error) {
        console.warn('Lightbox cache read failed', error);
        return {};
    }
};

const writeCache = (cache: Record<string, CacheEntry>) => {
    if (typeof window === 'undefined') return;
    try {
        const entries = Object.entries(cache).sort((a, b) => b[1].ts - a[1].ts);
        const trimmed = Object.fromEntries(entries.slice(0, MAX_CACHE_ENTRIES));
        window.localStorage.setItem(LIGHTBOX_CACHE_KEY, JSON.stringify(trimmed));
    } catch (error) {
        console.warn('Lightbox cache write failed', error);
    }
};

const blobToDataUrl = (blob: Blob): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result as string);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });

const resolveCachedSrc = async (
    src: string,
    cache: Record<string, CacheEntry>
): Promise<{ updatedCache: Record<string, CacheEntry>; resolvedSrc: string }> => {
    if (cache[src]) {
        return { updatedCache: cache, resolvedSrc: cache[src].dataUrl };
    }

    try {
        const response = await fetch(src, { cache: 'force-cache' });
        const blob = await response.blob();
        if (blob.size > MAX_CACHE_ITEM_BYTES) {
            return { updatedCache: cache, resolvedSrc: src };
        }
        const dataUrl = await blobToDataUrl(blob);
        const nextCache = {
            ...cache,
            [src]: { dataUrl, size: blob.size, ts: Date.now() },
        };
        writeCache(nextCache);
        return { updatedCache: nextCache, resolvedSrc: dataUrl };
    } catch (error) {
        console.warn('Image cache fetch failed', error);
        return { updatedCache: cache, resolvedSrc: src };
    }
};

// Static data structure for props that don't need translation
const staticProjectData: Project[] = [
    {
        id: 'tempusia',
        category: 'GAME',
        quarter: 'Q2',
        year: '2022',
        image: tempusia1,
        link: 'https://store.steampowered.com/app/2054730/Tempusia/',
        tags: ['Design Pattern', 'Scriptable Render Pipeline', 'Scriptable Objects', 'State Machines', 'Procedural Animation', 'Shader Graph', 'Cinemachine', 'Input System'],
        gallery: [tempusia1, tempusia2, tempusia3, tempusia4]
    },
    {
        id: 'story-game',
        category: 'GAME',
        quarter: 'Q4',
        year: '2024',
        image: storygame1,
        link: 'https://github.com/VKev/Unity-Phong-Bac-Story-Game',
        tags: ['Cinemachine', 'URP', 'Volumetric Fog', 'Outline Shader', 'Design Pattern', 'Input System', 'Rigging', 'Procedural Animation', 'Audio Mixer', 'UI/UX'],
        gallery: [storygame1, storygame2, storygame3, storygame4, storygame5, storygame6, storygame8, storygame9]
    },
    {
        id: 'battleground',
        category: 'GAME',
        quarter: 'Q3',
        year: '2024',
        image: battleground1,
        link: '#',
        tags: ['Netcode', 'Particle System', 'VFX Graph', 'GPU Instancing', 'Terrain', 'State Machines'],
        gallery: [battleground1, battleground2]
    },
    {
        id: 'procedural',
        category: 'COMMUNITY',
        quarter: 'Q2',
        year: '2023',
        image: footReplacement1,
        link: 'https://github.com/VKev/Unity-Procedural-Animation/tree/main',
        tags: ['Procedural Animation', 'Rigging', 'State Machine', 'Inverse Kinematics'],
        gallery: [footReplacement1, footReplacement2]
    },
    {
        id: 'shader-code',
        category: 'COMMUNITY',
        quarter: 'Q3',
        year: '2023',
        image: shadercode1,
        link: 'https://github.com/VKev/Unity-URP-Shaders-Code',
        tags: ['HLSL', 'Scriptable Render Pipeline', 'Stylized Grass', 'Toon Shader', 'Outline Shader', 'Water Shader', 'Tesselation', 'Reflection Probe', 'Baking Light'],
        gallery: [shadercode1, shadercode2, shadercode3, shadercode4, shadercode5]
    }
];

const ProjectTags = ({ tags }: { tags: string[] }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const displayedTags = isExpanded ? tags : tags.slice(0, 4);
    const hasMore = tags.length > 4;

    return (
        <div className="flex flex-wrap gap-2">
            {displayedTags.map(tag => (
                <span key={tag} className="text-[10px] font-mono border border-gray-200 dark:border-gray-800 px-2 py-1 text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/50">
                    {tag}
                </span>
            ))}
            {!isExpanded && hasMore && (
                <button
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsExpanded(true);
                    }}
                    className="text-[10px] font-bold border border-gray-200 dark:border-gray-800 px-2 py-1 text-black dark:text-white bg-gray-200 dark:bg-gray-800 hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors"
                >
                    +{tags.length - 4} MORE
                </button>
            )}
        </div>
    );
};

const Lightbox = ({ images, onClose, isOpen }: { images: string[], onClose: () => void, isOpen: boolean }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [resolvedImages, setResolvedImages] = useState<string[]>(images);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
            if (e.key === 'ArrowRight') setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
        };

        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, images.length]);

    useEffect(() => {
        // Reset index when a new gallery opens to avoid stale index pointing past array bounds
        if (isOpen) {
            setCurrentIndex(0);
        }
    }, [images, isOpen]);

    useEffect(() => {
        let mounted = true;

        // Reset to initial images immediately to avoid showing stale images from previous gallery
        setResolvedImages(images);

        if (!isOpen || images.length === 0) {
            return () => {
                mounted = false;
            };
        }

        const hydrate = async () => {
            let cache = readCache();
            const results: string[] = [];
            for (const src of images) {
                // eslint-disable-next-line no-await-in-loop
                const { updatedCache, resolvedSrc } = await resolveCachedSrc(src, cache);
                cache = updatedCache;
                results.push(resolvedSrc);
            }
            if (mounted) {
                setResolvedImages(results);
            }
        };

        hydrate();

        return () => {
            mounted = false;
        };
    }, [images, isOpen]);

    if (!isOpen) return null;
    if (typeof document === 'undefined') return null;

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4">
            <button onClick={onClose} className="absolute top-4 right-4 text-white hover:text-gray-300 z-50">
                <X size={32} />
            </button>

            <button
                onClick={() => setCurrentIndex(prev => (prev === 0 ? images.length - 1 : prev - 1))}
                className="absolute left-4 text-white hover:text-gray-300 z-50 p-2"
            >
                <ChevronLeft size={48} />
            </button>

            <img
                src={resolvedImages[currentIndex] || images[currentIndex]}
                alt={`Slide ${currentIndex + 1}`}
                className="max-w-full max-h-[90vh] object-contain select-none"
            />

            <button
                onClick={() => setCurrentIndex(prev => (prev === images.length - 1 ? 0 : prev + 1))}
                className="absolute right-4 text-white hover:text-gray-300 z-50 p-2"
            >
                <ChevronRight size={48} />
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full ${idx === currentIndex ? 'bg-white' : 'bg-white/30'} cursor-pointer`}
                        onClick={() => setCurrentIndex(idx)}
                    />
                ))}
            </div>
        </div>,
        document.body
    );
};

// Helper component
const ProjectCard = ({ project, t, openLightbox, isReversed }: { project: Project, t: any, openLightbox: (g: string[]) => void, isReversed: boolean }) => {
    return (
        <div className="relative flex flex-col md:flex-row gap-8 mb-12">
            <div className="md:w-[110px] flex-shrink-0 flex md:flex-col md:items-end justify-start md:pt-8 relative pl-6 md:pl-0 z-10">
                <div className="absolute left-[3px] md:left-auto md:right-[-5px] top-[5px] md:top-[38px] w-[11px] h-[11px] rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 z-10 box-border" />
                <div className="text-xs font-bold text-gray-400 dark:text-gray-500 text-right pr-4 md:pr-6">
                    <span className="block">{project.quarter}</span>
                    <span className="block">{project.year}</span>
                </div>
            </div>

            <div className="flex-1">
                <div
                    className="bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800 hover:border-black dark:hover:border-white transition-all duration-300 group"
                    style={{ backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
                >
                    <div className={`flex flex-col ${isReversed ? 'md:flex-row-reverse' : 'md:flex-row'}`}>
                        <div
                            className={`w-full md:w-2/5 aspect-video md:aspect-auto relative overflow-hidden bg-gray-100 dark:bg-gray-900 ${isReversed ? 'md:border-l' : 'md:border-r'} border-b md:border-b-0 border-gray-100 dark:border-gray-800 cursor-pointer`}
                            onClick={() => openLightbox(project.gallery || [])}
                        >
                            <img
                                src={project.image}
                                alt={project.title}
                                className="w-full h-full object-cover transition-all duration-700 hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                                {project.gallery && (
                                    <span className="bg-black/50 text-white px-3 py-1 text-xs font-bold uppercase backdrop-blur-sm border border-white/20">
                                        View Gallery
                                    </span>
                                )}
                            </div>
                        </div>

                        <div className="flex-1 p-6 flex flex-col">
                            <div className="flex justify-between items-start mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 bg-black dark:bg-white" />
                                    <h3 className="text-xl font-bold uppercase tracking-tight dark:text-white transition-colors">
                                        {project.title}
                                    </h3>
                                </div>
                                <span className="text-[10px] font-bold border border-gray-200 dark:border-gray-700 px-2 py-1 uppercase text-gray-500 dark:text-gray-400">
                                    {project.category}
                                </span>
                            </div>

                            <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6 flex-1">
                                {project.description || project.desc}
                            </p>

                            <div className="flex items-center gap-2 text-xs font-bold text-gray-400 dark:text-gray-500 uppercase mb-6">
                                <User size={12} />
                                <span>{project.role}</span>
                            </div>

                            <div className="flex flex-col md:flex-row justify-between items-end gap-4 mt-auto">
                                <ProjectTags tags={project.tags} />
                                <a
                                    href={project.link}
                                    className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider hover:gap-3 transition-all dark:text-white"
                                >
                                    {t.view} <ArrowRight size={16} />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UnitySection: React.FC<UnitySectionProps> = ({ lang = 'en' }) => {
    const t = translations[lang].unity;
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentGallery, setCurrentGallery] = useState<string[]>([]);

    // Merge static data with translated data
    const projects = staticProjectData.map((p, i) => {
        const translated = t.projects[i];
        return { ...p, ...translated };
    });

    const openLightbox = (gallery: string[]) => {
        if (gallery && gallery.length > 0) {
            setCurrentGallery(gallery);
            setLightboxOpen(true);
        }
    };

    return (
        <div className="h-full">
            <Lightbox
                key={currentGallery && currentGallery.length > 0 ? currentGallery[0] : 'empty'}
                isOpen={lightboxOpen}
                onClose={() => {
                    setLightboxOpen(false);
                    setCurrentGallery([]);
                }}
                images={currentGallery}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h2 className="text-xl font-bold tracking-tighter uppercase transition-colors bg-black text-white dark:bg-white dark:text-black px-2 inline-block mb-1">
                        {t.header}
                    </h2>
                    <div className="text-xs text-gray-500 font-mono">{t.subheader}</div>
                </div>
            </div>

            <div className="relative">
                {/* Vertical Timeline Axis (Background) */}
                <div className="absolute left-[8px] md:left-[110px] top-0 bottom-0 w-[1px] bg-gray-200 dark:bg-gray-800 transition-colors" />

                <div className="space-y-12">
                    {/* GAMES SECTION */}
                    {projects.filter(p => p.category === 'GAME').length > 0 && (
                        <div className="mb-16">
                            <div className="flex md:flex-row gap-8 mb-8">
                                <div className="md:w-[110px] flex-shrink-0 flex justify-end relative z-10"></div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold uppercase tracking-tight dark:text-gray-200 text-gray-800 border-b border-gray-200 dark:border-gray-800 pb-2">
                                        {t.games_title}
                                    </h3>
                                </div>
                            </div>

                            {projects.filter(p => p.category === 'GAME').map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    t={t}
                                    openLightbox={openLightbox}
                                    isReversed={index % 2 === 0}
                                />
                            ))}
                        </div>
                    )}

                    {/* COMMUNITY PROJECTS SECTION */}
                    {projects.filter(p => p.category === 'COMMUNITY').length > 0 && (
                        <div className="mb-16">
                            <div className="flex md:flex-row gap-8 mb-8">
                                <div className="md:w-[110px] flex-shrink-0 flex justify-end relative z-10"></div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold uppercase tracking-tight dark:text-gray-200 text-gray-800 border-b border-gray-200 dark:border-gray-800 pb-2">
                                        {t.community_title}
                                    </h3>
                                </div>
                            </div>

                            {projects.filter(p => p.category === 'COMMUNITY').map((project, index) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    t={t}
                                    openLightbox={openLightbox}
                                    isReversed={index % 2 !== 0}
                                />
                            ))}
                        </div>
                    )}

                    {/* Present Day Marker */}
                    <div className="relative flex md:flex-row gap-8">
                        <div className="md:w-[110px] flex-shrink-0 flex justify-end relative z-10">
                            <div className="absolute left-[3px] md:left-auto md:right-[-5px] top-0 w-[11px] h-[11px] rounded-full border-2 border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 z-10" />
                        </div>
                        <div className="flex-1">
                            <div className="text-xs font-bold text-gray-300 dark:text-gray-600 uppercase tracking-widest pl-8 md:pl-0">
                                {t.next}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};



export default UnitySection;
