'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, CreditCard, User, AlertCircle } from 'lucide-react';

const dailyData = [
  { date: '12/24', scan: 120 }, { date: '12/25', scan: 150 }, { date: '12/26', scan: 180 },
  { date: '12/27', scan: 220 }, { date: '12/28', scan: 190 }, { date: '12/29', scan: 250 },
  { date: '12/30', scan: 310 },
];

export default function MerchantDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">내 가게 대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">ID: 2512123 | 연희동 떡볶이</p>
      </header>

      {/* 요약 카드 */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500 mb-1">오늘 스캔 횟수</p>
           <div className="flex items-end gap-2">
             <span className="text-3xl font-extrabold text-blue-600">310</span>
             <span className="text-xs text-red-500 font-bold mb-1.5">▲ 12%</span>
           </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500 mb-1">이번 달 누적 스캔</p>
           <span className="text-3xl font-extrabold text-gray-900">4,280</span>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
           <p className="text-sm text-gray-500 mb-1">서비스 상태</p>
           <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-2">
             운영중 (Active)
           </span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 통계 차트 */}
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <TrendingUp size={18} className="text-blue-500" /> 주간 스캔 추이
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tickLine={false} axisLine={false} />
                <YAxis tickLine={false} axisLine={false} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="scan" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 내 정보 (읽기 전용) */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <User size={18} className="text-gray-500" /> 가맹점 정보
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">상호명</p>
              <p className="font-bold text-gray-800">연희동 떡볶이</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">대표자</p>
              <p className="font-bold text-gray-800">홍길동</p>
            </div>
            <div className="pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2 mb-2 text-gray-800 font-bold">
                <CreditCard size={16} className="text-blue-500"/> 정산 계좌
              </div>
              <p className="text-gray-600 bg-gray-50 p-2 rounded">KB국민</p>
              <p className="text-gray-600 bg-gray-50 p-2 rounded mt-1 font-mono">938-202-01-123456</p>
            </div>
            <div className="mt-4 p-3 bg-blue-50 rounded-lg flex gap-2 items-start">
              <AlertCircle size={16} className="text-blue-500 shrink-0 mt-0.5"/>
              <p className="text-xs text-blue-700 leading-tight">정보 수정이 필요하시면 관리자에게 문의해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}