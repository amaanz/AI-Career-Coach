import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { FileText, Upload, Trash2, Eye, Download } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface Profile {
  full_name: string;
  email: string;
  bio: string;
  target_role: string;
  experience_level: string;
}

interface CVScore {
  id: string;
  file_name: string;
  role_type: string;
  score: number;
  created_at: string;
}

const Profile = () => {
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [profile, setProfile] = useState<Profile>({
    full_name: '',
    email: '',
    bio: '',
    target_role: '',
    experience_level: ''
  });
  const [cvScores, setCvScores] = useState<CVScore[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }
    fetchProfile();
    fetchCVScores();
  }, [user, navigate]);

  const fetchProfile = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', user.id)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return;
    }

    if (data) {
      setProfile({
        full_name: data.full_name || '',
        email: data.email || user.email || '',
        bio: data.bio || '',
        target_role: data.target_role || '',
        experience_level: data.experience_level || ''
      });
    }
  };

  const fetchCVScores = async () => {
    if (!user) return;
    
    const { data, error } = await supabase
      .from('cv_scores')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching CV scores:', error);
      return;
    }

    setCvScores(data || []);
  };

  const updateProfile = async () => {
    if (!user) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user.id,
        full_name: profile.full_name,
        email: profile.email,
        bio: profile.bio,
        target_role: profile.target_role,
        experience_level: profile.experience_level,
      });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Profile updated successfully!",
      });
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/auth');
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'bg-green-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-secondary/20 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Profile Dashboard
          </h1>
          <Button variant="outline" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile">Profile Settings</TabsTrigger>
            <TabsTrigger value="cvs">CV History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar className="h-20 w-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="text-lg">
                      {getInitials(profile.full_name || user.email || 'U')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>
                      Update your profile information and preferences
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="full-name">Full Name</Label>
                    <Input
                      id="full-name"
                      value={profile.full_name}
                      onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="target-role">Target Role</Label>
                    <Select
                      value={profile.target_role}
                      onValueChange={(value) => setProfile({ ...profile, target_role: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your target role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Software Engineer">Software Engineer</SelectItem>
                        <SelectItem value="Data Scientist">Data Scientist</SelectItem>
                        <SelectItem value="Product Manager">Product Manager</SelectItem>
                        <SelectItem value="Designer">Designer</SelectItem>
                        <SelectItem value="Marketing Manager">Marketing Manager</SelectItem>
                        <SelectItem value="Sales Representative">Sales Representative</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience-level">Experience Level</Label>
                    <Select
                      value={profile.experience_level}
                      onValueChange={(value) => setProfile({ ...profile, experience_level: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select your experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Entry Level">Entry Level (0-2 years)</SelectItem>
                        <SelectItem value="Mid Level">Mid Level (3-5 years)</SelectItem>
                        <SelectItem value="Senior Level">Senior Level (6-10 years)</SelectItem>
                        <SelectItem value="Executive Level">Executive Level (10+ years)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself..."
                    rows={4}
                  />
                </div>
                <Button onClick={updateProfile} disabled={loading} className="w-full">
                  {loading ? 'Updating...' : 'Update Profile'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cvs" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  CV Analysis History
                </CardTitle>
                <CardDescription>
                  View your past CV submissions and scores
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cvScores.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No CV analyses yet</p>
                    <Button 
                      variant="outline" 
                      className="mt-4"
                      onClick={() => navigate('/')}
                    >
                      Upload Your First CV
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cvScores.map((score) => (
                      <div key={score.id} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <FileText className="h-5 w-5 text-muted-foreground" />
                            <div>
                              <p className="font-medium">{score.file_name}</p>
                              <p className="text-sm text-muted-foreground">
                                {new Date(score.created_at).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <Badge variant="secondary">{score.role_type}</Badge>
                            <div className="flex items-center space-x-2">
                              <div className={`w-3 h-3 rounded-full ${getScoreColor(score.score)}`} />
                              <span className="font-bold">{score.score}%</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Profile;