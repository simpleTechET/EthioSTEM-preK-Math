import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Removed unused Router import
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load route components for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const Activities = lazy(() => import("./pages/Activities"));
const ParentGuide = lazy(() => import("./pages/ParentGuide"));
const TopicMatching = lazy(() => import("./pages/TopicMatching"));
const TopicSorting = lazy(() => import("./pages/TopicSorting"));
const TopicCounting3 = lazy(() => import("./pages/TopicCounting3"));
const TopicNumbers3 = lazy(() => import("./pages/TopicNumbers3"));
const MatchingActivity1 = lazy(() => import("./pages/MatchingActivity1"));
const MatchingActivity2 = lazy(() => import("./pages/MatchingActivity2"));
const MatchingActivity3 = lazy(() => import("./pages/MatchingActivity3"));
const MatchingActivity4 = lazy(() => import("./pages/MatchingActivity4"));
const SortingActivity5 = lazy(() => import("./pages/SortingActivity5"));
const SortingActivity6 = lazy(() => import("./pages/SortingActivity6"));
const SortingActivity7 = lazy(() => import("./pages/SortingActivity7"));
const CountingActivity8 = lazy(() => import("./pages/CountingActivity8"));
const CountingActivity9 = lazy(() => import("./pages/CountingActivity9"));
const CountingActivity10 = lazy(() => import("./pages/CountingActivity10"));
const CountingActivity11 = lazy(() => import("./pages/CountingActivity11"));
const CountingActivity12 = lazy(() => import("./pages/CountingActivity12"));
const CountingActivity13 = lazy(() => import("./pages/CountingActivity13"));
const CountingActivity14 = lazy(() => import("./pages/CountingActivity14"));
const SignUp = lazy(() => import("./pages/SignUp")); // Add this
const SignIn = lazy(() => import("./pages/SignIn")); // Add this
const Dashboard = lazy(() => import("./pages/Dashboard")); // Add this
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
  <AuthProvider>
      <BrowserRouter basename="/EthioSTEM-preK-Math">
        <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>}>
        {/* return ( */}
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/parent-guide" element={<ParentGuide />} />
            <Route path="/topic/matching" element={<TopicMatching />} />
            <Route path="/topic/sorting" element={<TopicSorting />} />
            <Route path="/topic/counting-3" element={<TopicCounting3 />} />
            <Route path="/topic/numbers-3" element={<TopicNumbers3 />} />
            <Route path="/activity/matching-1" element={<MatchingActivity1 />} />
            <Route path="/activity/matching-2" element={<MatchingActivity2 />} />
            <Route path="/activity/matching-3" element={<MatchingActivity3 />} />
            <Route path="/activity/matching-4" element={<MatchingActivity4 />} />
            <Route path="/activity/sorting-5" element={<SortingActivity5 />} />
            <Route path="/activity/sorting-6" element={<SortingActivity6 />} />
            <Route path="/activity/sorting-7" element={<SortingActivity7 />} />
            <Route path="/activity/counting-8" element={<CountingActivity8 />} />
            <Route path="/activity/counting-9" element={<CountingActivity9 />} />
            <Route path="/activity/counting-10" element={<CountingActivity10 />} />
            <Route path="/activity/counting-11" element={<CountingActivity11 />} />
            <Route path="/activity/counting-12" element={<CountingActivity12 />} />
            <Route path="/activity/counting-13" element={<CountingActivity13 />} />
            <Route path="/activity/counting-14" element={<CountingActivity14 />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;