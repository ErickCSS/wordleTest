import { useModal } from "../hooks/useModal";

export default function ModalRules() {
  const { modalRules, setModalRules } = useModal();

  return (
    <div className="modal">
      <h2 className="titleModal">Como Jugar</h2>
      <div className="infoRules">
        <p>Adivina la palabra oculta en cinco intentos.</p>
        <p>Cada intento debe ser una palabra válida de 5 letras.</p>
        <p>
          {" "}
          Después de cada intento el color de las letras cambia para mostrar qué
          tan cerca estás de acertar la palabra.
        </p>
      </div>
      <h5 className="subTitleModal">Ejemplos</h5>
      <div className="gridSquare">
        <div className="square correct">G</div>
        <div className="square">A</div>
        <div className="square">T</div>
        <div className="square">O</div>
        <div className="square">S</div>
      </div>
      <div className="infoRules">
        <p>
          La letra <b>G</b> está en la palabra y en la posición correcta.
        </p>
      </div>

      <div className="gridSquare">
        <div className="square">V</div>
        <div className="square">O</div>
        <div className="square present">C</div>
        <div className="square">A</div>
        <div className="square">L</div>
      </div>

      <div className="infoRules">
        <p>
          La letra <b>C</b> está en la palabra pero en la posición incorrecta.
        </p>
      </div>

      <div className="gridSquare">
        <div className="square">C</div>
        <div className="square">A</div>
        <div className="square">N</div>
        <div className="square">T</div>
        <div className="square incorrect">O</div>
      </div>

      <div className="infoRules">
        <p>
          La letra <b>O</b> no está en la palabra.
        </p>
      </div>
      <div className="infoRules">
        <p>
          Puede haber letras repetidas. Las pistas son independientes para cada
          letra.
        </p>
      </div>

      <div className="infoFinal">
        <p>¡Una palabra nueva cada 5 minutos!</p>
      </div>
      <button
        className="buttonModal"
        onClick={() => setModalRules(!modalRules)}
      >
        ¡A Jugar!
      </button>
    </div>
  );
}
