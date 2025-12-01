import { motion } from '@motionone/react';
import { Wrench } from 'lucide-react';

export default function SplashScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A1A3F] via-[#0d2154] to-[#0A1A3F]">
      <div className="text-center">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-[#FF7A00] blur-3xl opacity-50 rounded-full"></div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="relative bg-white rounded-[20px] p-8 shadow-2xl"
            >
              <Wrench className="w-20 h-20 text-[#FF7A00]" strokeWidth={2.5} />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1 className="text-white mb-3">
            <span className="block text-4xl mb-2">Bengkel</span>
            <span className="block text-5xl">SparePart Digital</span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-[#FF7A00] text-xl tracking-wide"
          >
            Your Complete Vehicle Parts Marketplace
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="mt-12"
        >
          <div className="flex gap-2 justify-center">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2
                }}
                className="w-3 h-3 bg-[#FF7A00] rounded-full"
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
