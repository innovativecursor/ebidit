'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

import { Globe, User, Building2, Mail, MapPin, Briefcase } from 'lucide-react';

import animationData from '../lottie/business.json';
import logo from './images/E-bid_red.png';
import i18n from '../../../i18n/i18n';

const languages = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'fil', label: '🇵🇭 Filipino' },
  { code: 'vi', label: '🇻🇳 Tiếng Việt' },
  { code: 'th', label: '🇹🇭 ไทย' },
  { code: 'id', label: '🇮🇩 Bahasa' },
];

const BusinessEnquiryForm = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    address: '',
    contact: '',
    email: '',
    activity: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    // submit logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6 bg-white/20 backdrop-blur-lg px-4 py-2 rounded-lg shadow-lg z-20">
        <Image src={logo} alt="E-Bid Logo" width={100} height={40} />
      </div>

      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-6 backdrop-blur-md bg-white/10 p-6 md:p-10 rounded-2xl shadow-xl relative overflow-hidden z-10">

        {/* Left Column - Animation */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col justify-center items-center text-white"
        >
          <Lottie animationData={animationData} loop={true} className="w-full h-72" />
          <h2 className="text-3xl font-bold mt-4">Grow Your Business</h2>
          <p className="text-sm text-gray-300 mt-2 text-center">
            Fill out this enquiry form to connect with us and unlock new opportunities.
          </p>
        </motion.div>

        {/* Right Column - Form */}
        <motion.form
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-4 text-white"
        >
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-xl font-semibold">Business Enquiry</h3>
            <div className="relative">
              <Globe className="absolute left-2 top-2 text-white" size={16} />
              <select
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  i18n.changeLanguage(e.target.value);
                }}
                className="pl-6 pr-3 py-1 rounded bg-white/10 text-white text-sm border border-white/20"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative">
            <User className="absolute left-3 top-3 text-white" size={18} />
            <input
              type="text"
              name="business_name"
              value={formData.business_name}
              onChange={(e) => setFormData({ ...formData, business_name: e.target.value })}
              required
              className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400 focus:scale-105 transition-all duration-150"
            />
          </div>

          <div className="relative">
            <Building2 className="absolute left-3 top-3 text-white" size={18} />
            <input
              type="text"
              name="business_type"
              value={formData.business_type}
              onChange={(e) => setFormData({ ...formData, business_type: e.target.value })}
              required
              className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400 focus:scale-105 transition-all duration-150"
            />
          </div>

          <div className="relative">
            <MapPin className="absolute left-3 top-3 text-white" size={18} />
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              required
              className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400 focus:scale-105 transition-all duration-150"
            />
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-white" size={18} />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400 focus:scale-105 transition-all duration-150"
            />
          </div>

          <div className="relative">
            <PhoneInput
              country={'in'}
              value={formData.contact}
              onChange={(phone) => setFormData({ ...formData, contact: phone })}
              inputStyle={{
                width: '100%',
                paddingLeft: '44px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'white',
              }}
              buttonStyle={{
                backgroundColor: 'transparent',
                border: 'none',
              }}
              containerStyle={{ width: '100%' }}
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-white" size={18} />
            <textarea
              name="activity"
              value={formData.activity}
              onChange={(e) => setFormData({ ...formData, activity: e.target.value })}
              rows="3"
              required
              className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400 focus:scale-105 transition-all duration-150"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 bg-red-600 hover:bg-red-500 rounded-lg text-white font-semibold transition"
          >
            Register
          </button>

          {formSubmitted && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-center mt-4 text-green-300 font-medium"
            >
              Thank you! We’ll get back to you shortly.
            </motion.div>
          )}
        </motion.form>
      </div>
    </div>
  );
};

export default BusinessEnquiryForm;
