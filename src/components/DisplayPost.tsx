import { faBookmark, faHeart,faComment } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Axios from "axios";
import { Carousel, Badge } from "flowbite-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const DisplayPost: React.FC = () => {
  const { postId } = useParams();
  const getPostDetails = () => {
    try {
      Axios.get(`http://37.32.5.72:3000/posts/${postId}`).then((res) => {
        debugger;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const post = {
    postId: "f8a9183-ce9c-4c6e-a728-e948167befca",
    creator: {
      username: "mostafa",
      imageUrl: "./img/avatar.png",
    },
    imageInfos: [
      {
        url: "./img/post-images/n1.jpg",
        imageId: "f8a9183-ce9c-4c6e-a728-e948167befca",
      },
      {
        url: "./img/post-images/n2.jpg",
        imageId: "f8a9183-ce9c-4c6e-a728-e948167befca",
      },
      {
        url: "./img/post-images/n3.jpg",
        imageId: "f8a9183-ce9c-4c6e-a728-e948167befca",
      },
    ],
    caption: "یک روز در جنگل",
    tags: ["جنگل", "طبیعت", "درخت"],
    commentsCount: "12",
    likeCount: "233",
    bookMarkCount: "12",
  };

  //   useEffect(() => {
  //     getPostDetails();
  //   }, []);
  return (
    <>
      <article className="mx-auto w-full max-w-2xl format format-sm sm:format-base lg:format-lg format-blue dark:format-invert">
        <header className="mb-4 lg:mb-6 not-format">
          <address className="flex items-center mb-6 not-italic">
            <div className="grow text-sm text-gray-900 dark:text-white">
              <a
                href="#"
                rel="author"
                className="flex text-base items-center font-bold text-gray-900 dark:text-white"
              >
                <img
                  className="w-16 h-16 rounded-full ml-3"
                  src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                  alt="Mostafa"
                />
                Mostafa
              </a>
            </div>
            <button
              type="button"
              className="w-auto py-4 px-2 bg-[#EA5A69] rounded-3xl text-white "
            >
              ویرایش پست
            </button>
          </address>
        </header>

        <div className="mb-14 h-56 sm:h-64 xl:h-80 2xl:h-96">
          <Carousel className="rounded-t-lg" dir="ltr">
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-1.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-2.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-3.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-4.svg"
              alt="..."
            />
            <img
              src="https://flowbite.com/docs/images/carousel/carousel-5.svg"
              alt="..."
            />
          </Carousel>
        </div>
        <p
          className="text-xs font-normal
         text-neutral-800 dark:text-gray-400"
        >
          <time title="February 8th, 2022">دو ماه پیش</time>
        </p>
        <p className="text-sm font-normal text-neutral-800 my-4">
          لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با
          استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
          ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز، و
          کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی
          در شصت و سه درصد گذشته حال و آینده، شناخت فراوان جامعه و متخصصان را می
          طلبد، تا با نرم افزارها شناخت بیشتری را برای طراحان رایانه ای علی
          الخصوص طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
          صورت می توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
          شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی دستاوردهای
          اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود طراحی اساسا مورد استفاده
          قرار گیرد.
        </p>
        <div className="flex flex-wrap gap-2">
          <Badge size="sm" href="#" color="info">بومگردی</Badge>
          <Badge size="sm" href="#" color="info">بومگردی</Badge>
          <Badge size="sm" href="#" color="info">بومگردی</Badge>
          <Badge size="sm" href="#" color="info">بومگردی</Badge>
        </div>

        <div className="flex flex-row-reverse items-center h-14 pt-4 mb-8 font-medium text-[#EA5A69]">
          <div className="flex-none w-9 gap-2 ">
            <FontAwesomeIcon icon={faBookmark}/>
            <div>15</div>
          </div>
          <div className="flex-none w-9 gap-2">
            <FontAwesomeIcon icon={faHeart}/>
            <div>15</div>
          </div>
          <div className="flex-none w-9 gap-2">
            <FontAwesomeIcon icon={faComment}/>
            <div>15</div>
          </div>
        </div>
      </article>
    </>
  );
};
