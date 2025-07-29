import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function useRole() {
  const [role, setRole] = useState("");
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/get-user-role?email=${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setLoading(false);
        })
        .catch(() => {
          setRole("");
          setLoading(false);
        });
    }
  }, [user]);

  return { role, loading };
}
