import { BrowserRouter, Routes, Route, useLocation } from 'react-router';
import { useEffect } from 'react';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { TrackShipmentPage } from './pages/TrackShipmentPage';
import { GetQuotePage } from './pages/GetQuotePage';
import { BookingConfirmationPage } from './pages/BookingConfirmationPage';
import { ContactSuccessPage } from './pages/ContactSuccessPage';
import { ThemeProvider, useTheme } from './context/ThemeContext';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppInner() {
  const { isDark } = useTheme();
  return (
    <div className={isDark ? 'dark' : ''}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<HomePage />} />
            <Route path="track-shipment" element={<TrackShipmentPage />} />
            <Route path="get-quote" element={<GetQuotePage />} />
            <Route path="booking-confirmation" element={<BookingConfirmationPage />} />
            <Route path="contact-success" element={<ContactSuccessPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppInner />
    </ThemeProvider>
  );
}
