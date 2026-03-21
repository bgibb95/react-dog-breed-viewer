import { ErrorIcon } from '../icons/ErrorIcon';

type Props = {
  message: string;
};

export function ErrorState({ message }: Props) {
  return (
    <div className="flex flex-col items-center justify-center p-8 m-4 bg-red-50/50 rounded-2xl border border-red-100/50 shadow-sm">
      <ErrorIcon width="48" height="48" className="text-red-500 mb-4" />
      <h3 className="text-lg font-semibold text-red-900 mb-4 text-center">
        Oops! Something went wrong
      </h3>
      <h4 className="text-md text-red-900 mb-4 text-center">
        Please try reloading the page or try again later
      </h4>
      <p className="text-red-700 text-sm text-center max-w-md mb-6">{message}</p>
    </div>
  );
}
