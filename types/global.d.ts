// globals.d.ts or types/global.d.ts
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Mongoose> | null };
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string;
      email?: string;
    };
  }
}

// This is to make the file a module.
export {};
