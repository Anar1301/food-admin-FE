import Alldishescategory from "@/_components/Home/Alldeshescategory";
import Adminlayout from "@/_components/Home/Adminlayout";
import { useFood } from "../_components/_hooks/use-foods";

const AdminHomepage = () => {
  // const { loading, categories, foods, reFetchCategories, reFetchFoods } =
  //   useFood();
  return (
    <div className="bg-[#F4F4F5] max-w-[1440px]">
      <Adminlayout
        classname="w-[165px] bg-white text-black"
        classname2="w-[165px] bg-black text-white"
      >
        <Alldishescategory></Alldishescategory>
      </Adminlayout>
    </div>
  );
};

export default AdminHomepage;
