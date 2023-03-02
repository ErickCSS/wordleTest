import { useModal } from "../hooks/useModal";
import { useState } from "react";
import { MdAnalytics, MdOutlineHelp } from "react-icons/md";

export default function Header() {
  const { showModal, setShowModal, modalRules, setModalRules } = useModal();
  const [theme, setTheme] = useState<string>("light");

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      document.body.classList.add("dark");
    } else {
      setTheme("light");
      document.body.classList.remove("dark");
    }
  };

  return (
    <div className="header">
      <div className="rowHeader">
        <div className="colHeader">
          <button onClick={() => setModalRules(!modalRules)}>
            <MdOutlineHelp className="help" />
          </button>
        </div>
        <div className="colHeader">
          <h1 className="title">Wordle</h1>
        </div>
        <div className="colHeader">
          <div className="rowCol">
            <button onClick={() => setShowModal(!showModal)}>
              <MdAnalytics className="analytics" />
            </button>
            <input
              type="checkbox"
              className="toggleButton"
              onChange={toggleTheme}
              checked={theme === "dark"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
