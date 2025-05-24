import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export async function signUp(email: string, password: string, metadata: any) {
  const supabase = createClientComponentClient()

  console.log("SignUp called with metadata:", metadata)

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: metadata.name,
        role: metadata.role,
        department_id: Number.parseInt(metadata.department_id?.toString() || "1"),
        status: metadata.status,
      },
    },
  })

  console.log("SignUp result:", { data, error })

  return { data, error }
}

export async function signIn(email: string, password: string) {
  const supabase = createClientComponentClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  console.log("SignIn result:", { data, error })

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