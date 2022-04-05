import cn from "classnames";
interface CardProps {
  className?: string;
  noBorder?: boolean;
}

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn("border border-secondary-reallight rounded-lg", className)}
    >
      {children}
    </div>
  );
};

export const HomePageCard: React.FC<CardProps> = ({ children, className }) => {
  return (
    <Card
      className={cn(
        className,
        "flex flex-col mb-7 ml-7 px-5 py-6 max-w-[370px]"
      )}
    >
      {children}
    </Card>
  );
};

export default Card;
