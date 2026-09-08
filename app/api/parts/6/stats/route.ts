import { NextResponse } from 'next/server';
import { getPart6StatsDetail } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await getPart6StatsDetail();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching Part 6 stats:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy thống kê Part 6' }, { status: 500 });
  }
}
