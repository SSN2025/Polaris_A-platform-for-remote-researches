import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim();

    if (!query) {
      return NextResponse.json({ papers: [], expeditions: [] });
    }

    // Search papers across title, abstract, and summary
    const papers = await prisma.paper.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { category: { contains: query, mode: 'insensitive' } },
          { subcategory: { contains: query, mode: 'insensitive' } },
          { expedition: { contains: query, mode: 'insensitive' } },
          { content: { path: ['abstract'], string_contains: query } },
          { content: { path: ['summary'], string_contains: query } },
        ],
      },
      select: {
        id: true,
        document_id: true,
        title: true,
        category: true,
        subcategory: true,
        year: true,
        expedition: true,
        content: true,
      },
      take: 10,
      orderBy: { year: 'desc' },
    });

    // Search expeditions matching query
    const allExpeditions = await prisma.paper.groupBy({
      by: ['expedition'],
      where: {
        expedition: {
          not: null,
          contains: query,
          mode: 'insensitive',
        },
      },
      _count: { expedition: true },
    });

    const expeditions = allExpeditions.map((e) => ({
      name: e.expedition,
      paperCount: e._count.expedition,
    }));

    return NextResponse.json({
      papers: papers.map((p) => ({
        id: p.id,
        document_id: p.document_id,
        title: p.title,
        category: p.category,
        subcategory: p.subcategory,
        year: p.year,
        expedition: p.expedition,
        summary: p.content?.summary || '',
      })),
      expeditions,
    });
  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json(
      { error: 'Failed to execute search', papers: [], expeditions: [] },
      { status: 500 }
    );
  }
}

