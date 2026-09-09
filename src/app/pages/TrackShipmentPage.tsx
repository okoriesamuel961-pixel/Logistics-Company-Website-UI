import {
  Search, Package, Truck, CheckCircle, MapPin, Calendar, Clock,
  User, Phone, Mail, ArrowLeft, AlertTriangle, RefreshCw, Hourglass, Bell,
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router';
import type { LucideIcon } from 'lucide-react';

// ─── Types ────────────────────────────────────────────────────────────────────

type TrackingStatus = 'delivered' | 'out-for-delivery' | 'in-transit' | 'pending' | 'exception';

interface TrackingEvent {
  label: string;
  location: string;
  date: string;
  time: string;
  description: string;
  icon: LucideIcon;
  state: 'completed' | 'current' | 'pending' | 'exception';
}

interface ShipmentData {
  trackingNumber: string;
  status: TrackingStatus;
  serviceType: string;
  weight: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  events: TrackingEvent[];
}

// ─── Mock database ────────────────────────────────────────────────────────────

const SHIPMENTS: Record<string, ShipmentData> = {
  'TRK-2024-8492': {
    trackingNumber: 'TRK-2024-8492',
    status: 'delivered',
    serviceType: 'Express Delivery',
    weight: '2.5 kg',
    estimatedDelivery: 'May 11, 2026',
    origin: 'New York, NY',
    destination: 'Boston, MA',
    events: [
      {
        label: 'Delivered',
        location: 'Boston, MA — Customer Location',
        date: 'May 11, 2026',
        time: '02:30 PM',
        description: 'Package delivered successfully. Signed by: J. Smith',
        icon: CheckCircle,
        state: 'completed',
      },
      {
        label: 'Out for Delivery',
        location: 'Boston Hub — Delivery Vehicle',
        date: 'May 11, 2026',
        time: '08:15 AM',
        description: 'Package is out for delivery',
        icon: Truck,
        state: 'completed',
      },
      {
        label: 'Arrived at Facility',
        location: 'Boston Distribution Center',
        date: 'May 11, 2026',
        time: '06:00 AM',
        description: 'Package arrived at local distribution center',
        icon: MapPin,
        state: 'completed',
      },
      {
        label: 'In Transit',
        location: 'Philadelphia Hub',
        date: 'May 10, 2026',
        time: '11:45 PM',
        description: 'Package in transit to destination city',
        icon: Truck,
        state: 'completed',
      },
      {
        label: 'Package Picked Up',
        location: 'New York Distribution Center',
        date: 'May 10, 2026',
        time: '09:30 AM',
        description: 'Package picked up and processed',
        icon: Package,
        state: 'completed',
      },
    ],
  },

  'TRK-2024-7381': {
    trackingNumber: 'TRK-2024-7381',
    status: 'out-for-delivery',
    serviceType: 'Standard Delivery',
    weight: '4.2 kg',
    estimatedDelivery: 'June 1, 2026',
    origin: 'Chicago, IL',
    destination: 'Detroit, MI',
    events: [
      {
        label: 'Delivered',
        location: 'Detroit, MI — Customer Location',
        date: 'June 1, 2026',
        time: 'Expected by 6:00 PM',
        description: 'Awaiting final delivery',
        icon: CheckCircle,
        state: 'pending',
      },
      {
        label: 'Out for Delivery',
        location: 'Detroit Hub — Delivery Vehicle',
        date: 'June 1, 2026',
        time: '07:45 AM',
        description: 'Your package is on the way — driver en route',
        icon: Truck,
        state: 'current',
      },
      {
        label: 'Arrived at Facility',
        location: 'Detroit Distribution Center',
        date: 'June 1, 2026',
        time: '04:30 AM',
        description: 'Package sorted and loaded onto delivery vehicle',
        icon: MapPin,
        state: 'completed',
      },
      {
        label: 'In Transit',
        location: 'Toledo Transit Hub',
        date: 'May 31, 2026',
        time: '09:00 PM',
        description: 'Package moving to destination city',
        icon: Truck,
        state: 'completed',
      },
      {
        label: 'Package Picked Up',
        location: 'Chicago Distribution Center',
        date: 'May 31, 2026',
        time: '10:15 AM',
        description: 'Package accepted and ready for transport',
        icon: Package,
        state: 'completed',
      },
    ],
  },

  'TRK-2024-6295': {
    trackingNumber: 'TRK-2024-6295',
    status: 'in-transit',
    serviceType: 'Economy Freight',
    weight: '18.7 kg',
    estimatedDelivery: 'June 4, 2026',
    origin: 'Miami, FL',
    destination: 'Atlanta, GA',
    events: [
      {
        label: 'Delivered',
        location: 'Atlanta, GA — Customer Location',
        date: 'June 4, 2026',
        time: '—',
        description: 'Estimated delivery date',
        icon: CheckCircle,
        state: 'pending',
      },
      {
        label: 'Out for Delivery',
        location: 'Atlanta Hub',
        date: '—',
        time: '—',
        description: 'Pending local distribution',
        icon: Truck,
        state: 'pending',
      },
      {
        label: 'In Transit',
        location: 'Savannah Freight Hub',
        date: 'June 2, 2026',
        time: '01:20 PM',
        description: 'Freight moving northward — on schedule',
        icon: Truck,
        state: 'current',
      },
      {
        label: 'Departed Origin Facility',
        location: 'Miami Freight Terminal',
        date: 'June 1, 2026',
        time: '06:00 AM',
        description: 'Shipment departed from origin facility',
        icon: MapPin,
        state: 'completed',
      },
      {
        label: 'Package Picked Up',
        location: 'Miami Distribution Center',
        date: 'May 31, 2026',
        time: '03:00 PM',
        description: 'Package collected from sender',
        icon: Package,
        state: 'completed',
      },
    ],
  },

  'TRK-2024-5183': {
    trackingNumber: 'TRK-2024-5183',
    status: 'pending',
    serviceType: 'Same-Day Delivery',
    weight: '0.8 kg',
    estimatedDelivery: 'June 2, 2026',
    origin: 'Los Angeles, CA',
    destination: 'San Francisco, CA',
    events: [
      {
        label: 'Delivered',
        location: 'San Francisco, CA',
        date: 'June 2, 2026',
        time: '—',
        description: 'Scheduled delivery',
        icon: CheckCircle,
        state: 'pending',
      },
      {
        label: 'Out for Delivery',
        location: 'SF Hub',
        date: '—',
        time: '—',
        description: 'Pending',
        icon: Truck,
        state: 'pending',
      },
      {
        label: 'In Transit',
        location: '—',
        date: '—',
        time: '—',
        description: 'Pending',
        icon: Truck,
        state: 'pending',
      },
      {
        label: 'Pickup Scheduled',
        location: 'Los Angeles, CA',
        date: 'June 2, 2026',
        time: '10:00 AM',
        description: 'Driver pickup window: 10:00 AM – 12:00 PM',
        icon: Hourglass,
        state: 'current',
      },
      {
        label: 'Order Received',
        location: 'SwiftLogix System',
        date: 'June 1, 2026',
        time: '09:14 PM',
        description: 'Shipment order created and confirmed',
        icon: Package,
        state: 'completed',
      },
    ],
  },

  'TRK-2024-ERR1': {
    trackingNumber: 'TRK-2024-ERR1',
    status: 'exception',
    serviceType: 'Express Delivery',
    weight: '3.1 kg',
    estimatedDelivery: 'Rescheduled',
    origin: 'Seattle, WA',
    destination: 'Portland, OR',
    events: [
      {
        label: 'Delivered',
        location: 'Portland, OR',
        date: '—',
        time: '—',
        description: 'Awaiting reschedule confirmation',
        icon: CheckCircle,
        state: 'pending',
      },
      {
        label: 'Delivery Exception',
        location: 'Portland, OR — Customer Address',
        date: 'May 31, 2026',
        time: '01:45 PM',
        description: 'Delivery attempted — address not accessible. Notice left. Please contact support to reschedule.',
        icon: AlertTriangle,
        state: 'exception',
      },
      {
        label: 'Out for Delivery',
        location: 'Portland Hub — Delivery Vehicle',
        date: 'May 31, 2026',
        time: '08:30 AM',
        description: 'Package loaded onto delivery vehicle',
        icon: Truck,
        state: 'completed',
      },
      {
        label: 'Arrived at Facility',
        location: 'Portland Distribution Center',
        date: 'May 31, 2026',
        time: '03:15 AM',
        description: 'Package arrived for local delivery sorting',
        icon: MapPin,
        state: 'completed',
      },
      {
        label: 'Package Picked Up',
        location: 'Seattle Distribution Center',
        date: 'May 30, 2026',
        time: '11:00 AM',
        description: 'Package picked up from sender',
        icon: Package,
        state: 'completed',
      },
    ],
  },
};

// ─── Status config ─────────────────────────────────────────────────────────────

const STATUS_CONFIG: Record<TrackingStatus, {
  label: string;
  dotColor: string;
  badgeBg: string;
  badgeBorder: string;
  badgeText: string;
  bannerBg: string;
  bannerText: string;
  icon: LucideIcon;
}> = {
  delivered: {
    label: 'Delivered',
    dotColor: 'bg-green-500',
    badgeBg: 'bg-green-50',
    badgeBorder: 'border-green-200',
    badgeText: 'text-green-700',
    bannerBg: 'bg-green-50 border-green-200',
    bannerText: 'text-green-800',
    icon: CheckCircle,
  },
  'out-for-delivery': {
    label: 'Out for Delivery',
    dotColor: 'bg-[#ff6b35]',
    badgeBg: 'bg-orange-50',
    badgeBorder: 'border-orange-200',
    badgeText: 'text-orange-700',
    bannerBg: 'bg-orange-50 border-orange-200',
    bannerText: 'text-orange-800',
    icon: Truck,
  },
  'in-transit': {
    label: 'In Transit',
    dotColor: 'bg-blue-500',
    badgeBg: 'bg-blue-50',
    badgeBorder: 'border-blue-200',
    badgeText: 'text-blue-700',
    bannerBg: 'bg-blue-50 border-blue-200',
    bannerText: 'text-blue-800',
    icon: Truck,
  },
  pending: {
    label: 'Pending Pickup',
    dotColor: 'bg-amber-400',
    badgeBg: 'bg-amber-50',
    badgeBorder: 'border-amber-200',
    badgeText: 'text-amber-700',
    bannerBg: 'bg-amber-50 border-amber-200',
    bannerText: 'text-amber-800',
    icon: Hourglass,
  },
  exception: {
    label: 'Delivery Exception',
    dotColor: 'bg-red-500',
    badgeBg: 'bg-red-50',
    badgeBorder: 'border-red-200',
    badgeText: 'text-red-700',
    bannerBg: 'bg-red-50 border-red-200',
    bannerText: 'text-red-800',
    icon: AlertTriangle,
  },
};

// ─── Timeline node colours ────────────────────────────────────────────────────

function nodeClass(state: TrackingEvent['state']) {
  switch (state) {
    case 'completed':  return 'bg-green-500';
    case 'current':    return 'bg-[#ff6b35] ring-4 ring-[#ff6b35]/20';
    case 'exception':  return 'bg-red-500 ring-4 ring-red-500/20';
    default:           return 'bg-gray-200';
  }
}

function lineClass(state: TrackingEvent['state']) {
  return state === 'completed' ? 'bg-green-400' : 'bg-gray-200';
}

// ─── Sample buttons ────────────────────────────────────────────────────────────

const SAMPLES: { id: string; label: string; status: TrackingStatus }[] = [
  { id: 'TRK-2024-8492', label: 'TRK-2024-8492', status: 'delivered' },
  { id: 'TRK-2024-7381', label: 'TRK-2024-7381', status: 'out-for-delivery' },
  { id: 'TRK-2024-6295', label: 'TRK-2024-6295', status: 'in-transit' },
  { id: 'TRK-2024-5183', label: 'TRK-2024-5183', status: 'pending' },
  { id: 'TRK-2024-ERR1', label: 'TRK-2024-ERR1', status: 'exception' },
];

const SAMPLE_STATUS_LABELS: Record<TrackingStatus, string> = {
  delivered:          'Delivered',
  'out-for-delivery': 'Out for Delivery',
  'in-transit':       'In Transit',
  pending:            'Pending',
  exception:          'Exception',
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export function TrackShipmentPage() {
  const [searchParams]                  = useSearchParams();
  const [trackingNumber, setTracking]   = useState('');
  const [shipment, setShipment]         = useState<ShipmentData | null>(null);
  const [notFound, setNotFound]         = useState(false);

  useEffect(() => {
    const fromUrl = searchParams.get('tracking');
    if (fromUrl) {
      setTracking(fromUrl);
      resolve(fromUrl);
    }
  }, [searchParams]);

  function resolve(id: string) {
    const key = id.trim().toUpperCase();
    const found = SHIPMENTS[key] ?? null;
    setShipment(found);
    setNotFound(!found);
  }

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const val = trackingNumber.trim();
    if (!val) return;
    resolve(val);
    setTracking(''); // clear input so button returns to inactive
  };

  const handleSample = (id: string) => {
    resolve(id);
    setTracking(''); // clear input after sample tracks
  };

  const handleReset = () => {
    setTracking('');
    setShipment(null);
    setNotFound(false);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0f1a] pt-20 md:pt-24">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-8 md:py-12">

        {/* Back */}
        <Link to="/" className="inline-flex items-center gap-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] mb-6 md:mb-8 transition-colors">
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-[64px] font-bold text-[#0f172a] dark:text-[#f1f5f9] mb-4">
            Track Your Shipment
          </h1>
          <p className="text-base md:text-lg text-[#64748b] max-w-2xl">
            Enter your tracking number to get real-time updates on your shipment status and delivery information.
          </p>
        </div>

        {/* Search card */}
        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-[#e2e8f0] dark:border-[#334155] mb-8">
          <form onSubmit={handleTrack}>
            <label className="block text-sm md:text-base text-[#475569] mb-4">
              Enter Tracking Number
            </label>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                placeholder="e.g., TRK-2024-8492"
                value={trackingNumber}
                onChange={(e) => setTracking(e.target.value)}
                className="flex-1 px-4 py-3 md:py-4 bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#94a3b8]"
              />
              <button
                type="submit"
                disabled={!trackingNumber.trim()}
                className="px-6 md:px-8 py-3 md:py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors flex items-center justify-center gap-2 text-sm md:text-base whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#ff6b35]"
              >
                <Search className="w-5 h-5" />
                Track Package
              </button>
            </div>
          </form>

          {/* Tip + samples */}
          {!shipment && !notFound && (
            <div className="mt-6 space-y-3">
              <div className="p-4 bg-blue-50 border border-blue-100 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Tip:</strong> You can find your tracking number in the confirmation email sent after your shipment was processed.
                </p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <p className="text-sm text-gray-700 mb-3"><strong>Try a sample:</strong></p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                  {SAMPLES.map(({ id, label, status }) => {
                    const cfg = STATUS_CONFIG[status];
                    return (
                      <button
                        key={id}
                        type="button"
                        onClick={() => handleSample(id)}
                        className={`flex items-center gap-2 px-3 py-2 bg-white border rounded-lg text-sm transition-all hover:bg-gray-50 hover:shadow-sm w-full ${cfg.badgeBorder}`}
                      >
                        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${cfg.dotColor}`} />
                        <span className="text-gray-700 font-mono text-xs flex-1 text-left truncate">{label}</span>
                        <span className={`text-xs font-semibold flex-shrink-0 px-2 py-0.5 rounded-full ${cfg.badgeBg} ${cfg.badgeText}`}>
                          {SAMPLE_STATUS_LABELS[status]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Not found */}
        {notFound && (
          <div className="bg-white rounded-2xl p-8 border border-[#e2e8f0] mb-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-xl font-semibold text-[#0f172a] mb-2">No shipment found</h2>
            <p className="text-[#64748b] mb-6">
              We couldn't find a shipment with tracking number <strong>{trackingNumber}</strong>. Please double-check and try again.
            </p>
            <button
              onClick={handleReset}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {shipment && (() => {
          const cfg = STATUS_CONFIG[shipment.status];
          const StatusIcon = cfg.icon;
          return (
            <>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl md:text-2xl lg:text-[32px] font-semibold text-[#0f172a] dark:text-[#f1f5f9]">Tracking Results</h2>
                <button
                  onClick={handleReset}
                  className="text-sm text-[#64748b] hover:text-[#0f172a] transition-colors flex items-center gap-1"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Search
                </button>
              </div>

              {/* Exception banner */}
              {shipment.status === 'exception' && (
                <div className={`flex items-start gap-3 p-4 rounded-xl border mb-6 ${cfg.bannerBg}`}>
                  <AlertTriangle className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.badgeText}`} />
                  <div>
                    <p className={`text-sm font-semibold ${cfg.bannerText}`}>Delivery Attempt Failed</p>
                    <p className={`text-sm ${cfg.bannerText} opacity-80`}>
                      Our driver was unable to access the delivery address. Please contact us to reschedule or redirect your shipment.
                    </p>
                  </div>
                </div>
              )}

              {/* Out for delivery banner */}
              {shipment.status === 'out-for-delivery' && (
                <div className={`flex items-start gap-3 p-4 rounded-xl border mb-6 ${cfg.bannerBg}`}>
                  <Truck className={`w-5 h-5 mt-0.5 shrink-0 ${cfg.badgeText}`} />
                  <div>
                    <p className={`text-sm font-semibold ${cfg.bannerText}`}>Your package is on its way!</p>
                    <p className={`text-sm ${cfg.bannerText} opacity-80`}>
                      A driver is en route to your address. Expected delivery by 6:00 PM today.
                    </p>
                  </div>
                </div>
              )}

              <div className="grid lg:grid-cols-3 gap-6 md:gap-8 mb-8">
                {/* Timeline */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 md:p-8 border border-[#e2e8f0]">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 md:mb-8 gap-4">
                    <div>
                      <p className="text-sm text-[#64748b] mb-1">Tracking Number</p>
                      <p className="text-lg md:text-xl font-semibold text-[#0f172a]">{shipment.trackingNumber}</p>
                    </div>
                    <div className={`px-4 py-2 border rounded-lg inline-flex items-center gap-2 w-fit ${cfg.badgeBg} ${cfg.badgeBorder}`}>
                      <span className={`w-2 h-2 rounded-full ${cfg.dotColor} ${shipment.status === 'out-for-delivery' ? 'animate-pulse' : ''}`} />
                      <StatusIcon className={`w-4 h-4 ${cfg.badgeText}`} />
                      <span className={`font-medium text-sm md:text-base ${cfg.badgeText}`}>{cfg.label}</span>
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0f172a] mb-6">Shipment Timeline</h3>
                  <div className="space-y-0">
                    {shipment.events.map((event, index) => {
                      const Icon = event.icon;
                      const isLast = index === shipment.events.length - 1;
                      return (
                        <div key={index} className="flex gap-4 md:gap-6">
                          {/* Node + connector */}
                          <div className="relative flex-shrink-0 flex flex-col items-center">
                            <div className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center z-10 ${nodeClass(event.state)}`}>
                              <Icon className={`w-5 h-5 ${event.state === 'pending' ? 'text-gray-400' : 'text-white'}`} />
                            </div>
                            {!isLast && (
                              <div className={`w-0.5 flex-1 min-h-[2rem] my-1 ${lineClass(event.state)}`} />
                            )}
                          </div>

                          {/* Content */}
                          <div className={`flex-1 ${!isLast ? 'pb-6 md:pb-8' : 'pb-2'}`}>
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                              <h4 className={`text-base md:text-lg font-medium ${
                                event.state === 'pending' ? 'text-gray-400' :
                                event.state === 'exception' ? 'text-red-600' :
                                event.state === 'current' ? 'text-[#ff6b35]' :
                                'text-[#0f172a]'
                              }`}>
                                {event.label}
                                {event.state === 'current' && (
                                  <span className="ml-2 text-xs font-normal px-2 py-0.5 bg-[#ff6b35]/10 text-[#ff6b35] rounded-full">Current</span>
                                )}
                              </h4>
                              {event.state !== 'pending' && (
                                <div className="flex items-center gap-3 text-xs md:text-sm text-[#64748b]">
                                  {event.date !== '—' && (
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3.5 h-3.5" />
                                      {event.date}
                                    </span>
                                  )}
                                  {event.time !== '—' && (
                                    <span className="flex items-center gap-1">
                                      <Clock className="w-3.5 h-3.5" />
                                      {event.time}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                            <p className={`text-sm ${event.state === 'pending' ? 'text-gray-400' : 'text-[#64748b]'} mb-0.5`}>
                              {event.location}
                            </p>
                            <p className={`text-xs ${event.state === 'exception' ? 'text-red-500' : event.state === 'pending' ? 'text-gray-300' : 'text-[#94a3b8]'}`}>
                              {event.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-6 border border-[#e2e8f0]">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold text-[#0f172a] mb-6">Shipment Details</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Service Type',        value: shipment.serviceType },
                        { label: 'Weight',              value: shipment.weight },
                        { label: 'Estimated Delivery',  value: shipment.estimatedDelivery },
                        { label: 'Origin',              value: shipment.origin },
                        { label: 'Destination',         value: shipment.destination },
                      ].map(({ label, value }) => (
                        <div key={label}>
                          <p className="text-sm text-[#64748b] mb-1">{label}</p>
                          <p className="text-sm md:text-base font-medium text-[#0f172a]">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 text-white">
                    <h3 className="text-lg md:text-xl lg:text-2xl font-semibold mb-4">Need Help?</h3>
                    <p className="text-sm text-gray-300 mb-6">
                      Our customer support team is available 24/7 to assist you.
                    </p>
                    <div className="space-y-3">
                      <a href="#" className="flex items-center gap-3 text-sm hover:text-[#ff6b35] transition-colors">
                        <Phone className="w-5 h-5" />
                        +1 (800) 123-4567
                      </a>
                      <a href="#" className="flex items-center gap-3 text-sm hover:text-[#ff6b35] transition-colors">
                        <Mail className="w-5 h-5" />
                        support@swiftlogix.com
                      </a>
                    </div>
                    {shipment.status === 'exception' && (
                      <button className="mt-6 w-full px-4 py-3 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] transition-colors text-sm font-medium flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4" />
                        Reschedule Delivery
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </>
          );
        })()}

        {/* Info cards — 2×2 grid */}
        <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-[#e2e8f0] dark:border-[#334155]">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">Real-Time Updates</h3>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">Stay informed at every stage of your delivery with instant push notifications, email alerts, and SMS updates. Know the moment your package is picked up, in transit, out for delivery, and successfully delivered — no guessing required.</p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-[#e2e8f0] dark:border-[#334155]">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-500/10 rounded-lg flex items-center justify-center mb-4">
              <MapPin className="w-6 h-6 text-green-500" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">GPS Tracking</h3>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">Our advanced GPS technology gives you pinpoint visibility into your shipment's exact location at all times. View live map updates, estimated arrival windows, and driver details directly from your tracking dashboard.</p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-[#e2e8f0] dark:border-[#334155]">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-500/10 rounded-lg flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-purple-500" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">Delivery Preferences</h3>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">Take full control of your delivery experience by setting specific instructions for your driver, selecting alternative drop-off points, choosing preferred delivery windows, and managing signature requirements — all from your account.</p>
          </div>
          <div className="bg-white dark:bg-[#1e293b] rounded-xl p-6 border border-[#e2e8f0] dark:border-[#334155]">
            <div className="w-12 h-12 bg-orange-50 dark:bg-[#ff6b35]/10 rounded-lg flex items-center justify-center mb-4">
              <Bell className="w-6 h-6 text-[#ff6b35]" />
            </div>
            <h3 className="text-base md:text-lg font-semibold text-[#0f172a] dark:text-[#f1f5f9] mb-2">Secure Delivery Confirmation</h3>
            <p className="text-sm text-[#64748b] dark:text-[#94a3b8] leading-relaxed">Every delivered package is verified with photo proof, digital signature capture, and a timestamped confirmation record. Receive instant notification when your package is received and access your full delivery history anytime.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
