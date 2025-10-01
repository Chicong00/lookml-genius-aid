import { useState } from "react";
import { Link2, Upload, ArrowLeft, CheckCircle2, XCircle, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const QA = () => {
  const [url, setUrl] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [code, setCode] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!url && !file && !code) {
      toast({
        title: "Input required",
        description: "Please provide a URL, upload a file, or paste code to analyze.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResults({
        passed: 7,
        failed: 3,
        warnings: 2,
        checks: [
          { name: "Naming Conventions", status: "pass", message: "All objects follow naming guidelines" },
          { name: "Data Types", status: "pass", message: "Appropriate data types used throughout" },
          { name: "Join Optimization", status: "fail", message: "Multiple joins could be optimized for performance" },
          { name: "Filter Usage", status: "warning", message: "Some filters could benefit from indexes" },
          { name: "Documentation", status: "pass", message: "Code is well documented" },
          { name: "SQL Injection Protection", status: "pass", message: "All inputs are properly sanitized" },
          { name: "Performance Metrics", status: "pass", message: "Query performance is within acceptable range" },
          { name: "Dimension Groups", status: "fail", message: "Missing dimension groups for time-based fields" },
          { name: "Derived Tables", status: "warning", message: "Consider using persistent derived tables" },
          { name: "Code Complexity", status: "fail", message: "Some views exceed complexity threshold" },
          { name: "Access Grants", status: "pass", message: "Access controls properly configured" },
          { name: "Model Organization", status: "pass", message: "Clean model structure maintained" },
        ]
      });
      setIsAnalyzing(false);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-success" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-destructive" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-warning" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pass":
        return "bg-success/10 border-success/20";
      case "fail":
        return "bg-destructive/10 border-destructive/20";
      case "warning":
        return "bg-warning/10 border-warning/20";
      default:
        return "";
    }
  };

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
            <h1 className="text-4xl font-bold mb-2">QA Dashboard</h1>
            <p className="text-muted-foreground">Analyze your LookML code for quality and best practices</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Input Source</h2>
            
            <Tabs defaultValue="url" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="url">URL</TabsTrigger>
                <TabsTrigger value="file">File Upload</TabsTrigger>
                <TabsTrigger value="paste">Paste Code</TabsTrigger>
              </TabsList>

              <TabsContent value="url" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="url">Dashboard URL</Label>
                  <div className="flex gap-2">
                    <Input
                      id="url"
                      placeholder="https://example.looker.com/dashboards/..."
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      className="flex-1"
                    />
                    <Button size="icon" variant="secondary">
                      <Link2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">Paste a Looker dashboard URL to analyze</p>
                </div>
              </TabsContent>

              <TabsContent value="file" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file">LookML File</Label>
                  <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                    <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
                    <input
                      id="file"
                      type="file"
                      accept=".lkml,.lookml"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <p className="text-sm font-medium mb-1">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </p>
                      <p className="text-xs text-muted-foreground">.lkml or .lookml files</p>
                    </label>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="paste" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code">LookML Code</Label>
                  <Textarea
                    id="code"
                    placeholder="Paste your LookML code here..."
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="font-mono text-sm min-h-[300px]"
                  />
                  <p className="text-sm text-muted-foreground">Paste your LookML code directly</p>
                </div>
              </TabsContent>
            </Tabs>

            <Button 
              onClick={handleAnalyze} 
              className="w-full mt-6"
              disabled={isAnalyzing}
              size="lg"
            >
              {isAnalyzing ? "Analyzing..." : "Run QA Analysis"}
            </Button>
          </Card>

          {/* Results Section */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Analysis Results</h2>
            
            {!results ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-8 h-8 text-primary" />
                </div>
                <p className="text-muted-foreground">Run an analysis to see results here</p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Summary Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <Card className="p-4 bg-success/10 border-success/20">
                    <div className="text-3xl font-bold text-success mb-1">{results.passed}</div>
                    <div className="text-sm text-success-foreground">Passed</div>
                  </Card>
                  <Card className="p-4 bg-destructive/10 border-destructive/20">
                    <div className="text-3xl font-bold text-destructive mb-1">{results.failed}</div>
                    <div className="text-sm text-destructive-foreground">Failed</div>
                  </Card>
                  <Card className="p-4 bg-warning/10 border-warning/20">
                    <div className="text-3xl font-bold text-warning mb-1">{results.warnings}</div>
                    <div className="text-sm text-warning-foreground">Warnings</div>
                  </Card>
                </div>

                {/* Detailed Checks */}
                <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                  {results.checks.map((check: any, index: number) => (
                    <Card 
                      key={index} 
                      className={`p-4 border ${getStatusColor(check.status)}`}
                    >
                      <div className="flex items-start gap-3">
                        {getStatusIcon(check.status)}
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium mb-1">{check.name}</h4>
                          <p className="text-sm text-muted-foreground">{check.message}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                <Button variant="outline" className="w-full">
                  View Detailed Report
                </Button>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QA;
