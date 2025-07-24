'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast, Toaster } from 'react-hot-toast';

import {
  Globe, User, Mail, MapPin, Briefcase, Building2, LocateIcon,
} from 'lucide-react';

import animationData from '../lottie/bidding.json';
import logo from './images/E-bid_red.png';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n/i18n';

const languages = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'fil', label: '🇵🇭 Filipino' },
  { code: 'vi', label: '🇻🇳 Tiếng Việt' },
  { code: 'th', label: '🇹🇭 ไทย' },
  { code: 'id', label: '🇮🇩 Bahasa' },
  { code: 'zh', label: '🇮🇩 Chinese (Pinyin)' },
];

const BusinessEnquiryForm = () => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    role_of_business: '',
    industry_of_business: '',
    business_address: {
      address_line1: '',
      address_line2: '',
      city: '',
      state: '',
      country: '',
      postal_code: '',
    },
    contact_info: {
      name: '',
      designation: '',
      phone: '',
      email: '',
    },
    primary_business_activity: '',
  });

  const handleInputChange = (section, key, value) => {
    if (section === 'business_address' || section === 'contact_info') {
      setFormData((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [key]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    try {
      console.log(formData); // you can replace this with an actual API call
      toast.success('Business registered successfully');
    } catch (error) {
      toast.error('Failed to save business');
    }
  };

  return (
    <div className="min-h-screen bg-white/90 backdrop-blur-md shadow-md flex flex-col p-4">
      {/* Logo */}
      <div className=" flex justify-center items-center py-4 sm:py-6 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-black via-gray-900 to-gray-800 bg-white/10 px-6 py-3 rounded-xl shadow-lg backdrop-blur-md border border-white/20"
        >
          <Image
            src={logo}
            alt="E-Bid Logo"
            className="mx-auto max-w-[160px] w-full h-auto"
          />
        </motion.div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-black via-gray-900 to-gray-800 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10 max-w-[90rem] w-full mx-auto bg-white/10 px-4 py-6 sm:p-8 md:p-10 rounded-2xl shadow-2xl text-white backdrop-blur-lg"
      >
        {/* Column 1 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="col-span-1 flex flex-col items-center justify-center text-center space-y-4"
        >
          <Lottie animationData={animationData} loop className="w-full h-30 sm:h-50 md:h-70" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t('Make_your')} <span className="text-red-600 pr-1">BID</span>{t(' with')}
          </h2>
          <Image src={logo} alt='logo' width={180} className='my-4' />
          <div className="relative mt-2 w-full max-w-[200px]">
            <Globe className="absolute left-2 top-2 text-white" size={16} />
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                i18n.changeLanguage(e.target.value);
              }}
              className="w-full pl-6 pr-3 py-1 rounded bg-gray-700 text-white text-sm border border-white/20"
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.label}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Column 2 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4"
        >
          <h3 className="text-xl font-semibold text-red-300 pb-1 mb-2">{t('Business_Details')}</h3>
          <FloatingInput icon={<Building2 size={18} />} placeholder={t('business_name')} value={formData.business_name} onChange={(e) => handleInputChange(null, 'business_name', e.target.value)} />
          <FloatingInput icon={<MapPin size={18} />} placeholder={t('address_line1')} value={formData.business_address.address_line1} onChange={(e) => handleInputChange('business_address', 'address_line1', e.target.value)} />
          <FloatingInput icon={<MapPin size={18} />} placeholder={t('address_line2')} value={formData.business_address.address_line2} onChange={(e) => handleInputChange('business_address', 'address_line2', e.target.value)} />
          <FloatingInput icon={<LocateIcon size={18} />} placeholder={t('city')} value={formData.business_address.city} onChange={(e) => handleInputChange('business_address', 'city', e.target.value)} />
          <FloatingInput icon={<LocateIcon size={18} />} placeholder={t('state')} value={formData.business_address.state} onChange={(e) => handleInputChange('business_address', 'state', e.target.value)} />
          <FloatingInput icon={<LocateIcon size={18} />} placeholder={t('country')} value={formData.business_address.country} onChange={(e) => handleInputChange('business_address', 'country', e.target.value)} />
          <FloatingInput icon={<LocateIcon size={18} />} placeholder={t('postal_code')} value={formData.business_address.postal_code} onChange={(e) => handleInputChange('business_address', 'postal_code', e.target.value)} />
        <FloatingInput icon={<Briefcase size={18} />} placeholder={t('business_type')} value={formData.business_type} onChange={(e) => handleInputChange(null, 'business_type', e.target.value)} />

          {/* New Field: Role of Business */}
        </motion.div>

        {/* Column 3 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-4 mt-0 md:mt-9.5"
        >
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-white" size={18} />
            <FloatingInput
              name="primary_business_activity"
              rows="3"
              placeholder={t('primary_business_activity')}
              value={formData.primary_business_activity}
              onChange={(e) => handleInputChange(null, 'primary_business_activity', e.target.value)}
              required
              className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-300 focus:scale-105 transition-all duration-150"
            />
          </div>
          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-white" size={18} />
            <select
              value={formData.role_of_business}
              onChange={(e) => handleInputChange(null, 'role_of_business', e.target.value)}
              className="w-full pl-10 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400"
            >
              <option value="">{t('role_of_business')}</option>
              <option value="Manufacturer">{t('Manufacturer')}</option>
              <option value="Supplier">{t('Supplier')}</option>
              <option value="Exporter">{t('Exporter')}</option>
              <option value="Impoter">{t('Impoter')}</option>
              <option value="Wholesaler">{t('Wholesaler')}</option>
              <option value="Distributor">{t('Distributor')}</option>
              <option value="Retailer">{t('Retailer')}</option>
              <option value="Trader">{t('Trader')}</option>
              <option value="Other">{t('Other')}</option> 
            </select>
          </div>

          {/* New Field: Industry of Business */}

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-white" size={18} />
            <select
              value={formData.industry_of_business}
              onChange={(e) => handleInputChange(null, 'industry_of_business', e.target.value)}
              className="w-full pl-10 py-2 bg-gray-800 text-white border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400"
              >
              <option value="">{t('industry_of_business')}</option>
              <option value="Agriculture">{t('Agriculture')}</option>
              <option value="FMCG">{t('FMCG')}</option>
              <option value="Construction">{t('Construction')}</option>
              <option value="Textiles">{t('Textiles')}</option>
              <option value="Automotive">{t('Automotive')}</option>
              <option value="Food_&_Beverages">{t('Food_&_Beverages')}</option>
              <option value="Pharmaceuticals">{t('Pharmaceuticals')}</option>
              <option value="Electronics">{t('Electronics')}</option>
              <option value="Furniture_&_Wood">{t('Furniture_&_Wood')}</option>
              <option value="Chemicals">{t('Chemicals')}</option>
              <option value="Other">{t('Other')}</option>
            </select>
          </div>
          <h3 className="text-xl font-semibold text-red-300 pb-1 mb-2 md:mt-13">{t('Personal_Details')}</h3>
          <FloatingInput icon={<User size={18} />} placeholder={t('name')} value={formData.contact_info.name} onChange={(e) => handleInputChange('contact_info', 'name', e.target.value)} />
          <FloatingInput icon={<Briefcase size={18} />} placeholder={t('designation')} value={formData.contact_info.designation} onChange={(e) => handleInputChange('contact_info', 'designation', e.target.value)} />
          <div className="relative w-full">
            <PhoneInput
              country={'in'}
              value={formData.contact_info.phone}
              onChange={(phone) => handleInputChange('contact_info', 'phone', phone)}
              inputStyle={{
                width: '100%',
                paddingLeft: '44px',
                backgroundColor: 'transparent',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'white',
              }}
              buttonStyle={{ backgroundColor: 'transparent', border: 'none' }}
              containerStyle={{ width: '100%' }}
            />
          </div>
          <FloatingInput icon={<Mail size={18} />} placeholder={t('email')} value={formData.contact_info.email} onChange={(e) => handleInputChange('contact_info', 'email', e.target.value)} type="email" />
        </motion.div>

        {/* Submit Button */}
        <div className="col-span-1 sm:col-span-2 md:col-span-3 flex justify-center px-4">
          <button
            type="submit"
            className="px-10 py-3 w-full max-w-xs bg-red-500 hover:bg-red-400 text-white rounded-xl font-semibold text-lg shadow-md transition duration-200"
          >
            {t('Register')}
          </button>
        </div>
      </form>

      {/* Success Message */}
      {formSubmitted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mt-4 text-green-300 font-medium"
        >
          {t('success_message')}
        </motion.div>
      )}
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: '#1f1f1f',
            color: '#fff',
            fontWeight: 'bold',
            padding: '12px 20px',
            borderRadius: '12px',
          },
          success: {
            icon: '✅',
          },
          error: {
            icon: '❌',
          },
        }}
      />
    </div>
  );
};

// Floating input field
const FloatingInput = ({ icon, ...props }) => (
  <div className="relative">
    <div className="absolute left-3 top-3 text-white">{icon}</div>
    <input
      {...props}
      className="w-full pl-10 py-2 bg-transparent border border-white/20 rounded-lg focus:ring-2 focus:ring-red-400 focus:scale-105 transition-all duration-150"
    />
  </div>
);

export default BusinessEnquiryForm;
