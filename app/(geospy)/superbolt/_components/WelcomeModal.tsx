import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';

// components/superbolt/welcome-modal.tsx
interface WelcomeModalProps {
  onUpload: () => void;
  onContinue: () => void;
}

export function WelcomeModal({ onUpload, onContinue }: WelcomeModalProps) {
  return (
    <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-background/50 dark:bg-black/50">
      <Card className="mx-4 max-w-lg space-y-6 p-6 text-center">
        <Image
          src="/geospy-logo.svg"
          alt="GeoSpy"
          width={150}
          height={40}
          className="mx-auto"
        />
        <h1 className="text-3xl font-bold">Welcome to Superbolt</h1>
        <p className="text-muted-foreground">
          Experience our new AI model for precise street-level photo
          geolocation. While this demo showcases San Francisco, Superbolt&apos;s
          technology can be deployed in any city worldwide.
        </p>
        <div className="space-y-4">
          <Button className="w-full" onClick={onUpload}>
            Try Example Images
          </Button>
          <Button
            variant="outline"
            className="w-full bg-background/10 text-foreground hover:bg-background/20 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
            onClick={onContinue}
          >
            Try Superbolt →
          </Button>
        </div>
      </Card>
    </div>
  );
}
