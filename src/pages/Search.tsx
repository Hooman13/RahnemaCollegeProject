import { PagesLayout } from "./PagesLayout";
import { Link } from "react-router-dom";
import { ExploreItemSkeleton } from "../components/ExploreItemSkeleton";
import { SearchPeaple } from "./SearchPeaple";

export const Search = () => {
  return (
    <>
      <PagesLayout>
        <div className="text-sm font-normal mb-3">
          <input
            type="text"
            className="rounded-[35px] w-[360px]"
            placeholder="جستجو در افراد، تگ‌ها، واژه‌ها و..."
          />
        </div>
        <div className="w-full bg-inherit flex flex-col justify-center">
          <div className="text-md font-normal mt-6 justify-start flex">
            <Link to="/search-people">
              <button className=" ml-10">افراد </button>
            </Link>
            |
            <Link to="/search-tags">
              <button className="text-[#A5A5A5] mr-10">پست‌ها</button>
            </Link>
          </div>
          <div>
            <SearchPeaple />
          </div>
        </div>
      </PagesLayout>
    </>
  );
};
