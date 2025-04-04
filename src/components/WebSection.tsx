import React, { useState } from 'react';
import { ArrowLeft, Code, Palette, Globe } from 'lucide-react';

interface QuizResult {
  score: number;
  total: number;
}

interface QuizAnswers {
  [key: string]: string;
}

export function WebSection({ onBack }: { onBack: () => void }) {
  const [quizResults, setQuizResults] = useState<Record<string, QuizResult>>({});
  const [quizAnswers, setQuizAnswers] = useState<Record<string, QuizAnswers>>({});

  const handleQuizSubmit = (section: string, correctAnswers: Record<string, string>) => {
    const userAnswers = quizAnswers[section] || {};
    let score = 0;
    const total = Object.keys(correctAnswers).length;

    Object.entries(correctAnswers).forEach(([question, answer]) => {
      if (userAnswers[question] === answer) {
        score++;
      }
    });

    setQuizResults({
      ...quizResults,
      [section]: { score, total }
    });
  };

  const handleAnswerChange = (section: string, question: string, answer: string) => {
    setQuizAnswers(prev => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [question]: answer
      }
    }));
  };

  const renderQuiz = (section: string, questions: Array<{ question: string, options: Array<{ value: string, text: string }> }>, correctAnswers: Record<string, string>) => {
    const result = quizResults[section];

    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Quiz d'auto-évaluation</h3>
        <div className="space-y-6">
          {questions.map((q, index) => (
            <div key={index} className="quiz-question">
              <p className="font-semibold mb-3">{index + 1}. {q.question}</p>
              <div className="space-y-2">
                {q.options.map((option) => (
                  <label key={option.value} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
                    <input
                      type="radio"
                      name={`${section}-q${index + 1}`}
                      value={option.value}
                      onChange={(e) => handleAnswerChange(section, `q${index + 1}`, e.target.value)}
                      className="form-radio"
                    />
                    <span>{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            onClick={() => handleQuizSubmit(section, correctAnswers)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Vérifier mes réponses
          </button>

          {result && (
            <div className="mt-4 p-4 bg-blue-50 rounded">
              <p className="font-semibold">
                Score : {result.score}/{result.total}
              </p>
              {result.score === result.total ? (
                <p className="text-green-600 mt-2">Félicitations ! Vous avez tout compris !</p>
              ) : result.score >= result.total / 2 ? (
                <p className="text-blue-600 mt-2">Bon travail, mais quelques révisions seraient utiles.</p>
              ) : (
                <p className="text-red-600 mt-2">Vous devriez revoir cette section pour mieux comprendre les concepts.</p>
              )}
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <button
          onClick={onBack}
          className="flex items-center text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800">Web (HTML, CSS)</h1>
      <p className="text-gray-600">
        Le World Wide Web repose sur un ensemble de technologies standardisées,
        dont HTML et CSS sont les fondements.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <Code className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">HTML</h2>
          </div>
          <p className="text-gray-600 mb-4">
            HTML (HyperText Markup Language) est un langage de balisage utilisé pour
            créer la structure et le contenu des pages web.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Structure de base</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm">
                <code>{`<!DOCTYPE html>
<html>
  <head>
    <title>Titre de la page</title>
  </head>
  <body>
    <h1>Mon titre</h1>
    <p>Mon paragraphe</p>
  </body>
</html>`}</code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Balises courantes</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Titres: &lt;h1&gt; à &lt;h6&gt;</li>
                <li>Paragraphes: &lt;p&gt;</li>
                <li>Liens: &lt;a&gt;</li>
                <li>Images: &lt;img&gt;</li>
                <li>Listes: &lt;ul&gt;, &lt;ol&gt;, &lt;li&gt;</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <Palette className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">CSS</h2>
          </div>
          <p className="text-gray-600 mb-4">
            CSS (Cascading Style Sheets) est un langage de feuille de style utilisé
            pour contrôler l'apparence des documents HTML.
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Syntaxe de base</h3>
              <pre className="bg-gray-100 p-4 rounded text-sm">
                <code>{`/* Sélecteur et déclarations */
h1 {
  color: blue;
  font-size: 24px;
}

/* Classes et IDs */
.ma-classe {
  background-color: #f0f0f0;
}

#mon-id {
  border: 1px solid black;
}`}</code>
              </pre>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Propriétés courantes</h3>
              <ul className="list-disc list-inside space-y-1 text-gray-600">
                <li>Couleurs et fond</li>
                <li>Typographie</li>
                <li>Mise en page</li>
                <li>Bordures et marges</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-blue-600 mb-4">
          <Globe className="h-8 w-8" />
          <h2 className="text-xl font-semibold ml-3">Bonnes pratiques</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">HTML</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Utiliser une structure sémantique</li>
              <li>Valider le code HTML</li>
              <li>Optimiser les images</li>
              <li>Utiliser des alternatives textuelles</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2">CSS</h3>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              <li>Organiser le code CSS</li>
              <li>Utiliser des classes réutilisables</li>
              <li>Éviter les styles en ligne</li>
              <li>Maintenir la cohérence</li>
            </ul>
          </div>
        </div>
      </div>

      {renderQuiz('web', [
        {
          question: "Quelle balise HTML est utilisée pour créer un lien ?",
          options: [
            { value: "a", text: "<link>" },
            { value: "b", text: "<a>" },
            { value: "c", text: "<href>" }
          ]
        },
        {
          question: "Comment définir la couleur du texte en CSS ?",
          options: [
            { value: "a", text: "text-color: blue;" },
            { value: "b", text: "color: blue;" },
            { value: "c", text: "font-color: blue;" }
          ]
        },
        {
          question: "Quelle est la différence entre une classe et un ID en CSS ?",
          options: [
            { value: "a", text: "Il n'y a pas de différence" },
            { value: "b", text: "Une classe peut être utilisée plusieurs fois, un ID doit être unique" },
            { value: "c", text: "Un ID peut être utilisé plusieurs fois, une classe doit être unique" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'b',
        q3: 'b'
      })}
    </div>
  );
}