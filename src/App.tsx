import { useState } from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { PriceIndex } from './pages/PriceIndex';
import { AIPredictions } from './pages/AIPredictions';
import { AIChat } from './pages/AIChat';
import { Reports } from './pages/Reports';

export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard />;
      case 'priceIndex':
        return <PriceIndex />;
      case 'aiPredictions':
        return <AIPredictions />;
      case 'aiChat':
        return <AIChat />;
      case 'reports':
        return <Reports />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex">
          <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
          <main className="flex-1 ml-64 pt-16">
            {renderPage()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
}