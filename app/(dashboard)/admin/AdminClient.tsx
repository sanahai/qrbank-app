'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import {
  Users, Store, MousePointerClick, TrendingUp, Plus, Trash2, Search,
  Megaphone, X, Edit, Phone, Building2, User, Briefcase,
  Link as LinkIcon, Calendar, Wallet, Activity, ArrowUpRight
} from 'lucide-react';

/* 🔽 네가 올린 AdminContent 전체 코드 그대로 🔽 */
/* visitData, BANK_LIST, AdminContent, Suspense Wrapper 포함 */

export default function AdminClient() {
  return (
    <Suspense fallback={<div className="p-10 text-center text-gray-500">Loading Dashboard...</div>}>
      <AdminContent />
    </Suspense>
  );
}
