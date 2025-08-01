'use client';

import React, { useEffect, useState } from 'react';
import { Loader2, Eye } from 'lucide-react';
import Modal from '../components/Modal';

const GetAllBusinesses = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/business`);
        const data = await response.json();
        setBusinesses(data || []);
      } catch (err) {
        console.error("Error fetching businesses:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-bold mb-6 text-center text-red-600">
        All Registered Businesses
      </h1>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <Loader2 className="animate-spin text-red-500" size={40} />
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow-md">
          <table className="min-w-full bg-white border">
            <thead className="bg-red-100">
              <tr className="text-left text-gray-800 font-semibold">
                <th className="p-3 border">Business Name</th>
                <th className="p-3 border">Business Type</th>
                <th className="p-3 border">Country</th>
                <th className="p-3 border">Contact Name</th>
                <th className="p-3 border">Phone</th>
              </tr>
            </thead>
            <tbody>
              {businesses.map((details, index) => (
                <tr key={index} className="hover:bg-gray-100 transition text-black">
                  <td className="p-3">{details.business_name}</td>
                  <td className="p-3">{details.business_type}</td>
                  <td className="p-3">{details.business_address?.country}</td>
                  <td className="p-3">{details.contact_info?.name}</td>
                  <td className="p-3">{details.contact_info?.phone}</td>
                  <td className="p-3 pr-4">
                    <button
                      onClick={() => setSelectedBusiness(details)}
                      className="flex items-center gap-1 text-green-500 hover:text-green-700 transition cursor-pointer"
                      title="View Details"
                    >
                      <Eye size={18} />
                      <span className="text-sm font-medium">View</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selectedBusiness && (
        <Modal onClose={() => setSelectedBusiness(null)} data={selectedBusiness} />
      )}
    </div>
  );
};

export default GetAllBusinesses;
