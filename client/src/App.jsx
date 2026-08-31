import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import NotFound from "@/pages/not-found";
import Landing from "@/pages/Landing";
import Auth from "@/pages/Auth";
import ProfileSetup from "@/pages/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import Explore from "@/pages/Explore";
import Chat from "@/pages/Chat";
import Meets from "@/pages/Meets";
import AIMatches from "@/pages/AIMatches";
import Learning from "@/pages/Learning";
import Skills from "./pages/Skills";
import Notifications from "./pages/Notifications";
import Settings from "./pages/Settings";
import ViewProfile from "./pages/ViewProfile";
import Help from "./pages/Help";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Landing} />

      <Route path="/auth" component={Auth} />

      <Route path="/profile-setup" component={ProfileSetup} />

      <Route path="/dashboard" component={Dashboard} />

      <Route path="/explore" component={Explore} />

      <Route path="/ai-matches" component={AIMatches} />

      <Route path="/chat" component={Chat} />

      <Route path="/meets" component={Meets} />

      <Route path="/learning" component={Learning} />

      <Route path="/skills" component={Skills} />

      <Route path="/Notifications" component={Notifications}/>

      <Route path="/settings" component={Settings}/>

      <Route path="/profile/:id" component={ViewProfile}/>

      <Route path="/help" component={Help}/>


      {/* ALWAYS KEEP THIS LAST */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;