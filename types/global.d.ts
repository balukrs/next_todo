// globals.d.ts or types/global.d.ts
declare global {
  var mongoose: { conn: mongoose.Connection | null; promise: Promise<mongoose.Mongoose> | null };
}

// This is to make the file a module.
export {};
