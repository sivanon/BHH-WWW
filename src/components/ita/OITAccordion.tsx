"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, FileText, Download, ShieldCheck } from "lucide-react";

export default function OITAccordion({ data }: { data: any[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-8 duration-700">
      {data.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-3xl overflow-hidden bg-white shadow-lg transition-all hover:shadow-xl">
           <button 
             onClick={() => setOpenIndex(openIndex === index ? null : index)}
             className={`w-full text-left px-8 py-6 flex flex-col md:flex-row md:items-center justify-between transition-colors duration-300 ${openIndex === index ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
           >
             <div className="flex items-start md:items-center gap-5">
               <div className={`p-4 rounded-2xl shadow-sm transition-colors duration-300 flex-shrink-0 ${openIndex === index ? 'bg-primary text-white shadow-blue-200' : 'bg-blue-50 text-primary'}`}>
                 <ShieldCheck className="w-8 h-8" />
               </div>
               <div>
                 <h3 className={`text-xl font-extrabold transition-colors duration-300 ${openIndex === index ? 'text-primary' : 'text-gray-900'}`}>{item.title}</h3>
                 <p className="text-gray-500 font-medium mt-1">{item.description}</p>
               </div>
             </div>
             <div className="mt-4 md:mt-0 flex justify-end md:block">
               {openIndex === index ? 
                 <div className="bg-primary/10 p-2 rounded-full"><ChevronUp className="w-6 h-6 text-primary" /></div> : 
                 <div className="bg-gray-100 p-2 rounded-full"><ChevronDown className="w-6 h-6 text-gray-400" /></div>
               }
             </div>
           </button>
           
           {openIndex === index && (
             <div className="px-8 pb-8 pt-4 border-t border-blue-100 bg-gradient-to-b from-blue-50/30 to-white">
               <ul className="space-y-4 mt-2">
                 {item.documents.map((doc: any, dIdx: number) => (
                   <li key={dIdx}>
                     <a href={doc.url} target="_blank" rel="noopener noreferrer" className="flex items-center group p-5 bg-white rounded-2xl border border-gray-200 hover:border-secondary hover:shadow-md transition-all">
                       <div className="bg-red-50 p-3 rounded-xl mr-5 group-hover:bg-red-100 group-hover:scale-110 transition-transform flex-shrink-0">
                         <FileText className="w-6 h-6 text-red-500" />
                       </div>
                       <div className="flex-1">
                         <p className="text-gray-800 font-bold group-hover:text-secondary transition-colors text-lg line-clamp-2 leading-snug">{doc.name}</p>
                         <div className="flex items-center gap-4 mt-2">
                           <p className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full flex items-center"><Download className="w-3 h-3 mr-1"/> ดาวน์โหลด PDF</p>
                           <p className="text-xs text-gray-400">ขนาด: {doc.size}</p>
                         </div>
                       </div>
                     </a>
                   </li>
                 ))}
               </ul>
             </div>
           )}
        </div>
      ))}
    </div>
  );
}
