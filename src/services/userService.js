const USER_KEY = "bengkel_gamul_user";

export function getCurrentUser() {
  const raw = localStorage.getItem(USER_KEY);
  return raw
    ? JSON.parse(raw)
    : {
        id: "guest",
        name: "Guest",
        email: "guest@example.com",
        role: "customer",
      };
}

export function updateUserProfile(data) {
  const user = { ...getCurrentUser(), ...data };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  return user;
}
