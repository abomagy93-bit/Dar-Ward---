import React, { useState } from 'react';
import { useHospitality } from '../context/HospitalityContext';
import { Unit, UnitCategory, UnitStatus } from '../types';
import {
  Lock,
  Unlock,
  X,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Save,
  Image as ImageIcon,
  Phone,
  Layers,
  Settings,
  RotateCcw,
  Download,
  Upload,
  AlertCircle,
  Share2,
  MapPin,
  ExternalLink,
  Video,
} from 'lucide-react';

export const AdminDatabaseModal: React.FC = () => {
  const {
    units,
    settings,
    isAdminOpen,
    setIsAdminOpen,
    isAdminAuthenticated,
    setIsAdminAuthenticated,
    updateUnit,
    toggleUnitStatus,
    addUnit,
    deleteUnit,
    updateSettings,
    resetToDefaults,
  } = useHospitality();

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [activeTab, setActiveTab] = useState<'units' | 'settings' | 'backup'>('units');
  const [editingUnitId, setEditingUnitId] = useState<string | null>(null);
  const [unitPendingDelete, setUnitPendingDelete] = useState<Unit | null>(null);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Settings form state
  const [coverUrlInput, setCoverUrlInput] = useState(settings.coverImageUrl);
  const [facebookUrlInput, setFacebookUrlInput] = useState(settings.facebookUrl || '');
  const [tiktokUrlInput, setTiktokUrlInput] = useState(settings.tiktokUrl || '');
  const [wa1Number, setWa1Number] = useState(settings.whatsapp1.number);
  const [wa1Label, setWa1Label] = useState(settings.whatsapp1.label);
  const [wa2Number, setWa2Number] = useState(settings.whatsapp2.number);
  const [wa2Label, setWa2Label] = useState(settings.whatsapp2.label);
  const [bookingUrl, setBookingUrl] = useState(settings.bookingUrl);
  const [airbnbUrl, setAirbnbUrl] = useState(settings.airbnbUrl);
  const [googleMapsUrl, setGoogleMapsUrl] = useState(settings.location.googleMapsDirectUrl);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  // Secure SHA-256 password hash verification (one-way cryptographic hash)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const cleanInput = passwordInput.trim().toLowerCase();
      const encoder = new TextEncoder();
      const data = encoder.encode(cleanInput);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');

      // Secure cryptographic comparison
      const TARGET_HASH = '44bc6a887f10eb03d053c5b00189f29dac32a67cdc6f38343616d2ae4ba88894';

      if (hashHex === TARGET_HASH) {
        setIsAdminAuthenticated(true);
        setPasswordError('');
        showToast('تم تسجيل الدخول إلى لوحة التحكم بنجاح!');
      } else {
        setPasswordError('كلمة المرور غير صحيحة. يرجى التحقق وإعادة المحاولة.');
      }
    } catch {
      setPasswordError('حدث خطأ أثناء التحقق الأمني. يرجى المحاولة مرة أخرى.');
    }
  };

  const handleSaveSettings = () => {
    updateSettings({
      coverImageUrl: coverUrlInput,
      facebookUrl: facebookUrlInput,
      tiktokUrl: tiktokUrlInput,
      bookingUrl,
      airbnbUrl,
      whatsapp1: {
        ...settings.whatsapp1,
        number: wa1Number,
        label: wa1Label,
      },
      whatsapp2: {
        ...settings.whatsapp2,
        number: wa2Number,
        label: wa2Label,
      },
      location: {
        ...settings.location,
        googleMapsDirectUrl: googleMapsUrl,
      },
    });
    showToast('تم حفظ كافة إعدادات الموقع وروابط التواصل والموقع الجغرافي بنجاح!');
  };

  const handleAddNewUnit = () => {
    const nextNumber = Math.max(...units.map((u) => u.unitNumber), 10) + 1;
    const newUnit: Unit = {
      id: `unit-${Date.now()}`,
      unitNumber: nextNumber,
      category: 'one-bedroom',
      title: `الوحدة رقم ${nextNumber} - شقة فندقية جديدة`,
      description: 'وصف تفصيلي للوحدة الجديدة ومميزاتها وتجهيزاتها لزوار المدينة المنورة.',
      status: 'available',
      pricePerNight: 0,
      currency: 'ر.س',
      capacityGuests: 2,
      bedroomsCount: 1,
      bathroomsCount: 1,
      areaSquareMeters: 45,
      featuredImage: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      images: [
        'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80',
      ],
      amenities: ['تكييف مركزي', 'واي فاي مجاني', 'شاشة ذكية', 'دخول ذكي'],
    };
    addUnit(newUnit);
    setEditingUnitId(newUnit.id);
    showToast('تمت إضافة وحدة جديدة وحفظها في قاعدة البيانات!');
  };

  const handleExportData = () => {
    const data = {
      units,
      settings,
      exportDate: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dar-ward-database-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    showToast('تم تصدير ملف النسخة الاحتياطية بنجاح!');
  };

  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.units && Array.isArray(parsed.units)) {
          parsed.units.forEach((u: Unit) => updateUnit(u));
        }
        if (parsed.settings) {
          updateSettings(parsed.settings);
        }
        showToast('تم استيراد وحفظ البيانات بنجاح في قاعدة البيانات الدائمة!');
      } catch (err) {
        alert('حدث خطأ أثناء قراءة ملف النسخة الاحتياطية.');
      }
    };
    reader.readAsText(file);
  };

  if (!isAdminOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6">
      {/* Toast Notification */}
      {successToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-60 px-6 py-3 rounded-2xl bg-emerald-700 text-white font-bold text-sm shadow-2xl flex items-center gap-2 animate-bounce border border-emerald-400">
          <CheckCircle2 className="w-5 h-5 text-emerald-200" />
          <span>{successToast}</span>
        </div>
      )}

      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-rose-200 overflow-hidden my-6">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-[#881337] via-[#9f1239] to-[#be123c] text-white p-5 sm:p-6 flex items-center justify-between border-b border-[#d4af37]/40">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-black/20 border border-[#d4af37]/50 flex items-center justify-center text-[#fde047]">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-['Amiri',serif] text-xl sm:text-2xl font-bold flex items-center gap-2">
                <span>قاعدة بيانات وإدارة دار ورد للضيافة</span>
                <span className="text-xs px-2 py-0.5 rounded bg-black/20 text-[#fde047] font-sans font-normal">
                  Dar Ward
                </span>
              </h2>
              <p className="text-xs text-rose-100 flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>قاعدة البيانات تحفظ تلقائياً وبشكل دائم ولا تتغير إلا بتعديلك هنا.</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAdminAuthenticated && (
              <button
                onClick={() => {
                  setIsAdminAuthenticated(false);
                  showToast('تم قفل لوحة الإدارة.');
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-black/20 hover:bg-black/40 text-rose-100 border border-white/20 transition-colors"
              >
                قفل اللوحة
              </button>
            )}
            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-2 rounded-xl text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="إغلاق"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Not Authenticated: Password Gate (Required: Kareem) */}
        {!isAdminAuthenticated ? (
          <div className="p-8 sm:p-12 text-center max-w-md mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-rose-100 text-[#9f1239] flex items-center justify-center mx-auto mb-4 border border-rose-200 shadow-inner">
              <Lock className="w-8 h-8 text-[#be123c]" />
            </div>

            <h3 className="font-['Amiri',serif] text-2xl font-bold text-[#881337] mb-2">
              لوحة تحكم قاعدة البيانات محمية
            </h3>

            <p className="text-xs sm:text-sm text-gray-600 mb-6 leading-relaxed">
              يرجى إدخال كلمة المرور للوصول إلى إدارة وحفظ بيانات الوحدات وتحديث حالتها أو تعديل الروابط.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-right">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  كلمة المرور (Password):
                </label>
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 text-center font-mono text-base focus:border-[#9f1239] focus:ring-2 focus:ring-rose-200 outline-none transition-all"
                  autoFocus
                />
              </div>

              {passwordError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#9f1239] to-[#be123c] hover:from-[#881337] hover:to-[#9f1239] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2"
              >
                <Unlock className="w-4 h-4" />
                <span>دخول لوحة قاعدة البيانات</span>
              </button>
            </form>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div>
            {/* Navigation Tabs */}
            <div className="flex border-b border-gray-200 bg-[#fdfbf7] px-4 sm:px-6 overflow-x-auto">
              <button
                onClick={() => {
                  setActiveTab('units');
                  setEditingUnitId(null);
                }}
                className={`py-4 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                  activeTab === 'units'
                    ? 'border-[#9f1239] text-[#881337]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>إدارة الوحدات ({units.length} وحدات)</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`py-4 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                  activeTab === 'settings'
                    ? 'border-[#9f1239] text-[#881337]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>إعدادات الكوفر والتواصل وروابط فيسبوك وتيكتوك</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`py-4 px-4 font-bold text-sm border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'border-[#9f1239] text-[#881337]'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                <span>النسخ الاحتياطي وحفظ البيانات</span>
              </button>
            </div>

            {/* Tab 1: Units Management */}
            {activeTab === 'units' && (
              <div className="p-4 sm:p-6 max-h-[70vh] overflow-y-auto">
                {editingUnitId ? (
                  /* Edit Single Unit View */
                  <UnitEditor
                    unitId={editingUnitId}
                    onClose={() => setEditingUnitId(null)}
                    onSave={(updated) => {
                      updateUnit(updated);
                      setEditingUnitId(null);
                      showToast(`تم حفظ تعديلات الوحدة رقم ${updated.unitNumber} بشكل دائم في قاعدة البيانات!`);
                    }}
                    onDelete={(target) => {
                      setUnitPendingDelete(target);
                    }}
                  />
                ) : (
                  /* Units Table / List */
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                      <div>
                        <h3 className="font-bold text-lg text-[#2c1810]">
                          قائمة الوحدات وتحديد حالتها (متاحة أم مشغولة)
                        </h3>
                        <p className="text-xs text-gray-500">
                          جميع التعديلات هنا تُحفظ بشكل فوري ودائم في قاعدة البيانات دون أي تغيير تلقائي.
                        </p>
                      </div>

                      <button
                        onClick={handleAddNewUnit}
                        className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#9f1239] to-[#be123c] text-white font-bold text-xs shadow hover:bg-[#881337] transition-all flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" />
                        <span>إضافة وحدة جديدة</span>
                      </button>
                    </div>

                    <div className="space-y-4">
                      {[...units]
                        .sort((a, b) => {
                          const catOrder: Record<string, number> = {
                            'one-bedroom': 1,
                            'two-bedrooms': 2,
                            'three-bedrooms': 3,
                            'villa': 4,
                          };
                          const diff = (catOrder[a.category] ?? 99) - (catOrder[b.category] ?? 99);
                          if (diff !== 0) return diff;
                          return Number(a.unitNumber) - Number(b.unitNumber);
                        })
                        .map((unit) => {
                        const isAvailable = unit.status === 'available';
                        const isOccupied = unit.status === 'occupied';

                        return (
                          <div
                            key={unit.id}
                            className="p-4 rounded-2xl bg-[#faf7f4] border border-rose-100 hover:border-rose-300 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
                          >
                            {/* Unit Info & Thumbnail */}
                            <div className="flex items-center gap-4 flex-1">
                              <img
                                src={unit.featuredImage || unit.images[0]}
                                alt={unit.title}
                                className="w-20 h-20 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                                referrerPolicy="no-referrer"
                              />
                              <div>
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="px-2.5 py-0.5 rounded-md bg-[#9f1239] text-white text-xs font-bold">
                                    الوحدة {unit.unitNumber}
                                  </span>
                                  <span className="text-xs text-[#881337] font-bold bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                                    {unit.category === 'one-bedroom' && 'غرفة'}
                                    {unit.category === 'two-bedrooms' && 'غرفتين'}
                                    {unit.category === 'three-bedrooms' && 'ثلاث غرف'}
                                    {unit.category === 'villa' && 'فيلا'}
                                  </span>
                                  {unit.tiktokVideoUrl && (
                                    <span className="text-[10px] text-pink-700 font-bold bg-pink-50 px-2 py-0.5 rounded border border-pink-200 flex items-center gap-1">
                                      <Video className="w-3 h-3" />
                                      <span>TikTok</span>
                                    </span>
                                  )}
                                </div>
                                <h4 className="font-bold text-sm sm:text-base text-[#2c1810]">
                                  {unit.title}
                                </h4>
                                <p className="text-xs text-gray-500 line-clamp-1 max-w-xl">
                                  {unit.description}
                                </p>
                              </div>
                            </div>

                            {/* Status Quick Switcher & Actions */}
                            <div className="flex items-center gap-3 w-full md:w-auto justify-end pt-3 md:pt-0 border-t md:border-t-0 border-rose-100">
                              <div className="inline-flex rounded-xl p-1 bg-white border border-gray-200 shadow-sm">
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleUnitStatus(unit.id, 'available');
                                    showToast(`تم تعيين الوحدة ${unit.unitNumber} كـ متاحة!`);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                    isAvailable
                                      ? 'bg-emerald-600 text-white shadow-sm'
                                      : 'text-gray-500 hover:text-emerald-700'
                                  }`}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  <span>متاحة</span>
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    toggleUnitStatus(unit.id, 'occupied');
                                    showToast(`تم تعيين الوحدة ${unit.unitNumber} كـ مشغولة!`);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                                    isOccupied
                                      ? 'bg-rose-700 text-white shadow-sm'
                                      : 'text-gray-500 hover:text-rose-700'
                                  }`}
                                >
                                  <XCircle className="w-3.5 h-3.5" />
                                  <span>مشغولة</span>
                                </button>
                              </div>

                              <button
                                type="button"
                                onClick={() => setEditingUnitId(unit.id)}
                                className="px-3.5 py-2 rounded-xl bg-white hover:bg-rose-50 text-[#881337] border border-rose-300 text-xs font-bold transition-colors"
                              >
                                تعديل الوصف والصور
                              </button>

                              <button
                                type="button"
                                onClick={() => setUnitPendingDelete(unit)}
                                className="p-2.5 rounded-xl text-rose-500 hover:text-white hover:bg-rose-600 border border-rose-200 transition-colors"
                                title="حذف الوحدة"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Site Settings & Social Media */}
            {activeTab === 'settings' && (
              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6">
                {/* Facebook and TikTok links settings (Explicit User Request: ضيف روابط فيس بوك وتيكتوك) */}
                <div className="p-5 rounded-2xl bg-[#faf7f4] border border-rose-200">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#881337] mb-2">
                    <Share2 className="w-5 h-5 text-[#be123c]" />
                    <span>روابط التواصل الاجتماعي (فيسبوك وتيك توك)</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    أضف أو عدل روابط صفحات دار ورد على فيسبوك وتيك توك لتظهر فوراً في ترويسة وتذييل الموقع:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-xl border border-gray-200">
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#1877F2]" />
                        <span>رابط صفحة فيسبوك (Facebook URL):</span>
                      </label>
                      <input
                        type="url"
                        value={facebookUrlInput}
                        onChange={(e) => setFacebookUrlInput(e.target.value)}
                        placeholder="https://www.facebook.com/..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono"
                        dir="ltr"
                      />
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-gray-200">
                      <label className="block text-xs font-bold text-gray-700 mb-1 flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-black" />
                        <span>رابط حساب تيك توك (TikTok URL):</span>
                      </label>
                      <input
                        type="url"
                        value={tiktokUrlInput}
                        onChange={(e) => setTiktokUrlInput(e.target.value)}
                        placeholder="https://www.tiktok.com/@..."
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs font-mono"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Cover Image Setting */}
                <div className="p-5 rounded-2xl bg-[#faf7f4] border border-rose-200">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#881337] mb-2">
                    <ImageIcon className="w-5 h-5 text-[#be123c]" />
                    <span>رابط صورة الكوفر الرئيسية (Hero Cover Image)</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    الصق رابط الصورة الخاصة بك هنا وسيتم تحديث واجهة الموقع فوراً.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={coverUrlInput}
                      onChange={(e) => setCoverUrlInput(e.target.value)}
                      placeholder="https://example.com/my-cover-image.jpg"
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#9f1239] outline-none"
                    />
                    <button
                      onClick={handleSaveSettings}
                      className="px-5 py-2.5 rounded-xl bg-[#9f1239] text-white text-xs font-bold hover:bg-[#881337] transition-all"
                    >
                      تحديث الكوفر
                    </button>
                  </div>
                  {coverUrlInput && (
                    <div className="mt-3 relative h-36 rounded-xl overflow-hidden border border-gray-300 max-w-sm">
                      <img
                        src={coverUrlInput}
                        alt="معاينة الكوفر"
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-2 left-2 bg-black/60 text-white text-[10px] px-2 py-0.5 rounded">
                        معاينة حية للكوفر
                      </span>
                    </div>
                  )}
                </div>

                {/* Two WhatsApp Numbers Settings */}
                <div className="p-5 rounded-2xl bg-[#faf7f4] border border-rose-200">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#881337] mb-2">
                    <Phone className="w-5 h-5 text-emerald-600" />
                    <span>إعدادات رقمي الواتساب (WhatsApp Numbers)</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    تعديل أرقام التواصل المباشر مع مسمياتها:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-3 bg-white rounded-xl border border-gray-200">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        واتساب ١ (الحجوزات والاستقبال):
                      </label>
                      <input
                        type="text"
                        value={wa1Label}
                        onChange={(e) => setWa1Label(e.target.value)}
                        className="w-full px-3 py-1.5 mb-2 rounded-lg border border-gray-300 text-xs"
                        placeholder="عنوان الخط الأول"
                      />
                      <input
                        type="text"
                        value={wa1Number}
                        onChange={(e) => setWa1Number(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-mono text-emerald-700"
                        placeholder="+966501234567"
                        dir="ltr"
                      />
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-gray-200">
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        واتساب ٢ (الإدارة وخدمة الضيوف):
                      </label>
                      <input
                        type="text"
                        value={wa2Label}
                        onChange={(e) => setWa2Label(e.target.value)}
                        className="w-full px-3 py-1.5 mb-2 rounded-lg border border-gray-300 text-xs"
                        placeholder="عنوان الخط الثاني"
                      />
                      <input
                        type="text"
                        value={wa2Number}
                        onChange={(e) => setWa2Number(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-sm font-mono text-[#9f1239]"
                        placeholder="+966559876543"
                        dir="ltr"
                      />
                    </div>
                  </div>
                </div>

                {/* Booking & Airbnb Links */}
                <div className="p-5 rounded-2xl bg-[#faf7f4] border border-rose-200">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#881337] mb-2">
                    <span>روابط صفحات Booking.com و Airbnb</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        رابط Booking.com:
                      </label>
                      <input
                        type="url"
                        value={bookingUrl}
                        onChange={(e) => setBookingUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 mb-1">
                        رابط Airbnb:
                      </label>
                      <input
                        type="url"
                        value={airbnbUrl}
                        onChange={(e) => setAirbnbUrl(e.target.value)}
                        className="w-full px-3 py-2 rounded-lg border border-gray-300 text-xs"
                      />
                    </div>
                  </div>
                </div>

                {/* Google Maps Location Setting */}
                <div className="p-5 rounded-2xl bg-[#faf7f4] border border-rose-200">
                  <div className="flex items-center gap-2 font-bold text-sm sm:text-base text-[#881337] mb-2">
                    <MapPin className="w-5 h-5 text-[#be123c]" />
                    <span>رابط موقع دار ورد على خرائط Google (Google Maps)</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-3">
                    رابط المشاركة المباشر لموقع دار ورد للضيافة على خرائط Google:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="url"
                      value={googleMapsUrl}
                      onChange={(e) => setGoogleMapsUrl(e.target.value)}
                      placeholder="https://share.google/... أو https://maps.google.com/..."
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-xs font-mono focus:border-[#9f1239] outline-none"
                      dir="ltr"
                    />
                    {googleMapsUrl && (
                      <a
                        href={googleMapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2.5 rounded-xl bg-[#881337] hover:bg-[#9f1239] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>فتح الرابط للتجربة</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Save General Settings Button */}
                <div className="text-left pt-2">
                  <button
                    onClick={handleSaveSettings}
                    className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-sm shadow hover:bg-emerald-700 transition-all flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>حفظ كافة الإعدادات والروابط في قاعدة البيانات</span>
                  </button>
                </div>
              </div>
            )}

            {/* Tab 3: Backup & Persistence (Guaranteed to not lose data) */}
            {activeTab === 'backup' && (
              <div className="p-6 max-h-[70vh] overflow-y-auto space-y-6 text-center max-w-lg mx-auto">
                <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-300 text-right">
                  <div className="flex items-center gap-2 font-bold text-emerald-900 text-sm mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>حالة قاعدة البيانات: محفوظة ودائمة</span>
                  </div>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    تم تكوين قاعدة البيانات لتكون دائمة الحفظ في متصفحك. لن تُفقد أو تُعاد تلقائياً لأي وضع سابق إلا إذا قمت أنت شخصياً بإعادة الضبط يدوياً.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-[#faf7f4] border border-rose-200">
                  <h4 className="font-bold text-base text-[#881337] mb-2">تصدير واستيراد نسخة احتياطية</h4>
                  <p className="text-xs text-gray-500 mb-4">
                    يمكنك تنزيل ملف نسخة احتياطية كامل من قاعدة البيانات أو استرجاعه في أي وقت وعلى أي جهاز.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      onClick={handleExportData}
                      className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-rose-300 text-[#881337] hover:bg-rose-50 text-xs font-bold transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      <span>تصدير نسخة احتياطية (JSON)</span>
                    </button>

                    <label className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 text-xs font-bold transition-colors flex items-center justify-center gap-2 cursor-pointer">
                      <Upload className="w-4 h-4" />
                      <span>استيراد ملف نسخة احتياطية</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={handleImportData}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-rose-50/50 border border-rose-200">
                  <h4 className="font-bold text-base text-rose-800 mb-2">إعادة ضبط البيانات للوضع الافتراضي</h4>
                  <p className="text-xs text-rose-700 mb-4">
                    ملاحظة: هذا الزر اختياري فقط، ولن يتم استرجاع البيانات الأصلية إلا إذا نقرت هنا وأكدت الرغبة.
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsResetConfirmOpen(true)}
                    className="px-5 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors flex items-center justify-center gap-2 mx-auto"
                  >
                    <RotateCcw className="w-4 h-4" />
                    <span>استعادة البيانات الأصلية</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Confirmation Modal: Delete Unit */}
        {unitPendingDelete && (
          <div className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-200 text-center animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#2c1810] mb-2">
                تأكيد حذف الوحدة رقم {unitPendingDelete.unitNumber}
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                هل أنت متأكد من رغبتك في حذف <strong>({unitPendingDelete.title})</strong> نهائياً من قاعدة البيانات؟ سيتم مسحها فوراً وحفظ التغيير.
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setUnitPendingDelete(null)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                >
                  إلغاء التراجع
                </button>
                <button
                  type="button"
                  onClick={() => {
                    deleteUnit(unitPendingDelete.id);
                    showToast(`تم حذف الوحدة رقم ${unitPendingDelete.unitNumber} بنجاح من قاعدة البيانات!`);
                    setUnitPendingDelete(null);
                    if (editingUnitId === unitPendingDelete.id) {
                      setEditingUnitId(null);
                    }
                  }}
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-700 hover:to-rose-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  نعم، احذف الوحدة الآن
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Custom Confirmation Modal: Reset Defaults */}
        {isResetConfirmOpen && (
          <div className="fixed inset-0 z-[120] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-rose-200 text-center animate-in fade-in zoom-in-95">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg text-[#2c1810] mb-2">
                تأكيد استعادة البيانات الأصلية
              </h3>
              <p className="text-xs text-gray-600 mb-6 leading-relaxed">
                هل أنت متأكد تماماً من رغبتك في إعادة تعيين كافة بيانات الوحدات والإعدادات إلى الوضع الافتراضي؟
              </p>
              <div className="flex gap-3 justify-center">
                <button
                  type="button"
                  onClick={() => setIsResetConfirmOpen(false)}
                  className="px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs transition-colors"
                >
                  إلغاء
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetToDefaults();
                    setIsResetConfirmOpen(false);
                    showToast('تمت استعادة البيانات الافتراضية بنجاح!');
                  }}
                  className="px-6 py-2.5 rounded-xl bg-rose-700 hover:bg-rose-800 text-white font-bold text-xs shadow-md transition-all"
                >
                  نعم، استعادة البيانات
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Unit Editor Subcomponent
const UnitEditor: React.FC<{
  unitId: string;
  onClose: () => void;
  onSave: (unit: Unit) => void;
  onDelete?: (unit: Unit) => void;
}> = ({ unitId, onClose, onSave, onDelete }) => {
  const { getUnitById } = useHospitality();
  const original = getUnitById(unitId);

  const [form, setForm] = useState<Unit>(
    original || {
      id: unitId,
      unitNumber: 0,
      category: 'one-bedroom',
      title: '',
      subtitle: '',
      description: '',
      status: 'available',
      pricePerNight: 0,
      currency: 'ر.س',
      capacityGuests: 2,
      bedroomsCount: 1,
      bathroomsCount: 1,
      areaSquareMeters: 40,
      featuredImage: '',
      images: [],
      amenities: [],
      tiktokVideoUrl: '',
    }
  );

  const [newImageUrl, setNewImageUrl] = useState('');
  const [newAmenity, setNewAmenity] = useState('');

  const handleAddImage = () => {
    if (newImageUrl.trim()) {
      setForm((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl.trim()],
        featuredImage: prev.featuredImage || newImageUrl.trim(),
      }));
      setNewImageUrl('');
    }
  };

  const handleRemoveImage = (index: number) => {
    setForm((prev) => {
      const nextImages = prev.images.filter((_, i) => i !== index);
      return {
        ...prev,
        images: nextImages,
        featuredImage: nextImages[0] || '',
      };
    });
  };

  const handleAddAmenity = () => {
    if (newAmenity.trim()) {
      setForm((prev) => ({
        ...prev,
        amenities: [...prev.amenities, newAmenity.trim()],
      }));
      setNewAmenity('');
    }
  };

  const handleRemoveAmenity = (index: number) => {
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h3 className="font-bold text-lg text-[#881337]">
          تعديل بيانات الوحدة رقم {form.unitNumber}
        </h3>
        <button
          onClick={onClose}
          className="text-xs text-gray-500 hover:text-gray-800 bg-gray-100 px-3 py-1 rounded-lg"
        >
          إلغاء والرجوع
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Unit Number */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">رقم الوحدة:</label>
          <input
            type="number"
            value={form.unitNumber}
            onChange={(e) => setForm({ ...form, unitNumber: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold"
          />
        </div>

        {/* Category: ONLY غرفة، غرفتين، ثلاث غرف، فيلا */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">الفئة:</label>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value as UnitCategory })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold bg-white text-[#881337]"
          >
            <option value="one-bedroom">غرفة</option>
            <option value="two-bedrooms">غرفتين</option>
            <option value="three-bedrooms">ثلاث غرف</option>
            <option value="villa">فيلا</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">حالة الوحدة:</label>
          <select
            value={form.status}
            onChange={(e) => setForm({ ...form, status: e.target.value as UnitStatus })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm font-bold bg-white"
          >
            <option value="available">متاحة للحجز (Available)</option>
            <option value="occupied">مشغولة حالياً (Occupied)</option>
            <option value="maintenance">قيد الصيانة والتجهيز</option>
          </select>
        </div>

        {/* Title */}
        <div className="sm:col-span-2">
          <label className="block text-xs font-bold text-gray-700 mb-1">عنوان الوحدة:</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
          />
        </div>

        {/* Floor */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">الطابق / الدور:</label>
          <input
            type="text"
            value={form.floor || ''}
            onChange={(e) => setForm({ ...form, floor: e.target.value })}
            placeholder="مثال: الطابق الثاني"
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
          />
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">سعة الضيوف:</label>
          <input
            type="number"
            value={form.capacityGuests}
            onChange={(e) => setForm({ ...form, capacityGuests: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
          />
        </div>

        {/* Bedrooms */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">عدد غرف النوم:</label>
          <input
            type="number"
            value={form.bedroomsCount}
            onChange={(e) => setForm({ ...form, bedroomsCount: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
          />
        </div>

        {/* Bathrooms */}
        <div>
          <label className="block text-xs font-bold text-gray-700 mb-1">دورات المياه:</label>
          <input
            type="number"
            value={form.bathroomsCount}
            onChange={(e) => setForm({ ...form, bathroomsCount: parseInt(e.target.value) || 1 })}
            className="w-full px-3 py-2 rounded-xl border border-gray-300 text-sm"
          />
        </div>
      </div>

      {/* TikTok Video Section */}
      <div className="p-4 sm:p-5 rounded-2xl bg-[#faf7f4] border border-rose-200">
        <label className="block text-xs font-bold text-[#881337] mb-1 flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-black flex items-center justify-center">
            <Video className="w-3.5 h-3.5 text-white" />
          </div>
          <span>رابط فيديو تيك توك للوحدة (TikTok Video URL):</span>
        </label>
        <p className="text-[11px] text-gray-500 mb-2.5 leading-relaxed">
          الصق رابط فيديو تيك توك الخاص بهذه الوحدة (مثلاً: https://www.tiktok.com/@user/video/1234567890...) ليشاهده العميل مباشرة على نفس الصفحة.
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={form.tiktokVideoUrl || ''}
            onChange={(e) => setForm({ ...form, tiktokVideoUrl: e.target.value })}
            placeholder="https://www.tiktok.com/@darward/video/..."
            className="flex-1 px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs font-mono bg-white focus:border-[#9f1239] outline-none"
            dir="ltr"
          />
          {form.tiktokVideoUrl && (
            <a
              href={form.tiktokVideoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-2 bg-stone-800 hover:bg-black text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>تجربة الرابط</span>
            </a>
          )}
        </div>
        {form.tiktokVideoUrl && (
          <div className="mt-2 text-[11px] text-emerald-700 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>سيتم تضمين الفيديو وعرضه في مشغل فيديو تفاعلي داخل صفحة الوحدة.</span>
          </div>
        )}
      </div>

      {/* Description */}
      <div>
        <label className="block text-xs font-bold text-gray-700 mb-1">وصف الوحدة التفصيلي:</label>
        <textarea
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm leading-relaxed"
          placeholder="أدخل وصفاً راقياً لمرافق وتفاصيل الوحدة..."
        />
      </div>

      {/* Images Section */}
      <div className="p-4 rounded-2xl bg-[#faf7f4] border border-rose-200">
        <label className="block text-xs font-bold text-[#881337] mb-2">
          صور الوحدة (يمكنك إضافة روابط صور متعددة):
        </label>

        <div className="flex gap-2 mb-4">
          <input
            type="url"
            value={newImageUrl}
            onChange={(e) => setNewImageUrl(e.target.value)}
            placeholder="الصق رابط صورة جديدة (https://...)"
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs"
          />
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-[#9f1239] text-white text-xs font-bold rounded-xl hover:bg-[#881337]"
          >
            إضافة صورة
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {form.images.map((img, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden border border-gray-300 h-28 bg-gray-100"
            >
              <img
                src={img}
                alt={`صورة ${idx + 1}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="absolute top-1 left-1 bg-rose-600 text-white p-1 rounded-full opacity-80 hover:opacity-100 transition-opacity"
                title="حذف الصورة"
              >
                <X className="w-3.5 h-3.5" />
              </button>
              {idx === 0 && (
                <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded">
                  الرئيسية
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Amenities Section */}
      <div className="p-4 rounded-2xl bg-[#faf7f4] border border-rose-200">
        <label className="block text-xs font-bold text-[#881337] mb-2">المرافق والتجهيزات:</label>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newAmenity}
            onChange={(e) => setNewAmenity(e.target.value)}
            placeholder="مثال: سرير كينج، جاكوزي، إنترنت مجاني..."
            className="flex-1 px-3 py-2 rounded-xl border border-gray-300 text-xs"
          />
          <button
            type="button"
            onClick={handleAddAmenity}
            className="px-4 py-2 bg-[#9f1239] text-white text-xs font-bold rounded-xl"
          >
            إضافة مرفق
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {form.amenities.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-white border border-gray-200 text-xs text-gray-700"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveAmenity(idx)}
                className="text-gray-400 hover:text-rose-600"
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* Save & Delete Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-200">
        <div>
          {original && onDelete && (
            <button
              type="button"
              onClick={() => onDelete(original)}
              className="px-4 py-2.5 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-100 border border-rose-200 text-xs font-bold transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4" />
              <span>حذف هذه الوحدة</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl text-gray-600 hover:bg-gray-100 text-xs font-bold"
          >
            إلغاء
          </button>
          <button
            type="button"
            onClick={() => onSave(form)}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 text-white text-sm font-bold shadow hover:from-emerald-700 hover:to-teal-800 flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>حفظ التعديلات في قاعدة البيانات الدائمة</span>
          </button>
        </div>
      </div>
    </div>
  );
};
