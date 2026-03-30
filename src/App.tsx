/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Home } from './pages/Home';
import { AdminDashboard } from './pages/AdminDashboard';
import { ChatWidget } from './components/chatbot/ChatWidget';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen flex flex-col font-sans text-gray-900">
        <Routes>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/" element={
            <>
              <Navbar />
              <Home />
              <Footer />
              <ChatWidget />
            </>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
