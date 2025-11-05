import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Activities from "./pages/Activities";
import ParentGuide from "./pages/ParentGuide";
import MatchingActivity1 from "./pages/MatchingActivity1";
import MatchingActivity2 from "./pages/MatchingActivity2";
import MatchingActivity3 from "./pages/MatchingActivity3";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename="/ESTEM-preK-Math">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/parent-guide" element={<ParentGuide />} />
          <Route path="/activity/matching-1" element={<MatchingActivity1 />} />
          <Route path="/activity/matching-2" element={<MatchingActivity2 />} />
          <Route path="/activity/matching-3" element={<MatchingActivity3 />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
