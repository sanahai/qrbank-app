'use client'; 

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { LayoutDashboard, Users, Store, Megaphone, LogOut, Settings, BarChart3, UserCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation'; // useSearchParams 추가

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const router = useRouter();
  
  // 현재 URL의 view 파라미터 확인 (활성 메뉴 강조용)
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'overview';

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const userName = localStorage.getItem('userName');
    if (!userRole) {
      router.push('/login');
    }
    setRole(userRole);
    setName(userName);
  }, [router]);

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  if (!role) return null;

  // 메뉴 아이템 스타일링 함수 (활성 상태일 때 파란색 배경)
  const getLinkClass = (viewName: string) => {
    const isActive = currentView === viewName;
    return `flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-all ${
      isActive ? 'bg-blue-600 text-white shadow-md' : 'hover:bg-slate-800 text-slate-300'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans">
      <aside className="w-64 bg-slate-900 text-white flex flex-col fixed h-full z-20 shadow-xl">
        <div className="h-20 flex items-center px-6 border-b border-slate-800">
          <span className="text-2xl font-extrabold tracking-tighter text-blue-400">QRBANK</span>
          <span className="ml-2 text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-white uppercase">{role}</span>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
          
          {/* [1] 관리자 메뉴 (URL 쿼리 연결) */}
          {role === 'admin' && (
            <>
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Dashboard</div>
              <Link href="/admin?view=overview" className={getLinkClass('overview')}>
                 <LayoutDashboard size={18} /> 총괄 현황판
              </Link>

              <div className="px-3 mb-2 mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-wider">Management</div>
              <Link href="/admin?view=merchants" className={getLinkClass('merchants')}>
                 <Store size={18} /> 가맹점 관리
              </Link>
              <Link href="/admin?view=advertisers" className={getLinkClass('advertisers')}>
                 <Users size={18} /> 광고주 관리
              </Link>
              <Link href="/admin?view=banners" className={getLinkClass('banners')}>
                 <Megaphone size={18} /> 배너 광고 설정
              </Link>
            </>
          )}

          {/* [2] 가맹점 메뉴 */}
          {role === 'merchant' && (
            <>
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">My Store</div>
              <Link href="/merchant" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-blue-600 text-white shadow-md">
                 <BarChart3 size={18} /> 내 가게 대시보드
              </Link>
            </>
          )}

          {/* [3] 광고주 메뉴 */}
          {role === 'advertiser' && (
            <>
              <div className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-wider">My Campaign</div>
              <Link href="/advertiser" className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-purple-600 text-white shadow-md">
                 <Megaphone size={18} /> 광고 대시보드
              </Link>
            </>
          )}

        </nav>

        <div className="p-4 border-t border-slate-800">
          <div className="flex items-center gap-3 mb-4 px-2">
            <UserCircle size={32} className="text-slate-500" />
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{name}</p>
              <p className="text-[10px] text-slate-400 capitalize">{role}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-2 text-xs font-medium rounded-lg bg-slate-800 hover:bg-red-600/80 hover:text-white text-slate-400 transition-all">
            <LogOut size={16} /> 로그아웃
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}