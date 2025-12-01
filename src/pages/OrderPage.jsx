import { useState } from 'react';
import { ArrowLeft, Package, Truck, CheckCircle, Clock, XCircle, Search, Eye } from 'lucide-react';

export default function OrderPage({ navigateTo }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Mock order data
  const orders = [
    {
      id: 'ORD-2024-001',
      date: '2024-11-28',
      status: 'delivered',
      total: 3248.50,
      items: [
        {
          name: 'Premium Turbocharger Assembly',
          manufacturer: 'Toyota',
          quantity: 2,
          price: 1299,
          image: 'https://images.unsplash.com/photo-1664695221759-21ed7295f697?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
        },
        {
          name: 'Advanced Brake System Kit',
          manufacturer: 'Honda',
          quantity: 1,
          price: 449,
          image: 'https://images.unsplash.com/photo-1762012507780-060fe0bcc783?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
        },
      ],
      tracking: 'TRK-998877665544',
      shippingAddress: '123 Workshop Street, Motor City, MC 12345',
    },
    {
      id: 'ORD-2024-002',
      date: '2024-11-30',
      status: 'processing',
      total: 5499,
      items: [
        {
          name: 'Heavy-Duty Transmission',
          manufacturer: 'Mercedes-Benz',
          quantity: 1,
          price: 5499,
          image: 'https://images.unsplash.com/photo-1675798941648-5ddbddcbb9fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
        },
      ],
      tracking: 'TRK-112233445566',
      shippingAddress: '123 Workshop Street, Motor City, MC 12345',
    },
    {
      id: 'ORD-2024-003',
      date: '2024-12-01',
      status: 'shipped',
      total: 2899,
      items: [
        {
          name: 'V8 Engine Rebuild Kit',
          manufacturer: 'Ford',
          quantity: 1,
          price: 2899,
          image: 'https://images.unsplash.com/photo-1762139258224-236877b2c571?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200',
        },
      ],
      tracking: 'TRK-334455667788',
      shippingAddress: '123 Workshop Street, Motor City, MC 12345',
    },
  ];

  const statusConfig = {
    processing: {
      label: 'Processing',
      icon: Clock,
      color: 'bg-blue-100 text-blue-700 border-blue-200',
      iconColor: 'text-blue-600',
    },
    shipped: {
      label: 'Shipped',
      icon: Truck,
      color: 'bg-purple-100 text-purple-700 border-purple-200',
      iconColor: 'text-purple-600',
    },
    delivered: {
      label: 'Delivered',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-700 border-green-200',
      iconColor: 'text-green-600',
    },
    cancelled: {
      label: 'Cancelled',
      icon: XCircle,
      color: 'bg-red-100 text-red-700 border-red-200',
      iconColor: 'text-red-600',
    },
  };

  const filteredOrders = orders
    .filter(order => filterStatus === 'all' || order.status === filterStatus)
    .filter(order => 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => navigateTo('home')}
              className="flex items-center gap-2 text-[#0A1A3F] hover:text-[#FF7A00] transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
              <span>Back</span>
            </button>
            <h1 className="text-[#0A1A3F]">My Orders</h1>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-[20px] border-2 border-transparent focus:border-[#FF7A00] focus:bg-white outline-none transition-all"
            />
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {['all', 'processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-6 py-2 rounded-[20px] capitalize whitespace-nowrap transition-all ${
                filterStatus === status
                  ? 'bg-[#FF7A00] text-white shadow-md'
                  : 'bg-white text-slate-600 hover:bg-slate-100'
              }`}
            >
              {status === 'all' ? 'All Orders' : status}
            </button>
          ))}
        </div>

        {/* Orders List */}
        {filteredOrders.length > 0 ? (
          <div className="space-y-6">
            {filteredOrders.map((order) => {
              const status = statusConfig[order.status];
              const StatusIcon = status.icon;

              return (
                <div key={order.id} className="bg-white rounded-[20px] shadow-sm hover:shadow-lg transition-all overflow-hidden">
                  {/* Order Header */}
                  <div className="p-6 border-b-2 border-slate-100">
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-[#0A1A3F] mb-1">Order {order.id}</h3>
                        <p className="text-sm text-slate-600">Placed on {new Date(order.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                      </div>
                      
                      <div className={`flex items-center gap-2 px-4 py-2 rounded-[12px] border-2 ${status.color}`}>
                        <StatusIcon className={`w-5 h-5 ${status.iconColor}`} />
                        <span>{status.label}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4">
                      <div>
                        <p className="text-sm text-slate-600 mb-1">Total Amount</p>
                        <p className="text-2xl text-[#FF7A00]">${order.total.toFixed(2)}</p>
                      </div>
                      
                      {order.tracking && (
                        <div>
                          <p className="text-sm text-slate-600 mb-1">Tracking Number</p>
                          <p className="text-[#0A1A3F] font-mono">{order.tracking}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="p-6">
                    <h4 className="text-[#0A1A3F] mb-4">Order Items</h4>
                    <div className="space-y-4">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex gap-4 p-4 bg-slate-50 rounded-[12px]">
                          <div className="w-20 h-20 bg-white rounded-[12px] flex-shrink-0 overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="text-[#0A1A3F] mb-1 truncate">{item.name}</h5>
                            <p className="text-sm text-slate-600 mb-2">{item.manufacturer}</p>
                            <div className="flex items-center gap-4">
                              <p className="text-sm text-slate-600">Qty: {item.quantity}</p>
                              <p className="text-[#FF7A00]">${item.price.toLocaleString()}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-6 p-4 bg-slate-50 rounded-[12px]">
                      <p className="text-sm text-slate-600 mb-2">Shipping Address</p>
                      <p className="text-[#0A1A3F]">{order.shippingAddress}</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="mt-6 flex gap-4">
                      {order.status === 'shipped' && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#FF7A00] hover:bg-[#ff8a1a] text-white rounded-[12px] transition-all">
                          <Truck className="w-5 h-5" />
                          Track Order
                        </button>
                      )}
                      {order.status === 'delivered' && (
                        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#0A1A3F] hover:bg-[#0d2154] text-white rounded-[12px] transition-all">
                          <Package className="w-5 h-5" />
                          Reorder
                        </button>
                      )}
                      <button className="flex items-center justify-center gap-2 px-6 py-3 border-2 border-[#0A1A3F] text-[#0A1A3F] hover:bg-[#0A1A3F] hover:text-white rounded-[12px] transition-all">
                        <Eye className="w-5 h-5" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-[20px]">
            <Package className="w-24 h-24 text-slate-300 mx-auto mb-6" />
            <h2 className="text-[#0A1A3F] mb-3">No orders found</h2>
            <p className="text-slate-600 mb-8">You haven't placed any orders yet</p>
            <button
              onClick={() => navigateTo('catalog')}
              className="bg-[#FF7A00] hover:bg-[#ff8a1a] text-white px-8 py-4 rounded-[20px] shadow-lg transition-all"
            >
              Start Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
