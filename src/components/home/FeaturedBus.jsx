// src/components/home/FeaturedBusSection.jsx
import { Star, Bus } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedBusSection({ featuredBus }) {
  const [visible, setVisible] = useState(new Set());
  const refs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => setVisible(prev => new Set(prev).add(index)), index * 200);
        }
      });
    });

    refs.current.forEach((r, i) => {
      if (r) {
        r.dataset.index = i;
        obs.observe(r);
      }
    });

    return () => obs.disconnect();
  }, []);

  return (
    <section>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl md:text-3xl font-bold text-slate-800">Bus</h2>
        <button className="text-slate-500 hover:text-slate-600 text-xs md:text-sm hover:underline">Lihat Semua</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {featuredBus.map((item, index) => (
          <div
            key={item.id}
            ref={el => refs.current[index] = el}
            className={`group transition-all duration-700 ${
              visible.has(index) ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="relative bg-white/15 border border-white/25 backdrop-blur-xl rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition duration-500">

              <div className="h-32 md:h-56 overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
              </div>

              <div className="p-4 md:p-8">
                <div className="flex justify-between mb-3">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">Bus</span>
                  <div className="flex items-center bg-white px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-500"/>
                    <span className="text-xs ml-1 font-semibold">4.8</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 text-base md:text-xl mb-4 group-hover:text-blue-600">{item.name}</h3>

                <div className="flex items-center text-xs text-slate-600">
                  <Bus className="w-4 h-4 mr-2" />
                  <span className="font-medium">{item.capacity} kursi</span>
                </div>

              </div>

            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
