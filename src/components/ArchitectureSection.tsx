import React, { useState } from 'react';
import { ArrowLeft, Cpu, CircuitBoard, Monitor } from 'lucide-react';

interface QuizResult {
  score: number;
  total: number;
}

interface QuizAnswers {
  [key: string]: string;
}

export function ArchitectureSection({ onBack }: { onBack: () => void }) {
  const [activeSubSection, setActiveSubSection] = useState<string>('');
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
        <h3 className="text-xl font-bold mb-4">Quiz - {section === 'von-neumann' ? 'Modèle de Von Neumann' : section === 'processor-memory' ? 'Processeur et mémoire' : 'Systèmes d\'exploitation'}</h3>
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

  const renderVonNeumannContent = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Modèle de Von Neumann</h2>
        
        <h3 className="text-xl font-bold mb-4">Principes fondamentaux</h3>
        <p className="mb-4">
          Le modèle de Von Neumann, proposé par le mathématicien John von Neumann en 1945, définit l'architecture fondamentale des ordinateurs modernes. C'est un <strong>modèle théorique</strong> qui a servi de base à la conception de la quasi-totalité des ordinateurs actuels.
        </p>

        <h3 className="text-xl font-bold mb-4">Caractéristique principale</h3>
        <p className="mb-6">
          La caractéristique centrale du modèle de Von Neumann est le <strong>principe du programme enregistré</strong> : les instructions et les données sont stockées dans la même mémoire et utilisent le même bus pour communiquer avec le processeur.
        </p>

        <h3 className="text-xl font-bold mb-4">Composants du modèle</h3>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Unité de traitement (CPU)</h4>
            <ul className="list-disc list-inside">
              <li><strong>Unité arithmétique et logique (UAL)</strong> : Effectue les calculs et opérations logiques</li>
              <li><strong>Unité de contrôle (UC)</strong> : Coordonne l'exécution des instructions</li>
              <li><strong>Registres</strong> : Petite mémoire très rapide pour les données temporaires</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Mémoire centrale</h4>
            <ul className="list-disc list-inside">
              <li>Stocke à la fois les <strong>programmes</strong> (instructions) et les <strong>données</strong></li>
              <li>Organisée comme une suite de cases numérotées (adresses)</li>
              <li>Accessible directement par le processeur</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Système d'entrées</h4>
            <ul className="list-disc list-inside">
              <li>Permet d'introduire des données dans l'ordinateur</li>
              <li>Exemples : clavier, souris, capteurs</li>
            </ul>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-bold mb-2">Système de sorties</h4>
            <ul className="list-disc list-inside">
              <li>Permet à l'ordinateur de communiquer les résultats</li>
              <li>Exemples : écran, haut-parleurs, imprimante</li>
            </ul>
          </div>
        </div>

        <h3 className="text-xl font-bold mt-6 mb-4">Cycle d'exécution des instructions</h3>
        <p className="mb-4">
          Le fonctionnement d'un ordinateur de type Von Neumann suit un cycle d'instruction appelé <strong>cycle fetch-decode-execute</strong> :
        </p>
        <ol className="list-decimal list-inside space-y-2">
          <li><strong>Fetch (Recherche)</strong> : L'unité de contrôle recherche la prochaine instruction en mémoire</li>
          <li><strong>Decode (Décodage)</strong> : L'instruction est décodée pour déterminer l'opération à effectuer</li>
          <li><strong>Execute (Exécution)</strong> : L'opération est réalisée par l'UAL ou d'autres composants</li>
          <li>Le cycle recommence pour l'instruction suivante</li>
        </ol>

        <h3 className="text-xl font-bold mt-6 mb-4">Limitation : le goulot d'étranglement</h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4">
          <p>
            La principale limitation du modèle de Von Neumann est connue sous le nom de <strong>"goulot d'étranglement de Von Neumann"</strong> : les instructions et les données empruntent le même canal (bus) pour accéder au processeur, créant une congestion qui limite les performances. Cette contrainte a motivé diverses évolutions architecturales comme l'architecture de Harvard (bus séparés) ou les architectures parallèles.
          </p>
        </div>
      </div>

      {renderQuiz('von-neumann', [
        {
          question: "Quel est le principe fondamental du modèle de Von Neumann ?",
          options: [
            { value: "a", text: "Le principe de l'adressage direct" },
            { value: "b", text: "Le principe du programme enregistré" },
            { value: "c", text: "Le principe de la mémoire virtuelle" }
          ]
        },
        {
          question: "Quelle affirmation est correcte concernant la mémoire dans l'architecture de Von Neumann ?",
          options: [
            { value: "a", text: "Il existe des mémoires séparées pour les données et les programmes" },
            { value: "b", text: "Les données et les programmes sont stockés dans la même mémoire" },
            { value: "c", text: "La mémoire est exclusivement réservée aux programmes" }
          ]
        },
        {
          question: "Qu'est-ce que le \"goulot d'étranglement\" de Von Neumann ?",
          options: [
            { value: "a", text: "La taille limitée des registres du processeur" },
            { value: "b", text: "La limitation due au partage du bus entre données et instructions" },
            { value: "c", text: "La lenteur de l'unité arithmétique et logique" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'b',
        q3: 'b'
      })}
    </div>
  );

  const renderProcessorMemoryContent = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Processeur et mémoire</h2>
        <p className="mb-4">
          Le processeur (CPU) et la mémoire sont les composants essentiels d'un ordinateur,
          travaillant ensemble pour exécuter les programmes et gérer les données.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Le processeur (CPU)</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <ul className="list-disc list-inside space-y-2">
                <li>Unité arithmétique et logique (UAL) : calculs et opérations logiques</li>
                <li>Unité de contrôle : coordination des opérations</li>
                <li>Registres : stockage temporaire ultra-rapide</li>
                <li>Cache : mémoire tampon entre CPU et RAM</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Hiérarchie des mémoires</h3>
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2">Type</th>
                  <th className="px-4 py-2">Vitesse</th>
                  <th className="px-4 py-2">Capacité</th>
                  <th className="px-4 py-2">Volatilité</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-2">Registres</td>
                  <td className="px-4 py-2">Très rapide</td>
                  <td className="px-4 py-2">Quelques octets</td>
                  <td className="px-4 py-2">Volatile</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">Cache</td>
                  <td className="px-4 py-2">Rapide</td>
                  <td className="px-4 py-2">KB à MB</td>
                  <td className="px-4 py-2">Volatile</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">RAM</td>
                  <td className="px-4 py-2">Moyenne</td>
                  <td className="px-4 py-2">GB</td>
                  <td className="px-4 py-2">Volatile</td>
                </tr>
                <tr>
                  <td className="px-4 py-2">SSD</td>
                  <td className="px-4 py-2">Lente</td>
                  <td className="px-4 py-2">100s GB-TB</td>
                  <td className="px-4 py-2">Non-volatile</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {renderQuiz('processor-memory', [
        {
          question: "Quelle mémoire est la plus rapide dans la hiérarchie des mémoires ?",
          options: [
            { value: 'a', text: "La mémoire cache L1" },
            { value: 'b', text: "Les registres du processeur" },
            { value: 'c', text: "La mémoire RAM" }
          ]
        },
        {
          question: "Qu'est-ce qui caractérise principalement la mémoire vive (RAM) ?",
          options: [
            { value: 'a', text: "Elle conserve son contenu même quand l'ordinateur est éteint" },
            { value: 'b', text: "Elle est volatile et à accès rapide" },
            { value: 'c', text: "Elle est directement intégrée au processeur" }
          ]
        },
        {
          question: "Que signifie un processeur cadencé à 3.2 GHz ?",
          options: [
            { value: 'a', text: "Il peut exécuter 3.2 millions d'instructions par seconde" },
            { value: 'b', text: "L'horloge du processeur effectue 3.2 milliards de cycles par seconde" },
            { value: 'c', text: "Sa mémoire cache peut stocker 3.2 Go de données" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'b',
        q3: 'b'
      })}
    </div>
  );

  const renderOperatingSystemContent = () => (
    <div className="space-y-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4">Systèmes d'exploitation</h2>
        <p className="mb-4">
          Un système d'exploitation (OS) est un ensemble de programmes qui sert d'interface entre
          le matériel informatique et les applications utilisateur.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">Fonctions principales</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Gestion des ressources</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Allocation du temps processeur</li>
                  <li>Gestion de la mémoire</li>
                  <li>Gestion des périphériques</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Interface utilisateur</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Interface graphique (GUI)</li>
                  <li>Interface en ligne de commande</li>
                  <li>Gestion des interactions</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-3">Types de systèmes d'exploitation</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Windows</h4>
                <p>Système commercial de Microsoft, dominant sur PC</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">macOS</h4>
                <p>Système d'Apple pour Mac, basé sur Unix</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Linux</h4>
                <p>Système open source avec nombreuses distributions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {renderQuiz('operating-system', [
        {
          question: "Quelle est la fonction principale d'un système d'exploitation ?",
          options: [
            { value: 'a', text: "Exécuter des algorithmes complexes" },
            { value: 'b', text: "Gérer les ressources de l'ordinateur" },
            { value: 'c', text: "Créer des documents et des présentations" }
          ]
        },
        {
          question: "Qu'est-ce que l'ordonnancement des processus ?",
          options: [
            { value: 'a', text: "L'organisation des fichiers sur le disque dur" },
            { value: 'b', text: "La gestion de l'attribution du temps processeur aux différentes tâches" },
            { value: 'c', text: "La mise à jour automatique du système" }
          ]
        },
        {
          question: "Lequel des éléments suivants n'est PAS un système d'exploitation ?",
          options: [
            { value: 'a', text: "Ubuntu" },
            { value: 'b', text: "HTML" },
            { value: 'c', text: "macOS" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'b',
        q3: 'b'
      })}
    </div>
  );

  const renderContent = () => {
    switch (activeSubSection) {
      case 'von-neumann':
        return renderVonNeumannContent();
      case 'processor-memory':
        return renderProcessorMemoryContent();
      case 'operating-system':
        return renderOperatingSystemContent();
      default:
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSubSection('von-neumann')}
            >
              <div className="flex items-center text-blue-600 mb-4">
                <Cpu className="h-8 w-8" />
                <h2 className="text-xl font-semibold ml-3">Modèle de Von Neumann</h2>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Architecture fondamentale</li>
                <li>• Composants principaux</li>
                <li>• Cycle d'exécution</li>
              </ul>
            </div>

            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSubSection('processor-memory')}
            >
              <div className="flex items-center text-blue-600 mb-4">
                <CircuitBoard className="h-8 w-8" />
                <h2 className="text-xl font-semibold ml-3">Processeur et mémoire</h2>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Composants du processeur</li>
                <li>• Hiérarchie des mémoires</li>
                <li>• Performance et optimisation</li>
              </ul>
            </div>

            <div
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveSubSection('operating-system')}
            >
              <div className="flex items-center text-blue-600 mb-4">
                <Monitor className="h-8 w-8" />
                <h2 className="text-xl font-semibold ml-3">Systèmes d'exploitation</h2>
              </div>
              <ul className="space-y-2 text-gray-600">
                <li>• Fonctions principales</li>
                <li>• Types de systèmes</li>
                <li>• Gestion des ressources</li>
              </ul>
            </div>
          </div>
        );
    }
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

      <h1 className="text-3xl font-bold text-gray-800">Architecture des ordinateurs</h1>
      <p className="text-gray-600">
        Cette section explore les fondements matériels et logiciels des systèmes informatiques modernes.
      </p>

      {renderContent()}
    </div>
  );
}