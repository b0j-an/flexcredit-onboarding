import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Award, CheckCircle2, XCircle, RotateCcw, Sparkles, Trophy, ArrowRight, ShieldCheck, Download, Share2 } from 'lucide-react';
import { quizQuestions } from '../data/onboardingData';
import { EmployeeProfile } from '../types';
import { playSound } from '../utils/audio';
import { getGrammarTerms } from '../utils/grammar';

interface KnowledgeQuizProps {
  profile: EmployeeProfile;
  soundEnabled: boolean;
}

export const KnowledgeQuiz: React.FC<KnowledgeQuizProps> = ({ profile, soundEnabled }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const currentQ = quizQuestions[currentIdx];
  const grammar = getGrammarTerms(profile.gender);

  const handleSelectOption = (idx: number) => {
    if (selectedOption !== null) return; // already answered
    setSelectedOption(idx);
    setShowResult(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
      playSound('success', soundEnabled);
    } else {
      playSound('click', soundEnabled);
    }
  };

  const handleNext = () => {
    playSound('slide', soundEnabled);
    if (currentIdx + 1 < quizQuestions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsFinished(true);
      playSound('complete', soundEnabled);
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#8DC63F', '#1696D4', '#003A53', '#F79646']
      });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsFinished(false);
    playSound('click', soundEnabled);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
      
      {/* Header */}
      <div className="p-6 sm:p-8 bg-gradient-to-r from-[#003A53] via-[#00425F] to-[#1696D4] text-white">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-green/20 text-brand-green border border-brand-green/30 text-xs font-semibold uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              Korak 7: Testiranje i Verifikacija
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-black tracking-tight">
              Kviz Znanja i Onboarding Certifikat
            </h2>
            <p className="text-slate-200 text-sm mt-1">
              Provjeri koliko si upoznao/upoznala Flex Credit poslovanje, vrijednosti i tim.
            </p>
          </div>

          {!isFinished && (
            <div className="bg-white/10 px-4 py-2 rounded-xl border border-white/15 text-center flex-shrink-0">
              <span className="text-xs text-slate-300 block">Pitanje</span>
              <span className="font-display font-black text-xl text-brand-green">
                {currentIdx + 1} <span className="text-white/40 text-sm font-normal">/ {quizQuestions.length}</span>
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="w-full bg-white/10 h-2 rounded-full mt-6 overflow-hidden">
            <div
              className="bg-brand-green h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentIdx + (showResult ? 1 : 0)) / quizQuestions.length) * 100}%` }}
            />
          </div>
        )}
      </div>

      {/* Quiz Body */}
      <div className="p-6 sm:p-8">
        {!isFinished ? (
          <div className="max-w-2xl mx-auto space-y-6">
            
            {/* Question */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-6">
              <h3 className="font-display font-bold text-lg sm:text-xl text-slate-900 leading-snug">
                {currentQ.question}
              </h3>
            </div>

            {/* Options */}
            <div className="space-y-3">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === currentQ.correctIndex;
                
                let btnStyle = 'bg-white hover:bg-slate-50 border-slate-200 text-slate-800';
                if (showResult) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold ring-2 ring-emerald-500/20';
                  } else if (isSelected) {
                    btnStyle = 'bg-rose-50 border-rose-400 text-rose-900 line-through';
                  } else {
                    btnStyle = 'bg-white opacity-50 border-slate-200 text-slate-400';
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={selectedOption !== null}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between text-sm sm:text-base ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{opt}</span>
                    </div>

                    {showResult && (
                      <div>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-600" />}
                        {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-rose-500" />}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explanation & Next */}
            {showResult && (
              <div className="animate-fade-in p-4 rounded-xl bg-cyan-50/60 border border-cyan-200 text-xs sm:text-sm text-cyan-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-brand-cyan mt-0.5 flex-shrink-0" />
                  <p><strong>Objašnjenje:</strong> {currentQ.explanation}</p>
                </div>
                
                <button
                  onClick={handleNext}
                  className="px-5 py-2.5 bg-[#003A53] hover:bg-[#00283A] text-white rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 whitespace-nowrap self-end sm:self-auto shadow-md transition-all"
                >
                  <span>{currentIdx + 1 === quizQuestions.length ? 'Završi Kviz' : 'Sljedeće pitanje'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}

          </div>
        ) : (
          /* Finished & Certificate View */
          <div className="max-w-3xl mx-auto text-center space-y-8 animate-scale-in">
            
            {/* Score Badge */}
            <div className="inline-flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-green to-emerald-400 text-[#003A53] flex items-center justify-center shadow-glow-green mb-3">
                <Trophy className="w-10 h-10" />
              </div>
              <h3 className="font-display font-black text-2xl sm:text-3xl text-slate-900">
                {score >= 4 ? 'Izvanredan rezultat!' : 'Odličan početak!'}
              </h3>
              <p className="text-slate-600 text-sm mt-1">
                Osvojio/la si <strong>{score} od {quizQuestions.length} bodova</strong> ({Math.round((score / quizQuestions.length) * 100)}%).
              </p>
            </div>

            {/* Digital Certificate Box */}
            <div className="bg-gradient-to-br from-[#002C3E] via-[#003A53] to-[#001D2B] p-8 sm:p-10 rounded-3xl text-white shadow-2xl border-4 border-brand-green/40 relative overflow-hidden text-left">
              <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/10 rounded-full blur-3xl pointer-events-none" />
              
              <div className="relative z-10 flex flex-col sm:flex-row justify-between items-start gap-4 border-b border-white/15 pb-6">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-brand-green">Zvanični Onboarding Certifikat</span>
                  <h4 className="text-xl sm:text-2xl font-display font-black text-white tracking-wide mt-1">
                    FLEX CREDIT INTEGRACIJA
                  </h4>
                </div>
                <img
                  src="/assets/branding/flexcredit-symbol.png"
                  alt="Flex Credit"
                  className="h-10 w-auto object-contain brightness-110"
                />
              </div>

              <div className="py-8 text-center space-y-3 relative z-10">
                <p className="text-xs text-slate-300 uppercase tracking-wider">Ovim se potvrđuje da je</p>
                <h2 className="font-display font-black text-2xl sm:text-4xl text-brand-green tracking-tight">
                  {profile.name}
                </h2>
                <p className="text-sm text-slate-200 max-w-lg mx-auto leading-relaxed">
                  uspješno savladao/la onboarding program, upoznao/la procese, kompanijske ciljeve za 2026. godinu i vrijednosti <strong>Flex Credita</strong>.
                </p>
                <div className="pt-2">
                  <span className="inline-block px-3 py-1 rounded-full bg-white/10 text-brand-cyan text-xs font-semibold border border-white/15">
                    Pozicija: {profile.role} · Mentor: {profile.mentorName}
                  </span>
                </div>
              </div>

              <div className="border-t border-white/15 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400 relative z-10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-brand-green" />
                  <span>Verifikovano od strane HR tima Flex Credit</span>
                </div>
                <div className="text-right">
                  <span className="block font-medium text-slate-300">Sanja Knežević</span>
                  <span className="text-[10px] text-slate-400">Regionalni menadžer ljudskih resursa</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <button
                onClick={handleRestart}
                className="px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                Ponovi kviz
              </button>

              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 rounded-xl bg-brand-green hover:bg-brand-green-light text-[#002B3D] font-bold text-sm flex items-center gap-2 shadow-lg hover:shadow-glow-green transition-all"
              >
                <Download className="w-4 h-4" />
                Štampaj / Preuzmi Certifikat
              </button>
            </div>

          </div>
        )}
      </div>

    </div>
  );
};
