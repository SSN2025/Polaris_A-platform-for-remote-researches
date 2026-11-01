import { NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { updatePaper } from '@/lib/data';

export async function PUT(request, { params }) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();

    // Prepare update data according to allowed schema fields
    const updatedPaper = await updatePaper(id, body);

    return NextResponse.json({ success: true, paper: updatedPaper });
  } catch (error) {
    console.error('Update paper error:', error);
    return NextResponse.json({ error: 'Failed to update paper' }, { status: 500 });
  }
}

