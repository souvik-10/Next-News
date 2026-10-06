import { Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-brand-slate text-white p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold tracking-tight">Next<span className="text-brand-crimson">News</span></h1>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto p-4 flex items-center justify-center">
        <Routes>
          <Route path="/" element={
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to Next News</h2>
              <p className="text-gray-600">The platform is currently under construction.</p>
            </div>
          } />
        </Routes>
      </main>

      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Next News. All rights reserved.
      </footer>
    </div>
  );
};

export default App;
