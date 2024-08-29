'use client'

import Card from '@/components/Card'
import React, { useCallback } from 'react'

type Action = { type: 'SET_CARDS', payload: any[] } | { type: 'SET_TURNS', payload: number } | { type: 'SET_CHOICE_ONE', payload: any } | { type: 'SET_CHOICE_TWO', payload: any } | { type: 'DISABLED', payload: boolean } | { type: 'RESET' };
type State = {
  cards: any[];
  turns: number;
  choiceOne: any | null;
  choiceTwo: any | null;
  disabled: boolean;
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

const INITAL_STATE: State = {
  cards: [],
  turns: 0,
  choiceOne: null,
  choiceTwo: null,
  disabled: false,
};

const reducer = (state: typeof INITAL_STATE, action: Action) => {
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
    case 'RESET':
      return INITAL_STATE
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = React.useReducer(reducer, INITAL_STATE);

  const shuffleCards = () => {
    console.log(`Shuffling Cards`);
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
  const reset = () => dispatch({ type: 'RESET' });

  const handleChoice = (card: any) => {
    console.log(card)
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
    console.log(`Running`);
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
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [state.choiceOne, state.choiceTwo]);
  
  React.useEffect(() => {
    shuffleCards();
  }, []);

  return (
    <main>
      <section className='py-10'>
        <div className='max-w-[800px] mx-auto'>
          <div className="flex items-center justify-between mb-8">
            <h1 className='text-5xl font-light text-center'>Flip Game</h1>
            <p className='text-center font-mono text-normal'>Turns: {state.turns}</p>
          </div>
            <div className="grid grid-cols-4 gap-3">
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
    </main>
  )
}

export default Home