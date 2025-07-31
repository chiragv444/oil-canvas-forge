import { Download, RotateCcw } from 'lucide-react';
import { Card, CardContent } from './Card';
import { Button } from './ui/button';

interface ResultCardProps {
  imageUrl: string;
  prompt: string;
  onGenerateAnother: () => void;
  onDownload: () => void;
}

export function ResultCard({ imageUrl, prompt, onGenerateAnother, onDownload }: ResultCardProps) {
  return (
    <Card variant="glow" className="overflow-hidden">
      <CardContent className="p-0">
        <div className="relative group">
          <img
            src={imageUrl}
            alt={`Generated oil painting: ${prompt}`}
            className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
            onError={(e) => {
              console.error('Failed to load generated image');
              e.currentTarget.src = '/dummy-oil.jpg';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        <div className="p-6 space-y-4">
          <div>
            <h3 className="font-semibold text-lg mb-2 text-glow-cyan">Generated Artwork</h3>
            <p className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3 border-l-4 border-primary">
              "{prompt}"
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={onGenerateAnother}
              variant="outline"
              className="flex-1 focus-glow hover:glow-cyan transition-all duration-300"
            >
              <RotateCcw className="mr-2 h-4 w-4" />
              Generate Another
            </Button>
            <Button
              onClick={onDownload}
              className="flex-1 bg-gradient-primary hover:glow-magenta focus-glow transition-all duration-300"
            >
              <Download className="mr-2 h-4 w-4" />
              Download
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}