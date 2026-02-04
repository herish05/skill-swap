import { useRouter } from "next/navigation";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
}

const Logo = ({ size = "md", showTagline = false }: LogoProps) => {
  const sizes = {
    sm: { img: 24, text: "text-lg" },
    md: { img: 32, text: "text-2xl" },
    lg: { img: 40, text: "text-3xl" },
  };
  const router = useRouter();
  const redirectTheUser = ()=>{
    router.push("/");
  }
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2 cursor-pointer" onClick={redirectTheUser}>
        <img
          src="/favicon.ico"
          alt="SkillSwap Logo"
          style={{ width: sizes[size].img, height: sizes[size].img }}
          className="rounded-lg"
        />
        <span className={`font-bold ${sizes[size].text} gradient-text`}>
          SkillSwap
        </span>
      </div>
      {showTagline && (
        <p className="text-muted-foreground text-sm mt-1 ml-1">
          Exchange Skills. Grow Together.
        </p>
      )}
    </div>
  );
};

export default Logo;
