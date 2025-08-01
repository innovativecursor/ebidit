'use client';

import React from 'react';
import { X } from 'lucide-react';
import { motion } from 'framer-motion';

const Modal = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white max-w-2xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]"
      >
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          onClick={onClose}
        >
          <X size={24} />
        </button>

        <h2 className="text-xl font-bold mb-4 text-red-600">Full Business Details</h2>

        <div className="space-y-2 text-sm text-black">
          <p><strong>Business Name:</strong> {data.business_name}</p>
          <p><strong>Business Type:</strong> {data.business_type}</p>
          <p><strong>Role:</strong> {data.business_role}</p>
          <p><strong>Industry:</strong> {data.business_industry}</p>

          <p className="mt-4 font-semibold text-black">Business Address:</p>
          <p>{data.business_address?.address_line1}</p>
          <p>{data.business_address?.address_line2}</p>
          <p>{data.business_address?.city}, {data.business_address?.state}, {data.business_address?.country} - {data.business_address?.postal_code}</p>

          <p className="mt-4 font-semibold text-black">Contact Info:</p>
          <p>Name: {data.contact_info?.name}</p>
          <p>Designation: {data.contact_info?.designation}</p>
          <p>Phone: {data.contact_info?.phone}</p>
          <p>Email: {data.contact_info?.email}</p>

          <p className="mt-4 font-semibold text-black">Primary Activity:</p>
          <p>{data.primary_business_activity}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default Modal;
