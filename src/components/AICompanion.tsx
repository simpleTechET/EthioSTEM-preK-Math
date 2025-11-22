import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Sparkles } from 'lucide-react';

interface AICompanionProps {
  studentName: string;
  studentPhoto?: string;
  context: string;
  type: 'encouragement' | 'correction' | 'celebration' | 'focus';
  show: boolean;
  onClose?: () => void;
}

const AICompanion = ({ studentName, studentPhoto, context, type, show, onClose }: AICompanionProps) => {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (show && context) {
      fetchMessage();
    }
  }, [show, context, type]);

  const fetchMessage = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://ethio-stem-pre-k-math.vercel.app/api/companion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          studentName,
          context,
          type
        })
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.error('AI Companion error:', error);
      setMessage(`Keep going, ${studentName}!`);
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4">
      <Card className="max-w-sm border-2 border-primary bg-gradient-to-br from-primary/5 to-secondary/5 shadow-xl">
        <div className="p-4">
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              {studentPhoto ? (
                <img 
                  src={studentPhoto} 
                  alt={studentName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
              )}
            </div>

            {/* Message */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-sm text-primary">Your Study Buddy</span>
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              
              {loading ? (
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              ) : (
                <p className="text-sm text-foreground">{message}</p>
              )}
            </div>

            {/* Close button */}
            {onClose && (
              <button 
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
              >
                ×
              </button>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AICompanion;
