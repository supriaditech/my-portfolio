import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { findUserById, stripPassword } from '@/lib/user-store';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { message: 'Authorization header missing or invalid' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      return NextResponse.json(
        { message: 'Token missing' },
        { status: 401 }
      );
    }

    // Verify token
    let payload;
    try {
      payload = verifyToken(token);
    } catch {
      return NextResponse.json(
        { message: 'Invalid or expired token' },
        { status: 401 }
      );
    }

    // Cari user
    const user = findUserById(payload.userId);
    if (!user) {
      return NextResponse.json(
        { message: 'User not found' },
        { status: 404 }
      );
    }

    const userWithoutPassword = stripPassword(user);

    return NextResponse.json(
      {
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
