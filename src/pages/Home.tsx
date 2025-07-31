import { useState, useRef } from 'react';
import { Heading } from '@/components/Heading';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/Card';
import { TextArea } from '@/components/TextArea';
import { Input } from '@/components/Input';
import { Button } from '@/components/ui/button';
import { Loader } from '@/components/Loader';
import { ResultCard } from '@/components/ResultCard';

interface GenerationState {
  isLoading: boolean;
  result: {
    imageUrl: string;
    prompt: string;
  } | null;
}

// Simulate backend API call
async function requestGeneration(prompt: string, seed?: number): Promise<{ imageUrl: string }> {
  // TODO: Replace with actual API call
  // Expected API: POST /api/generate with JSON { prompt: string; seed?: number }
  // Returns: { imageUrl: string } or base64 payload
  
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ imageUrl: '/dummy-oil.jpg' });
    }, 3000);
  });
}

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [seed, setSeed] = useState('');
  const [charCount, setCharCount] = useState(0);
  const [error, setError] = useState('');
  const [generation, setGeneration] = useState<GenerationState>({
    isLoading: false,
    result: null
  });
  
  const formRef = useRef<HTMLFormElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  const handlePromptChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setPrompt(value);
    setCharCount(value.length);
    if (error) setError('');
  };

  const validateForm = (): boolean => {
    const trimmedPrompt = prompt.trim();
    if (trimmedPrompt.length < 5) {
      setError('Please enter at least 5 characters for your prompt.');
      return false;
    }
    if (prompt.length > 500) {
      setError('Prompt must be 500 characters or less.');
      return false;
    }
    
    const seedNum = parseInt(seed);
    if (seed && (isNaN(seedNum) || seedNum < 0 || seedNum > 999999)) {
      setError('Seed must be a number between 0 and 999,999.');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setGeneration({ isLoading: true, result: null });
    setError('');
    
    try {
      const seedNum = seed ? parseInt(seed) : undefined;
      const result = await requestGeneration(prompt.trim(), seedNum);
      
      setGeneration({
        isLoading: false,
        result: {
          imageUrl: result.imageUrl,
          prompt: prompt.trim()
        }
      });
      
      // Focus management for accessibility
      setTimeout(() => {
        resultRef.current?.focus();
      }, 100);
      
    } catch (error) {
      console.error('Generation failed:', error);
      setError('Failed to generate image. Please try again.');
      setGeneration({ isLoading: false, result: null });
    }
  };

  const handleGenerateAnother = () => {
    setGeneration({ isLoading: false, result: null });
    setTimeout(() => {
      formRef.current?.querySelector('textarea')?.focus();
    }, 100);
  };

  const handleDownload = () => {
    if (!generation.result) return;
    
    const link = document.createElement('a');
    link.href = generation.result.imageUrl;
    link.download = `oil-painting-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] bg-grid">
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10 container mx-auto max-w-4xl px-4 py-12 space-y-12">
        {/* Hero Section */}
        <div className="text-center space-y-6">
          <Heading as="h1" variant="glow" className="mb-4">
            Oil-Paint Generator
          </Heading>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Turn text into oil-painted art using Stable Diffusion technology.
          </p>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-primary rounded-full glow-cyan" />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {generation.result ? (
            <div ref={resultRef} tabIndex={-1} className="focus:outline-none">
              <ResultCard
                imageUrl={generation.result.imageUrl}
                prompt={generation.result.prompt}
                onGenerateAnother={handleGenerateAnother}
                onDownload={handleDownload}
              />
            </div>
          ) : generation.isLoading ? (
            <Card variant="glow">
              <CardContent>
                <Loader />
              </CardContent>
            </Card>
          ) : (
            <Card variant="glow">
              <CardHeader>
                <CardTitle className="text-glow-cyan">Create Your Artwork</CardTitle>
              </CardHeader>
              <CardContent>
                <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                  <div aria-busy={generation.isLoading}>
                    <TextArea
                      label="Describe your image"
                      placeholder="A serene coastal village at sunset in thick oil paint, impasto texture, warm palette..."
                      value={prompt}
                      onChange={handlePromptChange}
                      error={error}
                      disabled={generation.isLoading}
                      className="min-h-[120px]"
                      maxLength={500}
                      required
                    />
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        Minimum 5 characters required
                      </span>
                      <span className={`text-xs ${charCount > 450 ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {charCount}/500
                      </span>
                    </div>
                  </div>

                  <Input
                    type="number"
                    label="Seed (optional)"
                    description="Enter a number between 0-999,999 for reproducible results"
                    placeholder="Random if empty"
                    value={seed}
                    onChange={(e) => setSeed(e.target.value)}
                    disabled={generation.isLoading}
                    min={0}
                    max={999999}
                  />

                  <Button
                    type="submit"
                    disabled={generation.isLoading || prompt.trim().length < 5}
                    className="w-full bg-gradient-primary hover:glow-magenta focus-glow transition-all duration-300 text-lg py-6"
                  >
                    {generation.isLoading ? 'Generating...' : 'Generate Oil Painting'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}