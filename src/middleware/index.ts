import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

async function getSession(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return null;
  }
  
  try {
    // Dapatkan data user dari API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    
    if (!response.ok) {
      return null;
    }
    
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error('Error fetching user session:', error);
    return null;
  }
}

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const user = await getSession(request);
    
    if (!user || user.role !== 'ADMIN') {
      const loginUrl = new URL('/', request.url);
      loginUrl.searchParams.set('from', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};