import { SpinnerIcon } from './icons/SpinnerIcon';

type Props = {
  message?: string;
};

export function LoadingState({ message = 'Loading...' }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-80">
      <SpinnerIcon className="w-10 h-10 text-primary animate-spin mb-4" />
      <p className="text-text-light font-medium tracking-wide animate-pulse">{message}</p>
    </div>
  );
}
