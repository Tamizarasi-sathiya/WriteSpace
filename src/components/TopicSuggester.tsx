'use client';

import { useState } from 'react';
import { suggestRelevantTopics } from '@/ai/flows/suggest-relevant-topics';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card';
import { Lightbulb, Loader2, Wand2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export default function TopicSuggester() {
  const [keywords, setKeywords] = useState('');
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!keywords.trim()) {
        setError('Please enter some keywords or interests.');
        return;
    }
    setLoading(true);
    setError(null);
    setTopics([]);

    try {
      const result = await suggestRelevantTopics({ keywords });
      setTopics(result.topics);
    } catch (err) {
      setError('Failed to suggest topics. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wand2 className="text-primary" />
          Generate Ideas
        </CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          <Textarea
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="e.g., 'Next.js server components', 'healthy breakfast ideas', 'traveling to Japan'"
            className="min-h-[120px] text-base"
            disabled={loading}
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              'Suggest Topics'
            )}
          </Button>
        </CardFooter>
      </form>
      
      {topics.length > 0 && (
        <div className="p-6 pt-0">
          <Alert>
             <Lightbulb className="h-4 w-4" />
            <AlertTitle>Suggestions</AlertTitle>
            <AlertDescription>
              <ul className="mt-2 list-disc list-inside space-y-2">
                {topics.map((topic, index) => (
                  <li key={index}>{topic}</li>
                ))}
              </ul>
            </AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
