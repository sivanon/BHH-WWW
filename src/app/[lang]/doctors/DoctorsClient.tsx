"use client";

import { useState } from 'react';
import { Search, MapPin, Calendar, Stethoscope } from 'lucide-react';
import { getDictionary, Locale } from '@/i18n/dictionaries';

export default function DoctorsClient({ 
  initialDoctors, 
  departments, 
  lang 
}: { 
  initialDoctors: any[]; 
  departments: {id: string, name: string}[]; 
  lang: string 
}) {
  const t = getDictionary(lang as Locale).doctors;
  const nav = getDictionary(lang as Locale).nav;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');

  const filteredDoctors = initialDoctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty ? doc.specialty === selectedSpecialty : true;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="bg-gray-50 min-h-screen py-16">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.desc}</p>
        </div>

        {/* Search & Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-12 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input 
              type="text" 
              placeholder={t.searchPh} 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-gray-900"
            />
          </div>
          <div className="md:w-64">
            <select 
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white text-gray-900"
            >
              <option value="">{t.allSpecs}</option>
              {departments.map(dept => (
                <option key={dept.id} value={dept.name}>{dept.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.map(doc => (
            <div key={doc.id} className="bg-white rounded-xl shadow border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] relative bg-gray-200 flex items-center justify-center">
                {doc.imageUrl ? (
                  <img src={doc.imageUrl} alt={doc.name} className="object-cover w-full h-full" />
                ) : (
                  <Stethoscope className="w-20 h-20 text-gray-400" />
                )}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900">{doc.name}</h3>
                    <p className="text-secondary font-medium">{doc.specialty}</p>
                  </div>
                  <span className="bg-primary/10 text-primary text-xs font-bold px-2 py-1 rounded">
                    {doc.experience} {t.exp}
                  </span>
                </div>
                
                <div className="space-y-2 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4" /> {t.avail} {doc.availableHours}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4" /> {doc.location}
                  </div>
                </div>

              </div>
            </div>
          ))}
          
          {filteredDoctors.length === 0 && (
            <div className="col-span-full py-12 text-center text-gray-500">
              {t.noDocs}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
