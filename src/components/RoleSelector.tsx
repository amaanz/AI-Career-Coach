import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface RoleSelectorProps {
  selectedRole: string;
  onRoleSelect: (role: string) => void;
}

const roles = [
  {
    value: 'software-engineer',
    label: 'Software Engineer',
    skills: ['JavaScript', 'React', 'Python', 'Git', 'APIs'],
    description: 'Full-stack development, algorithms, system design'
  },
  {
    value: 'data-scientist',
    label: 'Data Scientist',
    skills: ['Python', 'SQL', 'Machine Learning', 'Statistics', 'Visualization'],
    description: 'Analytics, modeling, statistical analysis'
  },
  {
    value: 'product-manager',
    label: 'Product Manager',
    skills: ['Strategy', 'Analytics', 'Roadmapping', 'Stakeholder Management', 'Agile'],
    description: 'Product strategy, roadmap planning, user research'
  },
  {
    value: 'data-analyst',
    label: 'Data Analyst',
    skills: ['SQL', 'Excel', 'Tableau', 'Statistics', 'Business Intelligence'],
    description: 'Data interpretation, reporting, business insights'
  },
  {
    value: 'frontend-developer',
    label: 'Frontend Developer',
    skills: ['HTML/CSS', 'JavaScript', 'React', 'UI/UX', 'Responsive Design'],
    description: 'User interfaces, web development, user experience'
  },
  {
    value: 'backend-developer',
    label: 'Backend Developer',
    skills: ['APIs', 'Databases', 'Server Architecture', 'Security', 'Performance'],
    description: 'Server-side logic, databases, system architecture'
  }
];

export const RoleSelector = ({ selectedRole, onRoleSelect }: RoleSelectorProps) => {
  const selectedRoleData = roles.find(role => role.value === selectedRole);

  return (
    <div className="space-y-4">
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">
          Target Role
        </label>
        <Select value={selectedRole} onValueChange={onRoleSelect}>
          <SelectTrigger className="w-full bg-background border-border">
            <SelectValue placeholder="Select the role you're targeting" />
          </SelectTrigger>
          <SelectContent className="bg-popover border-border">
            {roles.map((role) => (
              <SelectItem key={role.value} value={role.value} className="hover:bg-muted">
                <div className="flex flex-col items-start">
                  <span className="font-medium">{role.label}</span>
                  <span className="text-xs text-muted-foreground">{role.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {selectedRoleData && (
        <Card className="p-4 bg-gradient-to-br from-card to-secondary/20 border-primary/20">
          <h4 className="font-semibold text-foreground mb-2">{selectedRoleData.label}</h4>
          <p className="text-sm text-muted-foreground mb-3">{selectedRoleData.description}</p>
          <div className="space-y-2">
            <span className="text-xs font-medium text-muted-foreground">Key Skills:</span>
            <div className="flex flex-wrap gap-1">
              {selectedRoleData.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-xs">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};