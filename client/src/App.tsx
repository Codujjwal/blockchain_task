import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Send from "@/pages/send";
import Receive from "@/pages/receive";
import Login from "@/pages/login";
import { UserContextProvider } from "@/contexts/user-context";

function Router() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Home} />
      <Route path="/send" component={Send} />
      <Route path="/receive" component={Receive} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <Router />
        <Toaster />
      </UserContextProvider>
    </QueryClientProvider>
  );
}

export default App;