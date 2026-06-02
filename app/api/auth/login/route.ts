import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, stripPassword } from '@/lib/user-store';
import { signToken } from '@/lib/jwt';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Validasi input
    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    if (typeof email !== 'string' || typeof password !== 'string') {
      return NextResponse.json(
        { message: 'Email and password must be strings' },
        { status: 400 }
      );
    }

    // Cari user berdasarkan email
    const user = findUserByEmail(email.toLowerCase().trim());
    if (!user) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verifikasi password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token
    const token = signToken({ userId: user.id, email: user.email });

    const userWithoutPassword = stripPassword(user);

    return NextResponse.json(
      {
        message: 'Login successful',
        user: userWithoutPassword,
        token,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
