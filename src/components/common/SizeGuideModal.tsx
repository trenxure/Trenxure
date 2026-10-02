import React, { useState } from 'react';
import { X, Check } from 'lucide-react';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName?: string;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose, categoryName = 'Blazers' }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  const dataInches = [
    { size: 'S', chest: '36 - 38', shoulder: '17.5', length: '29.0', sleeve: '25.0', waist: '30 - 32' },
    { size: 'M', chest: '39 - 41', shoulder: '18.2', length: '29.5', sleeve: '25.5', waist: '33 - 35' },
    { size: 'L', chest: '42 - 44', shoulder: '19.0', length: '30.2', sleeve: '26.0', waist: '36 - 38' },
    { size: 'XL', chest: '45 - 47', shoulder: '19.8', length: '31.0', sleeve: '26.5', waist: '39 - 41' },
    { size: 'XXL', chest: '48 - 50', shoulder: '20.5', length: '31.5', sleeve: '27.0', waist: '42 - 44' },
  ];

  const dataCm = [
    { size: 'S', chest: '91 - 96', shoulder: '44.5', length: '73.5', sleeve: '63.5', waist: '76 - 81' },
    { size: 'M', chest: '99 - 104', shoulder: '46.2', length: '75.0', sleeve: '64.8', waist: '84 - 89' },
    { size: 'L', chest: '107 - 112', shoulder: '48.3', length: '76.7', sleeve: '66.0', waist: '91 - 96' },
    { size: 'XL', chest: '114 - 119', shoulder: '50.3', length: '78.7', sleeve: '67.3', waist: '99 - 104' },
    { size: 'XXL', chest: '122 - 127', shoulder: '52.0', length: '80.0', sleeve: '68.5', waist: '107 - 112' },
  ];

  const activeData = unit === 'inches' ? dataInches : dataCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={onClose} />
      
      <div className="relative bg-[#F7F5F0] border border-[#DDD8CF] w-full max-w-2xl rounded-lg p-6 md:p-8 z-10 shadow-2xl animate-in fade-in duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#DDD8CF]">
          <div>
            <h3 className="font-serif text-2xl font-bold text-[#111111]">
              Size Guide — {categoryName}
            </h3>
            <p className="text-xs text-[#77736B] mt-0.5">
              Standard Pakistani & International Tailored Sizing
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#77736B] hover:text-[#111111] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Unit toggle */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <p className="text-xs text-[#77736B]">Measurements below are actual garment dimensions:</p>
          <div className="flex bg-[#E9E1D4] p-1 rounded">
            <button
              onClick={() => setUnit('inches')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                unit === 'inches' ? 'bg-white text-[#111111] shadow-xs' : 'text-[#77736B]'
              }`}
            >
              Inches
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 text-xs font-semibold rounded transition-colors ${
                unit === 'cm' ? 'bg-white text-[#111111] shadow-xs' : 'text-[#77736B]'
              }`}
            >
              Centimeters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto border border-[#DDD8CF] bg-white rounded-md mb-6">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#E9E1D4]/60 border-b border-[#DDD8CF] font-serif uppercase tracking-wider text-[#111111]">
                <th className="py-3 px-4">Size</th>
                <th className="py-3 px-4">Chest ({unit})</th>
                <th className="py-3 px-4">Shoulder ({unit})</th>
                <th className="py-3 px-4">Length ({unit})</th>
                <th className="py-3 px-4">Sleeve ({unit})</th>
                <th className="py-3 px-4">Waist ({unit})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DDD8CF]/50">
              {activeData.map((row) => (
                <tr key={row.size} className="hover:bg-[#F7F5F0]/50 transition-colors">
                  <td className="py-2.5 px-4 font-bold text-[#111111]">{row.size}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#77736B]">{row.chest}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#77736B]">{row.shoulder}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#77736B]">{row.length}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#77736B]">{row.sleeve}</td>
                  <td className="py-2.5 px-4 tabular-nums text-[#77736B]">{row.waist}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Measuring instructions */}
        <div className="p-4 bg-white border border-[#DDD8CF] rounded text-xs space-y-2 text-[#77736B]">
          <h4 className="font-semibold text-[#111111] uppercase tracking-wider">How to Measure:</h4>
          <p>• <strong>Chest:</strong> Measure around the fullest part of your chest, keeping tape comfortably level under arms.</p>
          <p>• <strong>Shoulder:</strong> Measure from the tip of one shoulder blade across the back to the tip of the other.</p>
          <p>• <strong>Need a custom bespoke tailoring?</strong> Reach out via WhatsApp +92 300 1234567 for free atelier fitting consultation.</p>
        </div>
      </div>
    </div>
  );
};
