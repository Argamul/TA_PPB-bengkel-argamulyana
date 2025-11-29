export default function LoadingAnimation({ progress }) {
  return (
    <div className="w-full max-w-xs mt-3">
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className="bg-blue-600 h-full transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-center mt-2 font-semibold text-gray-600">
        Loading {progress}%
      </p>
    </div>
  );
}
