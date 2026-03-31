import { MessageCircle, HeartPulse } from 'lucide-react';

export default function SocialChannels() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Facebook */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center">
        <h3 className="text-xl font-bold text-blue-700 mb-6 flex items-center">
          <svg className="w-8 h-8 mr-2" fill="currentColor" viewBox="0 0 24 24"><path d="M22.675 0h-21.35C.597 0 0 .597 0 1.325v21.351C0 23.403.597 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.597 1.323-1.324V1.325C24 .597 23.403 0 22.675 0z"/></svg>
          Facebook Fanpage
        </h3>
        <div className="w-full overflow-hidden flex justify-center rounded-xl bg-gray-50 border border-gray-200 min-h-[500px]">
          <iframe 
            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2Fbanhonghosp&tabs=timeline&width=340&height=500&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId" 
            width="340" 
            height="500" 
            style={{ border: 'none', overflow: 'hidden', maxWidth: '100%' }} 
            scrolling="no" 
            frameBorder="0" 
            allowFullScreen={true} 
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share">
          </iframe>
        </div>
      </div>

      {/* LINE Mor Prom */}
      <div className="bg-gradient-to-br from-green-50 to-emerald-100 rounded-2xl shadow-sm border border-green-200 p-8 flex flex-col items-center justify-center text-center relative overflow-hidden h-full min-h-[400px]">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full -mr-32 -mt-32 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-500/10 rounded-full -ml-32 -mb-32 blur-3xl"></div>
        
        <div className="bg-white p-5 rounded-full shadow-xl mb-8 relative z-10 border-4 border-green-500">
          <MessageCircle className="w-16 h-16 text-green-500" />
        </div>
        
        <h3 className="text-3xl font-extrabold text-green-900 mb-4 tracking-tight relative z-10">แอดไลน์ "หมอพร้อม"</h3>
        <p className="text-green-800/80 mb-10 max-w-sm text-lg relative z-10 font-medium leading-relaxed">
          ระบบบริการด้านสาธารณสุข รับบัตรคิวออนไลน์ ดูประวัติรักษา และบริการทางการแพทย์บนมือถือ
        </p>
        
        <a href="https://line.me/R/ti/p/@mohpromt" target="_blank" rel="noopener noreferrer" className="relative z-10 inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all bg-green-500 rounded-2xl hover:bg-green-600 shadow-xl hover:-translate-y-1 hover:shadow-2xl">
          <MessageCircle className="w-7 h-7 mr-3" />
          เพิ่มเพื่อน @mohpromt
        </a>
      </div>
    </div>
  );
}
