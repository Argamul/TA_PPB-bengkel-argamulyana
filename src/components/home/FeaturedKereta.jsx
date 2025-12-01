// src/components/home/FeaturedKeretaSection.jsx
import { Clock, Star, TrainFront } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export default function FeaturedKeretaSection({ featuredKereta }) {
  const [visible, setVisible] = useState(new Set());
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisible(prev => new Set(prev).add(index));
          }, index * 200);
        }
      });
    }, { threshold: 0.1 });

    itemRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section>
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <h2 className="text-xl md:text-3xl font-bold text-slate-800">Kereta</h2>
        <button className="text-slate-500 hover:text-slate-600 text-xs md:text-sm hover:underline">Lihat Semua</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
        {featuredKereta.map((item, index) => (
          <div
            key={item.id}
            ref={el => itemRefs.current[index] = el}
            className={`group transform transition-all duration-700 ${
              visible.has(index) ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg md:shadow-2xl cursor-pointer group-hover:scale-105 transition-all duration-500">

              <div className="relative h-32 md:h-56 overflow-hidden">
                <img src={item.image_url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>

              <div className="p-4 md:p-8">
                <div className="flex items-center justify-between mb-3 md:mb-4">
                  <span className="text-xs font-semibold text-blue-700 bg-blue-100 px-2 py-1 rounded-full">
                    Kereta
                  </span>
                  <div className="flex items-center space-x-1 bg-white px-2 py-1 rounded-full">
                    <Star className="w-3 h-3 text-yellow-500" />
                    <span className="text-xs md:text-sm font-semibold text-slate-700">4.8</span>
                  </div>
                </div>

                <h3 className="font-bold text-slate-800 mb-4 text-base md:text-xl group-hover:text-blue-600">
                  {item.name}
                </h3>

                <div className="flex items-center text-xs md:text-sm text-slate-600">
                  <TrainFront className="w-4 h-4 mr-2" />
                  <span className="font-medium">{item.routes.length} rute tersedia</span>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
