import { Heading } from '@/components/Heading';
import { Card, CardContent } from '@/components/Card';
import { Mail } from 'lucide-react';

const students = [
  { name: 'Sahar Mirzapoor', id: '101599786' },
  { name: 'Bhoomika Patel', id: '101595094' },
  { name: 'Nahid Naseri', id: '101518575' },
  { name: 'Sreejita Chowdhury', id: '101590107' },
  { name: 'Chirag Vaghasiya', id: '101505362' },
  { name: 'Mohitkumar Jayeshbhai Panchasara', id: '101567404' },
  { name: 'Dev Chetal', id: '101459557' },
  { name: 'Vrunal Patel', id: '101574257' },
];

function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

function getGradientClass(index: number): string {
  const gradients = [
    'bg-gradient-to-br from-cyan-400 to-blue-500',
    'bg-gradient-to-br from-purple-400 to-pink-500',
    'bg-gradient-to-br from-green-400 to-blue-500',
    'bg-gradient-to-br from-yellow-400 to-orange-500',
    'bg-gradient-to-br from-red-400 to-pink-500',
    'bg-gradient-to-br from-indigo-400 to-purple-500',
    'bg-gradient-to-br from-teal-400 to-cyan-500',
    'bg-gradient-to-br from-orange-400 to-red-500',
  ];
  return gradients[index % gradients.length];
}

export default function About() {
  return (
    <div className="relative min-h-[calc(100vh-theme(spacing.16)-theme(spacing.20))] bg-grid">
      <div className="absolute inset-0 scanlines pointer-events-none" />
      
      <div className="relative z-10 container mx-auto max-w-6xl px-4 py-12 space-y-12">
        {/* Header */}
        <div className="text-center space-y-6">
          <Heading as="h1" variant="glow">
            About Our Team
          </Heading>
          <div className="max-w-3xl mx-auto">
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are a student team exploring text-to-image generation with Stable Diffusion, 
              focusing on painterly, oil-paint-style outputs. This site demonstrates our 
              frontend experience while the model runs on a separate backend.
            </p>
          </div>
          <div className="flex justify-center">
            <div className="h-1 w-24 bg-gradient-primary rounded-full glow-cyan" />
          </div>
        </div>

        {/* Student Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {students.map((student, index) => (
            <Card key={student.id} variant="glow" className="group hover:scale-105 transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                {/* Avatar */}
                <div className="flex justify-center">
                  <div className={`
                    w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-lg
                    ${getGradientClass(index)} glow-cyan group-hover:glow-magenta transition-all duration-300
                  `}>
                    {getInitials(student.name)}
                  </div>
                </div>

                {/* Name */}
                <h3 className="font-semibold text-lg text-glow-cyan group-hover:text-glow-magenta transition-all duration-300">
                  {student.name}
                </h3>

                {/* Student ID */}
                <p className="text-sm text-muted-foreground font-mono bg-muted/50 rounded-md px-3 py-1 inline-block">
                  {student.id}
                </p>

                {/* Email */}
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a 
                    href={`mailto:${student.id}@georgebrown.ca`}
                    className="hover:text-primary transition-colors focus-glow rounded-md px-1 py-0.5"
                  >
                    {student.id}@georgebrown.ca
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <Card variant="glow" className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold mb-4 text-glow-cyan">Technology Stack</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="bg-muted/50 rounded-lg p-3">
                  <strong>Frontend</strong><br />
                  React + TypeScript
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <strong>Styling</strong><br />
                  Tailwind CSS
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <strong>AI Model</strong><br />
                  Stable Diffusion
                </div>
                <div className="bg-muted/50 rounded-lg p-3">
                  <strong>Theme</strong><br />
                  Retro-futuristic
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}