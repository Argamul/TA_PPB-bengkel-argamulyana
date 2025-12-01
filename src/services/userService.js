import { supabase } from './SupabaseClient';

// Local storage key for user profile
const USER_PROFILE_KEY = 'user_profile';
const USER_SESSION_KEY = 'user_session';

/**
 * Get current user session from Supabase
 */
export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    return user;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

/**
 * Register a new user with email and password
 */
export const registerUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

/**
 * Login user with email and password
 */
export const loginUser = async (email, password) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

/**
 * Logout current user
 */
export const logoutUser = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    localStorage.removeItem(USER_PROFILE_KEY);
    localStorage.removeItem(USER_SESSION_KEY);
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

/**
 * Get user profile from database
 */
export const fetchUserProfile = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return null;
  }
};

/**
 * Get user profile from local storage
 */
export const getUserProfile = () => {
  const profile = localStorage.getItem(USER_PROFILE_KEY);
  return profile ? JSON.parse(profile) : null;
};

/**
 * Update username
 */
export const updateUsername = async (userId, username) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ username })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating username:', error);
    throw error;
  }
};

/**
 * Update user bio
 */
export const updateBio = async (userId, bio) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ bio })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating bio:', error);
    throw error;
  }
};

/**
 * Update user avatar
 */
export const updateAvatar = async (userId, avatarUrl) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update({ avatar: avatarUrl })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating avatar:', error);
    throw error;
  }
};

/**
 * Upload avatar image to storage
 */
export const uploadAvatarImage = async (userId, file) => {
  try {
    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}_${Date.now()}.${fileExt}`;
    const filePath = `avatars/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('user_avatars')
      .upload(filePath, file);

    if (uploadError) throw uploadError;

    const { data } = supabase.storage
      .from('user_avatars')
      .getPublicUrl(filePath);

    return data.publicUrl;
  } catch (error) {
    console.error('Error uploading avatar image:', error);
    throw error;
  }
};

/**
 * Save user profile to local storage
 */
export const saveUserProfile = (profile) => {
  localStorage.setItem(USER_PROFILE_KEY, JSON.stringify(profile));
};

/**
 * Create a new user profile in database
 */
export const createUserProfile = async (userId, userData = {}) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: userId,
          username: userData.username || 'User',
          email: userData.email || '',
          avatar: userData.avatar || null,
          bio: userData.bio || '',
          created_at: new Date().toISOString(),
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating user profile:', error);
    throw error;
  }
};

/**
 * Delete user profile
 */
export const deleteUserProfile = async (userId) => {
  try {
    const { error } = await supabase
      .from('user_profiles')
      .delete()
      .eq('id', userId);

    if (error) throw error;
  } catch (error) {
    console.error('Error deleting user profile:', error);
    throw error;
  }
};

/**
 * Get all user profiles (admin only)
 */
export const getAllUserProfiles = async () => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*');

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching all user profiles:', error);
    return [];
  }
};

/**
 * Verify email
 */
export const verifyEmail = async (email) => {
  try {
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error verifying email:', error);
    throw error;
  }
};

/**
 * Reset password
 */
export const resetPassword = async (email) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) throw error;
  } catch (error) {
    console.error('Error resetting password:', error);
    throw error;
  }
};

/**
 * Update password
 */
export const updatePassword = async (newPassword) => {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    if (error) throw error;
  } catch (error) {
    console.error('Error updating password:', error);
    throw error;
  }
};
