import { useMemo, useRef, useState, useEffect } from 'react';
import { Lock, Map as MapIcon, X, Loader2, Activity, Maximize2, Filter, DownloadCloud } from 'lucide-react';
import maplibregl from 'maplibre-gl';
import maplibreWorkerUrl from 'maplibre-gl/dist/maplibre-gl-csp-worker.js?url';

import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Background from './components/Background';
import Navbar from './components/Navbar';
import UnitySection from './components/UnitySection';
import AISection from './components/AISection';
import type { Language } from './constants/translations';

type ViewState = 'home' | 'unity' | 'ai' | 'software';
type Theme = 'light' | 'dark';

const VIEW_COUNTER_BASE_URL = 'https://view-counter.vmktither.workers.dev';
const VIEW_COUNTER_NAMESPACE = import.meta.env.VITE_VIEW_NAMESPACE ?? 'vkev-portfolio';
const VIEW_COUNTER_STORAGE_PREFIX = 'view-hit';
const VIEW_AUTH_STORAGE_KEY = `view-auth:${VIEW_COUNTER_NAMESPACE}`;
const OPENFREEMAP_STYLE_URL = 'https://tiles.openfreemap.org/styles/liberty';

if (typeof window !== 'undefined') {
  maplibregl.setWorkerUrl(maplibreWorkerUrl);
}



type StoredViewCount = {
  counted: boolean;
  ts: number;
};

type StoredAuth = {
  token: string;
  expiresAt: number;
};

type ViewPoint = {
  id: string;
  ip: string | undefined;
  lat: number;
  lon: number;
  count?: number;
  city?: string;
  region?: string;
  country?: string;
  timestamp?: string;
  raw: Record<string, unknown>;
};

const parseNumber = (value: unknown) => {
  if (typeof value === 'number' && Number.isFinite(value)) return value;
  if (typeof value === 'string') {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
};

const toLatLon = (view: Record<string, unknown>) => {
  const candidates = [
    view.lat, view.latitude,
    (view.location as Record<string, unknown> | undefined)?.lat,
    (view.location as Record<string, unknown> | undefined)?.latitude,
    (view.geo as Record<string, unknown> | undefined)?.lat,
    (view.geo as Record<string, unknown> | undefined)?.latitude,
    (view.coords as Record<string, unknown> | undefined)?.lat,
    (view.coords as Record<string, unknown> | undefined)?.latitude,
  ];
  const lonCandidates = [
    view.lon, view.lng, view.long, view.longitude,
    (view.location as Record<string, unknown> | undefined)?.lon,
    (view.location as Record<string, unknown> | undefined)?.lng,
    (view.location as Record<string, unknown> | undefined)?.longitude,
    (view.geo as Record<string, unknown> | undefined)?.lon,
    (view.geo as Record<string, unknown> | undefined)?.lng,
    (view.geo as Record<string, unknown> | undefined)?.longitude,
    (view.coords as Record<string, unknown> | undefined)?.lon,
    (view.coords as Record<string, unknown> | undefined)?.lng,
    (view.coords as Record<string, unknown> | undefined)?.longitude,
  ];

  let lat = candidates.map(parseNumber).find((value) => value !== null) ?? null;
  let lon = lonCandidates.map(parseNumber).find((value) => value !== null) ?? null;

  if (lat === null || lon === null) {
    const loc = view.loc;
    if (typeof loc === 'string' && loc.includes(',')) {
      const [latStr, lonStr] = loc.split(',');
      lat = parseNumber(latStr);
      lon = parseNumber(lonStr);
    }
  }

  if (lat === null || lon === null) return null;
  if (Math.abs(lat) > 90 || Math.abs(lon) > 180) return null;
  return { lat, lon };
};

const isWebGLSupported = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return Boolean(window.WebGLRenderingContext && gl);
  } catch {
    return false;
  }
};

const extractViewPoints = (data: { views?: unknown[] } | null): ViewPoint[] => {
  if (!data || !Array.isArray(data.views)) return [];
  return data.views.reduce<ViewPoint[]>((acc, entry, index) => {
    const view = (entry ?? {}) as Record<string, unknown>;
    const coords = toLatLon(view);
    if (!coords) return acc;
    const timestamp = (view.timestamp ??
      view.time ??
      view.createdAt ??
      view.created_at ??
      view.ts) as string | number | undefined;
    const tsValue = typeof timestamp === 'number'
      ? new Date(timestamp).toISOString()
      : typeof timestamp === 'string'
        ? timestamp
        : undefined;

    acc.push({
      id: `${view.ip ?? 'ip'}-${timestamp ?? index}`,
      ip: typeof view.ip === 'string' ? view.ip : undefined,
      lat: coords.lat,
      lon: coords.lon,
      count: parseNumber(view.count ?? view.hits ?? view.views ?? view.total) ?? undefined,
      city: typeof view.city === 'string' ? view.city : undefined,
      region: typeof view.region === 'string' ? view.region : undefined,
      country: typeof view.country === 'string' ? view.country : undefined,
      timestamp: tsValue,
      raw: view,
    });
    return acc;
  }, []);
};

const normalizeExpiry = (expiresAt: number) => {
  if (!Number.isFinite(expiresAt)) return 0;
  return expiresAt < 1_000_000_000_000 ? expiresAt * 1000 : expiresAt;
};

const readStoredAuth = (): StoredAuth | null => {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(VIEW_AUTH_STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as StoredAuth;
    if (!parsed.token || !parsed.expiresAt) return null;
    const normalized = normalizeExpiry(parsed.expiresAt);
    if (normalized <= Date.now()) return null;
    return { token: parsed.token, expiresAt: normalized };
  } catch (error) {
    console.warn('Auth cache read failed', error);
    return null;
  }
};

const storeAuth = (token: string, expiresAt: number) => {
  if (typeof window === 'undefined') return;
  try {
    const payload: StoredAuth = { token, expiresAt };
    window.localStorage.setItem(VIEW_AUTH_STORAGE_KEY, JSON.stringify(payload));
  } catch (error) {
    console.warn('Auth cache write failed', error);
  }
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(VIEW_AUTH_STORAGE_KEY);
  } catch (error) {
    console.warn('Auth cache clear failed', error);
  }
};

const buildViewHitKey = (page: string) =>
  `${VIEW_COUNTER_STORAGE_PREFIX}:${VIEW_COUNTER_NAMESPACE}:${page}`;

const hasStoredHit = (page: string): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const raw = window.localStorage.getItem(buildViewHitKey(page));
    if (!raw) return false;
    const parsed = JSON.parse(raw) as StoredViewCount;
    return Boolean(parsed.counted);
  } catch (error) {
    console.warn('View count cache read failed', error);
  }
  return false;
};

const storeHit = (page: string) => {
  if (typeof window === 'undefined') return;
  try {
    const payload: StoredViewCount = { counted: true, ts: Date.now() };
    window.localStorage.setItem(buildViewHitKey(page), JSON.stringify(payload));
  } catch (error) {
    console.warn('View count cache write failed', error);
  }
};

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
  const [viewCounts, setViewCounts] = useState<Record<ViewState, number | null>>({
    home: null,
    unity: null,
    ai: null,
    software: null,
  });
  const [authToken, setAuthToken] = useState<string | null>(() => readStoredAuth()?.token ?? null);
  const [authExpiresAt, setAuthExpiresAt] = useState<number | null>(() => readStoredAuth()?.expiresAt ?? null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [loginLoading, setLoginLoading] = useState(false);
  const [viewsOpen, setViewsOpen] = useState(false);
  const [viewsLoading, setViewsLoading] = useState(false);
  const [viewsError, setViewsError] = useState<string | null>(null);
  const [viewsData, setViewsData] = useState<{ namespace?: string; page?: string; views?: unknown[] } | null>(null);
  const [selectedViewId, setSelectedViewId] = useState<string | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const markersRef = useRef<maplibregl.Marker[]>([]);
  const [mapError, setMapError] = useState<string | null>(null);

  const viewPoints = useMemo(() => extractViewPoints(viewsData), [viewsData]);
  const selectedView = viewPoints.find((point) => point.id === selectedViewId) ?? null;

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

  useEffect(() => {
    const stored = readStoredAuth();
    if (stored) {
      setAuthToken(stored.token);
      setAuthExpiresAt(stored.expiresAt);
    } else {
      setAuthToken(null);
      setAuthExpiresAt(null);
    }
  }, []);

  useEffect(() => {
    if (!authExpiresAt) return;
    if (authExpiresAt <= Date.now()) {
      setAuthToken(null);
      setAuthExpiresAt(null);
      clearStoredAuth();
      return;
    }
    const timeout = window.setTimeout(() => {
      setAuthToken(null);
      setAuthExpiresAt(null);
      clearStoredAuth();
    }, authExpiresAt - Date.now());
    return () => window.clearTimeout(timeout);
  }, [authExpiresAt]);

  useEffect(() => {
    const page = currentView === 'home' ? 'home' : currentView;
    const controller = new AbortController();
    const countUrl = `${VIEW_COUNTER_BASE_URL}/count?namespace=${encodeURIComponent(
      VIEW_COUNTER_NAMESPACE
    )}&page=${encodeURIComponent(page)}`;
    const hitUrl = `${VIEW_COUNTER_BASE_URL}/hit?namespace=${encodeURIComponent(
      VIEW_COUNTER_NAMESPACE
    )}&page=${encodeURIComponent(page)}`;

    const fetchCount = async () => {
      try {
        const response = await fetch(countUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`View count failed: ${response.status}`);
        }
        const data = (await response.json()) as { count?: number };
        if (typeof data.count === 'number') {
          setViewCounts(prev => ({ ...prev, [currentView]: data.count }));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('View count request failed', error);
        }
      }
    };

    const fetchHitThenCount = async () => {
      try {
        const response = await fetch(hitUrl, { signal: controller.signal });
        if (!response.ok) {
          throw new Error(`View hit failed: ${response.status}`);
        }
        const data = (await response.json()) as { count?: number; unique?: boolean };
        if (data.unique) {
          storeHit(page);
        }
        if (typeof data.count === 'number') {
          setViewCounts(prev => ({ ...prev, [currentView]: data.count }));
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.warn('View hit request failed', error);
        }
      } finally {
        await fetchCount();
      }
    };

    if (hasStoredHit(page)) {
      fetchCount();
    } else {
      fetchHitThenCount();
    }

    return () => {
      controller.abort();
    };
  }, [currentView]);

  useEffect(() => {
    if (!viewsOpen || !authToken) return;
    const page = currentView === 'home' ? 'home' : currentView;
    const controller = new AbortController();
    const url = new URL(`${VIEW_COUNTER_BASE_URL}/views`);
    url.searchParams.set('namespace', VIEW_COUNTER_NAMESPACE);
    url.searchParams.set('page', page);

    const fetchViews = async () => {
      setViewsLoading(true);
      setViewsError(null);
      try {
        const response = await fetch(url.toString(), {
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });
        if (!response.ok) {
          if (response.status === 401) {
            setAuthToken(null);
            setAuthExpiresAt(null);
            clearStoredAuth();
          }
          throw new Error(`Views fetch failed: ${response.status}`);
        }
        const data = await response.json();
        setViewsData(data);
      } catch (error) {
        if (!controller.signal.aborted) {
          setViewsError('Unable to load view details.');
          console.warn('Views request failed', error);
        }
      } finally {
        if (!controller.signal.aborted) {
          setViewsLoading(false);
        }
      }
    };

    fetchViews();

    return () => controller.abort();
  }, [viewsOpen, authToken, currentView]);

  useEffect(() => {
    // Only render map if there are views and they are done loading
    const shouldRenderMap = viewsOpen && !viewsLoading && viewPoints.length > 0;

    if (!shouldRenderMap) {
      // Cleanup if map should not be visible
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];
      mapRef.current?.remove();
      mapRef.current = null;
      setMapError(null);
      return;
    }

    // If map already exists or container is missing, do nothing
    if (mapRef.current) return;
    if (!mapContainerRef.current) return;

    if (!isWebGLSupported()) {
      setMapError('WebGL is not supported in this browser.');
      return;
    }

    try {
      const mapInstance = new maplibregl.Map({
        container: mapContainerRef.current,
        style: OPENFREEMAP_STYLE_URL,
        center: [0, 20],
        zoom: 1.25,
        attributionControl: false,
      });

      mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), 'top-right');
      mapInstance.addControl(new maplibregl.AttributionControl({ compact: true }), 'bottom-right');

      mapInstance.on('load', () => {
        setMapError(null);
        mapInstance.resize();
      });

      mapInstance.on('error', (event) => {
        const message = event?.error?.message ?? 'Unable to load OpenFreeMap tiles.';
        setMapError(message);
        console.warn('OpenFreeMap error', event?.error ?? event);
      });

      mapRef.current = mapInstance;

      // Force resize to ensure map fills container
      requestAnimationFrame(() => {
        mapInstance.resize();
      });
    } catch (err) {
      console.error('Error initializing map:', err);
      setMapError('Failed to initialize map');
    }
  }, [viewsOpen, viewsLoading, viewPoints]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    const renderMarkers = () => {
      markersRef.current.forEach(marker => marker.remove());
      markersRef.current = [];

      if (viewPoints.length === 0) return;

      const bounds = new maplibregl.LngLatBounds();
      const grouped = new Map<string, ViewPoint[]>();

      viewPoints.forEach(point => {
        const latKey = point.lat.toFixed(6);
        const lonKey = point.lon.toFixed(6);
        const key = `${latKey},${lonKey}`;
        const list = grouped.get(key) ?? [];
        list.push(point);
        grouped.set(key, list);
      });

      grouped.forEach(points => {
        const baseLon = points[0].lon;
        const baseLat = points[0].lat;
        const el = document.createElement('button');
        let index = 0;

        el.type = 'button';
        el.dataset.pointIds = points.map(point => point.id).join('|');
        el.dataset.pointId = points[0].id;
        el.className = 'map-marker';
        if (points.length > 1) {
          el.dataset.count = String(points.length);
        }

        el.addEventListener('click', () => {
          setSelectedViewId(points[index].id);
          if (points.length > 1) {
            index = (index + 1) % points.length;
          }
        });

        const marker = new maplibregl.Marker({ element: el })
          .setLngLat([baseLon, baseLat])
          .addTo(map);
        markersRef.current.push(marker);
        bounds.extend([baseLon, baseLat]);
      });

      if (viewPoints.length > 0) {
        const p = viewPoints[0];
        // Default to zooming in on the most recent (first) point
        map.flyTo({ center: [p.lon, p.lat], zoom: 14, speed: 2 });
      }
    };

    if (!map.isStyleLoaded()) {
      map.once('load', renderMarkers);
      return;
    }

    renderMarkers();
  }, [viewPoints]);

  useEffect(() => {
    markersRef.current.forEach(marker => {
      const el = marker.getElement();
      const ids = (el.dataset.pointIds ?? '').split('|').filter(Boolean);
      if (selectedViewId && ids.includes(selectedViewId)) {
        el.classList.add('is-active');
      } else {
        el.classList.remove('is-active');
      }
    });
  }, [selectedViewId]);

  useEffect(() => {
    const map = mapRef.current;
    if (!map || !viewsOpen) return;
    const timer = window.setTimeout(() => map.resize(), 100);
    return () => window.clearTimeout(timer);
  }, [viewsOpen]);

  useEffect(() => {
    if (!viewsOpen) return;
    const hasSelected = viewPoints.some(point => point.id === selectedViewId);
    if (viewPoints.length > 0 && (!selectedViewId || !hasSelected)) {
      setSelectedViewId(viewPoints[0].id);
    }
  }, [viewsOpen, viewPoints, selectedViewId]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const toggleLang = () => {
    setLang(prev => prev === 'en' ? 'vi' : 'en');
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!loginPassword.trim()) {
      setLoginError('Password is required.');
      return;
    }
    setLoginLoading(true);
    setLoginError(null);
    try {
      const response = await fetch(`${VIEW_COUNTER_BASE_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: loginPassword }),
      });
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status}`);
      }
      const data = (await response.json()) as { token?: string; expiresAt?: number };
      if (!data.token || !data.expiresAt) {
        throw new Error('Invalid login response');
      }
      const expiresAt = normalizeExpiry(data.expiresAt);
      setAuthToken(data.token);
      setAuthExpiresAt(expiresAt);
      storeAuth(data.token, expiresAt);
      setLoginPassword('');
      setLoginOpen(false);
    } catch (error) {
      console.warn('Login request failed', error);
      setLoginError('Login failed. Check the password.');
    } finally {
      setLoginLoading(false);
    }
  };

  const currentViewCount = viewCounts[currentView];
  const viewCountLabel = typeof currentViewCount === 'number'
    ? currentViewCount.toLocaleString()
    : '---';

  const handlePointSelect = (point: ViewPoint) => {
    setSelectedViewId(point.id);
    const map = mapRef.current;
    if (!map) return;
    const nextZoom = Math.max(map.getZoom(), 6);
    map.flyTo({ center: [point.lon, point.lat], zoom: nextZoom, speed: 1.2, essential: true });
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
          <span className="sm:hidden">Views: {viewCountLabel}</span>
          <span className="hidden sm:inline">SYS.ID: 8492</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Bio_Metrics: Normal</span>
          <span className="hidden sm:inline">|</span>
          <span className="hidden sm:inline">Views: {viewCountLabel}</span>
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
        {currentView === 'ai' && <AISection lang={lang} />}

        {currentView !== 'home' && currentView !== 'unity' && currentView !== 'ai' && (
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

      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          type="button"
          onClick={() => setLoginOpen(true)}
          className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/70 backdrop-blur-md hover:border-black dark:hover:border-white transition-colors"
          aria-label="Open login"
        >
          <Lock size={16} />
        </button>
        {authToken && (
          <button
            type="button"
            onClick={() => setViewsOpen(true)}
            className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-black/70 backdrop-blur-md hover:border-black dark:hover:border-white transition-colors"
            aria-label="View details"
          >
            <MapIcon size={16} />
          </button>
        )}
      </div>

      {loginOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-sm border border-gray-200 dark:border-gray-700 bg-white dark:bg-black p-6 relative">
            <button
              type="button"
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black dark:hover:text-white"
            >
              <X size={18} />
            </button>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2">Admin Login</h3>
            <p className="text-xs text-gray-500 mb-4">Enter password to access view logs.</p>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Password</label>
                <input
                  type="password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  className="mt-2 w-full border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-black/40 px-3 py-2 text-sm focus:outline-none focus:border-black dark:focus:border-white"
                  placeholder="••••••••"
                />
              </div>
              {loginError && (
                <div className="text-xs text-red-500">{loginError}</div>
              )}
              <button
                type="submit"
                disabled={loginLoading}
                className="w-full flex items-center justify-center gap-2 border border-gray-200 dark:border-gray-700 px-3 py-2 text-xs font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black disabled:opacity-60"
              >
                {loginLoading ? <Loader2 className="animate-spin" size={14} /> : null}
                {loginLoading ? 'Signing In...' : 'Login'}
              </button>
            </form>
          </div>
        </div>
      )}

      {viewsOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-white/20 dark:bg-black/50 p-4 font-mono transition-colors duration-300">
          <div className="w-[95vw] h-[90vh] max-w-[1400px] border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-[#0a0a0a] relative flex flex-col overflow-hidden shadow-2xl rounded-lg">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-black/50 backdrop-blur-md transition-colors">
              <div className="flex items-center gap-4">
                <div className="w-2 h-2 bg-black dark:bg-white animate-pulse rounded-full" />
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black dark:text-white transition-colors">
                  GEO_TRAFFIC <span className="text-gray-400 dark:text-gray-600">ANALYSIS</span>
                </h3>
                <div className="hidden md:flex items-center gap-2 text-[10px] font-bold text-gray-400 dark:text-gray-500 border border-gray-200 dark:border-gray-800 px-2 py-1 bg-white dark:bg-black transition-colors">
                  <Activity size={12} className="text-black dark:text-white" />
                  LIVE_FEED
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden md:block text-right">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest">System Status</div>
                  <div className="text-xs font-bold text-black dark:text-white">OPTIMAL</div>
                </div>
                <button
                  type="button"
                  onClick={() => setViewsOpen(false)}
                  className="w-10 h-10 flex items-center justify-center border border-gray-200 dark:border-gray-800 text-gray-400 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {viewsError && (
              <div className="absolute top-20 left-1/2 -translate-x-1/2 z-50 bg-red-100 dark:bg-red-900/90 text-red-600 dark:text-white px-6 py-3 border border-red-500 flex items-center gap-3 shadow-lg">
                <div className="w-2 h-2 bg-red-500 animate-ping rounded-full" />
                {viewsError}
              </div>
            )}

            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
              {/* Left Column: Map */}
              <div className="flex-1 relative border-b lg:border-b-0 lg:border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-[#050505] transition-colors">
                {/* Map Overlay Elements */}
                <div className="absolute top-4 left-4 z-10 pointer-events-none">
                  <div className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest mb-1">Coordinates</div>
                  <div className="font-mono text-xs text-black dark:text-white">
                    {/* Dynamic coordinates or placeholder */}
                    {selectedView ? `${selectedView.lat.toFixed(4)}, ${selectedView.lon.toFixed(4)}` : 'SCANNING...'}
                  </div>
                </div>

                {/* Map Container */}
                <div className="w-full h-full opacity-100 transition-all duration-1000">
                  <div ref={mapContainerRef} className="h-full w-full" />
                </div>

                {/* Map Loading State */}
                {(viewsLoading || mapError) && (
                  <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80 z-20 transition-colors">
                    {viewsLoading ? (
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="animate-spin text-black dark:text-white" size={48} />
                        <div className="text-xs font-bold text-black dark:text-white animate-pulse tracking-widest">INITIALIZING_MAP_SEQUENCE...</div>
                      </div>
                    ) : (
                      <div className="text-red-500 font-bold border border-red-900 bg-red-900/20 px-4 py-2">
                        ERROR: {mapError || 'CONNECTION_FAILED'}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Right Column: Data Panels */}
              <div className="w-full lg:w-[400px] flex flex-col bg-gray-50 dark:bg-[#0a0a0a] transition-colors mobile-panel">

                {/* Panel 1: Selected Node */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-transparent transition-colors">
                  <div className="flex items-center gap-2 mb-6 text-gray-400">
                    <Maximize2 size={16} />
                    <span className="text-sm font-bold uppercase tracking-widest">SELECTED_NODE</span>
                  </div>

                  {selectedView ? (
                    <div className="space-y-6 animate-fade-in">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 p-4 transition-colors">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Status</div>
                          <div className="text-sm font-bold text-black dark:text-white flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full" /> ACTIVE
                          </div>
                        </div>
                        <div className="border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-white/5 p-4 transition-colors">
                          <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Hits</div>
                          <div className="text-sm font-bold text-black dark:text-white uppercase transition-colors">{selectedView.count ?? '01'} REQUESTS</div>
                        </div>
                      </div>


                    </div>
                  ) : (
                    <div className="h-[140px] flex items-center justify-center border border-dashed border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-600 text-xs uppercase tracking-widest">
                      NO_TARGET_LOCKED
                    </div>
                  )}
                </div>

                {/* Panel 2: Connection Log */}
                <div className="flex-1 flex flex-col min-h-0 bg-gray-50 dark:bg-[#0a0a0a] transition-colors">
                  <div className="p-6 pb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-400">
                      <div className="w-1.5 h-1.5 bg-gray-400 dark:bg-gray-500 rounded-full" />
                      <span className="text-sm font-bold uppercase tracking-widest">CONNECTION_LOG</span>
                    </div>
                    <div className="flex gap-2">
                      <button className="p-1.5 border border-gray-200 dark:border-gray-800 text-gray-400 dark:text-gray-500 hover:text-black dark:hover:text-white hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                        <Filter size={12} />
                      </button>
                      <button className="p-1.5 border border-gray-800 text-gray-500 hover:text-white hover:border-gray-600">
                        <DownloadCloud size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="flex-1 overflow-auto p-6 pt-2 space-y-2 custom-scrollbar">
                    {viewPoints.map((point) => {
                      const isActive = point.id === selectedViewId;
                      return (
                        <button
                          key={point.id}
                          onClick={() => handlePointSelect(point)}
                          className={`w-full text-left p-4 border transition-all duration-200 group relative overflow-hidden ${isActive
                            ? 'border-black dark:border-white bg-gray-100 dark:bg-white/10'
                            : 'border-gray-200 dark:border-gray-800 bg-white dark:bg-black hover:border-gray-400 dark:hover:border-gray-600'
                            }`}
                        >
                          {isActive && <div className="absolute top-0 right-0 p-1 bg-black dark:bg-white text-white dark:text-black text-[8px] font-bold uppercase px-2">Now</div>}

                          <div className="flex items-center justify-between mb-2">
                            <span className={`text-sm font-bold font-mono transition-colors ${isActive ? 'text-black dark:text-white' : 'text-gray-600 dark:text-gray-400 group-hover:text-black dark:group-hover:text-gray-200'}`}>
                              {point.ip ?? 'UNKNOWN_HOST'}
                            </span>
                          </div>

                          <div className="flex flex-col gap-1">
                            <div className="text-[10px] text-gray-500 dark:text-gray-600 font-mono uppercase transition-colors">
                              LOC: {point.lat.toFixed(4)}, {point.lon.toFixed(4)}
                            </div>
                            <div className="text-[10px] text-gray-500 dark:text-gray-600 font-mono uppercase flex justify-between transition-colors">
                              {point.count && <span>Hits: {point.count}</span>}
                            </div>
                          </div>

                          {isActive && (
                            <div className="absolute bottom-4 right-4 text-black dark:text-white">
                              <div className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full animate-ping" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                    {viewPoints.length === 0 && (
                      <div className="text-center py-12 text-gray-400 dark:text-gray-700 text-xs uppercase tracking-widest">
                        Log_Buffer_Empty
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Modal Overlay Gradient for Cinematic Effect */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-gray-200/20 dark:from-black/20 to-transparent mix-blend-overlay" />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
