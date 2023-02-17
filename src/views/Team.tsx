import { Typography } from '@material-ui/core';
import React, { FC, useState, useEffect } from 'react';

export const Team: FC = () => {
  /* This example requires Tailwind CSS v2.0+ */
  const people = [
    {
      name: 'rightclickable',
      role: 'rightclickable',
      imageUrl:
        'https://arweave.net/9yntiSbCFBuCBJiYgd57PxJPmZwQ6Zn11PB0RX9XFXk',
      twitterUrl: 'https://twitter.com/rightclickable'
    },
    {
      name: '0xAlice',
      role: '0xAlice',
      imageUrl:
        'https://arweave.net/axqUWb2AWhwgm71N93--LcdZnr3tcA3DVPlifP-APXA',
      twitterUrl: 'https://twitter.com/0xAlice_'
    },
    {
      name: 'FOMOBY',
      role: 'FOMOBY',
      imageUrl:
        'https://arweave.net/wfNYflbJXIM7Nnltl7yipa50QodefAoM3QjaSeEUnV0',
      twitterUrl: 'https://twitter.com/FOMOBYDICK'
    },
    {
      name: '0xNeuroD',
      role: '0xNeuroD',
      imageUrl:
        'https://arweave.net/0xN1ZNQ8B7zR87vwueQBqx_CuHbuqoYX5jXlZwalzdM',
      twitterUrl: 'https://twitter.com/0xNeuroD'
    }
  ];

  function useWindowSize() {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: window.innerWidth,
      height: window.innerHeight
    });
    useEffect(() => {
      // Handler to call on window resize
      function handleResize() {
        // Set window width/height to state
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight
        });
      }
      // Add event listener
      window.addEventListener('resize', handleResize);
      // Call handler right away so state gets updated with initial window size
      handleResize();
      // Remove event listener on cleanup
      return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount
    return windowSize;
  }

  const size = useWindowSize();
  return (
    <div
      style={{
        maxWidth: 'calc(100% - 4rem)',
        width: '1200px',
        margin: '3rem auto 0',
        padding: '0 2rem'
      }}
    >
      <div
        style={{
          position: 'relative',
          padding: '1rem 2rem 2rem',
          marginBottom: '5rem'
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: '#303030',
            opacity: 0.75,
            borderRadius: '2rem',
            boxShadow: '0px 5px 15px -2px rgba(0,0,0,0.33)',
            zIndex: -1
          }}
        />

        <Typography
          variant={size.width < 720 ? 'h3' : 'h2'}
          style={{
            textAlign: 'center',
            marginBottom: '2rem',
            marginTop: '1rem',
            width: '100%',
            display: 'inline-flex',
            justifyContent: 'center'
          }}
        >
          <div className="space-y-5 sm:space-y-4 md:max-w-xl lg:max-w-3xl xl:max-w-none">
            <h2 className="text-center text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
              Meet our Team
            </h2>
          </div>
        </Typography>
        <hr />

        <div
          style={{
            padding: '0.5rem 1rem',
            maxWidth: '100%',
            marginBottom: '1rem'
          }}
        >
          <div className="mt-5 pt-5">
            <div className="space-y-12">
              {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
              <ul
                role="list"
                className="space-y-4 sm:grid sm:grid-cols-2 sm:gap-6 sm:space-y-0 lg:gap-8"
              >
                {people.map((person) => (
                  <li
                    key={person.name}
                    className="py-10 px-6 border border-solid border-green-500 text-center rounded-lg xl:px-10 xl:text-left"
                  >
                    <div className="space-y-6 xl:space-y-10">
                      <a
                        href={person.twitterUrl}
                        className="text-gray-400 hover:text-gray-300"
                      >
                        <img
                          className="mx-auto h-40 w-40 rounded-full xl:w-56 xl:h-56"
                          src={person.imageUrl}
                          alt=""
                        />
                      </a>
                      <div className="space-y-2 xl:flex xl:items-center xl:justify-between">
                        <div className="font-medium text-lg leading-6 space-y-1">
                          <h3 className="text-white">{person.name}</h3>
                          {/* <p className="text-green-400">{person.role}</p> */}
                        </div>
                        {/* eslint-disable-next-line jsx-a11y/no-redundant-roles */}
                        <ul
                          role="list"
                          className="flex justify-center space-x-5"
                        >
                          <li>
                            <a
                              href={person.twitterUrl}
                              className="text-gray-400 hover:text-gray-300"
                            >
                              <span className="sr-only">Twitter</span>
                              <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
                              </svg>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
