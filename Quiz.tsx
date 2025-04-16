import { useState } from 'react';
import React from 'react';


const questions= [
  { texte: 'React est un framework.', reponse: false },
  { texte: 'useState permet de gérer l\'état.', reponse: true },
  { texte: 'JSX est une extension CSS.', reponse: false },
  { texte: 'Le Virtual DOM est plus rapide.', reponse: true }
];

function Quiz() {
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [repondu, setRepondu] = useState(false);
  const [bonneReponse, setBonneReponse] = useState<boolean | null>(null);
  const [fini, setFini] = useState(false);

  const verifierReponse = (choix: boolean) => {
    if (repondu) return;
    const estBonne = questions[index].reponse === choix;
    if (estBonne) setScore(prev => prev + 1);
    setBonneReponse(estBonne);
    setRepondu(true);
  };

  const questionSuivante = () => {
    if (index + 1 < questions.length) {
      setIndex(prev => prev + 1);
      setRepondu(false);
      setBonneReponse(null);
    } else {
      setFini(true);
    }
  };

  const recommencer = () => {
    setIndex(0);
    setScore(0);
    setRepondu(false);
    setBonneReponse(null);
    setFini(false);
  };

  if (fini) {
    return (
      <div className="quiz">
        <h2>Quiz terminé !</h2>
        <p>Votre score : {score} / {questions.length}</p>
        <button onClick={recommencer}>Recommencer</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h2>Question {index + 1} : {questions[index].texte}</h2>
      <div>
        <button onClick={() => verifierReponse(true)}>Vrai</button>
        <button onClick={() => verifierReponse(false)}>Faux</button>
      </div>
      {repondu && (
        <p style={{ color: bonneReponse ? 'green' : 'red' }}>
          {bonneReponse ? 'Bonne réponse !' : 'Mauvaise réponse.'}
        </p>
      )}
      {repondu && (
        <button onClick={questionSuivante}>Question suivante</button>
      )}
    </div>
  );
};

export default Quiz;
