import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, AlertCircle, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface QAReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  results: {
    passed: number;
    failed: number;
    warnings: number;
    checks: Array<{
      name: string;
      status: string;
      message: string;
      category?: string;
      recommendation?: string;
      codeExample?: string;
    }>;
  };
}

const QAReportDialog = ({ open, onOpenChange, results }: QAReportDialogProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pass":
        return <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))]" />;
      case "fail":
        return <XCircle className="w-5 h-5 text-[hsl(var(--destructive))]" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-[hsl(var(--warning))]" />;
      default:
        return null;
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: string } = {
      pass: "bg-[hsl(var(--success))]/15 text-[hsl(var(--success))] border-[hsl(var(--success))]/30",
      fail: "bg-[hsl(var(--destructive))]/15 text-[hsl(var(--destructive))] border-[hsl(var(--destructive))]/30",
      warning: "bg-[hsl(var(--warning))]/15 text-[hsl(var(--warning))] border-[hsl(var(--warning))]/30"
    };
    return variants[status] || "";
  };

  const handleExportReport = () => {
    const reportContent = `
LookML QA Analysis Report
Generated: ${new Date().toLocaleString()}

Summary:
- Passed: ${results.passed}
- Failed: ${results.failed}
- Warnings: ${results.warnings}
- Total Checks: ${results.checks.length}

Detailed Results:
${results.checks.map((check, index) => `
${index + 1}. ${check.name}
   Status: ${check.status.toUpperCase()}
   Message: ${check.message}
   ${check.recommendation ? `Recommendation: ${check.recommendation}` : ''}
`).join('\n')}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `qa-report-${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <FileText className="w-6 h-6" />
            Detailed QA Report
          </DialogTitle>
          <DialogDescription>
            Comprehensive analysis results with recommendations and best practices
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="p-4 bg-[hsl(var(--success))]/15 border-[hsl(var(--success))]/30">
              <div className="text-2xl font-bold text-[hsl(var(--success))] mb-1">{results.passed}</div>
              <div className="text-sm font-medium text-[hsl(var(--success))]">Passed</div>
            </Card>
            <Card className="p-4 bg-[hsl(var(--destructive))]/15 border-[hsl(var(--destructive))]/30">
              <div className="text-2xl font-bold text-[hsl(var(--destructive))] mb-1">{results.failed}</div>
              <div className="text-sm font-medium text-[hsl(var(--destructive))]">Failed</div>
            </Card>
            <Card className="p-4 bg-[hsl(var(--warning))]/15 border-[hsl(var(--warning))]/30">
              <div className="text-2xl font-bold text-[hsl(var(--warning))] mb-1">{results.warnings}</div>
              <div className="text-sm font-medium text-[hsl(var(--warning))]">Warnings</div>
            </Card>
          </div>

          <Separator />

          {/* Detailed Checks */}
          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-4">
              {results.checks.map((check, index) => (
                <Card key={index} className="p-4">
                  <div className="flex items-start gap-3 mb-3">
                    {getStatusIcon(check.status)}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{check.name}</h4>
                        <Badge variant="outline" className={getStatusBadge(check.status)}>
                          {check.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{check.message}</p>
                    </div>
                  </div>

                  {(check.status === "fail" || check.status === "warning") && (
                    <div className="ml-8 mt-3 space-y-2 p-3 rounded-lg bg-muted/50">
                      <p className="text-sm font-medium">Recommendation:</p>
                      <p className="text-sm text-muted-foreground">
                        {check.recommendation || "Review this section and apply LookML best practices. Consider consulting the official documentation for specific guidance."}
                      </p>
                      {check.codeExample && (
                        <div className="mt-2">
                          <p className="text-sm font-medium mb-1">Example:</p>
                          <pre className="text-xs bg-background p-2 rounded border overflow-x-auto">
                            <code>{check.codeExample}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          </ScrollArea>

          {/* Export Button */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={handleExportReport}>
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QAReportDialog;
