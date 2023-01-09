// import { createClient } from '@supabase/supabase-js'

// const supabaseUrl = "https://ciqsixpxrxczvljgamje.supabase.co"
// const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNpcXNpeHB4cnhjenZsamdhbWplIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI3NzU3NDQsImV4cCI6MTk4ODM1MTc0NH0.URBzctlAT27Y0xVcotsVUowWy0ocyFPc4XFfAxSPSKk"

// export const supabase = createClient(supabaseUrl, supabaseAnonKey)


import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.VUE_APP_SUPABASE_URL
const supabaseAnonKey = process.env.VUE_APP_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
