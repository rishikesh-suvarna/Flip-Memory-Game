'use client'

import Card from '@/components/Card'
import SuccessModal from '@/components/SuccessModal';
import { ShootingStars } from '@/components/ui/shooting-stars';
import { StarsBackground } from '@/components/ui/stars-background';
import React from 'react'
import Confetti from 'react-confetti';


type ActionProps = 
{ type: 'SET_CARDS', payload: any[] } | 
{ type: 'SET_TURNS', payload: number } | 
{ type: 'SET_CHOICE_ONE', payload: any } | 
{ type: 'SET_CHOICE_TWO', payload: any } | 
{ type: 'DISABLED', payload: boolean } | 
{ type: 'RESET' } | 
{ type: 'SHOW_CONFETTI', payload: boolean };


type StateProps = {
  cards: any[];
  turns: number;
  choiceOne: any | null;
  choiceTwo: any | null;
  disabled: boolean;
  showConfetti: boolean;
};


const CARDS = [
  {
    img: '/images/cpp.png',
    name: '1',
    matched: false
  },
  {
    img: '/images/go.png',
    name: '2',
    matched: false
  },
  {
    img: '/images/java.png',
    name: '3',
    matched: false
  },
  {
    img: '/images/js.png',
    name: '4',
    matched: false
  },
  {
    img: '/images/php.png',
    name: '5',
    matched: false
  },
  {
    img: '/images/python.png',
    name: '6',
    matched: false
  },
  {
    img: '/images/react.png',
    name: '7',
    matched: false
  },
  {
    img: '/images/ts.png',
    name: '8',
    matched: false
  },
];

const INITAL_STATE: StateProps = {
  cards: [],
  turns: 0,
  choiceOne: null,
  choiceTwo: null,
  disabled: false,
  showConfetti: false,
};

const reducer = (state: typeof INITAL_STATE, action: ActionProps) => {
  switch (action.type) {
    case 'SET_CARDS':
      return { ...state, cards: action.payload };
    case 'SET_TURNS':
      return { ...state, turns: action.payload === 0 ? 0 : state.turns + 1 };
    case 'SET_CHOICE_ONE':
      return { ...state, choiceOne: action.payload };
    case 'SET_CHOICE_TWO':
      return { ...state, choiceTwo: action.payload };
    case 'DISABLED':
      return { ...state, disabled: action.payload };
    case 'SHOW_CONFETTI':
      return { ...state, showConfetti: action.payload };  
    case 'RESET':
      return INITAL_STATE
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, INITAL_STATE);

  const shuffleCards = () => {
    const shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(0);
  };

  const setCards = (cards: any[]) => dispatch({ type: 'SET_CARDS', payload: cards });
  const setTurns = React.useCallback((turns: number) => dispatch({ type: 'SET_TURNS', payload: turns }), []);
  const setChoiceOne = React.useCallback((choice: any) => dispatch({ type: 'SET_CHOICE_ONE', payload: choice }), []);
  const setChoiceTwo = React.useCallback((choice: any) => dispatch({ type: 'SET_CHOICE_TWO', payload: choice }), []);
  const setDisabled = React.useCallback((disabled: boolean) => dispatch({ type: 'DISABLED', payload: disabled }), []);
  const showConfetti = (show: boolean) => dispatch({ type: 'SHOW_CONFETTI', payload: show });
  const reset = () => {
    setTurns(0);
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
    shuffleCards();
    showConfetti(false);
  };

  const handleChoice = (card: any) => {
    if (!state.choiceOne) {
      setChoiceOne(card);
    } else {
      setChoiceTwo(card);
    }
  };

  const resetTurn = React.useCallback(() => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(1);
    setDisabled(false);
  }, [setChoiceOne, setChoiceTwo, setTurns, setDisabled]);

  React.useEffect(() => {
    if (state.choiceOne && state.choiceTwo) {
      if (state.choiceOne.name === state.choiceTwo.name) {
        const newCards = state.cards.map((card) => {
          if (card.name === state.choiceOne.name) {
            return { ...card, matched: true };
          }
          return card;
        });

        setCards(newCards);
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 500)
      }
    }
  }, [state.choiceOne, state.choiceTwo]);

  React.useEffect(() => {
    let t: any;
    if (state.cards.length && state.cards.every((card) => card.matched)) {
      setTimeout(() => showConfetti(true), 1000);
    }
    () => {
      clearTimeout(t);
    }
  }, [state.cards]);

  React.useEffect(() => {
    shuffleCards();
    console.log(`Nothing here... Don't get caught cheating!`)
  }, []);

  return (
    <main className='bg-black text-white'>
      {state.showConfetti && <Confetti />}
      <section className='py-10 z-10 relative'>
        <div className="px-2 sm:px-8 lg:px-0 w-full lg:w-1/2 mx-auto">
          <div className="flex items-end justify-between mb-8">
            <h1 className='text-6xl text-center'>Flip Game</h1>
            <p className='text-center text-3xl'>Turns: {state.turns}</p>
          </div>
          <div className={`grid grid-cols-4 gap-3 ${state.disabled ? 'pointer-events-none' : ''}`}>
            {
              state.cards.map((card) => (
                <Card
                  card={card}
                  key={card.id}
                  flipped={state.choiceOne === card || state.choiceTwo === card || card.matched}
                  front={card.img}
                  disabled={state.disabled}
                  handleChoice={handleChoice}
                />
              ))
            }
          </div>
        </div>
      </section>
      {
        state.showConfetti && (
          <SuccessModal
            title='Congratulations!'
            message={`You have completed the game in ${state.turns} turns`}
            onClickHandler={reset}
            buttonLabel='Play Again'
          />
        )
      }
      <ShootingStars />
      <StarsBackground />
    </main>
  )
}

export default Home