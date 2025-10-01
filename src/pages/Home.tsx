import { ArrowRight, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto text-center mb-20 animate-fade-in">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            LookML AI Co-pilot
          </h1>
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Supercharge your LookML workflow with AI-powered dashboard generation and quality assurance
          </p>
        </div>

        {/* Mode Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* QA Dashboard Card */}
          <Card className="group relative overflow-hidden border-2 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
            <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4">QA Dashboard</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Analyze existing LookML code against best practices. Upload a file or paste a URL to receive comprehensive quality reports with AI-powered suggestions.
              </p>
              <Link to="/qa">
                <Button size="lg" className="w-full group/btn">
                  Start QA Analysis
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>

          {/* Generate Dashboard Card */}
          <Card className="group relative overflow-hidden border-2 hover:border-accent transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-card">
            <div className="absolute inset-0 bg-gradient-accent opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="p-8">
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-3xl font-bold mb-4">Generate Dashboard</h2>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Describe your dashboard in natural language and watch AI transform your requirements into production-ready LookML code and visualizations.
              </p>
              <Link to="/generate">
                <Button 
                  size="lg" 
                  className="w-full group/btn bg-accent hover:bg-accent/90 text-accent-foreground"
                >
                  Create with AI
                  <ArrowRight className="ml-2 w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 max-w-5xl mx-auto">
          <h3 className="text-2xl font-semibold text-center mb-12">Powered by Advanced AI</h3>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h4 className="font-semibold mb-2">Best Practice Analysis</h4>
              <p className="text-sm text-muted-foreground">
                AI-powered code review against LookML style guides
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold mb-2">Instant Generation</h4>
              <p className="text-sm text-muted-foreground">
                Transform natural language into production code
              </p>
            </div>
            <div className="animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💡</span>
              </div>
              <h4 className="font-semibold mb-2">Smart Insights</h4>
              <p className="text-sm text-muted-foreground">
                AI-driven data summaries and actionable recommendations
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
