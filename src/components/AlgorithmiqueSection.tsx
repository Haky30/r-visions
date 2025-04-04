import React, { useState } from 'react';
import { ArrowLeft, Code2, GitBranch, Binary } from 'lucide-react';

interface QuizResult {
  score: number;
  total: number;
}

interface QuizAnswers {
  [key: string]: string;
}

export function AlgorithmiqueSection({ onBack }: { onBack: () => void }) {
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

      <h1 className="text-3xl font-bold text-gray-800">Algorithmique</h1>
      <p className="text-gray-600">
        L'algorithmique est l'étude et la conception d'algorithmes, qui sont des séquences d'instructions bien définies pour résoudre un problème ou effectuer une tâche.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <Code2 className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">Introduction</h2>
          </div>
          <p className="text-gray-600">
            Un algorithme est une recette ou une méthode étape par étape pour atteindre un objectif.
            Pour être utile, un algorithme doit être :
          </p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Précis</li>
            <li>Non ambigu</li>
            <li>Fini (se terminer en un nombre fini d'étapes)</li>
            <li>Efficace (utiliser des ressources de manière raisonnable)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <GitBranch className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">Structures de contrôle</h2>
          </div>
          <p className="text-gray-600">Les structures de base sont :</p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Séquence (instructions dans l'ordre)</li>
            <li>Condition (if, else if, else)</li>
            <li>Itération (boucles for et while)</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <Binary className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">Algorithmes de tri</h2>
          </div>
          <p className="text-gray-600">Deux algorithmes de tri de base :</p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Tri par insertion</li>
            <li>Tri par sélection</li>
          </ul>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Recherche dichotomique</h2>
        <p className="text-gray-600">
          La recherche dichotomique est un algorithme efficace pour trouver un élément dans une liste triée.
          Elle fonctionne en divisant répétitivement en deux la partie de la liste où l'élément pourrait se trouver.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold mb-2">Principe</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-600">
            <li>Comparer l'élément recherché avec l'élément du milieu</li>
            <li>Si égal, la recherche est terminée</li>
            <li>Sinon, continuer dans la moitié inférieure ou supérieure</li>
            <li>Répéter jusqu'à trouver l'élément ou déterminer qu'il n'existe pas</li>
          </ol>
        </div>
      </div>

      {renderQuiz('algorithmique', [
        {
          question: "Quelle est la caractéristique principale d'un algorithme ?",
          options: [
            { value: "a", text: "Il doit être écrit en Python" },
            { value: "b", text: "Il doit être non ambigu et précis" },
            { value: "c", text: "Il doit utiliser des boucles" }
          ]
        },
        {
          question: "Quelle structure de contrôle permet de répéter des instructions ?",
          options: [
            { value: "a", text: "La séquence" },
            { value: "b", text: "La condition" },
            { value: "c", text: "L'itération" }
          ]
        },
        {
          question: "Quel algorithme de tri est le plus efficace pour une petite liste ?",
          options: [
            { value: "a", text: "Le tri par insertion" },
            { value: "b", text: "Le tri rapide (quicksort)" },
            { value: "c", text: "Le tri fusion (mergesort)" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'c',
        q3: 'a'
      })}
    </div>
  );
}