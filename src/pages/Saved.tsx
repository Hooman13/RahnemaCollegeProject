import { SavedList } from "../components/SavedList";
import { PagesLayout } from "./PagesLayout";

export const Saved = () => {
  return (
    <>
      <PagesLayout>
        <p className="text-xl font-semibold mb-3">ذخیره‌ها</p>
        <div className="w-full bg-inherit flex flex-col justify-center">
          <SavedList/>
        </div>
      </PagesLayout>
    </>
  );
};
