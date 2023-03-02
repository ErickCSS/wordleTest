import { useModal } from "../hooks/useModal";
import { Counter } from "./Counter";

export default function ModalStatistic() {
  const { setShowModal, showModal, wins, plays } = useModal();

  return (
    <div className="modal">
      <>
        <h2 className="titleModal">Estadísticas</h2>
        <div className="rowModal">
          <div className="colModal">
            <div className="statistic">
              <>
                <span>{plays}</span>
                <h6 className="playsGame">Jugadas</h6>
              </>
            </div>
          </div>
          <div className="colModal">
            <div className="statistic">
              <>
                <span>{wins}</span>
                <h6 className="playsGame">Ganadas</h6>
              </>
            </div>
          </div>
        </div>
        <div className="timerWord">
          <h5>Siguiente Palabra en</h5>
          <Counter />
        </div>
        <button
          className="buttonModal"
          onClick={() => setShowModal(!showModal)}
        >
          Aceptar
        </button>
      </>
    </div>
  );
}
