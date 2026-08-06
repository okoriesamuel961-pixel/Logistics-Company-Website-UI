import { CheckCircle, Download, Mail, Phone, MapPin, Package, Calendar, Truck } from 'lucide-react';
import { Link, useLocation } from 'react-router';
import { useRef } from 'react';

export function BookingConfirmationPage() {
  const location = useLocation();
  const bookingData = location.state || {};
  const receiptRef = useRef<HTMLDivElement>(null);
  const bookingNumber = useRef(`BK-${Math.random().toString(36).substr(2, 9).toUpperCase()}`).current;
  const confirmationDate = new Date().toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });

  const handleDownload = () => {
    const style = document.createElement('style');
    style.id = 'print-receipt-style';
    style.innerHTML = `
      @media print {
        body > *:not(#print-receipt-root) { display: none !important; }
        #print-receipt-root { display: block !important; position: fixed; inset: 0; background: white; z-index: 99999; padding: 24px; }
        @page { margin: 10mm; size: A4; }
      }
    `;
    document.head.appendChild(style);

    const portal = document.createElement('div');
    portal.id = 'print-receipt-root';
    portal.style.display = 'none';
    portal.innerHTML = receiptRef.current?.outerHTML ?? '';
    document.body.appendChild(portal);

    window.print();

    setTimeout(() => {
      document.head.removeChild(style);
      document.body.removeChild(portal);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0f1a] pt-20 md:pt-24">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Success header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-12 h-12 md:w-14 md:h-14 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0f172a] dark:text-[#f1f5f9] mb-4">
            Booking Confirmed!
          </h1>
          <p className="text-base md:text-lg text-[#64748b] dark:text-[#94a3b8] mb-2">
            Your shipment has been successfully booked
          </p>
          <p className="text-sm text-[#94a3b8]">{confirmationDate}</p>
        </div>

        {/* ─── RECEIPT (captured for PDF) ─── */}
        <div
          ref={receiptRef}
          style={{ fontFamily: 'Sora, sans-serif', backgroundColor: '#ffffff' }}
          className="rounded-2xl overflow-hidden border border-[#e2e8f0] mb-6 md:mb-8"
        >
          {/* Receipt header bar */}
          <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)' }} className="p-5 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3">
                <div style={{ width: 44, height: 44, background: '#ff6b35', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Truck style={{ width: 24, height: 24, color: '#fff' }} />
                </div>
                <div>
                  <p style={{ color: '#ffffff', fontSize: 20, fontWeight: 700, margin: 0 }}>SwiftLogix</p>
                  <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>Logistics Receipt</p>
                </div>
              </div>
              <div>
                <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>Booking Number</p>
                <p style={{ color: '#ff6b35', fontSize: 20, fontWeight: 700, margin: 0, letterSpacing: '0.02em' }}>{bookingNumber}</p>
              </div>
            </div>
          </div>

          {/* Status + date strip */}
          <div style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }} className="px-5 sm:px-8 py-3 flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#22c55e', flexShrink: 0 }} />
              <span style={{ color: '#16a34a', fontWeight: 600, fontSize: 14 }}>Confirmed</span>
            </div>
            <span style={{ color: '#64748b', fontSize: 13 }}>{confirmationDate}</span>
          </div>

          {/* Details grid — 1 col on mobile, 2 cols on sm+ */}
          <div className="p-5 sm:p-8 grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {/* Shipment details */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package style={{ width: 18, height: 18, color: '#ff6b35', flexShrink: 0 }} />
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 15 }}>Shipment Details</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['Service Type', (bookingData.serviceType || 'Standard').charAt(0).toUpperCase() + (bookingData.serviceType || 'Standard').slice(1)],
                    ['Package Type', (bookingData.packageType || 'Box').charAt(0).toUpperCase() + (bookingData.packageType || 'Box').slice(1)],
                    ['Weight', `${bookingData.weight || '2.5'} kg`],
                    ['Insurance', bookingData.insurance ? 'Yes — up to $1,000' : 'No'],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td style={{ color: '#64748b', fontSize: 13, padding: '6px 0', width: '45%' }}>{label}</td>
                      <td style={{ color: '#0f172a', fontSize: 13, fontWeight: 600, padding: '6px 0' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Route information */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin style={{ width: 18, height: 18, color: '#ff6b35', flexShrink: 0 }} />
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 15 }}>Route Information</span>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <tbody>
                  {[
                    ['From', `${bookingData.originCity || 'New York, NY'}, ${bookingData.originCountry || 'US'}`],
                    ['To', `${bookingData.destinationCity || 'Boston, MA'}, ${bookingData.destinationCountry || 'US'}`],
                    ['Shipment Date', bookingData.shipmentDate || new Date().toLocaleDateString()],
                  ].map(([label, value]) => (
                    <tr key={label}>
                      <td style={{ color: '#64748b', fontSize: 13, padding: '6px 0', width: '45%' }}>{label}</td>
                      <td style={{ color: '#0f172a', fontSize: 13, fontWeight: 600, padding: '6px 0' }}>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Payment summary */}
          <div className="mx-4 sm:mx-8 mb-4 sm:mb-8 rounded-xl p-5 sm:p-8" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff' }}>
            <p style={{ fontSize: 16, fontWeight: 700, margin: '0 0 20px', color: '#ffffff' }}>Payment Summary</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                ['Base Rate', `$${bookingData.baseRate?.toFixed(2) || '49.99'}`],
                ...(bookingData.insurance ? [['Insurance', `$${bookingData.insuranceAmount?.toFixed(2) || '15.00'}`]] : []),
                ['Tax (8%)', `$${bookingData.tax?.toFixed(2) || '5.20'}`],
              ].map(([label, value]) => (
                <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: '#94a3b8', fontSize: 14 }}>{label}</span>
                  <span style={{ color: '#ffffff', fontSize: 14, fontWeight: 500 }}>{value}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', marginTop: 8, paddingTop: 12, display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#ffffff', fontSize: 16, fontWeight: 700 }}>Total Paid</span>
                <span style={{ color: '#ff6b35', fontSize: 20, fontWeight: 700 }}>${bookingData.total?.toFixed(2) || '70.19'}</span>
              </div>
            </div>
            <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.08)', borderRadius: 8, padding: '12px 16px' }}>
              <p style={{ color: '#94a3b8', fontSize: 12, margin: '0 0 4px' }}>Payment Method</p>
              <p style={{ color: '#ffffff', fontSize: 14, margin: 0 }}>Credit Card ending in •••• 4242</p>
            </div>
          </div>

          {/* What's next + Need help — responsive grid */}
          <div className="mx-4 sm:mx-8 mb-4 sm:mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '20px', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-2 mb-3">
                <Calendar style={{ width: 16, height: 16, color: '#ff6b35', flexShrink: 0 }} />
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 14 }}>What's Next?</span>
              </div>
              {[
                `Confirmation email sent to ${bookingData.email || 'your email'}`,
                'Our team will contact you within 24 hours',
                'Package pickup will be scheduled',
                'Tracking number sent via email & SMS',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
                  <CheckCircle style={{ width: 14, height: 14, color: '#22c55e', flexShrink: 0, marginTop: 2 }} />
                  <span style={{ color: '#64748b', fontSize: 13 }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#f8fafc', borderRadius: 12, padding: '20px', border: '1px solid #e2e8f0' }}>
              <div className="flex items-center gap-2 mb-3">
                <Phone style={{ width: 16, height: 16, color: '#ff6b35', flexShrink: 0 }} />
                <span style={{ color: '#0f172a', fontWeight: 700, fontSize: 14 }}>Need Help?</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
                <Phone style={{ width: 14, height: 14, color: '#64748b', flexShrink: 0 }} />
                <span style={{ color: '#64748b', fontSize: 13 }}>+1 (800) 123-4567</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <Mail style={{ width: 14, height: 14, color: '#64748b', flexShrink: 0 }} />
                <span style={{ color: '#64748b', fontSize: 13 }}>support@swiftlogix.com</span>
              </div>
              <p style={{ color: '#94a3b8', fontSize: 12, margin: 0 }}>Available 24/7 for any questions or concerns</p>
            </div>
          </div>

          {/* Footer strip */}
          <div style={{ background: '#ff6b35', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <p style={{ color: '#ffffff', fontSize: 13, margin: 0, opacity: 0.9, textAlign: 'center' }}>
              Thank you for choosing SwiftLogix — Your trusted logistics partner
            </p>
          </div>
        </div>

        {/* Action buttons — Download Receipt + Track Shipment only */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 px-6 py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Download className="w-5 h-5" />
            Download Receipt
          </button>
          <Link
            to="/track-shipment"
            className="flex-1 px-6 py-4 bg-white dark:bg-[#1e293b] border-2 border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f1f5f9] rounded-lg hover:border-[#ff6b35] dark:hover:border-[#ff6b35] hover:shadow-md transition-all flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Package className="w-5 h-5" />
            Track This Shipment
          </Link>
        </div>
      </div>
    </div>
  );
}
