import { getPayloadClient } from '@/lib/getPayload';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const payload = await getPayloadClient();
  
  const { searchParams } = new URL(request.url);
  const collection = searchParams.get('collection');
  const id = searchParams.get('id');
  const limit = searchParams.get('limit') ? parseInt(searchParams.get('limit')!) : 10;
  const page = searchParams.get('page') ? parseInt(searchParams.get('page')!) : 1;

  try {
    if (!collection) {
      return NextResponse.json({ error: 'Collection parameter is required' }, { status: 400 });
    }

    if (id) {
      // Get single document
      const result = await payload.findByID({
        collection: collection as any,
        id,
      });
      return NextResponse.json(result);
    } else {
      // Get multiple documents
      const result = await payload.find({
        collection: collection as any,
        limit,
        page,
      });
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error('Payload API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const payload = await getPayloadClient();
  
  try {
    const body = await request.json();
    const { collection, data } = body;

    if (!collection || !data) {
      return NextResponse.json({ error: 'Collection and data are required' }, { status: 400 });
    }

    const result = await payload.create({
      collection: collection as any,
      data,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payload API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  const payload = await getPayloadClient();
  
  try {
    const body = await request.json();
    const { collection, id, data } = body;

    if (!collection || !id || !data) {
      return NextResponse.json({ error: 'Collection, id, and data are required' }, { status: 400 });
    }

    const result = await payload.update({
      collection: collection as any,
      id,
      data,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payload API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const payload = await getPayloadClient();
  
  try {
    const { searchParams } = new URL(request.url);
    const collection = searchParams.get('collection');
    const id = searchParams.get('id');

    if (!collection || !id) {
      return NextResponse.json({ error: 'Collection and id are required' }, { status: 400 });
    }

    const result = await payload.delete({
      collection: collection as any,
      id,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('Payload API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}