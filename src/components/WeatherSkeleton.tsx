import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const WeatherSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#f2f2f2" highlightColor="#525252">
      <div className="flex gap-2 items-center">
        <div>
          <Skeleton circle width={60} height={60} />
        </div>
        <div className="flex-1">
          <Skeleton count={1} height="1.5rem" />
        </div>
      </div>
      <Skeleton count={1} height="1.5rem"/>
      <Skeleton count={8} />
    </SkeletonTheme>
  );
};

export default WeatherSkeleton;
