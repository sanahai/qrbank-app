'use client';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MousePointerClick, Coins, Building2, AlertCircle } from 'lucide-react';

const adDailyData = [
  { date: '12/24', clicks: 45 }, { date: '12/25', clicks: 52 }, { date: '12/26', clicks: 38 },
  { date: '12/27', clicks: 65 }, { date: '12/28', clicks: 70 }, { date: '12/29', clicks: 85 },
  { date: '12/30', clicks: 60 },
];
const totalClicks = 415;
const totalCost = totalClicks * 200;

export default function AdvertiserDashboard() {
  return (
    <div className="max-w-5xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">광고주 대시보드</h1>
        <p className="text-gray-500 text-sm mt-1">ID: 25123 | 삼성전자 (김광고님)</p>
      </header>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-4 bg-purple-50 rounded-xl text-purple-600"><MousePointerClick size={24} /></div>
          <div>
            <p className="text-sm text-gray-500 font-medium">이번 주 총 클릭</p>
            <p className="text-3xl font-extrabold text-gray-900">{totalClicks.toLocaleString()} 회</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="p-4 bg-white/80 rounded-xl text-yellow-600"><Coins size={24} /></div>
          <div>
            <p className="text-sm text-gray-700 font-medium">현재 집행 금액</p>
            <p className="text-3xl font-extrabold text-yellow-700">₩ {totalCost.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">클릭당 200원 기준</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6">일별 광고 클릭 현황</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adDailyData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" tickLine={false} axisLine={false} tick={{fontSize: 12}} />
                <YAxis tickLine={false} axisLine={false} tick={{fontSize: 12}} />
                <Tooltip cursor={{fill: '#f8fafc'}} />
                <Bar dataKey="clicks" fill="#8884d8" radius={[6, 6, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
            <Building2 size={18} className="text-gray-500" /> 업체 정보
          </h3>
          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-400 text-xs mb-1">업체명</p>
              <p className="font-bold text-gray-800">삼성전자</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">담당자 / 연락처</p>
              <p className="font-bold text-gray-800">김광고 (010-1234-5678)</p>
            </div>
            <div>
              <p className="text-gray-400 text-xs mb-1">상태</p>
              <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">Active (광고중)</span>
            </div>
            <div className="mt-4 p-3 bg-gray-50 rounded-lg flex gap-2 items-start">
              <AlertCircle size={16} className="text-gray-400 shrink-0 mt-0.5"/>
              <p className="text-xs text-gray-500 leading-tight">광고 중단이나 정보 수정은 관리자에게 요청해주세요.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}