import { NextResponse } from 'next/server';
import { getPart5StatsDetail } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await getPart5StatsDetail();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching Part 5 stats:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy thống kê Part 5' }, { status: 500 });
  }
}
