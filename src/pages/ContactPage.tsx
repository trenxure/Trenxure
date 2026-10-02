import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Mail, Phone, MapPin, Clock, MessageSquare, ChevronDown, CheckCircle2 } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useStore();

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill out all required fields', 'error');
      return;
    }
    setFormSubmitted(true);
    showToast('Your message has been sent to our concierge team!', 'success');
  };

  const faqs = [
    {
      q: 'How long does delivery take across Pakistan?',
      a: 'Karachi deliveries arrive within 24 to 48 hours. Orders to Lahore, Islamabad, Rawalpindi, Faisalabad, and other nationwide destinations take 2 to 4 business days via TCS Express or Leopards Courier.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD)?',
      a: 'Yes! Cash on Delivery is available nationwide across all major cities and towns in Pakistan for orders up to Rs. 40,000. Orders exceeding Rs. 40,000 can be settled via Visa, MasterCard, or JazzCash.'
    },
    {
      q: 'What is your exchange and return policy?',
      a: 'We offer a 14-day hassle-free exchange policy. If your garment does not fit perfectly, contact our concierge via WhatsApp with your order number. We will arrange a doorstep replacement pickup.'
    },
    {
      q: 'Can I visit your showroom in Karachi for custom sizing?',
      a: 'Yes, our flagship atelier is located in Bukhari Commercial, Phase 6 DHA, Karachi. We welcome walk-in consultations and private appointments for custom tailoring and bridal/gala statement wear.'
    },
    {
      q: 'How should I care for the high-definition printed fabrics?',
      a: 'Our blazers and overcoats should be dry cleaned for optimal structure retention. T-shirts and hoodies can be cold machine washed inside out and line-dried in the shade to maintain crisp print vibrancy.'
    }
  ];

  return (
    <div className="bg-[#F7F5F0] min-h-screen py-12 md:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-sans text-xs font-semibold uppercase tracking-[0.25em] text-[#B08A45] block mb-2">
            CONCIERGE & ATELIER
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-normal text-[#111111] mb-3">
            Get in Touch
          </h1>
          <p className="text-xs sm:text-sm text-[#77736B] leading-relaxed">
            Have questions about custom prints, sizing, or bridal/gala commissions? Our sartorial concierge team is here to assist you.
          </p>
        </div>

        {/* 2-Column: Info & Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-20">
          
          {/* Left: Contact Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs space-y-6">
              <h3 className="font-serif text-xl font-bold text-[#111111] pb-3 border-b border-[#DDD8CF]">
                Karachi Flagship Atelier
              </h3>

              <div className="space-y-4 text-xs text-[#77736B]">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#B08A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block mb-0.5">Address:</strong>
                    <span>Plot 24-C, Lane 4, Bukhari Commercial Area, Phase 6 DHA, Karachi, 75500, Pakistan</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#B08A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block mb-0.5">Phone & WhatsApp:</strong>
                    <a href="tel:+923001234567" className="hover:text-[#B08A45] text-[#111111]">+92 300 1234567</a>
                    <span className="block text-[11px] text-[#77736B]">Direct WhatsApp support available 10am - 9pm PKT</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#B08A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block mb-0.5">Email Inquiries:</strong>
                    <a href="mailto:info@trenxure.pk" className="hover:text-[#B08A45] text-[#111111]">info@trenxure.pk</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#B08A45] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#111111] block mb-0.5">Showroom Hours:</strong>
                    <span>Monday - Saturday: 11:00 AM – 9:30 PM PKT</span>
                    <span className="block text-[11px]">Sunday: Closed (Private bridal appointments only)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DDD8CF]">
                <a
                  href="https://wa.me/923001234567"
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-3 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#D0B16A]" />
                  <span>Chat on WhatsApp (+92 300 1234567)</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-8 rounded-2xl border border-[#DDD8CF] shadow-xs">
              <h3 className="font-serif text-2xl font-bold text-[#111111] mb-2">
                Send a Message
              </h3>
              <p className="text-xs text-[#77736B] mb-6">
                Our concierge responds to all inquiries within 4 business hours.
              </p>

              {formSubmitted ? (
                <div className="p-8 text-center bg-[#F7F5F0] rounded-xl border border-[#DDD8CF] space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-[#B08A45] mx-auto" />
                  <h4 className="font-serif text-xl font-bold text-[#111111]">Message Received</h4>
                  <p className="text-xs text-[#77736B] max-w-sm mx-auto">
                    Thank you, {formData.name}. A representative from our Karachi concierge has received your request and will reach out shortly.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'General Inquiry', message: '' });
                    }}
                    className="mt-4 px-6 py-2 bg-[#111111] text-white text-xs font-semibold uppercase tracking-wider rounded"
                  >
                    Send Another Note
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Daniyal Merchant"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="daniyal@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+92 300 0000000"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                        Subject
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Order Status">Order Tracking & Delivery</option>
                        <option value="Bespoke Design">Bespoke Design Studio Commission</option>
                        <option value="Exchange">Size Exchange or Returns</option>
                        <option value="Press">Press & Collaborations</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we assist you today? Provide any relevant details or order numbers..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 py-2.5 text-xs bg-[#F7F5F0] border border-[#DDD8CF] rounded focus:outline-none focus:border-[#B08A45]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-[#111111] hover:bg-[#B08A45] text-white text-xs font-semibold uppercase tracking-[0.2em] rounded transition-colors shadow-sm"
                  >
                    Submit Inquiry
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* FAQs Section */}
        <div id="faqs" className="pt-12 border-t border-[#DDD8CF]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#B08A45] block mb-1">
              HELP CENTER
            </span>
            <h2 className="font-serif text-3xl font-normal text-[#111111]">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-3xl mx-auto divide-y divide-[#DDD8CF] bg-white rounded-2xl border border-[#DDD8CF] p-6 shadow-xs">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-4 first:pt-0 last:pb-0">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="flex items-center justify-between w-full text-left font-serif text-base font-semibold text-[#111111] hover:text-[#B08A45] transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-[#77736B] transition-transform ${activeFaq === idx ? 'rotate-180 text-[#B08A45]' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <p className="mt-2 text-xs text-[#77736B] leading-relaxed animate-in fade-in duration-150">
                    {faq.a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
