import { NextRequest } from 'next/server';
import QRCode from 'qrcode';

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const url = request.nextUrl
  const channel = url.searchParams.get('channel')

  const payload = `bluesky://intent/apply-ota?channel=${channel}`

  const qrCode = await QRCode.toBuffer(payload, { width: 1200 })

  return new Response(new Uint8Array(qrCode), {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
