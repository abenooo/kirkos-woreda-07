import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export const signIn = async (email: string, password: string) => {
  const supabase = createClientComponentClient()
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const supabase = createClientComponentClient()
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getSession = async () => {
  const supabase = createClientComponentClient()
  const { data: { session }, error } = await supabase.auth.getSession()
  return { session, error }
} 