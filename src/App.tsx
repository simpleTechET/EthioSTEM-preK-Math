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
const TowersThirty30 = lazy(() => import("./pages/3TowersThirty30"));
const StairsThirtyOne31 = lazy(() => import("./pages/3StairsThirtyOne31"));
const ClimbStairsThirtyTwo32 = lazy(() => import("./pages/3ClimbStairsThirtyTwo32"));
const DescendingStairsThirtyThree33 = lazy(() => import("./pages/3DescendingStairsThirtyThree33"));
const PennyStaircaseThirtyFour34 = lazy(() => import("./pages/3PennyStaircaseThirtyFour34"));
const LittleCrabsThirtyFive35 = lazy(() => import("./pages/3LittleCrabsThirtyFive35"));
const LittleFishiesThirtySix36 = lazy(() => import("./pages/3LittleFishiesThirtySix36"));
const CulminatingThirtySeven37 = lazy(() => import("./pages/3CulminatingThirtySeven37"));
const CircularTenThirtyEight38 = lazy(() => import("./pages/3CircularTenThirtyEight38"));
const VariedTenThirtyNine39 = lazy(() => import("./pages/3VariedTenThirtyNine39"));
const TallyTenForty40 = lazy(() => import("./pages/3TallyTenForty40"));
const CountOutTenFortyOne41 = lazy(() => import("./pages/3CountOutTenFortyOne41"));
const NumberBookFortyTwo42 = lazy(() => import("./pages/3NumberBookFortyTwo42"));

// Topic G: Building Number Stairs
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
const Module4Index = lazy(() => import("./pages/Module4Index"));
const Introduce6And7Lesson1 = lazy(() => import("./pages/CountingToSeven1"));
const CrossingCreekLesson2 = lazy(() => import("./pages/CountingToSeven2"));
const FingerCounting6Lesson3 = lazy(() => import("./pages/FingerCountingSix3"));
const FingerCounting7Lesson4 = lazy(() => import("./pages/FingerCountingSeven4"));
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
                <Route path="/activities/module-1" element={<Activities />} />
                <Route path="/parent-guide" element={<ParentGuide />} />
                <Route path="/topic/matching" element={<TopicMatching />} />
                <Route path="/topic/sorting" element={<TopicSorting />} />
                <Route path="/topic/counting-3" element={<TopicCounting3 />} />
                <Route path="/topic/numbers-3" element={<TopicNumbers3 />} />
                <Route path="/module-1/matching-1" element={<MatchingActivity1 />} />
                <Route path="/module-1/matching-2" element={<MatchingActivity2 />} />
                <Route path="/module-1/matching-3" element={<MatchingActivity3 />} />
                <Route path="/module-1/matching-4" element={<MatchingActivity4 />} />
                <Route path="/module-1/sorting-5" element={<SortingActivity5 />} />
                <Route path="/module-1/sorting-6" element={<SortingActivity6 />} />
                <Route path="/module-1/sorting-7" element={<SortingActivity7 />} />
                <Route path="/module-1/counting-8" element={<CountingActivity8 />} />
                <Route path="/module-1/counting-9" element={<CountingActivity9 />} />
                <Route path="/module-1/counting-10" element={<CountingActivity10 />} />
                <Route path="/module-1/counting-11" element={<CountingActivity11 />} />
                <Route path="/module-1/counting-12" element={<CountingActivity12 />} />
                <Route path="/module-1/counting-13" element={<CountingActivity13 />} />
                <Route path="/module-1/counting-14" element={<CountingActivity14 />} />
                <Route path="/module-1/mid-assessment" element={<MidModuleAssessment />} />

                <Route path="/module-1/counting-15" element={<CountingActivity15 />} />
                <Route path="/module-1/counting-16" element={<CountingActivity16 />} />
                <Route path="/module-1/counting-17" element={<CountingActivity17 />} />
                <Route path="/module-1/counting-18" element={<CountingActivity18 />} />
                <Route path="/module-1/counting-19" element={<CountingActivity19 />} />
                <Route path="/module-1/counting-20" element={<CountingActivity20 />} />

                <Route path="/module-1/matching-21" element={<CountingMatching21 />} />
                <Route path="/module-1/matching-22" element={<CountingMatching22 />} />
                <Route path="/module-1/matching-23" element={<CountingMatching23 />} />
                <Route path="/module-1/matching-24" element={<CountingMatching24 />} />
                <Route path="/module-1/matching-25" element={<CountingMatching25 />} />
                <Route path="/module-1/matching-26" element={<CountingMatching26 />} />
                <Route path="/module-1/matching-27" element={<CountingMatching27 />} />
                <Route path="/module-1/matching-28" element={<CountingMatching28 />} />
                <Route path="/module-1/matching-29" element={<CountingMatching29 />} />
                <Route path="/module-1/matching-30" element={<CountingMatching30 />} />
                <Route path="/module-1/matching-31" element={<CountingMatching31 />} />
                <Route path="/module-1/matching-32" element={<CountingMatching32 />} />
                <Route path="/module-1/matching-33" element={<CountingMatching33 />} />
                <Route path="/module-1/matching-34" element={<CountingMatching34 />} />
                <Route path="/module-1/matching-35" element={<CountingMatching35 />} />
                <Route path="/module-1/matching-36" element={<CountingMatching36 />} />
                <Route path="/module-1/matching-37" element={<CountingMatching37 />} />
                <Route path="/module-1/end-assessment" element={<EndOfModule1Assessment />} />

                <Route path="/activities/module-2" element={<ActivitiesModule2 />} />
                <Route path="/module-2/shapes-1" element={<ShapesTriangles1 />} />
                <Route path="/module-2/shapes-2" element={<ShapesFindDescribe2 />} />
                <Route path="/module-2/shapes-3" element={<UnderstandRectangles3 />} />
                <Route path="/module-2/shapes-4" element={<UnderstandCircles4 />} />
                <Route path="/module-2/shapes-5" element={<UnderstandShapes5 />} />
                <Route path="/module-2/shapes-6" element={<BuildTriangle6 />} />
                <Route path="/module-2/shapes-7" element={<ShapesRectangles7 />} />
                <Route path="/module-2/shapes-8" element={<ShapesCircles8 />} />
                <Route path="/module-2/shapes-9" element={<ShapesSolids9 />} />
                <Route path="/module-2/shapes-10" element={<ShapesFaces10 />} />
                <Route path="/module-2/shapes-11" element={<ShapesBuild11 />} />
                <Route path="/module-2/shapes-12" element={<ShapesModel12 />} />
                <Route path="/module-2/end-assessment" element={<EndOfModule2Assessment />} />

                <Route path="/activities/module-3" element={<Module3Index />} />
                <Route path="/module-3/lesson-1" element={<Introduce6And7Lesson1 />} />
                <Route path="/module-3/lesson-2" element={<CrossingCreekLesson2 />} />
                <Route path="/module-3/lesson-3" element={<FingerCounting6Lesson3 />} />
                <Route path="/module-3/lesson-4" element={<CountEggs4 />} />
                <Route path="/module-3/lesson-5" element={<CountArrays5 />} />
                <Route path="/module-3/lesson-6" element={<ComposeSix6 />} />
                <Route path="/module-3/lesson-7" element={<ComposeSeven7 />} />
                <Route path="/module-3/lesson-8" element={<CircleCount8 />} />
                <Route path="/module-3/lesson-9" element={<ArrangeCount9 />} />
                <Route path="/module-3/lesson-10" element={<Tally10 />} />
                <Route path="/module-3/lesson-30" element={<TowersThirty30 />} />
                <Route path="/module-3/lesson-31" element={<StairsThirtyOne31 />} />
                <Route path="/module-3/lesson-32" element={<ClimbStairsThirtyTwo32 />} />
                <Route path="/module-3/lesson-33" element={<DescendingStairsThirtyThree33 />} />
                <Route path="/module-3/lesson-34" element={<PennyStaircaseThirtyFour34 />} />
                <Route path="/module-3/lesson-35" element={<LittleCrabsThirtyFive35 />} />
                <Route path="/module-3/lesson-36" element={<LittleFishiesThirtySix36 />} />
                <Route path="/module-3/lesson-37" element={<CulminatingThirtySeven37 />} />
                <Route path="/module-3/lesson-38" element={<CircularTenThirtyEight38 />} />
                <Route path="/module-3/lesson-39" element={<VariedTenThirtyNine39 />} />
                <Route path="/module-3/lesson-40" element={<TallyTenForty40 />} />
                <Route path="/module-3/lesson-41" element={<CountOutTenFortyOne41 />} />
                <Route path="/module-3/lesson-42" element={<NumberBookFortyTwo42 />} />
                <Route path="/module-3/lesson-11" element={<CountOut11 />} />
                <Route path="/module-3/lesson-12" element={<Introduce8Lesson12 />} />
                <Route path="/module-3/lesson-13" element={<LinearCount13 />} />
                <Route path="/module-3/lesson-14" element={<FingerCount14 />} />
                <Route path="/module-3/lesson-15" element={<ArrayCount15 />} />
                <Route path="/module-3/lesson-16" element={<Compose8Lesson16 />} />
                <Route path="/module-3/lesson-17" element={<CircularCount17 />} />
                <Route path="/module-3/lesson-18" element={<ArrangeCount18 />} />
                <Route path="/module-3/lesson-19" element={<Tally19 />} />
                <Route path="/module-3/lesson-20" element={<CountOut20 />} />
                <Route path="/module-3/lesson-21" element={<IntroduceZero21 />} />
                <Route path="/module-3/lesson-22" element={<Introduce9Lesson22 />} />
                <Route path="/module-3/lesson-23" element={<LinearCount9Lesson23 />} />
                <Route path="/module-3/lesson-24" element={<FingerCount24 />} />
                <Route path="/module-3/lesson-25" element={<ArrayCount25 />} />
                <Route path="/module-3/lesson-27" element={<CircularCount9Lesson27 />} />
                <Route path="/module-3/lesson-26" element={<Compose9Lesson26 />} />
                <Route path="/module-3/lesson-28" element={<ArrangeCount28 />} />
                <Route path="/module-3/lesson-29" element={<Tally9Lesson29 />} />
                <Route path="/activities/module-4" element={<Module4Index />} />
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
