import { Link } from "wouter";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-100 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <span className="material-icons text-primary text-2xl mr-2">location_on</span>
              <span className="font-bold text-lg text-slate-800">ProfileMap</span>
            </div>
            <p className="text-slate-600 text-sm">
              Connect with professionals through our interactive map platform.
              Discover location-based profiles and expand your network.
            </p>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/" 
                  className="text-slate-600 hover:text-primary text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy" 
                  className="text-slate-600 hover:text-primary text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/terms" 
                  className="text-slate-600 hover:text-primary text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-slate-800 mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-start text-sm">
                <span className="material-icons text-slate-400 text-base mr-2">email</span>
                <span className="text-slate-600">admin@profilemap.com</span>
              </li>
              <li className="flex items-start text-sm">
                <span className="material-icons text-slate-400 text-base mr-2">phone</span>
                <span className="text-slate-600">+91 000000000</span>
              </li>
              <li className="flex items-start text-sm">
                <span className="material-icons text-slate-400 text-base mr-2">location_on</span>
                <span className="text-slate-600">Pune, Maharastra</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-200 mt-8 pt-8 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {currentYear} ProfileMap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;