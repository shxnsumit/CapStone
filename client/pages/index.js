import Layout from "@/components/Layout";
import styles from "@/styles/Home.module.css";
import { useContext } from "react";
import { UserContext } from "../context";
import "react-toastify/dist/ReactToastify.css";
export default function Home() {
  const [state, setState] = useContext(UserContext);
  return (
    <Layout>
      
    </Layout>
  );
}
