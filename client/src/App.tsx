import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Chat from "@/pages/chat";
import Optimization from "@/pages/optimization";
import Score from "@/pages/score";
import Dashboard from "@/pages/dashboard";
import Bookmarks from "@/pages/bookmarks";
import Profile from "@/pages/profile";
import Layout from "@/components/layout/sidebar";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/optimization" component={Optimization} />
        <Route path="/score" component={Score} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/bookmarks" component={Bookmarks} />
        <Route path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
