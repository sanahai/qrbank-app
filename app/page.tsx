'use client';

import React, { useState } from 'react';
import { 
  Copy, Check, ExternalLink, Shield, Lock, 
  AlertCircle, ChevronDown, ChevronUp 
} from 'lucide-react';

// --- [1. 가맹점 데이터] ---
const STORE_DATA = {
  name: "연희동 떡볶이 본점",
  owner: "홍길동",
  bankName: "KB국민은행",
  accountNumber: "938-202-01-123456",
  themeColor: "bg-orange-500", 
};

// --- [2. 컴포넌트: 보안 및 이용 가이드] ---
const SecurityAndGuide = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full mt-4 mb-8 px-2">
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <div className="bg-green-100 p-2 rounded-full mt-1">
            <Shield size={20} className="text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-gray-800 mb-1">안심하고 송금하세요</h3>
            <p className="text-xs text-gray-600 leading-relaxed">
              이 페이지는 <strong>계좌번호 복사 편의 기능</strong>만 제공합니다.<br/>
              금융 정보(비밀번호 등)에는 절대 접근하지 않습니다.
            </p>
          </div>
        </div>
        <div className="h-px bg-gray-200 my-4"></div>
        <div className="grid grid-cols-3 gap-2 text-center mb-4">
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-bold text-xs mb-1">1</div>
            <span className="text-[10px] text-gray-500">계좌 복사</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 font-bold text-xs mb-1">2</div>
            <span className="text-[10px] text-gray-500">앱 실행</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-8 h-8 bg-red-50 rounded-full flex items-center justify-center text-red-500 font-bold text-xs mb-1">3</div>
            <span className="text-[10px] font-bold text-red-500">예금주 확인</span>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-500 hover:bg-gray-50 transition-colors"
        >
          <span className="flex items-center gap-1">
            <AlertCircle size={14} />
            책임 한계 및 이용 안내
          </span>
          {isOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {isOpen && (
          <div className="mt-2 text-[10px] text-gray-400 leading-4 p-2 bg-gray-100 rounded-lg text-justify">
             <p className="mb-2"><strong>1. 서비스 성격:</strong> 본 페이지는 계좌번호 복사를 돕는 편의 도구이며, 실제 송금 및 금융 거래에 관여하지 않습니다.</p>
             <p className="mb-2"><strong>2. 사용자 책임:</strong> 송금 전 뱅킹 앱에서 <strong>'받는 사람(예금주)'</strong>이 맞는지 반드시 확인해야 합니다. 오송금 책임은 사용자에게 있습니다.</p>
             <p><strong>3. 데이터 보호:</strong> 사용자의 개인 식별 정보나 금융 데이터를 저장하지 않습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

// --- [3. 컴포넌트: 뱅킹 앱 그리드] ---
const BankingAppGrid = () => {
  const apps = [
    { name: '토스', scheme: 'supertoss://', iconColor: 'bg-blue-500' },
    { name: '카카오뱅크', scheme: 'kakaobank://', iconColor: 'bg-yellow-400' },
    { name: 'KB국민', scheme: 'kbbank://', iconColor: 'bg-yellow-500' },
    { name: '신한SOL', scheme: 'shinhan-sr-addon://', iconColor: 'bg-blue-600' },
    { name: '우리WON', scheme: 'wooribank://', iconColor: 'bg-blue-400' },
    { name: 'NH농협', scheme: 'nhbanking://', iconColor: 'bg-green-600' },
    { name: '하나원큐', scheme: 'hanabank://', iconColor: 'bg-teal-500' },
    { name: '케이뱅크', scheme: 'kbank://', iconColor: 'bg-indigo-500' },
    { name: 'IBK기업', scheme: 'ibk-smart-banking://', iconColor: 'bg-blue-700' },
    { name: '새마을금고', scheme: 'mgsmartbanking://', iconColor: 'bg-blue-600' },
    { name: '우체국', scheme: 'epostbank://', iconColor: 'bg-red-500' },
    { name: '수협', scheme: 'suhyup://', iconColor: 'bg-blue-400' },
    { name: 'iM뱅크(대구)', scheme: 'daegubank://', iconColor: 'bg-cyan-600' },
    { name: '부산은행', scheme: 'bnkmbanking://', iconColor: 'bg-red-600' },
    { name: '전북은행', scheme: 'jbbank://', iconColor: 'bg-purple-600' },
    { name: '광주은행', scheme: 'kjbank://', iconColor: 'bg-red-400' },
  ];

  return (
    <div className="w-full mt-6">
      <div className="flex items-center gap-2 mb-3 px-1">
        <span className="text-xs font-bold text-gray-500">자주 쓰는 은행 앱 열기</span>
        <div className="h-px flex-1 bg-gray-200"></div>
      </div>
      <div className="grid grid-cols-4 gap-y-4 gap-x-2 px-1">
        {apps.map((app) => (
          <button
            key={app.name}
            onClick={() => window.location.href = app.scheme}
            className="flex flex-col items-center gap-1.5 group"
          >
            <div className={`w-11 h-11 ${app.iconColor} rounded-2xl shadow-sm flex items-center justify-center text-white text-[10px] font-bold group-active:scale-95 transition-transform border border-black/5 leading-tight text-center px-1`}>
              {app.name.includes('(') ? app.name.split('(')[0] : app.name.slice(0, 3)}
            </div>
            <span className="text-[10px] text-gray-600 tracking-tight whitespace-nowrap">{app.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

// --- [4. 컴포넌트: 광고 배너 (링크 연결 기능 추가됨)] ---
const AdBanner = ({ type, url }: { type: string, url: string }) => {
  return (
    <div className="w-full my-4 px-1">
      {/* a 태그로 감싸서 클릭 시 해당 URL로 이동 */}
      <a 
        href={url} 
        target="_blank" 
        rel="noopener noreferrer"
        className="block w-full h-16 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 rounded-xl flex items-center justify-between px-4 shadow-sm cursor-pointer relative overflow-hidden group hover:border-blue-300 transition-colors"
      >
        <div className="absolute top-0 right-0 bg-gray-200 text-[9px] px-1.5 py-0.5 rounded-bl-lg text-gray-500">AD</div>
        <div className="flex flex-col z-10">
          <span className="text-xs font-bold text-gray-800 group-hover:text-blue-600 transition-colors">
            {type === 'Top' ? '사장님께 이 화면 인증하면?' : '옆집 카페 10% 할인 쿠폰'}
          </span>
          <span className="text-[10px] text-gray-500">
            {type === 'Top' ? '음료수 1캔 서비스 드려요! 🥤' : '오늘 하루만 다운로드 가능 ☕️'}
          </span>
        </div>
        <ExternalLink size={14} className="text-gray-400 group-hover:text-blue-500" />
      </a>
    </div>
  );
};

// --- [5. 컴포넌트: 토스트 메시지] ---
const Toast = ({ message, isVisible }: { message: string, isVisible: boolean }) => {
  if (!isVisible) return null;
  return (
    <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-max pointer-events-none">
      <div className="bg-gray-800 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 text-sm font-medium opacity-95 animate-pulse">
        <div className="bg-green-500 rounded-full p-0.5">
          <Check size={14} className="text-white" />
        </div>
        {message}
      </div>
    </div>
  );
};

// --- [메인 페이지] ---
export default function PaymentLandingPage() {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = async () => {
    const textToCopy = STORE_DATA.accountNumber.replace(/-/g, '');
    let isSuccess = false;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
        isSuccess = true;
      } else {
        throw new Error('Clipboard API not supported');
      }
    } catch (err) {
      try {
        const textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        textArea.style.position = "fixed";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        isSuccess = document.execCommand('copy');
        document.body.removeChild(textArea);
      } catch (fallbackErr) {
        console.error('Fallback copy failed', fallbackErr);
      }
    }

    if (isSuccess) {
      if (navigator.vibrate) navigator.vibrate(50);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2500);
    } else {
      alert('이 브라우저에서는 복사가 지원되지 않습니다.\n직접 입력해주세요.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
      <div className="w-full max-w-[480px] bg-white min-h-screen shadow-2xl relative flex flex-col">
        
        {/* 상단 헤더 */}
        <div className={`h-48 ${STORE_DATA.themeColor} relative rounded-b-[40px] shadow-sm`}>
          <div className="absolute top-8 w-full text-center text-white/90 text-sm font-medium tracking-wide">
              간편 계좌 복사 서비스
          </div>
          <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 w-[90%]">
            <div className="bg-white px-6 py-5 rounded-2xl shadow-xl border border-gray-100 flex flex-col items-center">
              <h1 className="text-xl font-extrabold text-gray-800 mb-1 tracking-tight whitespace-nowrap">{STORE_DATA.name}</h1>
              <div className="flex items-center gap-1.5 text-sm bg-gray-50 px-3 py-1 rounded-full border border-gray-100 mt-2">
                  <span className="text-xs text-gray-400">QRBANK Verified</span>
                  <Check size={12} className="text-blue-500" />
              </div>
            </div>
          </div>
        </div>

        {/* 메인 콘텐츠 */}
        <div className="mt-14 px-6 flex-1 overflow-y-auto pb-10">
          
          {/* ★ 상단 배너 추가 (링크 예시: 코카콜라) */}
          <AdBanner type="Top" url="https://www.cocacola.co.kr" />
          
          {/* 계좌 카드 */}
          <div 
            onClick={handleCopy}
            className="w-full bg-white border-2 border-dashed border-blue-200 rounded-2xl p-6 mt-2 relative cursor-pointer active:bg-blue-50 active:border-blue-300 transition-all group shadow-[0_2px_8px_rgba(0,0,0,0.04)] flex flex-col items-center justify-center text-center"
          >
            {/* 좌측 상단: 안심 계좌 뱃지 */}
            <div className="absolute -top-3 left-4 bg-white border border-blue-100 px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
              <Lock size={10} className="text-green-500" />
              <span className="text-[10px] font-bold text-gray-500">Safe Account</span>
            </div>

            {/* 우측 상단: 터치해서 복사 뱃지 */}
            <div className="absolute -top-3 right-4 bg-blue-50 text-blue-500 border border-blue-100 px-2 py-0.5 rounded-full shadow-sm flex items-center gap-1">
              <span className="text-[10px] font-bold">터치해서 복사</span>
            </div>

            {/* 중앙: 은행명 | 예금주 */}
            <div className="flex items-center gap-2 mb-2 mt-2">
                <span className="text-lg font-bold text-gray-700 flex items-center gap-1">
                     <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                     {STORE_DATA.bankName}
                </span>
                <span className="text-gray-300 mx-1">|</span>
                <span className="text-lg font-bold text-gray-800">{STORE_DATA.owner}</span>
            </div>
            
            {/* 하단: 계좌번호 */}
            <div className="py-1">
              <span className="text-2xl font-mono font-bold text-gray-900 tracking-tighter block group-active:scale-95 transition-transform">
                {STORE_DATA.accountNumber}
              </span>
            </div>

            {/* 복사 버튼 */}
            <div className="mt-4 w-full bg-gray-900 text-white py-3 rounded-xl flex items-center justify-center gap-2 font-bold text-sm shadow-lg group-active:translate-y-0.5 transition-transform">
              <Copy size={16} />
              <span>계좌번호 복사하기</span>
            </div>
          </div>

          {/* 뱅킹 앱 그리드 */}
          <BankingAppGrid />

          {/* ★ 하단 배너 추가 (링크 예시: 스타벅스) */}
          <AdBanner type="Bottom" url="https://www.starbucks.co.kr" />

          {/* 보안 가이드 */}
          <SecurityAndGuide />

        </div>

        {/* 푸터 */}
        <div className="py-6 text-center bg-gray-50 border-t border-gray-100 mt-auto">
          <p className="text-[10px] text-gray-300">Copyright © 2024 QR Pay. All rights reserved.</p>
        </div>

        <Toast message="계좌번호 복사 완료! 앱을 실행하세요." isVisible={showToast} />
      </div>
    </div>
  );
}