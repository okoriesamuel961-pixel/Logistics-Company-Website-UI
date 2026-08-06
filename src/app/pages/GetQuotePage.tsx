import { Package, MapPin, Calendar, DollarSign, Truck, ArrowLeft, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router';

const INPUT = "w-full px-4 py-3 md:py-4 bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#94a3b8]";
const LABEL = "block text-sm md:text-base text-[#475569] dark:text-[#94a3b8] mb-3";
const LABEL_SM = "block text-sm text-[#475569] dark:text-[#94a3b8] mb-2";

export function GetQuotePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    serviceType: '',
    packageType: '',
    weight: '',
    dimensions: { length: '', width: '', height: '' },
    originCountry: '',
    originCity: '',
    destinationCountry: '',
    destinationCity: '',
    shipmentDate: '',
    insurance: false,
    name: '',
    email: '',
    phone: '',
    company: '',
  });

  const [quote, setQuote] = useState<{
    baseRate: number;
    insurance: number;
    tax: number;
    total: number;
  } | null>(null);

  const updateFormData = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleGenerateQuote = () => {
    const baseRate = formData.serviceType === 'express' ? 89.99 : formData.serviceType === 'standard' ? 49.99 : 29.99;
    const insurance = formData.insurance ? 15.00 : 0;
    const tax = (baseRate + insurance) * 0.08;
    const total = baseRate + insurance + tax;
    setQuote({ baseRate, insurance, tax, total });
    setStep(4);
  };

  const handleBookShipment = () => {
    navigate('/booking-confirmation', {
      state: {
        ...formData,
        baseRate: quote?.baseRate,
        insuranceAmount: quote?.insurance,
        tax: quote?.tax,
        total: quote?.total,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-[#0a0f1a] pt-20 md:pt-24">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 py-8 md:py-12">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-[#64748b] dark:text-[#94a3b8] hover:text-[#0f172a] dark:hover:text-[#f1f5f9] mb-6 md:mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        <div className="mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl lg:text-5xl text-[#0f172a] dark:text-[#f1f5f9] mb-4">
            Get a Shipping Quote
          </h1>
          <p className="text-base md:text-lg text-[#64748b] dark:text-[#94a3b8] max-w-2xl">
            Calculate your shipping costs instantly. Fill in your shipment details to receive an accurate quote.
          </p>
        </div>

        {/* Step indicators */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 mb-8 md:mb-12">
          {[
            { num: 1, label: 'Package Info' },
            { num: 2, label: 'Locations' },
            { num: 3, label: 'Contact Details' },
            { num: 4, label: 'Quote' },
          ].map((s) => (
            <div key={s.num} className="flex items-center">
              <div
                className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm md:text-base font-medium ${
                  step >= s.num
                    ? 'bg-[#ff6b35] text-white'
                    : 'bg-white dark:bg-[#1e293b] border-2 border-[#e2e8f0] dark:border-[#334155] text-[#64748b] dark:text-[#94a3b8]'
                }`}
              >
                {step > s.num ? <CheckCircle className="w-5 h-5 md:w-6 md:h-6" /> : s.num}
              </div>
              <span className="ml-2 text-xs md:text-sm text-[#64748b] dark:text-[#94a3b8] hidden sm:inline">{s.label}</span>
              {s.num < 4 && (
                <div className="w-8 md:w-16 h-0.5 bg-[#e2e8f0] dark:bg-[#334155] mx-2 md:mx-4"></div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 border border-[#e2e8f0] dark:border-[#334155]">
          {/* Step 1: Package Info */}
          {step === 1 && (
            <div>
              <h2 className="text-xl md:text-2xl text-[#0f172a] dark:text-[#f1f5f9] mb-6 md:mb-8 flex items-center gap-3">
                <Package className="w-6 h-6 md:w-7 md:h-7 text-[#ff6b35]" />
                Package Information
              </h2>

              <div className="space-y-6">
                <div>
                  <label className={LABEL}>Service Type</label>
                  <div className="grid sm:grid-cols-3 gap-4">
                    {[
                      { value: 'economy', label: 'Economy', desc: '5-7 business days' },
                      { value: 'standard', label: 'Standard', desc: '3-5 business days' },
                      { value: 'express', label: 'Express', desc: '1-2 business days' },
                    ].map((service) => (
                      <button
                        key={service.value}
                        onClick={() => updateFormData('serviceType', service.value)}
                        className={`p-4 md:p-6 border-2 rounded-xl text-left transition-all ${
                          formData.serviceType === service.value
                            ? 'border-[#ff6b35] bg-[#ff6b35]/5'
                            : 'border-[#e2e8f0] dark:border-[#334155] hover:border-[#ff6b35]/50'
                        }`}
                      >
                        <p className="text-base md:text-lg text-[#0f172a] dark:text-[#f1f5f9] font-medium mb-1">
                          {service.label}
                        </p>
                        <p className="text-xs md:text-sm text-[#64748b] dark:text-[#94a3b8]">{service.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className={LABEL}>Package Type</label>
                  <select
                    value={formData.packageType}
                    onChange={(e) => updateFormData('packageType', e.target.value)}
                    className={INPUT}
                  >
                    <option value="">Select package type</option>
                    <option value="envelope">Envelope</option>
                    <option value="box">Box</option>
                    <option value="pallet">Pallet</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label className={LABEL}>Weight (kg)</label>
                    <input
                      type="number"
                      placeholder="e.g., 2.5"
                      value={formData.weight}
                      onChange={(e) => updateFormData('weight', e.target.value)}
                      className={INPUT}
                    />
                  </div>
                  <div>
                    <label className={LABEL}>Dimensions (cm)</label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['length', 'width', 'height'] as const).map((dim, i) => (
                        <input
                          key={dim}
                          type="number"
                          placeholder={['L', 'W', 'H'][i]}
                          value={formData.dimensions[dim]}
                          onChange={(e) =>
                            updateFormData('dimensions', { ...formData.dimensions, [dim]: e.target.value })
                          }
                          className="px-3 py-3 md:py-4 bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base text-[#0f172a] dark:text-[#f1f5f9] placeholder-[#94a3b8]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="insurance"
                    checked={formData.insurance}
                    onChange={(e) => updateFormData('insurance', e.target.checked)}
                    className="w-5 h-5 rounded border-[#e2e8f0] text-[#ff6b35] focus:ring-[#ff6b35]"
                  />
                  <label htmlFor="insurance" className="text-sm md:text-base text-[#475569] dark:text-[#94a3b8]">
                    Add insurance coverage (+$15.00)
                  </label>
                </div>
              </div>

              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.serviceType || !formData.packageType || !formData.weight}
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Continue to Locations
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Locations */}
          {step === 2 && (
            <div>
              <h2 className="text-xl md:text-2xl text-[#0f172a] dark:text-[#f1f5f9] mb-6 md:mb-8 flex items-center gap-3">
                <MapPin className="w-6 h-6 md:w-7 md:h-7 text-[#ff6b35]" />
                Pickup & Delivery Locations
              </h2>

              <div className="space-y-8">
                <div>
                  <h3 className="text-base md:text-lg text-[#0f172a] dark:text-[#f1f5f9] mb-4">Origin</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={LABEL_SM}>Country</label>
                      <input
                        type="text"
                        placeholder="e.g., United States"
                        value={formData.originCountry}
                        onChange={(e) => updateFormData('originCountry', e.target.value)}
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label className={LABEL_SM}>City / Postal Code</label>
                      <input
                        type="text"
                        placeholder="e.g., New York, NY 10001"
                        value={formData.originCity}
                        onChange={(e) => updateFormData('originCity', e.target.value)}
                        className={INPUT}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-base md:text-lg text-[#0f172a] dark:text-[#f1f5f9] mb-4">Destination</h3>
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className={LABEL_SM}>Country</label>
                      <input
                        type="text"
                        placeholder="e.g., United States"
                        value={formData.destinationCountry}
                        onChange={(e) => updateFormData('destinationCountry', e.target.value)}
                        className={INPUT}
                      />
                    </div>
                    <div>
                      <label className={LABEL_SM}>City / Postal Code</label>
                      <input
                        type="text"
                        placeholder="e.g., Boston, MA 02101"
                        value={formData.destinationCity}
                        onChange={(e) => updateFormData('destinationCity', e.target.value)}
                        className={INPUT}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className={LABEL}>Preferred Shipment Date</label>
                  <input
                    type="date"
                    value={formData.shipmentDate}
                    onChange={(e) => updateFormData('shipmentDate', e.target.value)}
                    className="w-full sm:w-auto px-4 py-3 md:py-4 bg-[#f8fafc] dark:bg-[#0f172a] border border-[#e2e8f0] dark:border-[#334155] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#ff6b35] focus:border-transparent text-sm md:text-base text-[#0f172a] dark:text-[#f1f5f9]"
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-[#0f172a] border-2 border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f1f5f9] rounded-lg hover:bg-[#f8fafc] dark:hover:bg-[#243347] hover:border-[#ff6b35] dark:hover:border-[#ff6b35] hover:shadow-md transition-all text-sm md:text-base"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={!formData.originCountry || !formData.destinationCountry}
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Continue to Contact Details
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Contact */}
          {step === 3 && (
            <div>
              <h2 className="text-xl md:text-2xl text-[#0f172a] dark:text-[#f1f5f9] mb-6 md:mb-8 flex items-center gap-3">
                <Truck className="w-6 h-6 md:w-7 md:h-7 text-[#ff6b35]" />
                Contact Information
              </h2>

              <div className="grid sm:grid-cols-2 gap-6">
                <div>
                  <label className={LABEL_SM}>Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className={LABEL_SM}>Company (Optional)</label>
                  <input
                    type="text"
                    placeholder="Your Company"
                    value={formData.company}
                    onChange={(e) => updateFormData('company', e.target.value)}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className={LABEL_SM}>Email Address</label>
                  <input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    className={INPUT}
                  />
                </div>
                <div>
                  <label className={LABEL_SM}>Phone Number</label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    className={INPUT}
                  />
                </div>
              </div>

              <div className="mt-8 flex flex-col sm:flex-row gap-3 sm:justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-6 md:px-8 py-3 md:py-4 bg-white dark:bg-[#0f172a] border-2 border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f1f5f9] rounded-lg hover:bg-[#f8fafc] dark:hover:bg-[#243347] hover:border-[#ff6b35] dark:hover:border-[#ff6b35] hover:shadow-md transition-all text-sm md:text-base"
                >
                  Back
                </button>
                <button
                  onClick={handleGenerateQuote}
                  disabled={!formData.name || !formData.email || !formData.phone}
                  className="px-6 md:px-8 py-3 md:py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm md:text-base"
                >
                  Generate Quote
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Quote result */}
          {step === 4 && quote && (
            <div>
              <div className="text-center mb-8 md:mb-12">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-green-600 dark:text-green-400" />
                </div>
                <h2 className="text-2xl md:text-3xl text-[#0f172a] dark:text-[#f1f5f9] mb-3">Your Quote is Ready!</h2>
                <p className="text-sm md:text-base text-[#64748b] dark:text-[#94a3b8]">
                  Quote valid for 7 days from {new Date().toLocaleDateString()}
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 md:p-8 mb-8 text-white">
                  <div className="flex items-center justify-between mb-6 md:mb-8 pb-6 border-b border-white/20">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Service Type</p>
                      <p className="text-lg md:text-xl font-medium capitalize">{formData.serviceType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 mb-1">Route</p>
                      <p className="text-lg md:text-xl font-medium">
                        {formData.originCity} → {formData.destinationCity}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-300">Base Rate</span>
                      <span className="font-medium">${quote.baseRate.toFixed(2)}</span>
                    </div>
                    {formData.insurance && (
                      <div className="flex justify-between text-sm md:text-base">
                        <span className="text-gray-300">Insurance</span>
                        <span className="font-medium">${quote.insurance.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm md:text-base">
                      <span className="text-gray-300">Tax (8%)</span>
                      <span className="font-medium">${quote.tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-white/20 pt-4 flex justify-between text-lg md:text-2xl">
                      <span className="font-semibold">Total</span>
                      <span className="font-semibold text-[#ff6b35]">${quote.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/40 rounded-xl p-4 md:p-6 mb-8">
                  <h3 className="text-base md:text-lg text-[#0f172a] dark:text-[#f1f5f9] mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    What's Included
                  </h3>
                  <ul className="space-y-2 text-sm md:text-base text-[#475569] dark:text-[#94a3b8]">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      Door-to-door delivery service
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      Real-time GPS tracking
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      Email and SMS notifications
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                      24/7 customer support
                    </li>
                    {formData.insurance && (
                      <li className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
                        Up to $1,000 insurance coverage
                      </li>
                    )}
                  </ul>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-4 bg-white dark:bg-[#0f172a] border-2 border-[#e2e8f0] dark:border-[#334155] text-[#0f172a] dark:text-[#f1f5f9] rounded-lg hover:bg-[#f8fafc] dark:hover:bg-[#243347] hover:border-[#ff6b35] dark:hover:border-[#ff6b35] hover:shadow-md transition-all text-sm md:text-base"
                  >
                    Start New Quote
                  </button>
                  <button
                    onClick={handleBookShipment}
                    className="flex-1 px-6 py-4 bg-[#ff6b35] text-white rounded-lg hover:bg-[#ff5722] hover:shadow-lg hover:shadow-[#ff6b35]/20 transition-all text-sm md:text-base"
                  >
                    Book This Shipment
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
