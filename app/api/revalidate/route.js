import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';

export async function POST(request) {
  try {
    const { secret, paths } = await request.json();
    
    if (secret !== process.env.REVALIDATION_SECRET) {
      return NextResponse.json({ error: 'Invalid secret' }, { status: 401 });
    }

    const pathsToRevalidate = paths || ['/'];
    
    for (const path of pathsToRevalidate) {
      revalidatePath(path);
    }

    return NextResponse.json({ revalidated: true, paths: pathsToRevalidate });
  } catch (error) {
    console.error('Revalidation error:', error);
    return NextResponse.json({ error: 'Failed to revalidate' }, { status: 500 });
  }
}
