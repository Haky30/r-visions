import React, { useState } from 'react';
import { ArrowLeft, Database, FileText, Table } from 'lucide-react';

interface QuizResult {
  score: number;
  total: number;
}

interface QuizAnswers {
  [key: string]: string;
}

export function DatabaseSection({ onBack }: { onBack: () => void }) {
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

      <h1 className="text-3xl font-bold text-gray-800">Bases de données</h1>
      <p className="text-gray-600">
        Une base de données est une collection structurée de données organisée pour un accès
        et une gestion faciles.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <Database className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">Introduction</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Une base de données peut être vue comme un système de classement numérique organisé.
            Elle permet de :
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Stocker des données de manière structurée</li>
            <li>Interroger pour retrouver des informations</li>
            <li>Modifier et gérer efficacement les données</li>
            <li>Maintenir l'intégrité des données</li>
          </ul>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center text-blue-600 mb-4">
            <FileText className="h-8 w-8" />
            <h2 className="text-xl font-semibold ml-3">Fichiers CSV</h2>
          </div>
          <p className="text-gray-600 mb-4">
            Les fichiers CSV (Comma Separated Values) sont un format simple pour stocker
            des données tabulaires.
          </p>
          <div className="bg-gray-100 p-4 rounded">
            <pre className="text-sm">
              <code>{`nom,age,ville
Alice,25,Paris
Bob,30,Lyon
Charlie,22,Marseille`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-blue-600 mb-4">
          <Table className="h-8 w-8" />
          <h2 className="text-xl font-semibold ml-3">Manipulation de fichiers CSV avec Python</h2>
        </div>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Lecture d'un fichier CSV</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`import csv

with open('donnees.csv', 'r') as fichier:
    lecteur = csv.reader(fichier)
    for ligne in lecteur:
        print(ligne)`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Écriture dans un fichier CSV</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`import csv

donnees = [
    ['nom', 'age', 'ville'],
    ['Alice', '25', 'Paris'],
    ['Bob', '30', 'Lyon']
]

with open('nouveau.csv', 'w', newline='') as fichier:
    writer = csv.writer(fichier)
    writer.writerows(donnees)`}</code>
            </pre>
          </div>
        </div>
      </div>

      {renderQuiz('database', [
        {
          question: "Qu'est-ce qu'un fichier CSV ?",
          options: [
            { value: "a", text: "Un fichier de code source" },
            { value: "b", text: "Un fichier de valeurs séparées par des virgules" },
            { value: "c", text: "Un fichier de configuration système" }
          ]
        },
        {
          question: "Quel module Python est utilisé pour manipuler les fichiers CSV ?",
          options: [
            { value: "a", text: "csv" },
            { value: "b", text: "pandas" },
            { value: "c", text: "excel" }
          ]
        },
        {
          question: "Comment ouvrir un fichier CSV en lecture avec Python ?",
          options: [
            { value: "a", text: "open('fichier.csv', 'w')" },
            { value: "b", text: "open('fichier.csv', 'r')" },
            { value: "c", text: "open('fichier.csv', 'x')" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'a',
        q3: 'b'
      })}
    </div>
  );
}