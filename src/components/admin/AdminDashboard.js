import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getDashboardStats } from '../../redux/features/adminSlice';
import { 
  FiUsers, 
  FiPackage, 
  FiShoppingBag, 
  FiDollarSign,
  FiTrendingUp,
  FiAlertTriangle,
  FiEye
} from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, color, change, subtitle }) => (
  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-full ${color}`}>
        <Icon className="h-6 w-6 text-white" />
      </div>
    </div>
    {change && (
      <div className="mt-4 flex items-center">
        <FiTrendingUp className="h-4 w-4 text-green-500 mr-1" />
        <span className="text-sm text-green-600 font-medium">{change}</span>
      </div>
    )}
  </div>
);

const RecentOrderItem = ({ order }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
          <FiShoppingBag className="h-4 w-4 text-blue-600" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">
          {order.user?.firstName} {order.user?.lastName}
        </p>
        <p className="text-xs text-gray-500">{order.user?.email}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-gray-900">${order.orderTotal}</p>
      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
        order.orderStatus === 'delivered' ? 'bg-green-100 text-green-800' :
        order.orderStatus === 'shipped' ? 'bg-blue-100 text-blue-800' :
        order.orderStatus === 'processing' ? 'bg-yellow-100 text-yellow-800' :
        'bg-red-100 text-red-800'
      }`}>
        {order.orderStatus}
      </span>
    </div>
  </div>
);

const LowStockItem = ({ product }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-3">
      <div className="flex-shrink-0">
        <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
          <FiAlertTriangle className="h-4 w-4 text-red-600" />
        </div>
      </div>
      <div>
        <p className="text-sm font-medium text-gray-900">{product.name}</p>
        <p className="text-xs text-gray-500">{product.brand}</p>
      </div>
    </div>
    <div className="text-right">
      <p className="text-sm font-medium text-red-600">{product.stock} left</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { dashboardStats, loading } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardStats());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!dashboardStats) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No dashboard data available</p>
      </div>
    );
  }

  const { stats, recentOrders, lowStockProducts, monthlyRevenue } = dashboardStats;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <FiEye className="h-4 w-4" />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats.totalUsers?.toLocaleString() || '0'}
          icon={FiUsers}
          color="bg-blue-500"
          subtitle="Registered customers"
        />
        <StatCard
          title="Total Products"
          value={stats.totalProducts?.toLocaleString() || '0'}
          icon={FiPackage}
          color="bg-green-500"
          subtitle="In inventory"
        />
        <StatCard
          title="Total Orders"
          value={stats.totalOrders?.toLocaleString() || '0'}
          icon={FiShoppingBag}
          color="bg-purple-500"
          subtitle="All time"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats.totalRevenue?.toLocaleString() || '0'}`}
          icon={FiDollarSign}
          color="bg-yellow-500"
          subtitle="Lifetime earnings"
        />
      </div>

      {/* Charts and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
            <p className="text-sm text-gray-500">Latest customer orders</p>
          </div>
          <div className="p-6">
            {recentOrders && recentOrders.length > 0 ? (
              <div className="space-y-1">
                {recentOrders.map((order) => (
                  <RecentOrderItem key={order._id} order={order} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiShoppingBag className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No recent orders</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock Products */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Low Stock Alert</h3>
            <p className="text-sm text-gray-500">Products running low</p>
          </div>
          <div className="p-6">
            {lowStockProducts && lowStockProducts.length > 0 ? (
              <div className="space-y-1">
                {lowStockProducts.map((product) => (
                  <LowStockItem key={product._id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <FiPackage className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">All products well stocked</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Monthly Revenue Chart */}
      {monthlyRevenue && monthlyRevenue.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Monthly Revenue</h3>
            <p className="text-sm text-gray-500">Revenue trends over time</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {monthlyRevenue.slice(0, 6).map((month, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-900">
                    {new Date(month._id.year, month._id.month - 1).toLocaleDateString('en-US', { 
                      month: 'short', 
                      year: 'numeric' 
                    })}
                  </p>
                  <p className="text-lg font-bold text-green-600">${month.revenue.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{month.count} orders</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
