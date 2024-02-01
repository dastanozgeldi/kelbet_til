import { Logo } from "./logo";
import { LoginButton } from "./login-button";

export const Nav = () => {
  return (
    <nav className="w-full flex items-center justify-between">
      <Logo />
      <LoginButton />
    </nav>
  );
};
