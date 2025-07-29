import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function useRole() {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setRole("");
      setLoading(false);
      return;
    }

    axios.get("http://localhost:3000/get-user-role", {
      params: { email: user.email }
    })
    .then(res => {
      setRole(res.data.role);
      setLoading(false);
    })
    .catch(err => {
      console.error("Error fetching role:", err);
      setRole("");
      setLoading(false);
    });
  }, [user]);

  return { role, loading };
}
