'use client';

import {useMemo,useState} from 'react';
import {quizCategories,quizQuestions,type QuizCategory} from '@/content/quiz';

const perRound=5;
type GtagWindow=Window&{gtag?:(...args:unknown[])=>void};

export function QuizGame(){
  const [blocks,setBlocks]=useState<Record<QuizCategory,number>>({rules:0,tournaments:0,players:0});
  const [category,setCategory]=useState<QuizCategory|null>(null);
  const [round,setRound]=useState(0);
  const [index,setIndex]=useState(0);
  const [selected,setSelected]=useState<number|null>(null);
  const [score,setScore]=useState(0);
  const [finished,setFinished]=useState(false);

  const questions=useMemo(()=>category?quizQuestions.filter(item=>item.category===category).slice(round*perRound,round*perRound+perRound):[],[category,round]);
  const question=questions[index];
  const currentCategory=quizCategories.find(item=>item.id===category);

  function track(name:string,params:Record<string,string|number>){(window as GtagWindow).gtag?.('event',name,params)}
  function start(nextCategory:QuizCategory){
    const nextRound=blocks[nextCategory];
    setCategory(nextCategory);setRound(nextRound);setIndex(0);setSelected(null);setScore(0);setFinished(false);
    track('quiz_start',{quiz_category:nextCategory,quiz_round:nextRound+1});
  }
  function answer(option:number){
    if(selected!==null||!question)return;
    setSelected(option);
    if(option===question.answer)setScore(value=>value+1);
  }
  function next(){
    if(index<questions.length-1){setIndex(value=>value+1);setSelected(null);return}
    setFinished(true);
    track('quiz_complete',{quiz_category:category||'',quiz_round:round+1,quiz_score:score});
  }
  function nextRound(){
    if(!category)return;
    const next=(round+1)%4;
    setBlocks(value=>({...value,[category]:next}));
    setRound(next);setIndex(0);setSelected(null);setScore(0);setFinished(false);
    track('quiz_start',{quiz_category:category,quiz_round:next+1});
  }
  function chooseAgain(){setCategory(null);setSelected(null);setFinished(false);setScore(0);setIndex(0)}

  if(!category)return <section className="quiz-chooser" aria-labelledby="choose-quiz"><div className="section-bar"><div><p className="eyebrow">CHOOSE YOUR CHALLENGE</p><h2 id="choose-quiz">Three ways into the game</h2></div><span>No timer · Play at your pace</span></div><div className="quiz-category-grid">{quizCategories.map(item=><article key={item.id} className="quiz-category-card"><span className="quiz-number">{item.number}</span><p className="eyebrow">{item.kicker}</p><h3>{item.title}</h3><p>{item.description}</p><label htmlFor={`quiz-set-${item.id}`}>Choose a five-question set</label><select id={`quiz-set-${item.id}`} value={blocks[item.id]} onChange={event=>setBlocks(value=>({...value,[item.id]:Number(event.target.value)}))}>{[0,1,2,3].map(value=><option key={value} value={value}>Set {value+1}</option>)}</select><div className="quiz-card-footer"><span>20 questions</span><button type="button" onClick={()=>start(item.id)}>Start quiz</button></div></article>)}</div><p className="quiz-source-note">Every answer includes a short explanation and a source. Questions are editorially checked; the quiz is free and requires no account.</p></section>;

  if(finished)return <section className="quiz-result" aria-live="polite"><p className="eyebrow">ROUND COMPLETE</p><h2>{score} / {questions.length}</h2><p>{score===5?'A maximum clearance. Perfect score.':score>=3?'A solid visit. Try another set to build the break.':'A useful warm-up. Review the explanations and take another set.'}</p><div className="quiz-result-actions"><button type="button" onClick={nextRound}>Play the next set</button><button className="secondary" type="button" onClick={chooseAgain}>Choose another category</button></div></section>;

  return <section className="quiz-play" aria-labelledby="quiz-question"><div className="quiz-progress"><div><span>{currentCategory?.title}</span><strong>Set {round+1} · Question {index+1} of {questions.length}</strong></div><div className="quiz-progress-track" aria-hidden="true"><i style={{width:`${((index+(selected!==null?1:0))/questions.length)*100}%`}}/></div><span>Score {score}</span></div><div className="quiz-question-card"><p className="eyebrow">QUESTION {String(index+1).padStart(2,'0')}</p><h2 id="quiz-question">{question.question}</h2><div className="quiz-options">{question.options.map((option,optionIndex)=>{const answered=selected!==null;const correct=optionIndex===question.answer;const chosen=selected===optionIndex;return <button type="button" disabled={answered} className={answered&&correct?'correct':answered&&chosen?'incorrect':''} key={option} onClick={()=>answer(optionIndex)}><span>{String.fromCharCode(65+optionIndex)}</span>{option}</button>})}</div>{selected!==null&&<div className={`quiz-explanation ${selected===question.answer?'is-correct':'is-incorrect'}`} aria-live="polite"><strong>{selected===question.answer?'Correct':'Not quite'} — {question.options[question.answer]}</strong><p>{question.explanation}</p><a href={question.source.url}>{question.source.label} ↗</a><button type="button" onClick={next}>{index===questions.length-1?'See your score':'Next question'} →</button></div>}</div></section>;
}
