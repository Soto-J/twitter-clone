import Button from "../Button";

const Followbar = () => {
  return (
    <div className="hidden px-6 py-4 lg:block">
      <div className="rounded-xl bg-neutral-800 p-4">
        <h2 className="text-xl font-bold text-white">Who to follow</h2>
        <div className="mt-4 flex flex-col gap-6">
          {/* TODO USER LIST */}
          <Button label="Follow" />
        </div>
      </div>
    </div>
  );
};

export default Followbar;
