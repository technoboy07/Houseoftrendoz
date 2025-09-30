import React from 'react';
import { 
  FiHome, 
  FiShoppingBag, 
  FiPackage, 
  FiUsers,
  FiX
} from 'react-icons/fi';

const AdminSidebar = ({ activeTab, setActiveTab, sidebarOpen, setSidebarOpen }) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: FiHome,
      description: 'Overview and analytics'
    },
    {
      id: 'orders',
      label: 'Orders',
      icon: FiShoppingBag,
      description: 'Manage orders and tracking'
    },
    {
      id: 'products',
      label: 'Products',
      icon: FiPackage,
      description: 'Product inventory management'
    },
    {
      id: 'users',
      label: 'Users',
      icon: FiUsers,
      description: 'User account management'
    }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed top-16 left-0 h-full bg-white border-r border-gray-200 shadow-lg z-50
        transition-all duration-300 ease-in-out
        ${sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full md:translate-x-0 md:w-16'}
      `}>
        {/* Mobile close button */}
        <div className="md:hidden flex justify-end p-4 border-b border-gray-200">
          <button
            onClick={() => setSidebarOpen(false)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <FiX className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => handleTabChange(item.id)}
                className={`
                  w-full flex items-center px-3 py-3 mb-2 text-sm font-medium rounded-lg
                  transition-colors duration-200 group relative
                  ${isActive 
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }
                `}
              >
                <Icon className={`h-5 w-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                
                {/* Tooltip for collapsed sidebar */}
                <span className={`
                  ml-3 transition-opacity duration-200
                  ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'}
                `}>
                  {item.label}
                </span>

                {/* Tooltip on hover when collapsed */}
                {!sidebarOpen && (
                  <div className="absolute left-full ml-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-gray-900 rotate-45"></div>
                  </div>
                )}
              </button>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className={`
            text-xs text-gray-500 transition-opacity duration-200
            ${sidebarOpen ? 'opacity-100' : 'opacity-0 md:opacity-0'}
          `}>
            Admin Panel v1.0
          </div>
        </div>
      </aside>
    </>
  );
};

export default AdminSidebar;
