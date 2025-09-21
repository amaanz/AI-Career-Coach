import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, XCircle, Lightbulb, Target } from 'lucide-react';

interface ScoreResultsProps {
  score: number;
  matchedSkills: string[];
  missingSkills: string[];
  suggestions: string[];
  roleTitle: string;
}

export const ScoreResults = ({ 
  score, 
  matchedSkills, 
  missingSkills, 
  suggestions, 
  roleTitle 
}: ScoreResultsProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-success';
    if (score >= 60) return 'text-warning';
    return 'text-destructive';
  };

  const getScoreGrade = (score: number) => {
    if (score >= 90) return 'Excellent';
    if (score >= 80) return 'Very Good';
    if (score >= 70) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Needs Improvement';
  };

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="p-6 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-foreground">Resume Score</h2>
            <p className="text-muted-foreground">for {roleTitle}</p>
          </div>
          
          <div className="relative">
            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="text-lg text-muted-foreground mt-1">
              / 100
            </div>
          </div>
          
          <div className="space-y-2">
            <Progress value={score} className="h-3" />
            <p className={`font-semibold ${getScoreColor(score)}`}>
              {getScoreGrade(score)}
            </p>
          </div>
        </div>
      </Card>

      {/* Skills Analysis */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Matched Skills */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <CheckCircle className="h-5 w-5 text-success" />
            <h3 className="font-semibold text-foreground">Matched Skills</h3>
            <Badge variant="secondary">{matchedSkills.length}</Badge>
          </div>
          <div className="space-y-2">
            {matchedSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {matchedSkills.map((skill) => (
                  <Badge key={skill} className="bg-success/10 text-success border-success/20">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No skills matched</p>
            )}
          </div>
        </Card>

        {/* Missing Skills */}
        <Card className="p-4">
          <div className="flex items-center space-x-2 mb-3">
            <XCircle className="h-5 w-5 text-destructive" />
            <h3 className="font-semibold text-foreground">Missing Skills</h3>
            <Badge variant="secondary">{missingSkills.length}</Badge>
          </div>
          <div className="space-y-2">
            {missingSkills.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {missingSkills.map((skill) => (
                  <Badge key={skill} variant="outline" className="border-destructive/20 text-destructive">
                    {skill}
                  </Badge>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">All key skills present</p>
            )}
          </div>
        </Card>
      </div>

      {/* Improvement Suggestions */}
      <Card className="p-4">
        <div className="flex items-center space-x-2 mb-4">
          <Lightbulb className="h-5 w-5 text-warning" />
          <h3 className="font-semibold text-foreground">Improvement Suggestions</h3>
        </div>
        <div className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg">
              <div className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mt-0.5">
                {index + 1}
              </div>
              <p className="text-sm text-foreground flex-1">{suggestion}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Items */}
      <Card className="p-4 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <div className="flex items-center space-x-2 mb-3">
          <Target className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-foreground">Next Steps</h3>
        </div>
        <ul className="space-y-2 text-sm text-foreground">
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Update your resume with missing skills</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Quantify your achievements with metrics</span>
          </li>
          <li className="flex items-center space-x-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
            <span>Tailor keywords to match the role requirements</span>
          </li>
        </ul>
      </Card>
    </div>
  );
};