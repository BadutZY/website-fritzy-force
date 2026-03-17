import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import News from "./pages/News";
import NewsFreebies from "./pages/NewsFreebies";
import NewsBirthday from "./pages/NewsBirthday";
import Gallery from "./pages/Gallery";
import Timeline from "./pages/Timeline";
import Schedule from "./pages/Schedule";
import LiveStatus from "./pages/LiveStatus";
import VideoCallSchedule from "./pages/VideoCallSchedule";
import Calendar from "./pages/Calendar";
import Merchandise from "./pages/Merchandise";
import Birthdaytshirt from "./pages/Birthdaytshirt";
import Setlist from "./pages/Setlist";
import Playlist from "./pages/Playlist";
import AboutUs from "./pages/AboutUs";
import OrganizationStructure from "./pages/OrganizationStructure";
import Filosofy from "./pages/Filosofy";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/news" element={<News />} />
            <Route path="/news/freebies-sister-reunion" element={<NewsFreebies />} />
            <Route path="/news/project-ultah-erine-18" element={<NewsBirthday />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/timeline" element={<Timeline />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/live-status" element={<LiveStatus />} />
            <Route path="/video-call-schedule" element={<VideoCallSchedule />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/merchandise" element={<Merchandise />} />
            <Route path="/birthday-tshirt" element={<Birthdaytshirt />} />
            <Route path="/setlist" element={<Setlist />} />
            <Route path="/playlist" element={<Playlist />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/organization-structure" element={<OrganizationStructure />} />
            <Route path="/filosofy" element={<Filosofy />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
