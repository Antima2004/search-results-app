import { Suspense } from "react";
import SearchPage from "./SearchPage";

export default function Page() {
  return (
    <Suspense fallback={<p className="text-center text-gray-400">Loading Search Page...</p>}>
      <SearchPage />
    </Suspense>
  );
}
