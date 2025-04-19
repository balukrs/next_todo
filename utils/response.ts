import { NextResponse } from 'next/server';

export const successResponse = (data = {}, status = 200) =>
  NextResponse.json({ success: true, ...data }, { status });

export const errorResponse = (data = {}, status = 500) =>
  NextResponse.json({ success: false, ...data }, { status });

export const errorNotFoundResponse = (data = {}, status = 400) =>
  NextResponse.json({ success: false, ...data }, { status });
