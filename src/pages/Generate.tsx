import { useState } from "react";
import { ArrowLeft, Code2, Eye, Sparkles, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

const Generate = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [showingInsights, setShowingInsights] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast({
        title: "Prompt required",
        description: "Please describe the dashboard you want to create.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    // Simulate generation
    setTimeout(() => {
      setIsGenerating(false);
      setHasGenerated(true);
      toast({
        title: "Dashboard generated!",
        description: "Your LookML dashboard has been created successfully.",
      });
    }, 3000);
  };

  const handleGetInsights = () => {
    setShowingInsights(true);
    toast({
      title: "AI Insights",
      description: "Analyzing dashboard data and generating insights...",
    });
    
    // Simulate insights generation
    setTimeout(() => {
      toast({
        title: "Insights Ready",
        description: "Revenue shows strong growth in Electronics category. Consider adding trend analysis for seasonal patterns.",
      });
      setShowingInsights(false);
    }, 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(sampleCode);
    toast({
      title: "Code copied!",
      description: "LookML code has been copied to your clipboard.",
    });
  };

  const sampleCode = `dashboard: sales_overview {
  title: "Sales Overview Dashboard"
  layout: newspaper
  
  elements: [
    {
      name: "Total Revenue"
      type: single_value
      query: {
        dimensions: []
        measures: [orders.total_revenue]
        filters: {
          orders.created_date: "30 days"
        }
      }
    },
    {
      name: "Revenue by Category"
      type: looker_column
      query: {
        dimensions: [products.category]
        measures: [orders.total_revenue]
        sorts: [orders.total_revenue: desc]
        limit: 10
      }
    },
    {
      name: "Top Products"
      type: looker_grid
      query: {
        dimensions: [products.name]
        measures: [orders.count, orders.total_revenue]
        sorts: [orders.total_revenue: desc]
        limit: 20
      }
    }
  ]
}`;

  return (
    <div className="min-h-screen bg-gradient-subtle">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 flex items-center gap-4">
          <Link to="/">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-4xl font-bold mb-2">Generate Dashboard</h1>
            <p className="text-muted-foreground">Describe your dashboard and let AI create it for you</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Your Requirements</h2>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="prompt">Dashboard Description</Label>
                <Textarea
                  id="prompt"
                  placeholder="Example: Create a sales dashboard showing total revenue, revenue by product category, and a list of top 20 products by sales. Include filters for date range and product category. Use a clean, professional layout with the revenue metric prominent at the top..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[300px] text-sm"
                />
                <p className="text-sm text-muted-foreground">
                  Be specific about metrics, dimensions, filters, and layout preferences
                </p>
              </div>

              <div className="rounded-lg bg-muted/50 p-4 border border-border">
                <h3 className="font-medium mb-2 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-accent" />
                  Tips for better results
                </h3>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Specify the metrics you want to track</li>
                  <li>• Mention any filters or date ranges</li>
                  <li>• Describe the visual layout you prefer</li>
                  <li>• Include any specific data sources or tables</li>
                </ul>
              </div>

              <Button 
                onClick={handleGenerate} 
                className="w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                disabled={isGenerating}
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Generating Dashboard...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 mr-2" />
                    Generate Dashboard
                  </>
                )}
              </Button>
            </div>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Generated Dashboard</h2>
            
            {!hasGenerated ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-accent" />
                </div>
                <p className="text-muted-foreground">Your generated dashboard will appear here</p>
              </div>
            ) : (
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="preview">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </TabsTrigger>
                  <TabsTrigger value="code">
                    <Code2 className="w-4 h-4 mr-2" />
                    Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="preview" className="space-y-4">
                  <div className="space-y-4">
                    {/* Mock Dashboard Preview */}
                    <Card className="p-6 bg-gradient-subtle border-2">
                      <h3 className="text-xl font-semibold mb-4">Sales Overview Dashboard</h3>
                      <div className="grid gap-4">
                        <Card className="p-4 bg-card">
                          <div className="text-sm text-muted-foreground mb-1">Total Revenue</div>
                          <div className="text-3xl font-bold text-primary">$1,234,567</div>
                          <div className="text-sm text-success flex items-center gap-1 mt-1">
                            <TrendingUp className="w-3 h-3" />
                            +12.5% vs last period
                          </div>
                        </Card>
                        <Card className="p-4 bg-card">
                          <div className="text-sm font-medium mb-3">Revenue by Category</div>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Electronics</span>
                              <span className="text-sm font-medium">$450K</span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2">
                              <div className="bg-primary h-2 rounded-full" style={{ width: '75%' }}></div>
                            </div>
                          </div>
                        </Card>
                        <Card className="p-4 bg-card">
                          <div className="text-sm font-medium mb-3">Top Products</div>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span>Product A</span>
                              <span className="font-medium">$125K</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Product B</span>
                              <span className="font-medium">$98K</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Product C</span>
                              <span className="font-medium">$87K</span>
                            </div>
                          </div>
                        </Card>
                      </div>
                    </Card>

                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={handleGetInsights}
                      disabled={showingInsights}
                    >
                      <Sparkles className="w-4 h-4 mr-2" />
                      {showingInsights ? "Analyzing..." : "Get AI Insights"}
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="code" className="space-y-4">
                  <Card className="p-4 bg-muted">
                    <pre className="text-xs overflow-x-auto">
                      <code>{sampleCode}</code>
                    </pre>
                  </Card>
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={handleCopyCode}
                  >
                    Copy Code
                  </Button>
                </TabsContent>
              </Tabs>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Generate;
