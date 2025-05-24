"use server"

import { createClient } from "@supabase/supabase-js"

// Create admin client with service role key
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
  },
})

export async function getAuthenticatedUsers() {
  try {
    const {
      data: { users },
      error,
    } = await supabaseAdmin.auth.admin.listUsers()

    if (error) {
      console.error("Error fetching users:", error)
      return { success: false, error: error.message, users: [] }
    }

    console.log(
      "Raw user data sample:",
      users[0]
        ? {
            id: users[0].id,
            email: users[0].email,
            user_metadata: users[0].user_metadata,
            created_at: users[0].created_at,
          }
        : "No users found",
    )

    // Transform users for client
    const transformedUsers = users.map((user) => ({
      id: user.id,
      name: user.user_metadata?.name || `User ${user.email?.split("@")[0]}` || "Unknown User",
      email: user.email || "No email provided",
      role: user.user_metadata?.role || "staff",
      department_id: user.user_metadata?.department_id || 1,
      status: user.email_confirmed_at ? "active" : "pending",
      created_at: user.created_at,
      email_confirmed_at: user.email_confirmed_at,
      last_sign_in_at: user.last_sign_in_at,
    }))

    return { success: true, users: transformedUsers }
  } catch (error) {
    console.error("Exception in getAuthenticatedUsers:", error)
    return { success: false, error: "Failed to fetch users", users: [] }
  }
}

export async function updateUserMetadata(userId: string, metadata: any) {
  try {
    const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, {
      user_metadata: metadata,
    })

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Exception in updateUserMetadata:", error)
    return { success: false, error: "Failed to update user" }
  }
}

export async function deleteAuthUser(userId: string) {
  try {
    const { error } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (error) {
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Exception in deleteAuthUser:", error)
    return { success: false, error: "Failed to delete user" }
  }
}
