import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { Upload, X, Plus, Move } from 'lucide-react';

// Types
interface DragState {
  isDragging: boolean;
  isResizing: boolean;
  startX: number;
  startY: number;
  startWidth: number;
  startHeight: number;
  startTop: number;
  startLeft: number;
}

interface ImageSettings {
  width: string;
  height: string;
  top: string;
  left: string;
}

interface Background {
  id: string;
  src: string;
  label: string;
  settings: ImageSettings;
  overlayOptions: OverlayOption[];
}

interface OverlayOption {
  id: string;
  src: string;
  label: string;
  type: 'flower' | 'curtain' | 'light' | 'accessory';
  settings: ImageSettings;
}

// Main App Component
function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/" element={<DesignTool />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Design Tool Component for Users
function DesignTool() {
  const [selectedBackground, setSelectedBackground] = useState<string>('default');
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);

  useEffect(() => {
    // TODO: Fetch backgrounds from Supabase
    setBackgrounds([
      {
        id: 'default',
        src: "https://i.ibb.co/yBg7f57g/image3.png",
        label: 'Klasik Düğün Arkı',
        settings: {
          width: '100%',
          height: '100%',
          top: '0',
          left: '0'
        },
        overlayOptions: [
          {
            id: 'orange-flowers',
            src: 'https://i.ibb.co/5WQFZhpP/image1.png',
            label: 'Turuncu Çiçekli Süsleme',
            type: 'flower',
            settings: {
              width: '260px',
              height: '100%',
              top: '-220px',
              left: '110px'
            }
          }
        ]
      }
    ]);
  }, []);

  const currentBackground = backgrounds.find(bg => bg.id === selectedBackground);
  const selectedOverlayOption = currentBackground?.overlayOptions.find(opt => opt.id === selectedOverlay);
  
  const flowerOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'flower') || [];
  const curtainOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'curtain') || [];
  const lightOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'light') || [];
  const accessoryOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'accessory') || [];

  const handleOverlayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOverlay(e.target.value);
  };

  const handleBackgroundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBackground(e.target.value);
    setSelectedOverlay(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Düğün Arkı Tasarımı</h1>
        
        <div className="grid grid-cols-[1fr,400px] gap-8">
          {/* Main Image Display Area */}
          <div>
            <div className="relative w-full h-[800px] rounded-lg overflow-hidden border-8 border-white shadow-xl">
              {currentBackground && (
                <img
                  src={currentBackground.src}
                  alt="Düğün arkı"
                  className="absolute object-cover"
                  style={{
                    width: currentBackground.settings.width,
                    height: currentBackground.settings.height,
                    top: currentBackground.settings.top,
                    left: currentBackground.settings.left
                  }}
                />
              )}
              {selectedOverlayOption && (
                <img
                  src={selectedOverlayOption.src}
                  alt="Seçilen süsleme"
                  className="absolute object-contain pointer-events-none"
                  style={{
                    width: selectedOverlayOption.settings.width,
                    height: selectedOverlayOption.settings.height,
                    top: selectedOverlayOption.settings.top,
                    left: selectedOverlayOption.settings.left
                  }}
                />
              )}
            </div>
          </div>

          {/* Options Panel */}
          <div className="space-y-8 bg-gray-50 p-6 rounded-lg">
            {/* Background Selection */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Arka Plan</h2>
              <select
                onChange={handleBackgroundChange}
                value={selectedBackground}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                {backgrounds.map((bg) => (
                  <option key={bg.id} value={bg.id}>{bg.label}</option>
                ))}
              </select>
            </div>

            {/* Flower Options */}
            {flowerOptions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">Çiçek Süslemesi</h2>
                <select
                  onChange={handleOverlayChange}
                  value={selectedOverlay || ''}
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                >
                  <option value="">Süsleme Seçiniz</option>
                  {flowerOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Other Options */}
            {curtainOptions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">Tül Seçimi</h2>
                <select
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                >
                  <option value="">Tül Seçiniz</option>
                  {curtainOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

            {lightOptions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">Işıklandırma</h2>
                <select
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                >
                  <option value="">Işıklandırma Seçiniz</option>
                  {lightOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

            {accessoryOptions.length > 0 && (
              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-700">Aksesuar Seçimi</h2>
                <select
                  className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
                >
                  <option value="">Aksesuar Seçiniz</option>
                  {accessoryOptions.map((option) => (
                    <option key={option.id} value={option.id}>{option.label}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Contact Info */}
            <div className="mt-8 pt-8 border-t border-gray-200">
              <div className="text-center">
                <p className="text-gray-600">İletişim için:</p>
                <p className="text-2xl font-bold text-pink-600 mt-2">+90 533 419 6166</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Admin Panel Component
function AdminPanel() {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [editingBackground, setEditingBackground] = useState<string | null>(null);
  const [editingOverlay, setEditingOverlay] = useState<{backgroundId: string, overlayId: string} | null>(null);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    isResizing: false,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startTop: 0,
    startLeft: 0
  });
  const containerRef = useRef<HTMLDivElement>(null);

  const [newBackground, setNewBackground] = useState({
    label: '',
    src: '',
    settings: {
      width: '100%',
      height: '100%',
      top: '0',
      left: '0'
    }
  });

  const [newOverlay, setNewOverlay] = useState({
    backgroundId: '',
    label: '',
    src: '',
    type: 'flower' as const,
    settings: {
      width: '100%',
      height: '100%',
      top: '-220px',
      left: '110px'
    }
  });

  useEffect(() => {
    // TODO: Fetch backgrounds from Supabase
    setBackgrounds([
      {
        id: 'default',
        src: "https://i.ibb.co/yBg7f57g/image3.png",
        label: 'Klasik Düğün Arkı',
        settings: {
          width: '100%',
          height: '100%',
          top: '0',
          left: '0'
        },
        overlayOptions: [
          {
            id: 'orange-flowers',
            src: 'https://i.ibb.co/5WQFZhpP/image1.png',
            label: 'Turuncu Çiçekli Süsleme',
            type: 'flower',
            settings: {
              width: '260px',
              height: '100%',
              top: '-220px',
              left: '110px'
            }
          }
        ]
      }
    ]);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAuthenticated(true);
    }
  };

  const handleAddBackground = async (e: React.FormEvent) => {
    e.preventDefault();
    const newBg: Background = {
      id: Date.now().toString(),
      src: newBackground.src,
      label: newBackground.label,
      settings: newBackground.settings,
      overlayOptions: []
    };
    setBackgrounds([...backgrounds, newBg]);
    setNewBackground({
      label: '',
      src: '',
      settings: {
        width: '100%',
        height: '100%',
        top: '0',
        left: '0'
      }
    });
  };

  const handleAddOverlay = async (e: React.FormEvent) => {
    e.preventDefault();
    const background = backgrounds.find(bg => bg.id === newOverlay.backgroundId);
    if (background) {
      const newOverlayOption: OverlayOption = {
        id: Date.now().toString(),
        src: newOverlay.src,
        label: newOverlay.label,
        type: newOverlay.type,
        settings: newOverlay.settings
      };
      const updatedBackground = {
        ...background,
        overlayOptions: [...background.overlayOptions, newOverlayOption]
      };
      setBackgrounds(backgrounds.map(bg => 
        bg.id === background.id ? updatedBackground : bg
      ));
      setNewOverlay({
        backgroundId: '',
        label: '',
        src: '',
        type: 'flower',
        settings: {
          width: '260px',
          height: '100%',
          top: '-220px',
          left: '110px'
        }
      });
    }
  };

  const handleMouseDown = (e: React.MouseEvent, backgroundId: string, overlayId: string, isResizing: boolean = false) => {
    const background = backgrounds.find(bg => bg.id === backgroundId);
    const overlay = background?.overlayOptions.find(o => o.id === overlayId);
    if (!overlay) return;

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const currentWidth = parseInt(overlay.settings.width);
    const currentHeight = parseInt(overlay.settings.height);
    const currentTop = parseInt(overlay.settings.top);
    const currentLeft = parseInt(overlay.settings.left);

    setDragState({
      isDragging: !isResizing,
      isResizing,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: currentWidth,
      startHeight: currentHeight,
      startTop: currentTop,
      startLeft: currentLeft
    });

    setEditingOverlay({ backgroundId, overlayId });
    e.preventDefault();
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if ((!dragState.isDragging && !dragState.isResizing) || !editingOverlay) return;

    const container = containerRef.current?.getBoundingClientRect();
    if (!container) return;

    const background = backgrounds.find(bg => bg.id === editingOverlay.backgroundId);
    const overlay = background?.overlayOptions.find(o => o.id === editingOverlay.overlayId);
    if (!overlay) return;

    if (dragState.isDragging) {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      const newLeft = dragState.startLeft + deltaX;
      const newTop = dragState.startTop + deltaY;

      updateOverlaySettings(editingOverlay.backgroundId, editingOverlay.overlayId, {
        top: `${newTop}px`,
        left: `${newLeft}px`
      });
    } else if (dragState.isResizing) {
      const deltaX = e.clientX - dragState.startX;
      const deltaY = e.clientY - dragState.startY;

      const newWidth = Math.max(50, dragState.startWidth + deltaX);
      const newHeight = Math.max(50, dragState.startHeight + deltaY);

      updateOverlaySettings(editingOverlay.backgroundId, editingOverlay.overlayId, {
        width: `${newWidth}px`,
        height: `${newHeight}px`
      });
    }

    e.preventDefault();
  };

  const handleMouseUp = () => {
    setDragState({
      isDragging: false,
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
      startTop: 0,
      startLeft: 0
    });
  };

  const updateOverlaySettings = (backgroundId: string, overlayId: string, settings: Partial<ImageSettings>) => {
    setBackgrounds(backgrounds.map(bg => {
      if (bg.id === backgroundId) {
        return {
          ...bg,
          overlayOptions: bg.overlayOptions.map(overlay => {
            if (overlay.id === overlayId) {
              return {
                ...overlay,
                settings: { ...overlay.settings, ...settings }
              };
            }
            return overlay;
          })
        };
      }
      return bg;
    }));
  };

  const handleDeleteBackground = async (id: string) => {
    setBackgrounds(backgrounds.filter(bg => bg.id !== id));
    setEditingBackground(null);
  };

  const handleDeleteOverlay = async (backgroundId: string, overlayId: string) => {
    const background = backgrounds.find(bg => bg.id === backgroundId);
    if (background) {
      const updatedBackground = {
        ...background,
        overlayOptions: background.overlayOptions.filter(opt => opt.id !== overlayId)
      };
      setBackgrounds(backgrounds.map(bg => 
        bg.id === backgroundId ? updatedBackground : bg
      ));
      setEditingOverlay(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Yönetici Girişi</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Şifre
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
            >
              Giriş Yap
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Yönetim Paneli</h1>
        
        {/* Background Management */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Arka Plan Yönetimi</h2>
          
          {/* Add New Background */}
          <form onSubmit={handleAddBackground} className="mb-8 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-medium text-gray-700 mb-4">Yeni Arka Plan Ekle</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">İsim</label>
                <input
                  type="text"
                  value={newBackground.label}
                  onChange={(e) => setNewBackground({ ...newBackground, label: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resim URL</label>
                <input
                  type="url"
                  value={newBackground.src}
                  onChange={(e) => setNewBackground({ ...newBackground, src: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Plus className="inline-block w-4 h-4 mr-2" />
                Arka Plan Ekle
              </button>
            </div>
          </form>

          {/* Background List */}
          <div className="space-y-4">
            {backgrounds.map((background) => (
              <div key={background.id} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-gray-700">{background.label}</h3>
                  <button
                    onClick={() => handleDeleteBackground(background.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Preview Area */}
                <div 
                  ref={containerRef}
                  className="relative w-[800px] h-[800px] rounded-lg overflow-hidden border-4 border-white shadow-lg mb-4"
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  <img
                    src={background.src}
                    alt={background.label}
                    className="absolute object-cover"
                    style={{
                      width: background.settings.width,
                      height: background.settings.height,
                      top: background.settings.top,
                      left: background.settings.left
                    }}
                  />
                  {background.overlayOptions.map((overlay) => (
                    <div
                      key={overlay.id}
                      className={`absolute cursor-move ${editingOverlay?.overlayId === overlay.id ? 'ring-2 ring-pink-500' : ''}`}
                      style={{
                        width: overlay.settings.width,
                        height: overlay.settings.height,
                        top: overlay.settings.top,
                        left: overlay.settings.left
                      }}
                      onMouseDown={(e) => handleMouseDown(e, background.id, overlay.id)}
                    >
                      <img
                        src={overlay.src}
                        alt={overlay.label}
                        className="w-full h-full object-contain pointer-events-none"
                      />
                      <div
                        className="absolute bottom-0 right-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full cursor-se-resize flex items-center justify-center"
                        onMouseDown={(e) => handleMouseDown(e, background.id, overlay.id, true)}
                      >
                        <Move className="w-4 h-4 text-gray-500" />
                      </div>
                    </div>
                  ))}
                </div>
                
                {/* Overlay List */}
                <div className="mt-4">
                  <h4 className="text-md font-medium text-gray-600 mb-2">Süslemeler</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {background.overlayOptions.map((overlay) => (
                      <div key={overlay.id} className="p-3 bg-white rounded-lg shadow">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium">{overlay.label}</span>
                          <button
                            onClick={() => handleDeleteOverlay(background.id, overlay.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                        <img
                          src={overlay.src}
                          alt={overlay.label}
                          className="w-full h-24 object-cover rounded"
                        />
                        <span className="mt-2 inline-block px-2 py-1 text-xs font-medium bg-gray-100 rounded">
                          {overlay.type}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Overlay */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-700 mb-6">Süsleme Ekle</h2>
          <form onSubmit={handleAddOverlay} className="p-6 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Arka Plan</label>
                <select
                  value={newOverlay.backgroundId}
                  onChange={(e) => setNewOverlay({ ...newOverlay, backgroundId: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                  required
                >
                  <option value="">Arka Plan Seçin</option>
                  {backgrounds.map((bg) => (
                    <option key={bg.id} value={bg.id}>{bg.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">İsim</label>
                <input
                  type="text"
                  value={newOverlay.label}
                  onChange={(e) => setNewOverlay({ ...newOverlay, label: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Resim URL</label>
                <input
                  type="url"
                  value={newOverlay.src}
                  onChange={(e) => setNewOverlay({ ...newOverlay, src: e.target.value })}
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Tür</label>
                <select
                  value={newOverlay.type}
                  onChange={(e) => setNewOverlay({ ...newOverlay, type: e.target.value as any })}
                  className="mt-1 block w-full px-4 py-2 border-2 border-gray-200 rounded-lg"
                  required
                >
                  <option value="flower">Çiçek</option>
                  <option value="curtain">Perde</option>
                  <option value="light">Işıklandırma</option>
                  <option value="accessory">Aksesuar</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 transition-colors"
              >
                <Plus className="inline-block w-4 h-4 mr-2" />
                Süsleme Ekle
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;