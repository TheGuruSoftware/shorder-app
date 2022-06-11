import { createClient } from "@supabase/supabase-js";

const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

export async function getImages() {
    const { data } = await supabaseAdmin
        .from('images')
        .select('*')
        .order('id')
    return data
}
export async function getUsers() {
    const { data } = await supabaseAdmin
        .from('users')
        .select('*')
        .order('id')
    return data
}
export async function getUserFromId(id) {
    const { data } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('id', id)
    return data[0]
}
export async function getImageFromId(id) {
    const { data } = await supabaseAdmin
        .from('images')
        .select('*')
        .eq('id', id)
    return data[0]
}
export async function getUserFromUsername(username) {
    const { data } = await supabaseAdmin
        .from('users')
        .select('*')
        .eq('username', username)
    return data[0]
}
export async function createUser(username, password) {
    const { data } = await supabaseAdmin
        .from('users')
        .insert([{ username: username, password: password }])
    return data
}
export async function createImage(userId, url, description) {
    const now = new Date()
    const { data } = await supabaseAdmin
        .from('images')
        .insert([{ author: userId, url: url, description: description, comments: [{ author: "9", text: "Komentarz od id 9", createdAt: now }, { author: "10", text: "Komentarz od id 10", createdAt: now }] }])
    return data
}

export async function updateLikes(id, likes) {
    const { data } = await supabaseAdmin
        .from('images')
        .update({ likes: likes })
        .eq('id', id)
    return data[0]
}

export async function updateComments(id, comments) {
    const { data } = await supabaseAdmin
        .from('images')
        .update({ comments: comments })
        .eq('id', id)
    return data[0].comments
}