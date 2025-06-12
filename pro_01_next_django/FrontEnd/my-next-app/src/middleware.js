const { NextResponse } = require('next/server');

console.log('MIDDLEWARE FILE LOADED');

function middleware(request) {
  const path = request.nextUrl.pathname;
  // Bỏ qua check cho trang login và static files
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/api') ||
    request.nextUrl.pathname.startsWith('/favicon.ico') ||
    path.startsWith('/images')
  ) {
    return NextResponse.next();
  }

  // Chỉ log các route thật
  console.log('MIDDLEWARE RUN:', path, request.cookies.get('isAuthenticated')?.value);

  // Kiểm tra cookie (ví dụ: 'isAuthenticated' hoặc token)
  const isAuthenticated = request.cookies.get('isAuthenticated')?.value === 'true';

  if (!isAuthenticated) {
    // Nếu chưa login, chuyển hướng về trang login
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Nếu đã login, cho phép truy cập
  return NextResponse.next();

  // ================================================================
  // return new NextResponse('BLOCKED BY MIDDLEWARE', { status: 403 });
  // ================================================================
}

module.exports = {
  middleware,
  config: {
    matcher: '/:path*',
  },
};
