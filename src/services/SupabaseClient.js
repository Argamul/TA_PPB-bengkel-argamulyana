import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate and provide helpful error message if env vars are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '⚠️  Supabase credentials are missing or incomplete.\n' +
    'Please add the following to your .env.local file:\n' +
    'VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
    'VITE_SUPABASE_ANON_KEY=your-anon-key-here\n\n' +
    'For now, the app will use mock data from localStorage.'
  );
}

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export const fetchParts = async () => {
  // If Supabase is not configured, return mock data from localStorage
  if (!supabase) {
    const mockParts = JSON.parse(localStorage.getItem('parts') || '[]');
    return mockParts.length > 0 ? mockParts : getDefaultMockParts();
  }

  try {
    const { data, error } = await supabase
      .from('spare_parts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error fetching parts from Supabase:', error);
    // Fall back to mock data if fetch fails
    return getDefaultMockParts();
  }
};

/**
 * Return default mock parts for demo purposes
 */
function getDefaultMockParts() {
  return [
    {
      id: 1,
      part_name: 'Alternator',
      manufacturer: 'Denso',
      price: 1500000,
      image_url: 'https://via.placeholder.com/200?text=Alternator',
      category: 'mobil'
    },
    {
      id: 2,
      part_name: 'Oil Filter',
      manufacturer: 'Fram',
      price: 85000,
      image_url: 'https://via.placeholder.com/200?text=Oil+Filter',
      category: 'mobil'
    },
    {
      id: 3,
      part_name: 'Brake Pad',
      manufacturer: 'Brembo',
      price: 350000,
      image_url: 'https://via.placeholder.com/200?text=Brake+Pad',
      category: 'mobil'
    },
    {
      id: 4,
      part_name: 'Air Filter',
      manufacturer: 'K&N',
      price: 125000,
      image_url: 'https://via.placeholder.com/200?text=Air+Filter',
      category: 'motor'
    }
  ];
}
