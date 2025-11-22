import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Upload, Video, Camera, Sparkles, CheckCircle2, X } from 'lucide-react';

const PremiumSignup = () => {
  const [step, setStep] = useState<'features' | 'upload' | 'preview' | 'complete'>('features');
  const [studentName, setStudentName] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [uploadType, setUploadType] = useState<'photo' | 'video' | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleRemoveFile = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setUploadedFile(null);
    setPreviewUrl(null);
  };

  const handleSubmit = () => {
  // Save premium status and student name
  localStorage.setItem('ethiostem-premium', 'true');
  localStorage.setItem('ethiostem-student-name', studentName);
  
  // Save the photo as base64
  if (uploadedFile && uploadType === 'photo') {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      localStorage.setItem('ethiostem-student-photo', base64String);
      setStep('complete');
    };
    reader.readAsDataURL(uploadedFile);
  } else {
    setStep('complete');
  }
};

  if (step === 'features') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <a href="/">
              <Button variant="outline" size="icon">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </a>
            <div>
              <h1 className="text-2xl font-bold text-foreground">EthioSTEM Premium</h1>
              <p className="text-sm text-muted-foreground">Unlock your child's personalized AI study companion</p>
            </div>
          </div>

          {/* Hero Section */}
          <Card className="mb-8 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-secondary/5">
            <CardContent className="pt-8 text-center">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-4 text-foreground">Meet Your Child's AI Study Companion</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                A personalized AI buddy created from your child's photo or video that learns alongside them,
                provides encouragement, and makes learning more engaging
              </p>
            </CardContent>
          </Card>

          {/* Feature Comparison */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Free Version */}
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-2xl">Free Version</CardTitle>
                <CardDescription>Always available</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Access to all 14 lessons</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Interactive games and activities</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Basic progress tracking</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Parent guide resources</span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-sm">Standard feedback messages</span>
                </div>
              </CardContent>
            </Card>

            {/* Premium Version */}
            <Card className="border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl flex items-center gap-2">
                      Premium
                      <span className="text-sm font-normal text-primary bg-primary/10 px-3 py-1 rounded-full">
                        Coming Soon
                      </span>
                    </CardTitle>
                    <CardDescription>Personalized learning experience</CardDescription>
                  </div>
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <span className="text-sm font-semibold">Everything in Free, plus:</span>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-sm font-semibold block">AI Study Companion</span>
                    <span className="text-xs text-muted-foreground">Created from your child's photo/video</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-sm font-semibold block">Personalized Encouragement</span>
                    <span className="text-xs text-muted-foreground">Customized praise and motivation</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-sm font-semibold block">Adaptive Corrections</span>
                    <span className="text-xs text-muted-foreground">Gentle, personalized feedback</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-sm font-semibold block">Focus & Discipline Modeling</span>
                    <span className="text-xs text-muted-foreground">Teaches good study habits</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <span className="text-sm font-semibold block">Advanced Progress Reports</span>
                    <span className="text-xs text-muted-foreground">Detailed insights and recommendations</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">How Your AI Study Companion Works</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Camera className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">1. Upload Photo/Video</h3>
                  <p className="text-sm text-muted-foreground">
                    Share your child's photo or short video to create their personalized AI companion
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">2. AI Creates Companion</h3>
                  <p className="text-sm text-muted-foreground">
                    Our AI technology creates a friendly study buddy that looks like your child
                  </p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-bold mb-2">3. Learn Together</h3>
                  <p className="text-sm text-muted-foreground">
                    The companion appears in lessons, providing encouragement and personalized support
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Safety */}
          <Card className="mb-8 bg-green-50 border-2 border-green-200">
            <CardHeader>
              <CardTitle className="text-xl">🔒 Privacy & Safety First</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>• Photos and videos are encrypted and stored securely</p>
              <p>• Only used to create your child's AI companion</p>
              <p>• Never shared with third parties</p>
              <p>• Can be deleted at any time</p>
              <p>• Full compliance with children's privacy regulations</p>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-primary to-secondary text-white border-0">
            <CardContent className="text-center py-12">
              <h3 className="text-3xl font-bold mb-4">Join the Waitlist</h3>
              <p className="text-xl mb-6 text-primary-foreground/80">
                Be the first to know when Premium launches
              </p>
              <Button 
                onClick={() => setStep('upload')}
                size="lg"
                className="bg-background text-foreground hover:bg-background/90 text-lg px-8 py-6"
              >
                Get Started
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'upload') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={() => setStep('features')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Create AI Study Companion</h1>
              <p className="text-sm text-muted-foreground">Step 1: Upload student information</p>
            </div>
          </div>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <CardTitle>Student Information</CardTitle>
              <CardDescription>Tell us about the student and upload their photo or video</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Name */}
              <div>
                <label className="block text-sm font-semibold mb-2">Student's Name</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder="Enter student's first name"
                  className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                />
              </div>

              {/* Parent Email */}
              <div>
                <label className="block text-sm font-semibold mb-2">Parent/Guardian Email</label>
                <input
                  type="email"
                  value={parentEmail}
                  onChange={(e) => setParentEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full p-3 border-2 border-border rounded-lg focus:border-primary focus:outline-none"
                />
                <p className="text-xs text-muted-foreground mt-1">
                  We'll notify you when Premium launches
                </p>
              </div>

              {/* Upload Type Selection */}
              <div>
                <label className="block text-sm font-semibold mb-3">Choose Upload Type</label>
                <div className="grid md:grid-cols-2 gap-4">
                  <Card 
                    className={`cursor-pointer transition-all border-2 ${
                      uploadType === 'photo' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setUploadType('photo')}
                  >
                    <CardContent className="pt-6 text-center">
                      <Camera className="w-12 h-12 mx-auto mb-3 text-primary" />
                      <h3 className="font-bold mb-2">Photo</h3>
                      <p className="text-sm text-muted-foreground">Upload a clear photo of the student's face</p>
                    </CardContent>
                  </Card>
                  <Card 
                    className={`cursor-pointer transition-all border-2 ${
                      uploadType === 'video' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setUploadType('video')}
                  >
                    <CardContent className="pt-6 text-center">
                      <Video className="w-12 h-12 mx-auto mb-3 text-primary" />
                      <h3 className="font-bold mb-2">Video</h3>
                      <p className="text-sm text-muted-foreground">Upload a 5-10 second video (recommended)</p>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* File Upload */}
              {uploadType && (
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Upload {uploadType === 'photo' ? 'Photo' : 'Video'}
                  </label>
                  
                  {!uploadedFile ? (
                    <div className="border-2 border-dashed border-primary/50 rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <input
                        type="file"
                        accept={uploadType === 'photo' ? 'image/*' : 'video/*'}
                        onChange={handleFileUpload}
                        className="hidden"
                        id="file-upload"
                      />
                      <label htmlFor="file-upload" className="cursor-pointer">
                        <Upload className="w-12 h-12 mx-auto mb-3 text-primary" />
                        <p className="font-semibold mb-2">Click to upload {uploadType}</p>
                        <p className="text-sm text-muted-foreground">
                          {uploadType === 'photo' ? 'PNG, JPG up to 10MB' : 'MP4, MOV up to 50MB, 5-10 seconds'}
                        </p>
                      </label>
                    </div>
                  ) : (
                    <div className="border-2 border-primary rounded-lg p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          {uploadType === 'photo' ? (
                            <Camera className="w-8 h-8 text-primary" />
                          ) : (
                            <Video className="w-8 h-8 text-primary" />
                          )}
                          <div>
                            <p className="font-semibold">{uploadedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={handleRemoveFile}>
                          <X className="w-5 h-5" />
                        </Button>
                      </div>
                      
                      {previewUrl && (
                        <div className="bg-muted rounded-lg overflow-hidden">
                          {uploadType === 'photo' ? (
                            <img src={previewUrl} alt="Preview" className="w-full h-64 object-cover" />
                          ) : (
                            <video src={previewUrl} controls className="w-full h-64 object-cover" />
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Guidelines */}
              <Card className="bg-blue-50 border-2 border-blue-200">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-3">📸 Upload Guidelines</h3>
                  <ul className="text-sm space-y-2 text-muted-foreground">
                    <li>• Face should be clearly visible and well-lit</li>
                    <li>• Student should be looking at the camera</li>
                    <li>• Neutral or happy expression works best</li>
                    <li>• For video: have student say their name or smile</li>
                    <li>• No filters or heavy editing</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Submit Button */}
              <Button
                onClick={() => setStep('preview')}
                disabled={!studentName || !parentEmail || !uploadedFile}
                size="lg"
                className="w-full"
              >
                Continue to Preview
                <Sparkles className="w-5 h-5 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'preview') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button variant="outline" size="icon" onClick={() => setStep('upload')}>
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Review & Submit</h1>
              <p className="text-sm text-muted-foreground">Step 2: Confirm your information</p>
            </div>
          </div>

          <Card className="border-2 border-primary/20 mb-6">
            <CardHeader>
              <CardTitle>Preview Your Submission</CardTitle>
              <CardDescription>Review the information before joining the waitlist</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Student Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">Student Name</label>
                  <p className="text-lg font-semibold">{studentName}</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2 text-muted-foreground">Parent Email</label>
                  <p className="text-lg font-semibold">{parentEmail}</p>
                </div>
              </div>

              {/* Preview */}
              <div>
                <label className="block text-sm font-semibold mb-3 text-muted-foreground">
                  Uploaded {uploadType === 'photo' ? 'Photo' : 'Video'}
                </label>
                {previewUrl && (
                  <div className="bg-muted rounded-lg overflow-hidden border-2 border-border">
                    {uploadType === 'photo' ? (
                      <img src={previewUrl} alt="Student" className="w-full h-96 object-cover" />
                    ) : (
                      <video src={previewUrl} controls className="w-full h-96 object-cover" />
                    )}
                  </div>
                )}
              </div>

              {/* What Happens Next */}
              <Card className="bg-green-50 border-2 border-green-200">
                <CardContent className="pt-6">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    What Happens Next
                  </h3>
                  <ul className="text-sm space-y-2">
                    <li>✅ Your information is securely stored</li>
                    <li>✅ You'll join our Premium waitlist</li>
                    <li>✅ We'll email you when Premium launches</li>
                    <li>✅ Your AI companion will be ready to activate</li>
                  </ul>
                </CardContent>
              </Card>

              {/* Consent */}
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" required />
                  <span className="text-sm">
                    I consent to EthioSTEM using this photo/video to create an AI study companion for my child.
                    I understand the data will be encrypted, stored securely, and only used for this purpose.
                    I can request deletion at any time.
                  </span>
                </label>
              </div>

              {/* Submit */}
              <div className="flex gap-4">
                <Button
                  variant="outline"
                  onClick={() => setStep('upload')}
                  size="lg"
                  className="flex-1"
                >
                  Go Back
                </Button>
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  className="flex-1 bg-primary hover:bg-primary/90"
                >
                  Join Waitlist
                  <Sparkles className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (step === 'complete') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-muted p-4">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-green-200 bg-green-50">
            <CardContent className="pt-12 pb-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>
              
              <h1 className="text-4xl font-bold mb-4 text-foreground">Welcome to the Waitlist!</h1>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Thank you for signing up, {studentName}! We're excited to create your personalized AI study companion.
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-3xl mx-auto mb-8">
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl mb-2">📧</div>
                    <h3 className="font-bold mb-2">Check Your Email</h3>
                    <p className="text-sm text-muted-foreground">
                      We sent a confirmation to {parentEmail}
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl mb-2">🔒</div>
                    <h3 className="font-bold mb-2">Data Secured</h3>
                    <p className="text-sm text-muted-foreground">
                      Your files are encrypted and safely stored
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="text-3xl mb-2">⏰</div>
                    <h3 className="font-bold mb-2">Stay Tuned</h3>
                    <p className="text-sm text-muted-foreground">
                      We'll notify you when Premium launches
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">
                  In the meantime, enjoy all our free lessons!
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="/activities">
                    <Button size="lg" className="bg-primary hover:bg-primary/90">
                      Start Learning
                    </Button>
                  </a>
                  <a href="/">
                    <Button size="lg" variant="outline">
                      Back to Home
                    </Button>
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return null;
};

export default PremiumSignup;
