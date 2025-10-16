import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

const prisma = new PrismaClient();

export async function GET() {
  try {
    // Check database connection
    await prisma.$queryRaw`SELECT 1`;
    
    // Check uploads directory
    const uploadsDir = path.join(process.cwd(), 'public/uploads');
    const uploadsAccessible = fs.existsSync(uploadsDir);
    
    // Check if we can write to uploads directory
    let uploadsWritable = false;
    if (uploadsAccessible) {
      try {
        const testFile = path.join(uploadsDir, '.test');
        fs.writeFileSync(testFile, 'test');
        fs.unlinkSync(testFile);
        uploadsWritable = true;
      } catch {
        uploadsWritable = false;
      }
    }
    
    return NextResponse.json(
      {
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'connected',
        uploads: {
          accessible: uploadsAccessible,
          writable: uploadsWritable,
          path: uploadsDir
        }
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Health check failed:', error);
    
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
