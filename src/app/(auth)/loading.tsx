import { Spinner } from '@/components/ui/spinner';

const Loading = async () => {
  return (
    <div className="flex flex-row items-center justify-center gap-1 mt-20">
      <h2 className="text-3xl font-display"> Loading...</h2>
      <Spinner className="size-8" />
    </div>
  );
};

export default Loading;
