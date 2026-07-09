'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

type NativeImgProps = React.ComponentPropsWithoutRef<'img'>;

export interface ImageProps extends NativeImgProps {
  alt: string;
}

export const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, className, loading = 'lazy', decoding = 'async', onError, ...rest }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [hasError, setHasError] = React.useState(false);

    const handleLoad = () => {
      setIsLoaded(true);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      setHasError(true);
      onError?.(e);
    };

    return (
      <div className="relative overflow-hidden bg-gradient-to-br from-muted/50 to-muted">
        {!isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex h-8 w-8 animate-spin items-center justify-center">
              <div className="h-6 w-6 rounded-full border-2 border-primary/20 border-t-primary"></div>
            </div>
          </div>
        )}
        
        {hasError ? (
          <div className="flex h-full w-full items-center justify-center text-muted-foreground">
            <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        ) : (
          <img
            {...rest}
            ref={ref}
            src={src}
            alt={alt}
            className={cn(
              'h-full w-full object-cover transition-all duration-500',
              isLoaded ? 'opacity-100' : 'opacity-0',
              className,
            )}
            loading={loading}
            decoding={decoding}
            onLoad={handleLoad}
            onError={handleError}
          />
        )}
      </div>
    );
  },
);

Image.displayName = 'Image';

export default Image;