import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { findUserByEmail, createUser, stripPassword } from '@/lib/user-store';
import { signToken } from '@/lib/jwt';
import { User } from '@/lib/auth';

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password } = body;

    // Validasi input
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { message: 'Name must be at least 2 characters' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Invalid email format' },
        { status: 400 }
      );
    }

    if (typeof password !== 'string' || password.length < 6) {
      return NextResponse.json(
        { message: 'Password must be at least 6 characters' },
        { status: 400 }
      );
    }

    // Cek apakah email sudah terdaftar
    const existingUser = findUserByEmail(email.toLowerCase());
    if (existingUser) {
      return NextResponse.json(
        { message: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Buat user baru
    const newUser: User = {
      id: generateId(),
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };

    createUser(newUser);

    // Generate JWT token
    const token = signToken({ userId: newUser.id, email: newUser.email });

    const userWithoutPassword = stripPassword(newUser);

    return NextResponse.json(
      {
        message: 'User registered successfully',
        user: userWithoutPassword,
        token,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Register error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
