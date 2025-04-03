import { Route, Switch, Router as WouterRouter } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { Toaster } from "@/components/ui/toaster";

// Pages
import Home from "./pages/home";
import ProfileDetails from "./pages/profile-details";
import NotFound from "./pages/not-found";

// Layout components
import Header from "./components/common/header";
import Footer from "./components/common/footer";

// Use Wouter for routing
function Router() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/profile/:id" component={ProfileDetails} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

// Main App component
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen flex flex-col font-sans">
        <WouterRouter>
          <Router />
        </WouterRouter>
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;