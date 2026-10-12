# MemeForge Backend

Backend integration layer for Supabase authentication, database, and storage.

## Structure

- `src/config`: Supabase client and environment configuration
- `src/controllers`: request/application coordination
- `src/models`: backend domain entities and persistence shapes
- `src/routes`: API route definitions, if a custom API is introduced
- `src/services`: Supabase and external service operations
- `src/middleware`: request validation and shared middleware
- `src/types`: backend-specific TypeScript types

The current MVP uses Supabase directly as its backend platform. Add a custom server only when server-only logic is required.
