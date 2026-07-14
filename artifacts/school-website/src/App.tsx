import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import About from "@/pages/about";
import Academics from "@/pages/academics";
import Admissions from "@/pages/admissions";
import Gallery from "@/pages/gallery";
import Contact from "@/pages/contact";
import AdminAdmissions from "@/pages/admin-admissions";
import Layout from "@/components/layout";

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Switch>
        <Route path="/admin/admissions" component={AdminAdmissions} />
        <Route>
          <Layout>
            <Switch>
              <Route path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/academics" component={Academics} />
              <Route path="/admissions" component={Admissions} />
              <Route path="/gallery" component={Gallery} />
              <Route path="/contact" component={Contact} />
              <Route component={NotFound} />
            </Switch>
          </Layout>
        </Route>
      </Switch>
      <Toaster />
    </QueryClientProvider>
  );
}
