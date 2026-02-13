import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom"; // Removed unused Router import
import { lazy, Suspense } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import { PremiumProvider } from '@/contexts/PremiumContext';
// import CountEggs4 from "./pages/3CountEggs4";
// import CountArrays5 from "./pages/3CountArrays5";

// Lazy load route components for better performance
const Homepage = lazy(() => import("./pages/Homepage"));
const Activities = lazy(() => import("./pages/Activities"));
const ParentGuide = lazy(() => import("./pages/ParentGuide"));
const TopicMatching = lazy(() => import("./pages/TopicMatching"));
const TopicSorting = lazy(() => import("./pages/TopicSorting"));
const TopicCounting3 = lazy(() => import("./pages/TopicCounting3"));
const TopicNumbers3 = lazy(() => import("./pages/TopicNumbers3"));
const MatchingActivity1 = lazy(() => import("./pages/1MatchingActivity1"));
const MatchingActivity2 = lazy(() => import("./pages/1MatchingActivity2"));
const MatchingActivity3 = lazy(() => import("./pages/1MatchingActivity3"));
const MatchingActivity4 = lazy(() => import("./pages/1MatchingActivity4"));
const SortingActivity5 = lazy(() => import("./pages/1SortingActivity5"));
const SortingActivity6 = lazy(() => import("./pages/1SortingActivity6"));
const SortingActivity7 = lazy(() => import("./pages/1SortingActivity7"));
const CountingActivity8 = lazy(() => import("./pages/1CountingActivity8"));
const CountingActivity9 = lazy(() => import("./pages/1CountingActivity9"));
const CountingActivity10 = lazy(() => import("./pages/1CountingActivity10"));
const CountingActivity11 = lazy(() => import("./pages/1CountingActivity11"));
const CountingActivity12 = lazy(() => import("./pages/1CountingActivity12"));
const CountingActivity13 = lazy(() => import("./pages/1CountingActivity13"));
const CountingActivity14 = lazy(() => import("./pages/1CountingActivity14"));
const MidModuleAssessment = lazy(() => import("./pages/MidModule1Assessment"));

const CountingActivity15 = lazy(() => import("./pages/1CountingActivity15"));
const CountingActivity16 = lazy(() => import("./pages/1CountingActivity16"));
const CountingActivity17 = lazy(() => import("./pages/1CountingActivity17"));
const CountingActivity18 = lazy(() => import("./pages/1CountingActivity18"));
const CountingActivity19 = lazy(() => import("./pages/1CountingActivity19"));
const CountingActivity20 = lazy(() => import("./pages/1CountingActivity20"));

const CountingMatching21 = lazy(() => import("./pages/1CountingMatching21"));
const CountingMatching22 = lazy(() => import("./pages/1CountingMatching22"));
const CountingMatching23 = lazy(() => import("./pages/1CountingMatching23"));
const CountingMatching24 = lazy(() => import("./pages/1CountingMatching24"));
const CountingMatching25 = lazy(() => import("./pages/1CountingMatching25"));
const CountingMatching26 = lazy(() => import("./pages/1CountingMatching26"));
const CountingMatching27 = lazy(() => import("./pages/1CountingMatching27"));
const CountingMatching28 = lazy(() => import("./pages/1CountingMatching28"));
const CountingMatching29 = lazy(() => import("./pages/1CountingMatching29"));
const CountingMatching30 = lazy(() => import("./pages/1CountingMatching30"));
const CountingMatching31 = lazy(() => import("./pages/1CountingMatching31"));
const CountingMatching32 = lazy(() => import("./pages/1CountingMatching32"));
const CountingMatching33 = lazy(() => import("./pages/1CountingMatching33"));
const CountingMatching34 = lazy(() => import("./pages/1CountingMatching34"));
const CountingMatching35 = lazy(() => import("./pages/1CountingMatching35"));
const CountingMatching36 = lazy(() => import("./pages/1CountingMatching36"));
const CountingMatching37 = lazy(() => import("./pages/1CountingMatching37"));
const EndOfModule1Assessment = lazy(() => import("./pages/EndOfModule1Assessment"));

const ActivitiesModule2 = lazy(() => import("./pages/ActivitiesModule2"));
const ShapesTriangles1 = lazy(() => import("./pages/ShapesTriangles1"));
const ShapesFindDescribe2 = lazy(() => import("./pages/ShapesFindDescribe2"));
const UnderstandRectangles3 = lazy(() => import("./pages/UnderstandRectangles3"));
const UnderstandCircles4 = lazy(() => import("./pages/UnderstandCircles4"));
const UnderstandShapes5 = lazy(() => import("./pages/UnderstandShapes5"));
const BuildTriangle6 = lazy(() => import("./pages/BuildTriangle6"));
const ShapesRectangles7 = lazy(() => import("./pages/ShapesRectangles7"));
const ShapesCircles8 = lazy(() => import("./pages/ShapesCircles8"));
const ShapesSolids9 = lazy(() => import("./pages/ShapesSolids9"));
const ShapesFaces10 = lazy(() => import("./pages/ShapesFaces10"));
const ShapesBuild11 = lazy(() => import("./pages/ShapesBuild11"));
const ShapesModel12 = lazy(() => import("./pages/ShapesModel12"));
const EndOfModule2Assessment = lazy(() => import("./pages/EndOfModule2Assessment"));

const Module3Index = lazy(() => import("./pages/Module3Index"));
const Introduce6And7Lesson1 = lazy(() => import("./pages/CountingToSeven1"));
const CrossingCreekLesson2 = lazy(() => import("./pages/CountingToSeven2"));
const FingerCounting6Lesson3 = lazy(() => import("./pages/FingerCountingSix3"));
const CountEggs4 = lazy(() => import("./pages/3CountEggs4"));
const CountArrays5 = lazy(() => import("./pages/3CountArrays5"));
const ComposeSix6 = lazy(() => import("./pages/3ComposeSix6"));
const ComposeSeven7 = lazy(() => import("./pages/3ComposeSeven7"));
const CircleCount8 = lazy(() => import("./pages/3CircleCount8"));
const ArrangeCount9 = lazy(() => import("./pages/3ArrangeCount9"));
const Tally10 = lazy(() => import("./pages/3Tally10"));
const CountOut11 = lazy(() => import("./pages/3CountOut11"));
const Introduce8Lesson12 = lazy(() => import("./pages/3Introduce8Lesson12"));
const LinearCount13 = lazy(() => import("./pages/3LinearCount13"));
const FingerCount14 = lazy(() => import("./pages/3FingerCount14"));
const ArrayCount15 = lazy(() => import("./pages/3ArrayCount15"));
const Compose8Lesson16 = lazy(() => import("./pages/3Compose8Lesson16"));
const CircularCount17 = lazy(() => import("./pages/3CircularCount17"));
const ArrangeCount18 = lazy(() => import("./pages/3ArrangeCount18"));
const Tally19 = lazy(() => import("./pages/3Tally19"));
const CountOut20 = lazy(() => import("./pages/3CountOut20"));
const IntroduceZero21 = lazy(() => import("./pages/3IntroduceZero21"));
const Introduce9Lesson22 = lazy(() => import("./pages/3Introduce9Lesson22"));
const LinearCount9Lesson23 = lazy(() => import("./pages/3LinearCount9Lesson23"));
const FingerCount24 = lazy(() => import("./pages/3FingerCount24"));
const ArrayCount25 = lazy(() => import("./pages/3ArrayCount25"));
const CircularCount9Lesson27 = lazy(() => import("./pages/3CircularCount9Lesson27"));
const Compose9Lesson26 = lazy(() => import("./pages/3Compose9Lesson26"));
const ArrangeCount28 = lazy(() => import("./pages/3ArrangeCount9Lesson28"));
const Tally9Lesson29 = lazy(() => import("./pages/3Tally9Lesson29"));

const SignUp = lazy(() => import("./pages/SignUp")); // Add this
const SignIn = lazy(() => import("./pages/SignIn")); // Add this
const Dashboard = lazy(() => import("./pages/Dashboard")); // Add this
const PremiumSignup = lazy(() => import("./pages/PremiumSignup"));

const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <PremiumProvider>
          <BrowserRouter basename="/EthioSTEM-preK-Math">
            <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>}>
              {/* return ( */}
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/premium/signup" element={<PremiumSignup />} />
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
                <Route path="/assessment/mid-module-1" element={<MidModuleAssessment />} />

                <Route path="/activity/counting-15" element={<CountingActivity15 />} />
                <Route path="/activity/counting-16" element={<CountingActivity16 />} />
                <Route path="/activity/counting-17" element={<CountingActivity17 />} />
                <Route path="/activity/counting-18" element={<CountingActivity18 />} />
                <Route path="/activity/counting-19" element={<CountingActivity19 />} />
                <Route path="/activity/counting-20" element={<CountingActivity20 />} />

                <Route path="/activity/matching-21" element={<CountingMatching21 />} />
                <Route path="/activity/matching-22" element={<CountingMatching22 />} />
                <Route path="/activity/matching-23" element={<CountingMatching23 />} />
                <Route path="/activity/matching-24" element={<CountingMatching24 />} />
                <Route path="/activity/matching-25" element={<CountingMatching25 />} />
                <Route path="/activity/matching-26" element={<CountingMatching26 />} />
                <Route path="/activity/matching-27" element={<CountingMatching27 />} />
                <Route path="/activity/matching-28" element={<CountingMatching28 />} />
                <Route path="/activity/matching-29" element={<CountingMatching29 />} />
                <Route path="/activity/matching-30" element={<CountingMatching30 />} />
                <Route path="/activity/matching-31" element={<CountingMatching31 />} />
                <Route path="/activity/matching-32" element={<CountingMatching32 />} />
                <Route path="/activity/matching-33" element={<CountingMatching33 />} />
                <Route path="/activity/matching-34" element={<CountingMatching34 />} />
                <Route path="/activity/matching-35" element={<CountingMatching35 />} />
                <Route path="/activity/matching-36" element={<CountingMatching36 />} />
                <Route path="/activity/matching-37" element={<CountingMatching37 />} />
                <Route path="/assessment/end-of-module-1" element={<EndOfModule1Assessment />} />

                <Route path="/activities/module-2" element={<ActivitiesModule2 />} />
                <Route path="/activity/shapes-1" element={<ShapesTriangles1 />} />
                <Route path="/activity/shapes-2" element={<ShapesFindDescribe2 />} />
                <Route path="/activity/shapes-3" element={<UnderstandRectangles3 />} />
                <Route path="/activity/shapes-4" element={<UnderstandCircles4 />} />
                <Route path="/activity/shapes-5" element={<UnderstandShapes5 />} />
                <Route path="/activity/shapes-6" element={<BuildTriangle6 />} />
                <Route path="/activity/shapes-7" element={<ShapesRectangles7 />} />
                <Route path="/activity/shapes-8" element={<ShapesCircles8 />} />
                <Route path="/activity/shapes-9" element={<ShapesSolids9 />} />
                <Route path="/activity/shapes-10" element={<ShapesFaces10 />} />
                <Route path="/activity/shapes-11" element={<ShapesBuild11 />} />
                <Route path="/activity/shapes-12" element={<ShapesModel12 />} />
                <Route path="/assessment/end-of-module-2" element={<EndOfModule2Assessment />} />

                <Route path="/activities/module-3" element={<Module3Index />} />
                <Route path="/3-introduce-6-7-lesson-1" element={<Introduce6And7Lesson1 />} />
                <Route path="/3-crossing-creek-lesson-2" element={<CrossingCreekLesson2 />} />
                <Route path="/3-finger-counting-6-lesson-3" element={<FingerCounting6Lesson3 />} />
                <Route path="/3-count-eggs-4" element={<CountEggs4 />} />
                <Route path="/3-count-arrays-5" element={<CountArrays5 />} />
                <Route path="/3-compose-six-6" element={<ComposeSix6 />} />
                <Route path="/3-compose-seven-7" element={<ComposeSeven7 />} />
                <Route path="/3-circle-count-8" element={<CircleCount8 />} />
                <Route path="/3-arrange-count-9" element={<ArrangeCount9 />} />
                <Route path="/3-tally-10" element={<Tally10 />} />
                <Route path="/3-count-out-11" element={<CountOut11 />} />
                <Route path="/3-introduce-8-12" element={<Introduce8Lesson12 />} />
                <Route path="/3-linear-count-13" element={<LinearCount13 />} />
                <Route path="/3-finger-count-14" element={<FingerCount14 />} />
                <Route path="/3-array-count-15" element={<ArrayCount15 />} />
                <Route path="/3-compose-8-16" element={<Compose8Lesson16 />} />
                <Route path="/3-circular-count-17" element={<CircularCount17 />} />
                <Route path="/3-arrange-count-18" element={<ArrangeCount18 />} />
                <Route path="/3-tally-19" element={<Tally19 />} />
                <Route path="/3-count-out-20" element={<CountOut20 />} />
                <Route path="/3-introduce-zero-21" element={<IntroduceZero21 />} />
                <Route path="/3-introduce-9-lesson-22" element={<Introduce9Lesson22 />} />
                <Route path="/3-linear-count-9-lesson-23" element={<LinearCount9Lesson23 />} />
                <Route path="/3-finger-count-24" element={<FingerCount24 />} />
                <Route path="/3-array-count-25" element={<ArrayCount25 />} />
                <Route path="/3-circular-count-9-lesson-27" element={<CircularCount9Lesson27 />} />
                <Route path="/3-compose-9-lesson-26" element={<Compose9Lesson26 />} />
                <Route path="/3-arrange-count-28" element={<ArrangeCount28 />} />
                <Route path="/3-tally-9-lesson-29" element={<Tally9Lesson29 />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </PremiumProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
