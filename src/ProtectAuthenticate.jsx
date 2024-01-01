import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./contexts/FakeAuthContext";

// eslint-disable-next-line react/prop-types
export default function ProtectAuthenticate({ children }) {
  const { isAuthenticate } = useAuth();
  const navigate = useNavigate();

  useEffect(
    function () {
      if (!isAuthenticate) navigate("/");
    },
    [isAuthenticate, navigate]
  );

  return !isAuthenticate ? children : null;
}
