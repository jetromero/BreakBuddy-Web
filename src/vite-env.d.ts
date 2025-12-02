/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: 'https://mgfnwykwlrbxisiltmqe.supabase.co'
  readonly VITE_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1nZm53eWt3bHJiemlzaWx0bXFlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzNzE4NjEsImV4cCI6MjA0ODk0Nzg2MX0.l95mYI1MqN-mYbGg4hGvQ7zUgZD9J0B_hV7x1B3L3E'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
