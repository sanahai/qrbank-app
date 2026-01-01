'use client';

// 1. 빌드 에러 해결의 핵심 (정적 생성 방지)
// 이 설정은 파일의 최상단(use client 바로 아래)에 있어야 합니다.
export const dynamic = 'force-dynamic';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { 
  Users, Store, MousePointerClick, TrendingUp, Plus, Trash2, Search, Megaphone, X, Edit, Phone, Building2, User, Briefcase, Link as LinkIcon, Calendar, Wallet, Activity, ArrowUpRight 
} from 'lucide-react';

const visitData = [
  { name: '월', visits: 4000 }, { name: '화', visits: 3000 }, { name: '수', visits: 2000 },
  { name: '목', visits: 2780 }, { name: '금', visits: 1890 }, { name: '토', visits: 2390 },
  { name: '일', visits: 3490 },
];
const BANK_LIST = ['KB국민', '신한', '우리', '하나', 'NH농협', 'IBK기업', '카카오뱅크', '토스뱅크', '새마을금고', '우체국', 'SC제일', '대구', '부산', '광주', '제주', '전북', '경남', '수협', '신협'];

const getToday = () => new Date().toISOString().split('T')[0];

// -------------------------------------------------------------------------
// [2] 실제 로직이 들어가는 내부 컴포넌트
// -------------------------------------------------------------------------
function AdminContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeTab = searchParams.get('view') || 'overview';
  const setActiveTab = (tabName: string) => router.push(`/admin?view=${tabName}`);

  // --- 가맹점 데이터 ---
  const [merchants, setMerchants] = useState([
    { 
      id: '2512003', name: '강남 네일샵', category: '서비스',
      bank: '하나', accountOwner: '이영희', accountNumber: '333-3333-3333',
      contact: '010-5555-7777', address: '서울 강남구 테헤란로 4',
      date: '2025-12-03', status: '심사중',
      stats: { today: 12, week: 84, month: 320, total: 1250 }
    },
    { 
      id: '2512002', name: '성수 카페 거리', category: '카페',
      bank: '신한', accountOwner: '김철수', accountNumber: '110-123-456789',
      contact: '010-9876-5432', address: '서울 성동구 연무장길 5',
      date: '2025-12-02', status: '운영중',
      stats: { today: 45, week: 310, month: 1200, total: 5600 }
    },
    { 
      id: '2512001', name: '연희동 떡볶이', category: '요식업',
      bank: 'KB국민', accountOwner: '홍길동', accountNumber: '938-202-01-123456',
      contact: '02-333-4444', address: '서울 서대문구 연희로 123',
      date: '2025-12-01', status: '운영중',
      stats: { today: 120, week: 850, month: 3400, total: 15200 }
    },
  ]);
  const [merchantSearchTerm, setMerchantSearchTerm] = useState('');
  const [isMerchantModalOpen, setIsMerchantModalOpen] = useState(false);
  const [editingMerchantId, setEditingMerchantId] = useState<string | null>(null);
  const initialMerchantForm = { name: '', category: '요식업', bank: 'KB국민', accountOwner: '', accountNumber: '', contact: '', address: '', status: '심사중' };
  const [merchantFormData, setMerchantFormData] = useState(initialMerchantForm);
  const filteredMerchants = merchants.filter(m => m.name.includes(merchantSearchTerm) || m.id.includes(merchantSearchTerm));

  const openMerchantModal = (merchant?: any) => {
    if (merchant) {
      setEditingMerchantId(merchant.id);
      setMerchantFormData({ ...merchant });
    } else {
      setEditingMerchantId(null);
      setMerchantFormData(initialMerchantForm);
    }
    setIsMerchantModalOpen(true);
  };
  const handleSaveMerchant = () => {
    if (!merchantFormData.name || !merchantFormData.accountOwner) return alert('필수 정보를 입력해주세요.');
    if (editingMerchantId) {
      setMerchants(merchants.map(m => m.id === editingMerchantId ? { ...m, ...merchantFormData } : m));
      alert('수정되었습니다.');
    } else {
      const now = new Date();
      const yy = now.getFullYear().toString().slice(2); 
      const mm = String(now.getMonth() + 1).padStart(2, '0');
      const count = merchants.filter(m => m.id.startsWith(yy + mm)).length + 1; 
      const newId = `${yy}${mm}${String(count).padStart(3, '0')}`;
      setMerchants([{ id: newId, ...merchantFormData, date: getToday(), status: '심사중', stats: { today: 0, week: 0, month: 0, total: 0 } }, ...merchants]);
      alert('등록되었습니다.');
    }
    setIsMerchantModalOpen(false);
  };
  const deleteMerchant = (id: string) => confirm('삭제하시겠습니까?') && setMerchants(merchants.filter(m => m.id !== id));

  // --- 광고주 데이터 ---
  const [advertisers, setAdvertisers] = useState([
    { 
      id: '25003', company: '배달의민족', category: '서비스', name: '박홍보', phone: '010-5555-7777', totalSpent: 0, status: 'Paused', date: '2025-12-03',
      stats: { today: 5, week: 20, month: 100, total: 100 }
    },
    { 
      id: '25002', company: '쿠팡', category: '유통/커머스', name: '이마케팅', phone: '010-9876-5432', totalSpent: 3200000, status: 'Active', date: '2025-12-02',
      stats: { today: 150, week: 1200, month: 5000, total: 24000 }
    },
    { 
      id: '25001', company: '삼성전자', category: '전자/IT', name: '김광고', phone: '010-1234-5678', totalSpent: 5000000, status: 'Active', date: '2025-12-01',
      stats: { today: 230, week: 1500, month: 6200, total: 35000 }
    },
  ]);
  const totalRevenue = advertisers.reduce((sum, item) => sum + Number(item.totalSpent), 0);
  const [isAdModalOpen, setIsAdModalOpen] = useState(false);
  const [editingAdId, setEditingAdId] = useState<string | null>(null);
  const initialAdForm = { company: '', category: '기타', name: '', phone: '', totalSpent: 0, status: 'Active' };
  const [adFormData, setAdFormData] = useState(initialAdForm);
  const openAdModal = (ad?: any) => {
    if (ad) {
      setEditingAdId(ad.id);
      setAdFormData({ ...ad });
    } else {
      setEditingAdId(null);
      setAdFormData(initialAdForm);
    }
    setIsAdModalOpen(true);
  };
  const handleSaveAdvertiser = () => {
    if (!adFormData.company || !adFormData.name) return alert('업체명과 담당자명은 필수입니다.');
    if (editingAdId) {
      setAdvertisers(advertisers.map(ad => ad.id === editingAdId ? { ...ad, ...adFormData, totalSpent: Number(adFormData.totalSpent) } : ad));
      alert('수정되었습니다.');
    } else {
      const yy = new Date().getFullYear().toString().slice(2);
      const count = advertisers.filter(ad => ad.id.startsWith(yy)).length + 1;
      const newId = `${yy}${String(count).padStart(3, '0')}`;
      setAdvertisers([{ id: newId, ...adFormData, totalSpent: Number(adFormData.totalSpent), date: getToday(), stats: { today: 0, week: 0, month: 0, total: 0 } }, ...advertisers]);
      alert('등록되었습니다.');
    }
    setIsAdModalOpen(false);
  };
  const deleteAdvertiser = (id: string) => confirm('삭제하시겠습니까?') && setAdvertisers(advertisers.filter(ad => ad.id !== id));

  // --- 배너 데이터 ---
  const [banners, setBanners] = useState([
    { id: 2, text: '옆집 카페 10% 할인 쿠폰 받기', subText: '당일 영수증 지참 시', url: 'https://starbucks.co.kr', type: 'Ad', active: true, date: '2025-12-05' },
    { id: 1, text: '송금 후 사장님께 화면 보여주면 음료수 1캔 무료!', subText: '테이블당 1회 한정', url: '', type: 'Event', active: true, date: '2025-12-01' },
  ]);
  const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);
  const [editingBannerId, setEditingBannerId] = useState<number | null>(null);
  const initialBannerForm = { text: '', subText: '', url: '', type: 'Ad', active: true };
  const [bannerFormData, setBannerFormData] = useState(initialBannerForm);

  const openBannerModal = (banner?: any) => {
    if (banner) {
      setEditingBannerId(banner.id);
      setBannerFormData({ ...banner });
    } else {
      setEditingBannerId(null);
      setBannerFormData(initialBannerForm);
    }
    setIsBannerModalOpen(true);
  };

  const handleSaveBanner = () => {
    if (!bannerFormData.text) return alert('배너 문구는 필수입니다.');
    if (editingBannerId) {
      setBanners(banners.map(b => b.id === editingBannerId ? { ...b, ...bannerFormData } : b));
      alert('배너가 수정되었습니다.');
    } else {
      setBanners([{ id: Date.now(), ...bannerFormData, date: getToday() }, ...banners]);
      alert('새 배너가 등록되었습니다.');
    }
    setIsBannerModalOpen(false);
  };

  const deleteBanner = (id: number) => {
    if(confirm('이 배너를 삭제하시겠습니까?')) {
      setBanners(banners.filter(b => b.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto relative pb-20">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">총괄 관리자 시스템</h1>
        <p className="text-gray-500 text-sm mt-1">QRBANK 플랫폼의 모든 현황을 관리합니다.</p>
        <div className="flex gap-2 mt-6 border-b border-gray-200">
          {[
            { id: 'overview', label: '대시보드 개요' },
            { id: 'merchants', label: '가맹점 관리' },
            { id: 'advertisers', label: '광고주 및 매출' },
            { id: 'banners', label: '앱 배너 관리' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-bold capitalize transition-colors border-b-2 ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </header>

      {/* --- [TAB 1: 대시보드 개요] --- */}
      {activeTab === 'overview' && (
        <div className="animate-fade-in-up">
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-blue-50 rounded-lg text-blue-600"><Users size={20} /></div><span className="text-sm text-gray-500 font-bold">총 가맹점</span></div>
               <p className="text-3xl font-extrabold text-gray-900">{merchants.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-green-50 rounded-lg text-green-600"><TrendingUp size={20} /></div><span className="text-sm text-gray-500 font-bold">총 광고 수익</span></div>
               <p className="text-3xl font-extrabold text-gray-900">₩ {(totalRevenue / 10000).toFixed(0)}만</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-purple-50 rounded-lg text-purple-600"><MousePointerClick size={20} /></div><span className="text-sm text-gray-500 font-bold">광고주 수</span></div>
               <p className="text-3xl font-extrabold text-gray-900">{advertisers.length}</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
               <div className="flex items-center gap-3 mb-2"><div className="p-2 bg-orange-50 rounded-lg text-orange-600"><Store size={20} /></div><span className="text-sm text-gray-500 font-bold">활성 광고</span></div>
               <p className="text-3xl font-extrabold text-gray-900">{banners.length}개</p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
             <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
               <Activity size={20} className="text-blue-500" /> 전체 스캔/트래픽 현황
             </h3>
             <div className="grid grid-cols-3 gap-8">
               <div className="bg-blue-50 rounded-2xl p-6 relative overflow-hidden group hover:bg-blue-100 transition-colors">
                 <div className="absolute right-0 top-0 p-4 opacity-10 transform translate-x-2 -translate-y-2"><MousePointerClick size={100} /></div>
                 <p className="text-sm font-bold text-blue-500 mb-2 flex items-center gap-1">TODAY <ArrowUpRight size={14}/></p>
                 <div className="flex items-baseline gap-2"><span className="text-4xl font-extrabold text-gray-900">3,490</span><span className="text-sm text-blue-600 font-bold">+12%</span></div>
                 <p className="text-xs text-gray-500 mt-2">전일 대비 증가</p>
               </div>
               <div className="bg-green-50 rounded-2xl p-6 relative overflow-hidden group hover:bg-green-100 transition-colors">
                 <div className="absolute right-0 top-0 p-4 opacity-10 transform translate-x-2 -translate-y-2"><TrendingUp size={100} /></div>
                 <p className="text-sm font-bold text-green-600 mb-2 flex items-center gap-1">WEEKLY <ArrowUpRight size={14}/></p>
                 <div className="flex items-baseline gap-2"><span className="text-4xl font-extrabold text-gray-900">24,500</span><span className="text-sm text-green-600 font-bold">+5.4%</span></div>
                 <p className="text-xs text-gray-500 mt-2">지난주 대비 증가</p>
               </div>
               <div className="bg-purple-50 rounded-2xl p-6 relative overflow-hidden group hover:bg-purple-100 transition-colors">
                 <div className="absolute right-0 top-0 p-4 opacity-10 transform translate-x-2 -translate-y-2"><Calendar size={100} /></div>
                 <p className="text-sm font-bold text-purple-600 mb-2 flex items-center gap-1">MONTHLY <ArrowUpRight size={14}/></p>
                 <div className="flex items-baseline gap-2"><span className="text-4xl font-extrabold text-gray-900">98,200</span><span className="text-sm text-purple-600 font-bold">+8.2%</span></div>
                 <p className="text-xs text-gray-500 mt-2">전월 대비 증가</p>
               </div>
             </div>
          </div>
        </div>
      )}

      {/* --- [TAB 2: 가맹점 관리] --- */}
      {activeTab === 'merchants' && (
        <div className="animate-fade-in-up">
          <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              <input 
                type="text" placeholder="가맹점명, ID 검색" 
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm w-64 focus:outline-none focus:border-blue-500"
                value={merchantSearchTerm} onChange={(e) => setMerchantSearchTerm(e.target.value)}
              />
            </div>
            <button onClick={() => openMerchantModal()} className="bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-blue-700 flex items-center gap-2 shadow-md active:scale-95"><Plus size={18} /> 신규 가맹점 등록</button>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase border-b border-gray-100">
                  <th className="px-6 py-4 font-bold w-[35%]">가맹점 정보 (ID / 상호)</th>
                  <th className="px-6 py-4 font-bold w-[10%]">등록일</th>
                  <th className="px-6 py-4 font-bold w-[45%] text-center">스캔 현황 (오늘/주간/월간/누적)</th>
                  <th className="px-6 py-4 font-bold w-[5%] text-center">상태</th>
                  <th className="px-6 py-4 font-bold w-[5%] text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {filteredMerchants.map((m) => (
                  <tr key={m.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-blue-500 font-bold bg-blue-50 px-2 py-1 rounded shrink-0">{m.id}</span>
                        <span className="font-bold text-gray-800 text-base">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{m.date}</td>
                    <td className="px-6 py-4">
                      <div className="flex justify-between items-center bg-gray-50 rounded-lg p-2 px-4 gap-4 text-xs">
                        <div className="text-center"><div className="text-gray-400 text-[10px]">Today</div><div className="font-bold text-blue-600">{m.stats?.today.toLocaleString()}</div></div>
                        <div className="w-px h-6 bg-gray-200"></div>
                        <div className="text-center"><div className="text-gray-400 text-[10px]">Weekly</div><div className="font-bold text-gray-700">{m.stats?.week.toLocaleString()}</div></div>
                        <div className="w-px h-6 bg-gray-200"></div>
                        <div className="text-center"><div className="text-gray-400 text-[10px]">Monthly</div><div className="font-bold text-gray-700">{m.stats?.month.toLocaleString()}</div></div>
                        <div className="w-px h-6 bg-gray-200"></div>
                        <div className="text-center"><div className="text-gray-400 text-[10px]">Total</div><div className="font-bold text-gray-900">{m.stats?.total.toLocaleString()}</div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${m.status === '운영중' ? 'bg-green-100 text-green-700' : m.status === '중단' ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-500'}`}>{m.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button onClick={() => openMerchantModal(m)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-blue-600"><Edit size={16}/></button>
                         <button onClick={() => deleteMerchant(m.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- [TAB 3: 광고주 관리] --- */}
      {activeTab === 'advertisers' && (
        <div className="animate-fade-in-up">
           <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-8 rounded-2xl text-white mb-6 shadow-lg">
             <div className="flex justify-between items-center">
               <div><p className="text-slate-400 text-sm font-medium mb-1">총 누적 매출</p><h2 className="text-4xl font-extrabold">₩ {totalRevenue.toLocaleString()}</h2></div>
               <div className="bg-white/10 p-4 rounded-xl"><TrendingUp size={32} className="text-green-400" /></div>
             </div>
           </div>

           <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
             <h3 className="font-bold text-gray-800 ml-2">광고주 목록 ({advertisers.length})</h3>
             <button onClick={() => openAdModal()} className="bg-indigo-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-indigo-700 flex items-center gap-2 shadow-md active:scale-95"><Plus size={18} /> 신규 광고주 등록</button>
           </div>

           <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-500 text-xs uppercase">
                  <th className="px-6 py-4 font-bold w-[30%]">업체 정보 (ID / 상호)</th>
                  <th className="px-6 py-4 font-bold w-[10%]">등록일</th>
                  <th className="px-6 py-4 font-bold w-[15%]">집행 예산</th>
                  <th className="px-6 py-4 font-bold w-[35%] text-center">효율 현황 (클릭수)</th>
                  <th className="px-6 py-4 font-bold w-[5%] text-center">상태</th>
                  <th className="px-6 py-4 font-bold w-[5%] text-right">관리</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                {advertisers.map((ad) => (
                  <tr key={ad.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded shrink-0">{ad.id}</span>
                        <span className="font-bold text-gray-800 text-base">{ad.company}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500 text-xs">{ad.date}</td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-indigo-700 text-base">
                        ₩ {(ad.totalSpent / 10000).toLocaleString()}만
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex justify-between items-center bg-indigo-50 rounded-lg p-2 px-3 gap-2 text-xs border border-indigo-100">
                        <div className="text-center"><div className="text-indigo-400 text-[9px]">Today</div><div className="font-bold text-indigo-700">{ad.stats?.today.toLocaleString()}</div></div>
                        <div className="w-px h-5 bg-indigo-200"></div>
                        <div className="text-center"><div className="text-indigo-400 text-[9px]">Weekly</div><div className="font-bold text-gray-700">{ad.stats?.week.toLocaleString()}</div></div>
                        <div className="w-px h-5 bg-indigo-200"></div>
                        <div className="text-center"><div className="text-indigo-400 text-[9px]">Monthly</div><div className="font-bold text-gray-700">{ad.stats?.month.toLocaleString()}</div></div>
                        <div className="w-px h-5 bg-indigo-200"></div>
                        <div className="text-center"><div className="text-indigo-400 text-[9px]">Total</div><div className="font-bold text-gray-900">{ad.stats?.total.toLocaleString()}</div></div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className={`px-2 py-1 rounded text-[10px] font-bold ${ad.status === 'Active' ? 'bg-indigo-100 text-indigo-700' : 'bg-gray-100 text-gray-500'}`}>{ad.status}</span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                         <button onClick={() => openAdModal(ad)} className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-indigo-600"><Edit size={16}/></button>
                         <button onClick={() => deleteAdvertiser(ad.id)} className="p-2 hover:bg-red-50 rounded-lg text-gray-400 hover:text-red-500"><Trash2 size={16}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* --- [TAB 4: 배너 광고 관리] --- */}
      {activeTab === 'banners' && (
        <div className="animate-fade-in-up">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-6 flex justify-between items-center">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Megaphone size={20} className="text-orange-500"/> 앱 배너 관리
            </h3>
            <button onClick={() => openBannerModal()} className="bg-orange-500 text-white px-5 py-2 rounded-lg text-sm font-bold hover:bg-orange-600 flex items-center gap-2 shadow-sm"><Plus size={16} /> 새 배너 등록</button>
          </div>
          <div className="grid gap-4">
            {banners.map((banner) => (
              <div key={banner.id} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center group hover:border-orange-300 transition-colors">
                 <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-lg text-white ${banner.type === 'Event' ? 'bg-orange-400' : 'bg-blue-400'}`}>
                      <Megaphone size={20} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${banner.type === 'Event' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>{banner.type}</span>
                        <span className="text-[10px] text-gray-400 flex items-center gap-1"><Calendar size={10}/> {banner.date}</span>
                        {banner.url && <a href={banner.url} target="_blank" className="text-xs text-gray-400 hover:text-blue-500 flex items-center gap-1"><LinkIcon size={12}/> 링크 이동</a>}
                      </div>
                      <span className="font-bold text-gray-800 text-lg">{banner.text}</span>
                      {banner.subText && <p className="text-sm text-gray-500 mt-0.5">{banner.subText}</p>}
                    </div>
                 </div>
                 <div className="flex gap-2">
                   <button onClick={() => openBannerModal(banner)} className="p-2 bg-gray-50 hover:bg-orange-50 text-gray-400 hover:text-orange-600 rounded-lg transition-colors"><Edit size={18} /></button>
                   <button onClick={() => deleteBanner(banner.id)} className="p-2 bg-gray-50 hover:bg-red-50 text-gray-400 hover:text-red-500 rounded-lg transition-colors"><Trash2 size={18} /></button>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMerchantModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]">
            <div className={`p-4 flex justify-between items-center text-white shrink-0 ${editingMerchantId ? 'bg-blue-800' : 'bg-blue-600'}`}>
              <h3 className="font-bold text-lg flex items-center gap-2"><Store size={20}/> {editingMerchantId ? '가맹점 정보 수정' : '신규 가맹점 등록'}</h3>
              <button onClick={() => setIsMerchantModalOpen(false)}><X size={20}/></button>
            </div>
            <div className="p-6 overflow-y-auto custom-scrollbar space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2"><label className="text-xs font-bold text-gray-500 mb-1 block">가맹점명</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={merchantFormData.name} onChange={e => setMerchantFormData({...merchantFormData, name: e.target.value})} placeholder="상호명 입력" /></div>
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">업종</label><select className="w-full border p-2 rounded-lg text-sm outline-none bg-white" value={merchantFormData.category} onChange={e => setMerchantFormData({...merchantFormData, category: e.target.value})}>{['요식업', '카페', '소매업', '서비스', '기타'].map(opt => <option key={opt} value={opt}>{opt}</option>)}</select></div>
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">연락처</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={merchantFormData.contact} onChange={e => setMerchantFormData({...merchantFormData, contact: e.target.value})} placeholder="전화번호" /></div>
                <div className="col-span-2"><label className="text-xs font-bold text-gray-500 mb-1 block">주소</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={merchantFormData.address} onChange={e => setMerchantFormData({...merchantFormData, address: e.target.value})} placeholder="주소 입력" /></div>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">은행명</label><select className="w-full border p-2 rounded-lg text-sm outline-none bg-white" value={merchantFormData.bank} onChange={e => setMerchantFormData({...merchantFormData, bank: e.target.value})}>{BANK_LIST.map(bank => <option key={bank} value={bank}>{bank}</option>)}</select></div>
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">예금주</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" value={merchantFormData.accountOwner} onChange={e => setMerchantFormData({...merchantFormData, accountOwner: e.target.value})} placeholder="예금주명" /></div>
                <div className="col-span-2"><label className="text-xs font-bold text-gray-500 mb-1 block">계좌번호</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500 font-mono" value={merchantFormData.accountNumber} onChange={e => setMerchantFormData({...merchantFormData, accountNumber: e.target.value})} placeholder="계좌번호 입력" /></div>
                <div className="col-span-2 pt-2 border-t mt-2">
                  <label className="text-xs font-bold text-gray-500 mb-1 block">상태 변경</label>
                  <select className="w-full border p-2 rounded-lg text-sm outline-none bg-white font-bold text-blue-600" value={merchantFormData.status} onChange={e => setMerchantFormData({...merchantFormData, status: e.target.value})}>
                    <option value="심사중">심사중</option>
                    <option value="운영중">운영중</option>
                    <option value="중단">중단</option>
                  </select>
                </div>
              </div>
              <button onClick={handleSaveMerchant} className="w-full bg-blue-600 text-white font-bold py-3 rounded-xl hover:bg-blue-700 shadow-md">{editingMerchantId ? '수정 완료' : '등록 완료'}</button>
            </div>
          </div>
        </div>
      )}

      {isAdModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col">
            <div className={`p-4 flex justify-between items-center text-white shrink-0 ${editingAdId ? 'bg-indigo-800' : 'bg-indigo-600'}`}>
              <h3 className="font-bold text-lg flex items-center gap-2"><Users size={20}/> {editingAdId ? '광고주 정보 수정' : '신규 광고주 등록'}</h3>
              <button onClick={() => setIsAdModalOpen(false)}><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">업체명</label><div className="relative"><Building2 size={16} className="absolute left-3 top-2.5 text-gray-400"/><input type="text" className="w-full border p-2 pl-9 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={adFormData.company} onChange={e => setAdFormData({...adFormData, company: e.target.value})} placeholder="업체명 입력" /></div></div>
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">업종</label><div className="relative"><Briefcase size={16} className="absolute left-3 top-2.5 text-gray-400"/><select className="w-full border p-2 pl-9 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 bg-white" value={adFormData.category} onChange={e => setAdFormData({...adFormData, category: e.target.value})}><option value="전자/IT">전자/IT</option><option value="유통/커머스">유통/커머스</option><option value="요식업">요식업</option><option value="서비스">서비스</option><option value="교육">교육</option><option value="기타">기타</option></select></div></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">담당자</label><div className="relative"><User size={16} className="absolute left-3 top-2.5 text-gray-400"/><input type="text" className="w-full border p-2 pl-9 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={adFormData.name} onChange={e => setAdFormData({...adFormData, name: e.target.value})} placeholder="이름" /></div></div>
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">전화번호</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500" value={adFormData.phone} onChange={e => setAdFormData({...adFormData, phone: e.target.value})} placeholder="연락처" /></div>
              </div>
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">집행 금액</label><div className="relative"><span className="absolute left-3 top-2 text-gray-500 font-bold">₩</span><input type="number" className="w-full border p-2 pl-8 rounded-lg text-sm outline-none focus:ring-2 focus:ring-indigo-500 font-bold text-indigo-600" value={adFormData.totalSpent} onChange={e => setAdFormData({...adFormData, totalSpent: Number(e.target.value)})} /></div></div>
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">상태</label><select className="w-full border p-2 rounded-lg text-sm outline-none bg-white" value={adFormData.status} onChange={e => setAdFormData({...adFormData, status: e.target.value})}><option value="Active">Active (광고중)</option><option value="Paused">Paused (일시정지)</option><option value="Stopped">Stopped (종료)</option></select></div>
              <button onClick={handleSaveAdvertiser} className="w-full bg-indigo-600 text-white font-bold py-3 rounded-xl hover:bg-indigo-700 shadow-md mt-2">{editingAdId ? '저장하기' : '등록하기'}</button>
            </div>
          </div>
        </div>
      )}

      {isBannerModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden flex flex-col animate-fade-in-up">
            <div className={`p-4 flex justify-between items-center text-white shrink-0 ${editingBannerId ? 'bg-orange-600' : 'bg-orange-500'}`}>
              <h3 className="font-bold text-lg flex items-center gap-2"><Megaphone size={20}/> {editingBannerId ? '배너 수정' : '새 배너 등록'}</h3>
              <button onClick={() => setIsBannerModalOpen(false)}><X size={20}/></button>
            </div>
            <div className="p-6 space-y-4">
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">메인 문구 (필수)</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 font-bold text-gray-800" value={bannerFormData.text} onChange={e => setBannerFormData({...bannerFormData, text: e.target.value})} placeholder="예: 화면 보여주면 음료 무료!" /></div>
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">서브 문구 (선택)</label><input type="text" className="w-full border p-2 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500" value={bannerFormData.subText} onChange={e => setBannerFormData({...bannerFormData, subText: e.target.value})} placeholder="예: 테이블당 1회 한정" /></div>
              <div><label className="text-xs font-bold text-gray-500 mb-1 block">이동할 링크 URL (선택)</label><div className="relative"><LinkIcon size={16} className="absolute left-3 top-2.5 text-gray-400"/><input type="text" className="w-full border p-2 pl-9 rounded-lg text-sm outline-none focus:ring-2 focus:ring-orange-500 text-blue-600" value={bannerFormData.url} onChange={e => setBannerFormData({...bannerFormData, url: e.target.value})} placeholder="https://..." /></div></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">타입</label><select className="w-full border p-2 rounded-lg text-sm outline-none bg-white" value={bannerFormData.type} onChange={e => setBannerFormData({...bannerFormData, type: e.target.value})}><option value="Event">Event (이벤트)</option><option value="Ad">Ad (광고)</option><option value="Notice">Notice (공지)</option></select></div>
                <div><label className="text-xs font-bold text-gray-500 mb-1 block">상태</label><select className="w-full border p-2 rounded-lg text-sm outline-none bg-white" value={bannerFormData.active ? 'true' : 'false'} onChange={e => setBannerFormData({...bannerFormData, active: e.target.value === 'true'})}><option value="true">게시중</option><option value="false">숨김</option></select></div>
              </div>
              <button onClick={handleSaveBanner} className="w-full bg-orange-500 text-white font-bold py-3 rounded-xl hover:bg-orange-600 shadow-md mt-2">{editingBannerId ? '저장하기' : '등록하기'}</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// -------------------------------------------------------------------------
// [3] Suspense Wrapper Component (Default Export)
// -------------------------------------------------------------------------
export default function AdminDashboard() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading Dashboard...</div>}>
      <AdminContent />
    </Suspense>
  );
}