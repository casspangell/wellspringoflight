import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://xrqajotvoeqokrirwune.supabase.co'
const supabaseKey =  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhycWFqb3R2b2Vxb2tyaXJ3dW5lIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTE5NTUwNjgsImV4cCI6MjAwNzUzMTA2OH0.wmEZy97i7ftDlJQlueAdlFjJm1rtuzdpIrPPQdaRT4s'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase