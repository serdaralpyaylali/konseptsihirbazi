import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Upload, X, Plus, Move, Mail, Calendar, Clock, Building, Home, User, MapPin } from 'lucide-react';

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
  type: 'flower' | 'curtain' | 'light' | 'accessory' | 'chair' | 'sofa';
  settings: ImageSettings;
}

interface FormData {
  fullName: string;
  address: string;
  floor: string;
  hasElevator: boolean;
  date: string;
  time: string;
  selections: {
    background?: string;
    flower?: string;
    chair?: string;
    sofa?: string;
    curtain?: string;
    light?: string;
    accessory?: string;
  };
}

// Main App Component
function App() {
  return (
    <Routes>
      <Route path="/admin" element={<AdminPanel />} />
      <Route path="/form" element={<OrderForm />} />
      <Route path="/" element={<DesignTool />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

// Order Form Component
function OrderForm() {
  const location = useLocation();
  const selections = location.state?.selections || {};
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    address: '',
    floor: '',
    hasElevator: false,
    date: '',
    time: '',
    selections
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    
    const emailBody = `
      Yeni Sipariş:
      
      Ad Soyad: ${formData.fullName}
      Adres: ${formData.address}
      Kat: ${formData.floor}
      Asansör: ${formData.hasElevator ? 'Evet' : 'Hayır'}
      Tarih: ${formData.date}
      Saat: ${formData.time}
      
      Seçimler:
      Arka Plan: ${formData.selections.background || '-'}
      Çiçek: ${formData.selections.flower || '-'}
      Sandalye: ${formData.selections.chair || '-'}
      Koltuk: ${formData.selections.sofa || '-'}
      Tül: ${formData.selections.curtain || '-'}
      Işıklandırma: ${formData.selections.light || '-'}
      Aksesuar: ${formData.selections.accessory || '-'}
    `;

    alert('Siparişiniz başarıyla alındı! Size en kısa sürede dönüş yapacağız.');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Sipariş Formu</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <User className="inline-block w-4 h-4 mr-2" />
              Ad Soyad
            </label>
            <input
              type="text"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <MapPin className="inline-block w-4 h-4 mr-2" />
              Adres
            </label>
            <textarea
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Building className="inline-block w-4 h-4 mr-2" />
                Bulunduğu Kat
              </label>
              <input
                type="number"
                required
                value={formData.floor}
                onChange={(e) => setFormData({ ...formData, floor: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Home className="inline-block w-4 h-4 mr-2" />
                Asansör
              </label>
              <div className="space-x-4 mt-2">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="elevator"
                    checked={formData.hasElevator}
                    onChange={() => setFormData({ ...formData, hasElevator: true })}
                    className="form-radio text-pink-600"
                  />
                  <span className="ml-2">Var</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    name="elevator"
                    checked={!formData.hasElevator}
                    onChange={() => setFormData({ ...formData, hasElevator: false })}
                    className="form-radio text-pink-600"
                  />
                  <span className="ml-2">Yok</span>
                </label>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Calendar className="inline-block w-4 h-4 mr-2" />
                Nişan Tarihi
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                <Clock className="inline-block w-4 h-4 mr-2" />
                Saat
              </label>
              <input
                type="time"
                required
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center"
          >
            <Mail className="w-5 h-5 mr-2" />
            Siparişi Gönder
          </button>
        </form>
      </div>
    </div>
  );
}

// Design Tool Component
function DesignTool() {
  const navigate = useNavigate();
  const [selectedBackground, setSelectedBackground] = useState<string>('default');
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);
  const [backgrounds, setBackgrounds] = useState<Background[]>([]);
  const [selections, setSelections] = useState({
    background: '',
    flower: '',
    chair: '',
    sofa: '',
    curtain: '',
    light: '',
    accessory: ''
  });

  useEffect(() => {
    // Example data - in production, this would come from your backend
    setBackgrounds([
      {
        id: 'default',
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
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
            src: 'https://images.unsplash.com/photo-1561128290-005859246e58?w=400',
            label: 'Turuncu Çiçekli Süsleme',
            type: 'flower',
            settings: {
              width: '260px',
              height: '100%',
              top: '-220px',
              left: '110px'
            }
          },
          {
            id: 'classic-chair',
            src: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=400',
            label: 'Klasik Sandalye',
            type: 'chair',
            settings: {
              width: '200px',
              height: 'auto',
              top: '0',
              left: '0'
            }
          },
          {
            id: 'luxury-sofa',
            src: 'https://images.unsplash.com/photo-1550254478-ead40cc54513?w=400',
            label: 'Lüks Koltuk',
            type: 'sofa',
            settings: {
              width: '300px',
              height: 'auto',
              top: '0',
              left: '0'
            }
          }
        ]
      }
    ]);
  }, []);

  const currentBackground = backgrounds.find(bg => bg.id === selectedBackground);
  const flowerOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'flower') || [];
  const chairOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'chair') || [];
  const sofaOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'sofa') || [];
  const curtainOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'curtain') || [];
  const lightOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'light') || [];
  const accessoryOptions = currentBackground?.overlayOptions.filter(opt => opt.type === 'accessory') || [];

  const handleSelectionChange = (type: string, value: string) => {
    setSelections(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleContinue = () => {
    navigate('/form', { state: { selections } });
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
            </div>
          </div>

          {/* Options Panel */}
          <div className="space-y-6 bg-gray-50 p-6 rounded-lg">
            {/* Background Selection */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Arka Plan</h2>
              <select
                onChange={(e) => {
                  setSelectedBackground(e.target.value);
                  handleSelectionChange('background', e.target.value);
                }}
                value={selectedBackground}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                {backgrounds.map((bg) => (
                  <option key={bg.id} value={bg.id}>{bg.label}</option>
                ))}
              </select>
            </div>

            {/* Flower Options */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Çiçek Tercihi</h2>
              <select
                onChange={(e) => handleSelectionChange('flower', e.target.value)}
                value={selections.flower}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="">Çiçek Seçiniz</option>
                {flowerOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Chair Options */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Sandalye Tercihi</h2>
              <select
                onChange={(e) => handleSelectionChange('chair', e.target.value)}
                value={selections.chair}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="">Sandalye Seçiniz</option>
                {chairOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Sofa Options */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Koltuk Tercihi</h2>
              <select
                onChange={(e) => handleSelectionChange('sofa', e.target.value)}
                value={selections.sofa}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="">Koltuk Seçiniz</option>
                {sofaOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Curtain Options */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Tül Süsleme Tercihi</h2>
              <select
                onChange={(e) => handleSelectionChange('curtain', e.target.value)}
                value={selections.curtain}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="">Tül Seçiniz</option>
                {curtainOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Light Options */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Işıklandırma Tercihi</h2>
              <select
                onChange={(e) => handleSelectionChange('light', e.target.value)}
                value={selections.light}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="">Işıklandırma Seçiniz</option>
                {lightOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Accessory Options */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-700">Yan Aksesuar Tercihi</h2>
              <select
                onChange={(e) => handleSelectionChange('accessory', e.target.value)}
                value={selections.accessory}
                className="w-full px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-pink-500 focus:ring-2 focus:ring-pink-200 outline-none transition-all"
              >
                <option value="">Aksesuar Seçiniz</option>
                {accessoryOptions.map((option) => (
                  <option key={option.id} value={option.id}>{option.label}</option>
                ))}
              </select>
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              className="w-full bg-pink-600 text-white py-3 px-4 rounded-lg hover:bg-pink-700 transition-colors mt-8"
            >
              Seçimleri Kaydet ve Devam Et
            </button>

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
    setBackgrounds([
      {
        id: 'default',
        src: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800",
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
            src: 'https://images.unsplash.com/photo-1561128290-005859246e58?w=400',
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
                <label className="block text-sm font-medium text-gray-700">İsim</label> <input
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
          <div className="space-y-6">
            {backgrounds.map((background) => (
              <div key={background.id} className="border rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-medium text-gray-700">{background.label}</h3>
                  <button
                    onClick={() => handleDeleteBackground(background.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Add New Overlay */}
                <form onSubmit={handleAddOverlay} className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Yeni Süsleme Ekle</h4>
                  <div className="grid grid-cols-1 gap-4">
                    <input
                      type="hidden"
                      value={background.id}
                      onChange={(e) => setNewOverlay({ ...newOverlay, backgroundId: e.target.value })}
                    />
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
                        <option value="curtain">Tül</option>
                        <option value="light">Işık</option>
                        <option value="accessory">Aksesuar</option>
                        <option value="chair">Sandalye</option>
                        <option value="sofa">Koltuk</option>
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

                {/* Overlay List */}
                <div className="space-y-4">
                  {background.overlayOptions.map((overlay) => (
                    <div
                      key={overlay.id}
                      className="relative border rounded-lg p-4"
                      ref={containerRef}
                      onMouseMove={handleMouseMove}
                      onMouseUp={handleMouseUp}
                      onMouseLeave={handleMouseUp}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-md font-medium text-gray-700">{overlay.label}</h4>
                        <div className="flex space-x-2">
                          <button
                            onMouseDown={(e) => handleMouseDown(e, background.id, overlay.id)}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Move className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteOverlay(background.id, overlay.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                      <div className="text-sm text-gray-500">
                        <p>Pozisyon: {overlay.settings.top}, {overlay.settings.left}</p>
                        <p>Boyut: {overlay.settings.width} x {overlay.settings.height}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;