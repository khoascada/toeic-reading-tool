import { Spinner } from '@components/ui';

const Loading = () => {
  return (
    <div className="flex h-64 items-center justify-center gap-2">
      <Spinner />
      <div className="text-muted-foreground">Loading...</div>
    </div>
  );
};

export default Loading;
