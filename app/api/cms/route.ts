import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const ADMIN_EMAIL = 'fxrich01@gmail.com';
const ADMIN_PASSWORD = 'Rute@Seru!2025#';

export async function GET() {
  const { data, error } = await supabase
    .from('cms_data')
    .select('data')
    .eq('id', 1)
    .maybeSingle();

  if (error) {
    console.error('[CMS] GET error:', error.message);
    return NextResponse.json(null, {
      status: 500,
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  }

  if (!data) {
    return NextResponse.json(null, {
      status: 404,
      headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
    });
  }

  return NextResponse.json(data.data, {
    headers: { 'Cache-Control': 'no-store, no-cache, must-revalidate' },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { authEmail, authPassword, data } = body;

    if (authEmail !== ADMIN_EMAIL || authPassword !== ADMIN_PASSWORD) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { error } = await supabase
      .from('cms_data')
      .upsert({ id: 1, data, updated_at: new Date().toISOString() }, { onConflict: 'id' });

    if (error) {
      console.error('[CMS] POST upsert error:', error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('[CMS] POST error:', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
