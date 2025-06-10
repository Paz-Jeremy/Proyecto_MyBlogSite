import { createClient } from "@supabase/supabase-js";

export const supabase = createClient("https://fxlzmkvkflbabmilexsi.supabase.co"
    ,"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4bHpta3ZrZmxiYWJtaWxleHNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk1Nzg4OTksImV4cCI6MjA2NTE1NDg5OX0.DPdyGqh7M3I2s9Zs9Mz5traThBs5i38AHGCtWmr-8R0")