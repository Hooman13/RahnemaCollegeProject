import { PagesLayout } from "./PagesLayout";
import { Link } from "react-router-dom";
import { ExploreItemSkeleton } from "../components/ExploreItemSkeleton";
import { SearchPeaple } from "./SearchPeaple";
import { useState } from "react";
import { string, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { SearchPosts } from "./SearchPosts";

const FormSchema = z.object({
  tageName: z.string(),
});
type IFormInput = z.infer<typeof FormSchema>;
export const SearchTages = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>({
    resolver: zodResolver(FormSchema),
  });

  const [formInput, setFormInput] = useState({
    tageName: "",
  });
  const [tageName, setTageName] = useState(String);
  const [showSearchPeaple, setShowSearchPeaple] = useState(false);
  const [componentKey, setComponentKey] = useState(0);
  const handleUserInput = (name: string, value: string) => {
    setFormInput({
      ...formInput,
      [name]: value,
    });
  };

  const onSubmit = (data: IFormInput) => {
    setTageName(data.tageName);
    setComponentKey((prevKey) => prevKey + 1);
    setShowSearchPeaple(true);
    setTimeout(() => setShowSearchPeaple(true), 0);
  };

  return (
    <>
      <PagesLayout>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="text-sm font-normal sticky z-50 top-[20px] mb-3">
            <label className="relative bg-white">
              <input
                className="rounded-[35px] border-white w-[360px] pl-10 pr-12"
                type="text"
                placeholder="جستجو در افراد، تگ‌ها، واژه‌ها و..."
                {...register("tageName")}
                value={formInput.tageName}
                onChange={({ target }) =>
                  handleUserInput(target.name, target.value)
                }
              />
              <button
                className="absolute left-3 top-1/2 transform -translate-y-1/2"
                type="submit"
              >
                <FontAwesomeIcon
                  className="text-black"
                  icon={faMagnifyingGlass}
                />
              </button>
            </label>
          </div>
        </form>
        <div className="w-full bg-inherit flex flex-col justify-center">
          <div className="text-md font-normal mt-6 justify-start flex">
            <Link to="/search-people">
              <button className="text-[#A5A5A5] ml-10">افراد </button>
            </Link>
            |
            <Link to="/search-posts">
              <button className=" mr-10">پست‌ها</button>
            </Link>
          </div>
          {tageName ? (
            <div className="mt-8">
              <SearchPosts key={componentKey} tageName={tageName} />
            </div>
          ) : (
            <div className="mt-8 bg-inherit h-full border border-[#CDCDCD] rounded-3xl">
              <div className="flex flex-row min-h-screen justify-center items-center">
                تگ مورد نظرت رو جستجو کن
              </div>
            </div>
          )}
        </div>
      </PagesLayout>
    </>
  );
};
