import { Instagram , MessageCircleHeart  } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#FBEEDC] text-[#6B3E26] text-sm w-full border-t border-[#D9BFA6] mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        
        {/* Social Icons */}
        <div className="flex gap-4">
          <a href="#" aria-label="Instagram">
            <Instagram className="w-5 h-5 hover:text-[#A45D3F] transition-colors" />
          </a>
          <a href="#" aria-label="Pinterest">
            <MessageCircleHeart  className="w-5 h-5 hover:text-[#A45D3F] transition-colors" />
          </a>
        </div>

        <div className="text-center md:text-right space-y-1 md:space-y-0 md:space-x-4">
          <p>© 2025, Pehrin — Powered by Shopify</p>
          <a href="#" className="hover:underline">Refund policy</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Terms of service</a>
          <span className="hidden md:inline">·</span>
          <a href="#" className="hover:underline">Contact information</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
