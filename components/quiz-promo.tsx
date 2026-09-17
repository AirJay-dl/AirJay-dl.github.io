import {href} from '@/lib/site';

export function QuizPromo(){return <section className="quiz-promo"><div className="quiz-promo-mark" aria-hidden="true"><span>15</span><i>1</i></div><div><p className="eyebrow">SNOOKER KNOWLEDGE QUIZ</p><h2>Big fan.<br/>How much do you know?</h2><p>Players, Crucible history, famous records and the rules of the table. Play five questions, then continue with a new set.</p></div><div className="quiz-promo-action"><a href={href('/quiz/')}>Take the snooker quiz <span>↗</span></a><p>60 questions · 5 per round</p></div></section>}
