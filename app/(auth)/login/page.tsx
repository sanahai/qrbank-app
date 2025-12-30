'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, User } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // 1. 관리자 (Admin)
    if (loginId === 'admin@qrbank.kr' && password === 'admin2378') {
      localStorage.setItem('userRole', 'admin'); // 역할 저장
      localStorage.setItem('userName', '총괄 관리자');
      router.push('/admin'); // 관리자 페이지로 이동
      return;
    } 
    // 2. 가맹점 (Merchant) - 예: 2512123
    else if (/^\d{7}$/.test(loginId) && password === '1234') {
      localStorage.setItem('userRole', 'merchant');
      localStorage.setItem('userName', '연희동 떡볶이');
      router.push('/merchant'); // 가맹점 페이지로 이동
      return;
    }
    // 3. 광고주 (Advertiser) - 예: 25123
    else if (/^\d{5}$/.test(loginId) && password === '5678') {
      localStorage.setItem('userRole', 'advertiser');
      localStorage.setItem('userName', '김광고 (삼성전자)');
      router.push('/advertiser'); // 광고주 페이지로 이동
      return;
    }

    alert('로그인 정보를 확인해주세요.\n\n[계정 안내]\n관리자: admin@qrbank.kr / admin2378\n가맹점: 2512123 / 1234\n광고주: 25123 / 5678');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-blue-900 tracking-tight">QRBANK</h1>
          <p className="text-gray-500 mt-2 text-sm">통합 서비스 로그인</p>
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">아이디</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                placeholder="ID를 입력하세요"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 ml-1">비밀번호</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock size={18} className="text-gray-400" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              />
            </div>
          </div>
          <button type="submit" className="w-full bg-blue-900 text-white py-3.5 rounded-xl font-bold text-sm hover:bg-blue-800 transition-colors shadow-lg active:scale-[0.98]">
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}