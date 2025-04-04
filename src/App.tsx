import React, { useState } from 'react';
import { BookOpen, Code, Database, Cpu, Network, Terminal, FileCode, Globe, Calculator, Contact as Font, Image, ArrowLeft } from 'lucide-react';
import { ArchitectureSection } from './components/ArchitectureSection';
import { AlgorithmiqueSection } from './components/AlgorithmiqueSection';
import { PythonSection } from './components/PythonSection';
import { DatabaseSection } from './components/DatabaseSection';
import { WebSection } from './components/WebSection';

function App() {
  const [activeSection, setActiveSection] = useState('accueil');
  const [activeSubSection, setActiveSubSection] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizResults, setQuizResults] = useState({});

  const handleQuizSubmit = (section: string, correctAnswers: Record<string, string>) => {
    let score = 0;
    const userAnswers = quizAnswers[section] || {};
    
    Object.keys(correctAnswers).forEach(question => {
      if (userAnswers[question] === correctAnswers[question]) {
        score++;
      }
    });

    setQuizResults({
      ...quizResults,
      [section]: {
        score,
        total: Object.keys(correctAnswers).length
      }
    });
  };

  const handleAnswerChange = (section: string, question: string, answer: string) => {
    setQuizAnswers({
      ...quizAnswers,
      [section]: {
        ...(quizAnswers[section] || {}),
        [question]: answer
      }
    });
  };

  const QuizComponent = ({ section, questions, correctAnswers }) => {
    const result = quizResults[section];
    
    return (
      <div className="bg-white rounded-lg shadow-md p-6 mt-8">
        <h3 className="text-xl font-bold mb-4">Quiz d'auto-évaluation</h3>
        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <p className="font-semibold mb-3">{q.question}</p>
            <div className="space-y-2">
              {q.options.map((option, optIndex) => (
                <label key={optIndex} className="flex items-center space-x-2 p-2 rounded hover:bg-gray-50">
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
          </div>
        )}
      </div>
    );
  };

  const ExerciseComponent = ({ exercises }) => {
    return (
      <div className="space-y-6">
        {exercises.map((exercise, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center space-x-2 mb-4">
              <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                exercise.level === 1 ? 'bg-green-100 text-green-800' :
                exercise.level === 2 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                Niveau {exercise.level}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Exercice {index + 1}</h3>
            <p className="mb-4">{exercise.description}</p>
            {exercise.tasks && (
              <ul className="list-disc list-inside space-y-2">
                {exercise.tasks.map((task, taskIndex) => (
                  <li key={taskIndex}>{task}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderContent = () => {
    switch (activeSection) {
      case 'architecture':
        return <ArchitectureSection onBack={() => setActiveSection('accueil')} />;

      case 'algorithmique':
        return <AlgorithmiqueSection onBack={() => setActiveSection('accueil')} />;

      case 'python':
        return <PythonSection onBack={() => setActiveSection('accueil')} />;

      case 'database':
        return <DatabaseSection onBack={() => setActiveSection('accueil')} />;

      case 'web':
        return <WebSection onBack={() => setActiveSection('accueil')} />;

      case 'representation':
        switch (activeSubSection) {
          case 'numeration':
            const numerationQuiz = {
              questions: [
                {
                  question: "Quelle est la valeur décimale du nombre binaire 1010 ?",
                  options: [
                    { value: "a", text: "8" },
                    { value: "b", text: "10" },
                    { value: "c", text: "12" },
                    { value: "d", text: "14" }
                  ]
                },
                {
                  question: "Comment représente-t-on -5 en complément à deux sur 8 bits ?",
                  options: [
                    { value: "a", text: "11111011" },
                    { value: "b", text: "11111010" },
                    { value: "c", text: "10000101" },
                    { value: "d", text: "01111011" }
                  ]
                },
                {
                  question: "Quelle est la représentation hexadécimale de 1010 1111 ?",
                  options: [
                    { value: "a", text: "AF" },
                    { value: "b", text: "FA" },
                    { value: "c", text: "A7" },
                    { value: "d", text: "7A" }
                  ]
                }
              ],
              correctAnswers: {
                q1: "b",
                q2: "a",
                q3: "a"
              }
            };

            const numerationExercises = [
              {
                level: 1,
                description: "Effectuez les conversions suivantes :",
                tasks: [
                  "Convertir 1101₂ en décimal",
                  "Convertir 25₁₀ en binaire",
                  "Convertir A5₁₆ en binaire"
                ]
              },
              {
                level: 2,
                description: "Représentez les nombres suivants en complément à deux sur 8 bits :",
                tasks: [
                  "-12",
                  "-64",
                  "-128"
                ]
              },
              {
                level: 3,
                description: "Effectuez les opérations suivantes en binaire :",
                tasks: [
                  "1101 + 1001",
                  "10110 - 1101",
                  "1111 × 1010"
                ]
              }
            ];

            return (
              <div className="space-y-8">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => {
                      setActiveSection('accueil');
                      setActiveSubSection('');
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </button>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h2 className="text-xl font-bold text-blue-800 mb-2">Objectifs d'apprentissage</h2>
                  <p>À la fin de cette section, vous serez capable de :</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Comprendre les différents systèmes de numération</li>
                    <li>Convertir des nombres entre les bases 2, 10 et 16</li>
                    <li>Représenter des nombres négatifs en complément à deux</li>
                    <li>Manipuler des nombres à virgule flottante</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Systèmes de numération</h2>
                  <p className="mb-4">
                    En informatique, nous utilisons principalement trois systèmes de numération :
                    le binaire (base 2), le décimal (base 10) et l'hexadécimal (base 16).
                  </p>

                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm my-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Symboles</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exemple</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">Binaire (2)</td>
                        <td className="px-6 py-4">0, 1</td>
                        <td className="px-6 py-4">1101₂</td>
                        <td className="px-6 py-4">Circuits électroniques, stockage</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Décimal (10)</td>
                        <td className="px-6 py-4">0-9</td>
                        <td className="px-6 py-4">13₁₀</td>
                        <td className="px-6 py-4">Usage quotidien</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Hexadécimal (16)</td>
                        <td className="px-6 py-4">0-9, A-F</td>
                        <td className="px-6 py-4">D₁₆</td>
                        <td className="px-6 py-4">Représentation compacte du binaire</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Conversion entre bases</h2>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Décimal vers binaire</h3>
                    <p>Pour convertir un nombre décimal en binaire, on effectue des divisions successives par 2 :</p>
                    <pre className="bg-gray-100 p-4 rounded-lg">
                      {`13₁₀ en binaire :
13 ÷ 2 = 6 reste 1
6 ÷ 2 = 3  reste 0
3 ÷ 2 = 1  reste 1
1 ÷ 2 = 0  reste 1

Résultat : 13₁₀ = 1101₂`}
                    </pre>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Complément à deux</h2>
                  <p className="mb-4">
                    Le complément à deux est utilisé pour représenter les nombres négatifs en binaire.
                    Pour obtenir le complément à deux d'un nombre :
                  </p>
                  <ol className="list-decimal list-inside space-y-2">
                    <li>Écrire le nombre positif en binaire</li>
                    <li>Inverser tous les bits (0→1 et 1→0)</li>
                    <li>Ajouter 1 au résultat</li>
                  </ol>
                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mt-4">
                    <p className="font-semibold">Exemple : -5 sur 8 bits</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>5 en binaire : 00000101</li>
                      <li>Inversion : 11111010</li>
                      <li>+1 : 11111011</li>
                    </ol>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Nombres à virgule flottante</h2>
                  <p className="mb-4">
                    Les nombres à virgule flottante suivent la norme IEEE 754. Ils sont composés de :
                  </p>
                  <ul className="list-disc list-inside space-y-2">
                    <li>Un bit de signe (0 pour positif, 1 pour négatif)</li>
                    <li>Un exposant biaisé</li>
                    <li>Une mantisse</li>
                  </ul>
                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mt-4">
                    <h4 className="font-bold text-red-800">Attention aux erreurs d'arrondi !</h4>
                    <p>Les calculs avec des nombres à virgule flottante peuvent produire des erreurs d'arrondi.
                       Par exemple : 0.1 + 0.2 ≠ 0.3 exactement en binaire.</p>
                  </div>
                </div>

                <QuizComponent
                  section="numeration"
                  questions={numerationQuiz.questions}
                  correctAnswers={numerationQuiz.correctAnswers}
                />

                <ExerciseComponent exercises={numerationExercises} />
              </div>
            );

          case 'caracteres':
            const caracteresQuiz = {
              questions: [
                {
                  question: "Combien de caractères différents peut-on coder avec l'ASCII standard (7 bits) ?",
                  options: [
                    { value: "a", text: "64" },
                    { value: "b", text: "128" },
                    { value: "c", text: "256" },
                    { value: "d", text: "512" }
                  ]
                },
                {
                  question: "Quel encodage est recommandé pour le web ?",
                  options: [
                    { value: "a", text: "ASCII" },
                    { value: "b", text: "UTF-8" },
                    { value: "c", text: "ISO-8859-1" },
                    { value: "d", text: "UTF-32" }
                  ]
                },
                {
                  question: "Combien d'octets sont nécessaires pour encoder le caractère 'é' en UTF-8 ?",
                  options: [
                    { value: "a", text: "1" },
                    { value: "b", text: "2" },
                    { value: "c", text: "3" },
                    { value: "d", text: "4" }
                  ]
                }
              ],
              correctAnswers: {
                q1: "b",
                q2: "b",
                q3: "b"
              }
            };

            const caracteresExercises = [
              {
                level: 1,
                description: "Travail sur l'ASCII :",
                tasks: [
                  "Donnez le code ASCII des caractères 'A', 'Z', '0', '9'",
                  "Quels caractères correspondent aux codes 65, 97, 33 ?",
                  "Quelle est la différence entre les codes des majuscules et des minuscules ?"
                ]
              },
              {
                level: 2,
                description: "Encodage UTF-8 :",
                tasks: [
                  "Combien d'octets sont nécessaires pour encoder 'Hello' ?",
                  "Combien d'octets pour 'Café' ?",
                  "Combien d'octets pour '🌍' (emoji terre) ?"
                ]
              },
              {
                level: 3,
                description: "Programmation :",
                tasks: [
                  "Écrire une fonction qui compte le nombre d'octets d'une chaîne UTF-8",
                  "Créer un décodeur ASCII simple",
                  "Détecter si une chaîne contient des caractères non-ASCII"
                ]
              }
            ];

            return (
              <div className="space-y-8">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => {
                      setActiveSection('accueil');
                      setActiveSubSection('');
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </button>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h2 className="text-xl font-bold text-blue-800 mb-2">Objectifs d'apprentissage</h2>
                  <p>À la fin de cette section, vous serez capable de :</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Comprendre les différents systèmes de codage des caractères</li>
                    <li>Maîtriser l'ASCII et l'Unicode</li>
                    <li>Utiliser les encodages UTF-8 et UTF-16</li>
                    <li>Gérer les problèmes d'encodage courants</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">ASCII</h2>
                  <p className="mb-4">
                    L'ASCII (American Standard Code for Information Interchange) est le plus ancien
                    système de codage des caractères encore utilisé.
                  </p>

                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm my-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Plage</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exemples</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">0-31</td>
                        <td className="px-6 py-4">Caractères de contrôle</td>
                        <td className="px-6 py-4">Retour chariot, saut de ligne</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">32-47</td>
                        <td className="px-6 py-4">Ponctuation et symboles</td>
                        <td className="px-6 py-4">Espace, !, ", #, $, %</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">48-57</td>
                        <td className="px-6 py-4">Chiffres</td>
                        <td className="px-6 py-4">0-9</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">65-90</td>
                        <td className="px-6 py-4">Lettres majuscules</td>
                        <td className="px-6 py-4">A-Z</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">97-122</td>
                        <td className="px-6 py-4">Lettres minuscules</td>
                        <td className="px-6 py-4">a-z</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Unicode et UTF-8</h2>
                  <p className="mb-4">
                    Unicode est un standard qui assigne un numéro unique (point de code) à chaque
                    caractère de toutes les écritures du monde.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">UTF-8</h3>
                  <p className="mb-4">
                    UTF-8 est un encodage à longueur variable qui représente les caractères Unicode
                    sur 1 à 4 octets.
                  </p>

                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm my-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points de code</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Octets</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Exemple</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">0-127</td>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">Caractères ASCII</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">128-2047</td>
                        <td className="px-6 py-4">2</td>
                        <td className="px-6 py-4">Caractères latins accentués</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">2048-65535</td>
                        <td className="px-6 py-4">3</td>
                        <td className="px-6 py-4">Caractères chinois, japonais</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">65536+</td>
                        <td className="px-6 py-4">4</td>
                        <td className="px-6 py-4">Emojis, caractères rares</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <QuizComponent
                  section="caracteres"
                  questions={caracteresQuiz.questions}
                  correctAnswers={caracteresQuiz.correctAnswers}
                />

                <ExerciseComponent exercises={caracteresExercises} />
              </div>
            );

          case 'media':
            const mediaQuiz = {
              questions: [
                {
                  question: "Combien de couleurs différentes peut-on représenter avec le codage RVB 24 bits ?",
                  options: [
                    { value: "a", text: "256" },
                    { value: "b", text: "65 536" },
                    { value: "c", text: "16 777 216" },
                    { value: "d", text: "4 294 967 296" }
                  ]
                },
                {
                  question: "Quelle est la fréquence d'échantillonnage standard pour un CD audio ?",
                  options: [
                    { value: "a", text: "22.05 kHz" },
                    { value: "b", text: "44.1 kHz" },
                    { value: "c", text: "48 kHz" },
                    { value: "d", text: "96 kHz" }
                  ]
                },
                {
                  question: "Quel format d'image utilise une compression avec perte ?",
                  options: [
                    { value: "a", text: "BMP" },
                    { value: "b", text: "PNG" },
                    { value: "c", text: "JPEG" },
                    { value: "d", text: "GIF" }
                  ]
                }
              ],
              correctAnswers: {
                q1: "c",
                q2: "b",
                q3: "c"
              }
            };

            const mediaExercises = [
              {
                level: 1,
                description: "Calcul de taille d'images :",
                tasks: [
                  "Calculer la taille d'une image 800×600 en noir et blanc",
                  "Calculer la taille d'une image 1024×768 en niveaux de gris",
                  "Calculer la taille d'une image 1920×1080 en couleurs RVB"
                ]
              },
              {
                level: 2,
                description: "Audio numérique :",
                tasks: [
                  "Calculer la taille d'un fichier audio mono de 3 minutes (44.1 kHz, 16 bits)",
                  "Comparer la taille entre un fichier stéréo et mono de même durée",
                  "Déterminer le débit binaire d'un fichier MP3 de qualité moyenne"
                ]
              },
              {
                level: 3,
                description: "Traitement d'image :",
                tasks: [
                  "Écrire un programme qui inverse les couleurs d'une image",
                  "Implémenter un filtre de niveau de gris",
                  "Créer un programme de compression d'image simple"
                ]
              }
            ];

            return (
              <div className="space-y-8">
                <div className="flex items-center mb-4">
                  <button
                    onClick={() => {
                      setActiveSection('accueil');
                      setActiveSubSection('');
                    }}
                    className="flex items-center text-blue-600 hover:text-blue-800"
                  >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Retour
                  </button>
                </div>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                  <h2 className="text-xl font-bold text-blue-800 mb-2">Objectifs d'apprentissage</h2>
                  <p>À la fin de cette section, vous serez capable de :</p>
                  <ul className="list-disc list-inside mt-2">
                    <li>Comprendre la représentation numérique des images</li>
                    <li>Maîtriser les différents formats d'image et leurs usages</li>
                    <li>Comprendre la numérisation du son</li>
                    <li>Connaître les principaux formats audio et leurs caractéristiques</li>
                  </ul>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Images numériques</h2>
                  
                  <h3 className="text-xl font-semibold mb-2">Représentation matricielle</h3>
                  <p className="mb-4">
                    Une image numérique est une matrice de pixels, chaque pixel étant représenté
                    par une ou plusieurs valeurs numériques codant sa couleur.
                  </p>

                  <h3 className="text-xl font-semibold mb-2">Codage des couleurs</h3>
                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm my-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mode</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bits/pixel</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeurs possibles</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">Noir et blanc</td>
                        <td className="px-6 py-4">1</td>
                        <td className="px-6 py-4">2 (noir ou blanc)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Niveaux de gris</td>
                        <td className="px-6 py-4">8</td>
                        <td className="px-6 py-4">256 nuances</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">RVB</td>
                        <td className="px-6 py-4">24</td>
                        <td className="px-6 py-4">16.7 millions de couleurs</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">RVBA</td>
                        <td className="px-6 py-4">32</td>
                        <td className="px-6 py-4">RVB + transparence</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-4">Son numérique</h2>
                  
                  <h3 className="text-xl font-semibold mb-2">Numérisation du son</h3>
                  <p className="mb-4">
                    La numérisation du son consiste à convertir une onde sonore continue en une
                    suite de valeurs numériques par échantillonnage.
                  </p>

                  <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-sm my-4">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Paramètre</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valeurs courantes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-6 py-4">Fréquence d'échantillonnage</td>
                        <td className="px-6 py-4">Nombre d'échantillons par seconde</td>
                        <td className="px-6 py-4">44.1 kHz (CD), 48 kHz (DVD)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Résolution</td>
                        <td className="px-6 py-4">Nombre de bits par échantillon</td>
                        <td className="px-6 py-4">16 bits (CD), 24 bits (studio)</td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4">Canaux</td>
                        <td className="px-6 py-4">Nombre de pistes audio</td>
                        <td className="px-6 py-4">1 (mono), 2 (stéréo)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <QuizComponent
                  section="media"
                  questions={mediaQuiz.questions}
                  correctAnswers={mediaQuiz.correctAnswers}
                />

                <ExerciseComponent exercises={mediaExercises} />
              </div>
            );

          default:
            return (
              <div className="space-y-6">
                <h1 className="text-3xl font-bold text-gray-800">Représentation des données</h1>
                <p className="text-gray-600">Découvrez comment les données sont représentées en informatique</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                       onClick={() => setActiveSubSection('numeration')}>
                    <div className="flex items-center text-blue-600 mb-4">
                      <Calculator className="h-8 w-8" />
                      <h2 className="text-xl font-semibold ml-3">Systèmes de numération</h2>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Binaire, décimal, hexadécimal</li>
                      <li>• Conversions entre bases</li>
                      <li>• Nombres entiers et flottants</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                       onClick={() => setActiveSubSection('caracteres')}>
                    <div className="flex items-center text-blue-600 mb-4">
                      <Font className="h-8 w-8" />
                      <h2 className="text-xl font-semibold ml-3">Codage des caractères</h2>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• ASCII et Unicode</li>
                      <li>• Encodages (UTF-8, UTF-16)</li>
                      <li>• Manipulation des chaînes</li>
                    </ul>
                  </div>

                  <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                       onClick={() => setActiveSubSection('media')}>
                    <div className="flex items-center text-blue-600 mb-4">
                      <Image className="h-8 w-8" />
                      <h2 className="text-xl font-semibold ml-3">Images et sons</h2>
                    </div>
                    <ul className="space-y-2 text-gray-600">
                      <li>• Représentation des images</li>
                      <li>• Codage des couleurs</li>
                      <li>• Formats et compression</li>
                    </ul>
                  </div>
                </div>
              </div>
            );
        }

      default:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Représentation des données */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setActiveSection('representation')}>
                <div className="flex items-center text-blue-600 mb-4">
                  <Database className="h-8 w-8" />
                  <h2 className="text-xl font-semibold ml-3">Représentation des données</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Systèmes de numération</li>
                  <li>• Codage des caractères</li>
                  <li>• Images et sons numériques</li>
                </ul>
              </div>

              {/* Architecture */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setActiveSection('architecture')}>
                <div className="flex items-center text-blue-600 mb-4">
                  <Cpu className="h-8 w-8" />
                  <h2 className="text-xl font-semibold ml-3">Architecture</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Modèle de Von Neumann</li>
                  <li>• Processeur et mémoire</li>
                  <li>• Systèmes d'exploitation</li>
                </ul>
              </div>

              {/* Algorithmique */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setActiveSection('algorithmique')}>
                <div className="flex items-center text-blue-600 mb-4">
                  <Code className="h-8 w-8" />
                  <h2 className="text-xl font-semibold ml-3">Algorithmique</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Types de données</li>
                  <li>• Structures de contrôle</li>
                  <li>• Fonctions et procédures</li>
                </ul>
              </div>

              {/* Programmation Python */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setActiveSection('python')}>
                <div className="flex items-center text-blue-600 mb-4">
                  <Terminal className="h-8 w-8" />
                  <h2 className="text-xl font-semibold ml-3">Python</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Bases du langage</li>
                  <li>• Structures de données</li>
                  <li>• Bibliothèques standard</li>
                </ul>
              </div>

              {/* Bases de données */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setActiveSection('database')}>
                <div className="flex items-center text-blue-600 mb-4">
                  <FileCode className="h-8 w-8" />
                  <h2 className="text-xl font-semibold ml-3">Bases de données</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• Modèle relationnel</li>
                  <li>• Langage SQL</li>
                  <li>• CRUD et requêtes</li>
                </ul>
              </div>

              {/* Web */}
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
                   onClick={() => setActiveSection('web')}>
                <div className="flex items-center text-blue-600 mb-4">
                  <Globe className="h-8 w-8" />
                  <h2 className="text-xl font-semibold ml-3">Web</h2>
                </div>
                <ul className="space-y-2 text-gray-600">
                  <li>• HTML et CSS</li>
                  <li>• Protocoles</li>
                  <li>• Client-Serveur</li>
                </ul>
              </div>
            </div>

            {/* Introduction */}
            <div className="mt-12 bg-white rounded-lg shadow-md p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Bienvenue sur votre plateforme de révision NSI</h2>
              <p className="text-gray-600 mb-6">
                Cette plateforme a été conçue pour vous aider à réviser le programme de NSI de première. 
                Chaque section contient des cours, des exercices et des quiz pour tester vos connaissances.
              </p>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                <h3 className="text-lg font-semibold text-blue-700 mb-2">Comment utiliser cette plateforme ?</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Choisissez un thème dans les cartes ci-dessus</li>
                  <li>Lisez attentivement le cours et les exemples</li>
                  <li>Faites les exercices proposés</li>
                  <li>Testez vos connaissances avec les quiz</li>
                  <li>Revenez régulièrement pour réviser</li>
                </ul>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">NSI Première</h1>
              <p className="mt-2 text-blue-100">Programme de révision et d'apprentissage</p>
            </div>
            <nav>
              <button 
                onClick={() => {
                  setActiveSection('accueil');
                  setActiveSubSection('');
                }}
                className="text-white hover:text-blue-200 transition-colors"
              >
                Accueil
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {renderContent()}
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-gray-400">
            © 2024 - Plateforme de révision NSI Première
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;