import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      className="
          flex
          h-[70vh]
          flex-col
          items-center
          justify-center
        "
    >
      <ClipLoader size={80} color="lightblue" />
    </div>
  );
};

export default Loader;
