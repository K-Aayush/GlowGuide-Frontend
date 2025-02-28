import makeup from "../../assets/makeup kit.jpg";

const LoginForm = () => {
  return (
    <div className="flex items-center justify-center w-full min-h-screen">
      <div className="flex items-center w-full max-w-screen-lg bg-gray-700 rounded-lg">
        {/*Left side*/}
        <div className="w-1/2">
          <img
            src={makeup}
            alt="makeup image"
            loading="lazy"
            decoding="async"
            className="object-contain object-center w-full h-full rounded-l-lg"
          />
        </div>

        {/*Right side*/}
        <div className="w-1/2">Right</div>
      </div>
    </div>
  );
};

export default LoginForm;
