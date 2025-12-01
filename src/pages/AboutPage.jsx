import { ArrowLeft, Target, Users, Globe, Mail, Phone, MapPin, Award, Wrench } from 'lucide-react';

export default function AboutPage({ navigateTo }) {
  const features = [
    {
      icon: Award,
      title: 'Quality Assured',
      description: 'All parts are verified and certified to meet industry standards',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving customers in over 25 countries worldwide',
    },
    {
      icon: Users,
      title: 'Expert Support',
      description: '24/7 customer service from industry professionals',
    },
    {
      icon: Wrench,
      title: 'Wide Selection',
      description: 'Over 50,000 parts for all vehicle types',
    },
  ];

  const team = [
    {
      name: 'Michael Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    },
    {
      name: 'Sarah Johnson',
      role: 'Head of Operations',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    },
    {
      name: 'David Martinez',
      role: 'Chief Technical Officer',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
            <span>Back to Home</span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0A1A3F] via-[#0d2154] to-[#0A1A3F] text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-[#FF7A00] rounded-[20px] mb-6">
            <Wrench className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl mb-6">About Us</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Revolutionizing the spare parts industry with a digital-first approach to vehicle maintenance
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Mission Section */}
        <section className="bg-white rounded-[20px] shadow-lg p-8 md:p-12 mb-12">
          <div className="flex items-start gap-6 mb-8">
            <div className="bg-[#FF7A00]/10 p-4 rounded-[20px]">
              <Target className="w-8 h-8 text-[#FF7A00]" />
            </div>
            <div>
              <h2 className="text-[#0A1A3F] mb-4">Our Mission</h2>
              <p className="text-slate-600 leading-relaxed mb-4">
                At Bengkel SparePart Digital, we're on a mission to transform how mechanics and vehicle owners source spare parts. We believe that finding the right part shouldn't be a challenge—it should be seamless, fast, and reliable.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Since our founding in 2008, we've built a comprehensive digital marketplace that connects suppliers with customers across the globe, covering everything from everyday car parts to specialized aircraft components.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8 border-t-2 border-slate-100">
            <div className="text-center">
              <div className="text-4xl text-[#FF7A00] mb-2">15+</div>
              <div className="text-slate-600">Years in Business</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#FF7A00] mb-2">50K+</div>
              <div className="text-slate-600">Parts Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl text-[#FF7A00] mb-2">10K+</div>
              <div className="text-slate-600">Happy Customers</div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="mb-12">
          <h2 className="text-[#0A1A3F] text-center mb-12">Why Choose Us</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-white rounded-[20px] shadow-sm hover:shadow-lg p-6 transition-all">
                <div className="bg-[#FF7A00]/10 w-14 h-14 rounded-[12px] flex items-center justify-center mb-4">
                  <feature.icon className="w-7 h-7 text-[#FF7A00]" />
                </div>
                <h3 className="text-[#0A1A3F] mb-2">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="bg-white rounded-[20px] shadow-lg p-8 md:p-12 mb-12">
          <h2 className="text-[#0A1A3F] text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-[20px] object-cover mx-auto mb-4 shadow-lg"
                />
                <h3 className="text-[#0A1A3F] mb-1">{member.name}</h3>
                <p className="text-slate-600 text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="bg-gradient-to-br from-[#0A1A3F] to-[#0d2154] rounded-[20px] shadow-lg p-8 md:p-12 text-white">
          <h2 className="mb-8 text-center">Get In Touch</h2>
          
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-[#FF7A00]" />
              </div>
              <p className="text-sm text-slate-300 mb-2">Email Us</p>
              <p>contact@bengkel.com</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-[#FF7A00]" />
              </div>
              <p className="text-sm text-slate-300 mb-2">Call Us</p>
              <p>+1 (800) 555-PART</p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 backdrop-blur-sm w-14 h-14 rounded-[12px] flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-[#FF7A00]" />
              </div>
              <p className="text-sm text-slate-300 mb-2">Visit Us</p>
              <p>Motor City, USA</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => navigateTo('catalog')}
              className="inline-flex items-center gap-2 bg-[#FF7A00] hover:bg-[#ff8a1a] text-white px-8 py-4 rounded-[20px] shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
