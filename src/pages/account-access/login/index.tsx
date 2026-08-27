import { useState } from "react";
import { Button, Card, IconButton, Image, Input } from "@chakra-ui/react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { LightMode } from "@/components/ui/color-mode.tsx";
import "./index.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const goToHomepage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <LightMode>
      <div className="login-shell">
        <Card.Root className="login-card">
          <Card.Header className="login-card-header">
            <Image
              className="login-card-logo"
              src="/brify_logo.svg"
              alt="Brify by Magpie"
              width={160}
              height={46}
            />
          </Card.Header>

          <Card.Body className="login-card-body">
            <form className="login-form" onSubmit={goToHomepage}>
              <div className="login-field-group">
                <label className="login-label" htmlFor="login-email">
                  Email
                </label>
                <Input
                  id="login-email"
                  className="login-input"
                  type="email"
                  autoComplete="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isSubmitting}
                />
              </div>

              <div className="login-field-group">
                <label className="login-label" htmlFor="login-password">
                  Password
                </label>
                <div className="login-password-wrap">
                  <Input
                    id="login-password"
                    className="login-input login-input--password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isSubmitting}
                  />
                  <IconButton
                    type="button"
                    className="login-eye-btn"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isSubmitting}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden />
                    ) : (
                      <Eye aria-hidden />
                    )}
                  </IconButton>
                </div>
              </div>

              <Button
                type="submit"
                className="login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 aria-hidden />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </Card.Body>
        </Card.Root>
      </div>
    </LightMode>
  );
};

export default Login;
