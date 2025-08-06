'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { toast, Toaster } from 'react-hot-toast';
import Loader from '../components/Loader'

import {
  Globe, User, Mail, MapPin, Briefcase, Building2, LocateIcon,
} from 'lucide-react';

import animationData from '../lottie/hammer.json';
import logo from './images/E-bid_red.png';
import { useTranslation } from 'react-i18next';
import i18n from '../../../i18n/i18n';
import bgimage from '../EnquiryForm/images/Rectangle 29.png'

const languages = [
  { code: 'en', label: '🇺🇸 English' },
  { code: 'es', label: '🇪🇸 Español' },
  { code: 'fil', label: '🇵🇭 Filipino' },
  { code: 'vi', label: '🇻🇳 Tiếng Việt' },
  { code: 'th', label: '🇹🇭 ไทย' },
  { code: 'id', label: '🇮🇩 Bahasa' },
  { code: 'zh', label: '🇮🇩 Chinese (Pinyin)' },
];

const EnquiryForm = () => {
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    business_name: '',
    business_type: '',
    business_role: '',
    business_industry: '',
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

    // console.log("API URL:", process.env.NEXT_PUBLIC_API_BASE_URL);

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

const handleSubmit = async (e) => {
  e.preventDefault();
  setFormSubmitted(false);
  setLoading(true); 

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Failed to submit form");
    }

    const result = await response.json();
    console.log("API Response:", result);
    toast.success("Business registered successfully!");
    setFormSubmitted(true);
  } catch (error) {
    console.error("Error submitting form:", error);
    toast.error(error.message || "Failed to save business");
  } finally {
    setLoading(false);
  }
};

  return (
  <>  
    {loading ? (
      <Loader />
    ) : (  
    <div className="min-h-screen bg-white text-black backdrop-blur-md shadow-md flex flex-col p-4">
      {/* // <div className="relative min-h-screen bg-white overflow-hidden"> */}
        <Image src={bgimage} alt='background' fill className='-z-10' />       
      <div className=" flex justify-center items-center py-4 sm:py-6 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="px-6 py-3"
        >
          <Image
            src={logo}
            alt="E-Bid Logo"
            className="mx-auto max-w-[160px] w-full h-auto"
          />
           <h1 className="text-2xl sm:text-3xl md:text-3xl font-extrabold text-black pt-5">
            {t('Make_your')} <span className="px-1">BID</span>{t(' with')}
          </h1>
        </motion.div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-red-50 max-w-[55rem] w-full mx-auto px-4 py-6 sm:p-8 md:px-30 rounded-2xl shadow-2xl text-black"
      >
        {/* Column 1 */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex justify-end space-y-4"
        >
          {/* <Lottie animationData={animationData} loop className="w-full h-30 sm:h-50 md:h-70" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white">
            {t('Make_your')} <span className="text-red-600 pr-1">BID</span>{t(' with')}
          </h2>
          <Image src={logo} alt='logo' width={180} className='my-4' /> */}
          <div className="relative my-2 w-full max-w-[200px]">
            <Globe className="absolute left-2 top-1.25 text-white" size={16} />
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                i18n.changeLanguage(e.target.value);
              }}
              className="w-full pl-6 pr-3 py-1 rounded bg-black text-white text-sm border border-white/20"
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
          className="space-y-3"
        >
          <h3 className="text-xl text-black font-extrabold pb-1 mb-2">{t('Business_Details')}</h3>
          <div className='grid grid-cols-2'>
            <div className='col-span-2'>
              <div className=''><FloatingInput icon={<Building2 className='text-black' size={18} />} placeholder={t('business_name')} value={formData.business_name} onChange={(e) => handleInputChange(null, 'business_name', e.target.value)} /></div>
              <div className='my-3'><FloatingInput icon={<Briefcase className='text-black' size={18} />} placeholder={t('business_type')} value={formData.business_type} onChange={(e) => handleInputChange(null, 'business_type', e.target.value)} /></div>
              <div className='my-3'><FloatingInput icon={<MapPin className='text-black' size={18} />} placeholder={t('address_line1')} value={formData.business_address.address_line1} onChange={(e) => handleInputChange('business_address', 'address_line1', e.target.value)} /></div>
              <div className='my-3'><FloatingInput icon={<MapPin className='text-black' size={18} />} placeholder={t('address_line2')} value={formData.business_address.address_line2} onChange={(e) => handleInputChange('business_address', 'address_line2', e.target.value)} /></div>
            </div>
            <div className='mr-2'>
              <FloatingInput icon={<LocateIcon className='text-black' size={18} />} placeholder={t('city')} value={formData.business_address.city} onChange={(e) => handleInputChange('business_address', 'city', e.target.value)} />
            </div>
            <div className='ml-2'>
              <FloatingInput icon={<LocateIcon className='text-black' size={18} />} placeholder={t('state')} value={formData.business_address.state} onChange={(e) => handleInputChange('business_address', 'state', e.target.value)} />
            </div>
            <div className='mt-3 mr-2'>
              <FloatingInput icon={<LocateIcon className='text-black' size={18} />} placeholder={t('country')} value={formData.business_address.country} onChange={(e) => handleInputChange('business_address', 'country', e.target.value)} />
            </div>
            <div className='mt-3 ml-2'>
              <FloatingInput icon={<LocateIcon className='text-black' size={18} />} placeholder={t('postal_code')} value={formData.business_address.postal_code} onChange={(e) => handleInputChange('business_address', 'postal_code', e.target.value)} />
            </div>
          </div>
            <div className="relative">
              {/* <Briefcase className="absolute left-3 top-3 text-black" size={18} /> */}
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
            <div className="relative bg-white rounded-md">
              {/* <Briefcase className="absolute left-3 top-2.5 text-black" size={18} /> */}
              <select
                value={formData.business_role}
                onChange={(e) => handleInputChange(null, 'business_role', e.target.value)}
                className="w-full pl-2 py-2 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600"
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
            <div className="relative bg-white rounded-md">
              {/* <Briefcase className="absolute left-3 top-2.5 text-black" size={18} /> */}
              <select
                value={formData.business_industry}
                onChange={(e) => handleInputChange(null, 'business_industry', e.target.value)}
                className="w-full pl-2 py-2 text-black rounded-md border border-gray-300 focus:ring-2 focus:ring-red-600"
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-3 mt-0 md:mt-9.5"
        >
          {/* <div className="relative">
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
              value={formData.business_role}
              onChange={(e) => handleInputChange(null, 'business_role', e.target.value)}
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

          {/* New Field: Industry of Business 

          <div className="relative">
            <Briefcase className="absolute left-3 top-3 text-white" size={18} />
            <select
              value={formData.business_industry}
              onChange={(e) => handleInputChange(null, 'business_industry', e.target.value)}
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
          </div> */}
          <h3 className="text-xl font-extrabold text-black pb-1 mb-2 md:mt-7">{t('Personal_Details')}</h3>
          <FloatingInput icon={<User className='text-black' size={18} />} placeholder={t('name')} value={formData.contact_info.name} onChange={(e) => handleInputChange('contact_info', 'name', e.target.value)} />
          <FloatingInput icon={<Briefcase className='text-black' size={18} />} placeholder={t('designation')} value={formData.contact_info.designation} onChange={(e) => handleInputChange('contact_info', 'designation', e.target.value)} />
          <div className="relative w-full rounded-md border border-gray-300">
            <PhoneInput
              country={'in'}
              value={formData.contact_info.phone}
              onChange={(phone) => handleInputChange('contact_info', 'phone', phone)}
              inputStyle={{
                width: '100%',
                paddingLeft: '44px',
                // paddingTop: '',
                backgroundColor: 'white',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '0.5rem',
                color: 'black',
              }}
              buttonStyle={{ backgroundColor: 'transparent', border: 'none' }}
              containerStyle={{ width: '100%' }}
            />
          </div>
          <FloatingInput icon={<Mail className='text-black' size={18} />} placeholder={t('email')} value={formData.contact_info.email} onChange={(e) => handleInputChange('contact_info', 'email', e.target.value)} type="email" />
        </motion.div>

        {/* Submit Button */}
        <div className="flex justify-center mt-15 my-6">
          <button
            type="submit"
            className="px-10 py-3 w-full bg-red-800 hover:bg-red-700 text-white rounded font-semibold text-lg shadow-md transition duration-200"
          >
            {t('Register')}
          </button>
        </div>
      </form>

      {/* Toaster Message */}
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
    )}
  </>  
  );
};

// Floating input field
const FloatingInput = ({ icon, ...props }) => (
  <input
    {...props}
    className="w-full px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
  />
);


export default EnquiryForm;
