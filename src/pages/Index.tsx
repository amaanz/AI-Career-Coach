import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileUpload } from '@/components/FileUpload';
import { RoleSelector } from '@/components/RoleSelector';
import { ScoreResults } from '@/components/ScoreResults';
import { BarChart3, Zap, Shield, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);
  const { toast } = useToast();

  const handleAnalyze = async () => {
    if (!selectedFile || !selectedRole) {
      toast({
        title: "Missing information",
        description: "Please upload a resume and select a target role.",
        variant: "destructive",
      });
      return;
    }

    setIsAnalyzing(true);
    
    // Simulate AI analysis - in real implementation, this would call your backend
    setTimeout(() => {
      const mockResults = {
        score: Math.floor(Math.random() * 40) + 60, // Random score between 60-100
        matchedSkills: ['JavaScript', 'React', 'Problem Solving', 'Team Collaboration'],
        missingSkills: ['Python', 'System Design', 'Docker', 'AWS'],
        suggestions: [
          'Add specific metrics to quantify your achievements (e.g., "Improved performance by 30%")',
          'Include relevant technical skills that match the job requirements',
          'Strengthen your experience section with more action verbs and concrete results'
        ]
      };
      
      setResults(mockResults);
      setIsAnalyzing(false);
      
      toast({
        title: "Analysis complete!",
        description: "Your resume has been scored and analyzed.",
      });
    }, 3000);
  };

  const handleReset = () => {
    setSelectedFile(null);
    setSelectedRole('');
    setResults(null);
  };

  const getRoleDisplayName = (roleValue: string) => {
    const roleMap: { [key: string]: string } = {
      'software-engineer': 'Software Engineer',
      'data-scientist': 'Data Scientist',
      'product-manager': 'Product Manager',
      'data-analyst': 'Data Analyst',
      'frontend-developer': 'Frontend Developer',
      'backend-developer': 'Backend Developer',
    };
    return roleMap[roleValue] || roleValue;
  };

  if (results) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-6">
            <div className="text-center space-y-4">
              <h1 className="text-3xl font-bold text-foreground">Resume Analysis Results</h1>
              <Button onClick={handleReset} variant="outline">
                Analyze Another Resume
              </Button>
            </div>
            
            <ScoreResults 
              score={results.score}
              matchedSkills={results.matchedSkills}
              missingSkills={results.missingSkills}
              suggestions={results.suggestions}
              roleTitle={getRoleDisplayName(selectedRole)}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/30 to-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  AI-Powered Resume 
                  <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent"> Analysis</span>
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Get instant feedback on how well your resume matches your target role. 
                  Powered by advanced AI to help you land your dream job.
                </p>
              </div>
              
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Instant Analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Detailed Scoring</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium">Secure & Private</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Resume analysis illustration" 
                className="rounded-2xl shadow-soft"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold text-foreground">Analyze Your Resume</h2>
              <p className="text-muted-foreground">
                Upload your resume and select your target role to get started
              </p>
            </div>
            
            <Card className="p-8 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
              <div className="space-y-6">
                <FileUpload 
                  onFileSelect={setSelectedFile}
                  selectedFile={selectedFile}
                  onRemoveFile={() => setSelectedFile(null)}
                />
                
                <RoleSelector 
                  selectedRole={selectedRole}
                  onRoleSelect={setSelectedRole}
                />
                
                <Button 
                  onClick={handleAnalyze}
                  disabled={!selectedFile || !selectedRole || isAnalyzing}
                  className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 transition-opacity"
                  size="lg"
                >
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-foreground mr-2"></div>
                      Analyzing Resume...
                    </>
                  ) : (
                    <>
                      Analyze Resume
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
