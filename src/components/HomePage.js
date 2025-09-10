const Header = ({ setPage, cartItemCount }) => {
    return (
        <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-90 backdrop-blur-md z-50 border-b border-gray-200">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center space-x-6">
                        <button onClick={() => setPage('home')} className="flex items-center space-x-2 text-sm font-medium tracking-wider">
                            <span>MENU</span>
                        </button>
                        <button className="flex items-center space-x-2">
                             <SearchIcon />
                        </button>
                    </div>
                    <div className="absolute left-1/2 -translate-x-1/2">
                       <button onClick={() => setPage('home')} className="flex items-center">
                            <LogoIcon />
                        </button>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button><UserIcon /></button>
                        <button><HeartIcon /></button>
                        <button onClick={() => setPage('cart')} className="flex items-center space-x-1">
                            <BagIcon itemCount={cartItemCount} />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};