import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          subscription_plan: string
          downloads_remaining: number
          trial_ends_at: string | null
          stripe_customer_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          subscription_plan?: string
          downloads_remaining?: number
          trial_ends_at?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          subscription_plan?: string
          downloads_remaining?: number
          trial_ends_at?: string | null
          stripe_customer_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      videos: {
        Row: {
          id: string
          title: string
          category: string
          file_url: string
          thumbnail_url: string
          duration: number
          tags: string[]
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          category: string
          file_url: string
          thumbnail_url: string
          duration?: number
          tags?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          category?: string
          file_url?: string
          thumbnail_url?: string
          duration?: number
          tags?: string[]
          created_at?: string
        }
      }
      downloads: {
        Row: {
          id: string
          user_id: string
          video_id: string
          downloaded_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id: string
          downloaded_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string
          downloaded_at?: string
        }
      }
      favorites: {
        Row: {
          id: string
          user_id: string
          video_id: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          video_id: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          video_id?: string
          created_at?: string
        }
      }
      custom_orders: {
        Row: {
          id: string
          user_id: string
          description: string
          age_range: string
          face_type: string
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          description: string
          age_range: string
          face_type: string
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          description?: string
          age_range?: string
          face_type?: string
          status?: string
          created_at?: string
        }
      }
    }
  }
}