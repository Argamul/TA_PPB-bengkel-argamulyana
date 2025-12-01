# Bengkel Gamul - Setup Guide

## Environment Variables

### Required for Development
Create `.env.local` at the project root with:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

**How to get values:**
1. Go to your Supabase project → Settings → API
2. Copy **Project URL** (looks like `https://ijwjiqjxzgujgvdyevak.supabase.co`)
3. Copy **Anon public key** (starts with `eyJ...`)
4. Paste both into `.env.local`

### Files Explained
- `.env` - Shared defaults (if any), committed to git, non-sensitive
- `.env.local` - Your local secrets, NOT committed, in `.gitignore`

## Project Structure

```
src/
├── main.jsx              # Entry point (uses new Vite setup)
├── index.css             # Global styles
├── pages/
│   ├── HomePage.jsx      # Landing page with hero & featured parts
│   ├── CatalogPage.jsx   # Catalog with search/filter
│   ├── OrderPage.jsx     # Order/cart management
│   ├── ProfilePage.jsx   # User profile
│   ├── SplashScreen.jsx  # Loading splash screen
│   ├── AboutPage.jsx     # (Not wired into app)
│   └── DetailPage.jsx    # (Partial - needs Supabase query)
├── components/
│   ├── ErrorBoundary.jsx # Catches React errors
│   ├── navbar/           # Navigation bars
│   ├── home/             # Hero and featured sections
│   ├── cards/            # Product cards
│   └── splash/           # Splash screen sub-components
├── services/
│   ├── SupabaseClient.js # Supabase setup + fetchParts
│   ├── userService.js    # User auth & profile
│   ├── uploadService.js  # Image upload to storage
│   ├── WishlistService.js# Wishlist (localStorage)
│   └── PWABadges.jsx     # PWA install prompt
└── hooks/
    └── useToggleWishlist.js # Wishlist hook
```

## Running the App

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

After running `npm run dev`, open the browser at `http://localhost:5173/`

## Known Issues & Limitations

- **DetailPage.jsx** - Incomplete; uses localStorage instead of Supabase queries
- **EditAddPage.jsx** - Partially implemented; `partService` doesn't exist
- **AboutPage.jsx** - Not integrated into main navigation
- **Cart/Order flow** - Uses localStorage; not connected to Supabase yet

## Database Setup (Supabase)

Ensure your Supabase project has a `spare_parts` table with columns:
- `id` (int, primary key)
- `part_name` (text)
- `manufacturer` (text)
- `price` (int/numeric)
- `image_url` (text)
- `category` (text)
- `created_at` (timestamp)

## Technologies

- React 19+
- Vite 7
- TailwindCSS 4
- Supabase (Auth + DB + Storage)
- React Query (@tanstack/react-query)
- Lucide React (icons)

## Next Steps

1. Set up `.env.local` with Supabase credentials
2. Run `npm run dev`
3. Implement missing Supabase queries in DetailPage and EditAddPage
4. Connect cart/order system to Supabase
5. Wire up AboutPage to main navigation if needed
