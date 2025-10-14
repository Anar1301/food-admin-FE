import Alldishescategory from "@/components/Home/Alldeshescategory";
import Adminlayout from "@/components/Home/Adminlayout";
import { CreateFoodDialog } from "@/components/Home/Senseiimage";

const AdminHomepage = () => {
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
