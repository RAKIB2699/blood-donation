import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";

export default function useRole() {
  const [role, setRole] = useState("");
  const [status,setStatus] = useState("")
  
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`https://blood-donation-server-olive.vercel.app/get-user-role?email=${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setStatus(res.data.status);
          setLoading(false);
        })
        .catch(() => {
          setRole("");
          setLoading(false);
        });
    }
  }, [user]);

  return { role, loading, status };
}
