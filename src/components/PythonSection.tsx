import React, { useState } from 'react';
import { ArrowLeft, Terminal, Database, GitBranch, FunctionSquare as Function } from 'lucide-react';

interface QuizResult {
  score: number;
  total: number;
}

interface QuizAnswers {
  [key: string]: string;
}

export function PythonSection({ onBack }: { onBack: () => void }) {
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

      <h1 className="text-3xl font-bold text-gray-800">Programmation Python</h1>
      <p className="text-gray-600 mb-6">
        Python est un langage de programmation de haut niveau, interprété, polyvalent et très lisible, 
        qui est souvent utilisé pour l'enseignement de l'informatique en raison de sa syntaxe claire 
        et de sa facilité d'apprentissage.
      </p>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-blue-600 mb-4">
          <Terminal className="h-8 w-8" />
          <h2 className="text-xl font-semibold ml-3">Bases de Python</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Syntaxe</h3>
            <p className="text-gray-600">
              La syntaxe de Python est conçue pour être simple et intuitive. Les instructions sont 
              généralement écrites une par ligne, et l'indentation (les espaces en début de ligne) 
              est significative et utilisée pour délimiter les blocs de code. Les commentaires sont 
              indiqués par le symbole #.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Variables et Types</h3>
            <p className="text-gray-600 mb-4">
              Les variables en Python sont utilisées pour stocker des valeurs. Elles sont créées 
              automatiquement lorsqu'une valeur leur est assignée à l'aide de l'opérateur =. Python 
              est un langage à typage dynamique, ce qui signifie que vous n'avez pas besoin de déclarer 
              explicitement le type d'une variable ; le type est inféré automatiquement en fonction de 
              la valeur assignée.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold mb-2">Types de base :</h4>
              <ul className="list-disc list-inside space-y-2">
                <li>Entiers (int)</li>
                <li>Nombres à virgule flottante (float)</li>
                <li>Chaînes de caractères (str)</li>
                <li>Booléens (bool : True ou False)</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Opérateurs</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Opérateurs arithmétiques :</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Addition (+)</li>
                  <li>Soustraction (-)</li>
                  <li>Multiplication (*)</li>
                  <li>Division (/)</li>
                  <li>Division entière (//)</li>
                  <li>Modulo (%)</li>
                  <li>Exponentiation (**)</li>
                </ul>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold mb-2">Opérateurs de comparaison :</h4>
                <ul className="list-disc list-inside space-y-1">
                  <li>Égal (==)</li>
                  <li>Différent (!=)</li>
                  <li>Supérieur (&gt;)</li>
                  <li>Inférieur (&lt;)</li>
                  <li>Supérieur ou égal (&gt;=)</li>
                  <li>Inférieur ou égal (&lt;=)</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-blue-600 mb-4">
          <Database className="h-8 w-8" />
          <h2 className="text-xl font-semibold ml-3">Structures de Données</h2>
        </div>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Listes</h3>
            <p className="text-gray-600 mb-4">
              Des séquences ordonnées et modifiables d'éléments. Elles sont créées en utilisant des 
              crochets [], et les éléments peuvent être de différents types. On peut accéder aux 
              éléments par leur index (position), en commençant par 0. Les listes supportent le 
              découpage (slicing) pour obtenir des sous-listes, et de nombreuses méthodes pour 
              ajouter, supprimer, trier et manipuler les éléments.
            </p>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`# Création d'une liste
nombres = [1, 2, 3, 4, 5]

# Accès aux éléments
premier = nombres[0]  # 1
dernier = nombres[-1]  # 5

# Découpage
sous_liste = nombres[1:4]  # [2, 3, 4]`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Dictionnaires</h3>
            <p className="text-gray-600 mb-4">
              Des collections non ordonnées de paires clé-valeur. Ils sont créés en utilisant des 
              accolades {}. Les valeurs sont accessibles en utilisant leur clé correspondante. Les 
              dictionnaires sont très efficaces pour la recherche de valeurs basée sur des clés.
            </p>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`# Création d'un dictionnaire
personne = {
    "nom": "Alice",
    "age": 25,
    "ville": "Paris"
}

# Accès aux valeurs
nom = personne["nom"]  # "Alice"
age = personne.get("age")  # 25`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-blue-600 mb-4">
          <GitBranch className="h-8 w-8" />
          <h2 className="text-xl font-semibold ml-3">Structures de Contrôle</h2>
        </div>
        
        <div className="space-y-6">
          <p className="text-gray-600">
            Python utilise des instructions if, elif (else if), et else pour l'exécution conditionnelle 
            de code. Les boucles for sont utilisées pour itérer sur des séquences (comme des listes 
            ou des chaînes de caractères) ou un nombre spécifié de fois en utilisant la fonction 
            range(). Les boucles while permettent de répéter un bloc de code tant qu'une condition 
            est vraie.
          </p>

          <div>
            <h3 className="text-lg font-semibold mb-3">Conditions</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`age = 18
if age >= 18:
    print("Majeur")
elif age >= 16:
    print("Presque majeur")
else:
    print("Mineur")`}</code>
            </pre>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">Boucles</h3>
            <pre className="bg-gray-100 p-4 rounded">
              <code>{`# Boucle for avec range
for i in range(5):
    print(i)  # Affiche 0, 1, 2, 3, 4

# Boucle while
compteur = 0
while compteur < 5:
    print(compteur)
    compteur += 1`}</code>
            </pre>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center text-blue-600 mb-4">
          <Function className="h-8 w-8" />
          <h2 className="text-xl font-semibold ml-3">Fonctions</h2>
        </div>
        
        <p className="text-gray-600 mb-6">
          Les fonctions en Python sont définies à l'aide du mot-clé def, suivi du nom de la fonction, 
          des paramètres entre parenthèses, et d'un deux-points. Le bloc de code de la fonction est 
          indenté. Les fonctions peuvent prendre des arguments (des valeurs passées à la fonction) 
          et peuvent renvoyer des valeurs à l'aide du mot-clé return. Les fonctions sont essentielles 
          pour organiser le code en modules réutilisables, ce qui rend les programmes plus faciles à 
          comprendre et à maintenir.
        </p>

        <pre className="bg-gray-100 p-4 rounded mb-6">
          <code>{`def calculer_moyenne(nombres):
    """Calcule la moyenne d'une liste de nombres"""
    if not nombres:
        return 0
    return sum(nombres) / len(nombres)

# Utilisation de la fonction
notes = [15, 17, 12, 19, 14]
moyenne = calculer_moyenne(notes)
print(f"La moyenne est : {moyenne}")`}</code>
        </pre>
      </div>

      {renderQuiz('python', [
        {
          question: "Quel est le type de la valeur 3.14 en Python ?",
          options: [
            { value: "a", text: "int" },
            { value: "b", text: "float" },
            { value: "c", text: "str" }
          ]
        },
        {
          question: "Comment créer une liste vide en Python ?",
          options: [
            { value: "a", text: "list()" },
            { value: "b", text: "[]" },
            { value: "c", text: "Les deux réponses sont correctes" }
          ]
        },
        {
          question: "Quelle boucle utiliser pour répéter un code 5 fois ?",
          options: [
            { value: "a", text: "while i < 5" },
            { value: "b", text: "for i in range(5)" },
            { value: "c", text: "loop(5)" }
          ]
        }
      ], {
        q1: 'b',
        q2: 'c',
        q3: 'b'
      })}
    </div>
  );
}