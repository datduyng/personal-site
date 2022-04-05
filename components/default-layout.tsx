import Header from "./header";
import cn from "classnames";

type DefaultLayoutProps = {
  className?: string;
};

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`mx-auto max-w-screen-md`}>
      <div className={cn("flex flex-col justify-center mb-8", className)}>
        <Header />
        <Spacer />
        {children}
      </div>
    </div>
  );
};

export default DefaultLayout;

const Spacer = () => <div className="h-7" />;
