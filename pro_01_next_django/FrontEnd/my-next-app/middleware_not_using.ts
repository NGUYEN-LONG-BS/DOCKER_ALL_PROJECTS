import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('MIDDLEWARE RUN:', request.nextUrl.pathname, request.cookies.get('isAuthenticated')?.value);

  // Bỏ qua check cho trang login và static files
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next();
  }

  // Kiểm tra cookie (ví dụ: 'isAuthenticated' hoặc token)
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  if (!isAuthenticated) {
    // Nếu chưa login, chuyển hướng về trang login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã login, cho phép truy cập
  return NextResponse.next();
}

// Áp dụng middleware cho tất cả các route
export const config = {
  matcher: '/:path*',
};
