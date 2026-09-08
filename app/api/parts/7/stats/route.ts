import { NextResponse } from 'next/server';
import { getPart7StatsDetail } from '@/repositories';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const stats = await getPart7StatsDetail();
    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching Part 7 stats:', error);
    return NextResponse.json({ message: 'Lỗi khi lấy thống kê Part 7' }, { status: 500 });
  }
}
