'use client'

import Card from '@/components/Card'
import React, { useLayoutEffect } from 'react'

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
      return { ...state, turns: action.payload };
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
    const shuffledCards = [...CARDS, ...CARDS]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setCards(shuffledCards);
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns();
  };

  const setCards = (cards: any[]) => dispatch({ type: 'SET_CARDS', payload: cards });
  const setTurns = () => dispatch({ type: 'SET_TURNS', payload: state.turns + 1 });
  const setChoiceOne = (choice: any) => dispatch({ type: 'SET_CHOICE_ONE', payload: choice });
  const setChoiceTwo = (choice: any) => dispatch({ type: 'SET_CHOICE_TWO', payload: choice });
  const setDisabled = (disabled: boolean) => dispatch({ type: 'DISABLED', payload: disabled });
  const reset = () => dispatch({ type: 'RESET' });

  useLayoutEffect(() => {
    shuffleCards();
  }, []);

  return (
    <main>
      <section className='py-10'>
        <div className='container mx-auto'>
          <h1 className='text-4xl font-light text-center mb-8'>Flip Game</h1>
          <div className="grid grid-cols-4 gap-4">
            {
              state.cards.map((card, index) => (
                <Card
                  key={index}
                  matched={card.matched}
                  front={card.img}
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