import { FileText, CheckCircle2, Clock } from 'lucide-react';

interface OITDocument {
  name: string;
  url: string;
  size: string;
}

interface IndicatorGroup {
  title: string;
  description: string;
  documents: OITDocument[];
}

export default function OITTableDisplay({ data, index }: { data: IndicatorGroup; index: number }) {
  // Group documents by OIT tag, guessing it by splitting space if possible, or we just render them one-by-one.
  return (
    <div className="mb-12 border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm font-sans">
      {/* Target Color: Teal #0db492 */}
      <div className="bg-[#0db492] text-white p-5 flex items-start gap-4">
        <div className="bg-white/20 p-2.5 rounded-full shrink-0 mt-0.5 shadow-sm">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
        </div>
        <div>
          <h2 className="text-2xl font-extrabold tracking-tight drop-shadow-sm">{data.title}</h2>
          <div className="mt-3 text-sm text-teal-50 px-4 py-2 bg-[#008a6e] rounded-lg inline-block font-medium shadow-inner">
            {data.description}
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left table-fixed">
          <thead className="bg-[#fff8e1] border-b-2 border-orange-100 hidden md:table-header-group">
            <tr className="text-gray-700 text-[13px]">
              <th className="p-4 font-extrabold border-r border-[#ffe8b3] w-[18%] text-center tracking-wide text-orange-900 leading-tight">รหัสข้อมูล</th>
              <th className="p-4 font-extrabold border-r border-[#ffe8b3] w-[42%] text-orange-900">หัวข้อข้อกำหนด หรือ เอกสาร</th>
              <th className="p-4 text-center font-extrabold border-r border-[#ffe8b3] w-[20%] text-[#d97706] tracking-wider uppercase">รอบ 6 เดือน</th>
              <th className="p-4 text-center font-extrabold text-gray-400 w-[20%] uppercase line-through bg-gray-50">รอบ 12 เดือน</th>
            </tr>
          </thead>
          <tbody className="text-[14px]">
            {data.documents.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-16 text-center text-gray-500 bg-gray-50">
                  <div className="flex flex-col items-center opacity-60">
                    <FileText className="w-12 h-12 mb-3" />
                    <span className="font-bold text-lg">กำลังเตรียมเอกสารในตัวชี้วัดนี้</span>
                  </div>
                </td>
              </tr>
            ) : (
              data.documents.map((doc, idx) => {
                // Extract MOIT code natively to match logic
                const match = doc.name.match(/^([A-Za-z0-9.-]+)\s+(.*)/i);
                let codeLabel = `เอกสาร`;
                let docTitle = doc.name;
                
                // Usually documents are "MOIT1.1 name", use safe matching
                if (match && match[1].length < 15) {
                   codeLabel = match[1];
                   docTitle = match[2];
                }

                return (
                  <tr key={idx} className="border-b border-gray-100 hover:bg-green-50/20 transition-colors flex flex-col md:table-row">
                    <td className="p-5 align-top md:border-r border-gray-100 md:text-center text-left">
                      <div className="inline-flex items-center justify-center px-4 py-2 rounded-xl font-black text-[#0db492] bg-[#e6f4f1] border border-[#0db492]/20">
                        {codeLabel.toUpperCase()}
                      </div>
                    </td>
                    <td className="p-5 align-top md:border-r border-gray-100">
                      <p className="text-gray-800 text-[15px] leading-relaxed break-words font-medium">{docTitle}</p>
                    </td>
                    <td className="p-5 align-top md:border-r border-gray-100 bg-blue-50/10">
                      <div className="bg-white border hover:border-blue-300 transition-colors border-blue-100 rounded-xl overflow-hidden shadow-sm shadow-blue-50 h-full flex flex-col">
                        <div className="bg-blue-50/80 px-3 py-2 border-b border-blue-100 flex items-center text-blue-900 font-bold text-xs uppercase tracking-wide">
                           <Clock className="w-3.5 h-3.5 mr-1.5 text-blue-600" /> รอบ 6 เดือน
                        </div>
                        <div className="p-3 flex-1 flex flex-col">
                          <div className="flex pb-3 mb-3 border-b border-gray-50">
                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700 bg-emerald-100/80 border border-emerald-200">
                              <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> ดำเนินการแล้ว
                            </span>
                          </div>
                          
                          <a 
                            href={doc.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex flex-col mt-auto p-3 rounded-lg border border-red-100/80 bg-red-50/50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
                          >
                            <div className="flex text-[#3182ce] group-hover:text-blue-700 font-semibold mb-1 text-sm">
                              <FileText className="w-4 h-4 mr-2 shrink-0 mt-0.5 text-red-500" />
                              <span className="line-clamp-3 leading-snug">{docTitle}.pdf</span>
                            </div>
                            <span className="text-[10.5px] text-gray-500 font-mono ml-6 bg-white px-2 py-0.5 rounded border border-gray-100 inline-block w-fit">Size: {doc.size}</span>
                          </a>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 align-middle text-center bg-gray-50/80 md:border-l-0 border-t border-gray-100">
                       <span className="text-gray-400 font-medium text-xs bg-white border border-gray-100 px-3 py-1.5 rounded-lg inline-block shadow-sm">
                         - ไม่ต้องประเมินรอบนี้ -
                       </span>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
