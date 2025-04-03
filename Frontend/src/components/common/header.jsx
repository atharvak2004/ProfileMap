import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="h-16 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="material-icons text-primary text-3xl mr-2">location_on</span>
              <span className="font-bold text-xl text-slate-800">ProfileMap</span>
            </Link>
          </div>
          
          {isMobile ? (
            <>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={toggleMobileMenu}
                className="lg:hidden"
              >
                <span className="material-icons">{mobileMenuOpen ? "close" : "menu"}</span>
              </Button>
              
              {mobileMenuOpen && (
                <div className="absolute top-16 left-0 right-0 bg-white border-b border-slate-200 shadow-md z-50">
                  <nav className="container mx-auto px-4 py-4">
                    <ul className="space-y-4">
                      <li>
                        <Link 
                          href="/" 
                          className="block text-slate-800 hover:text-primary font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <Link 
                          href="/admin" 
                          className="block text-slate-800 hover:text-primary font-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          Admin
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              )}
            </>
          ) : (
            <nav className="hidden lg:block">
              <ul className="flex space-x-8">
                <li>
                  <Link 
                    href="/" 
                    className="text-slate-800 hover:text-primary font-medium"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link 
                    href="/admin" 
                    className="text-slate-800 hover:text-primary font-medium"
                  >
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;