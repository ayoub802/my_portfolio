'use client';
import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
import "./style.module.css"
import { useScroll, motion, useTransform } from 'framer-motion'
const phrase = "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.";

export default function index() {

    const element = useRef(null)
    const { scrollYProgress } = useScroll({
        target: element,
        offset: ['start 1', 'start 0.25']
    })
    const words = phrase.split(" ");
//   let refs = useRef([]);
//   const body = useRef(null);
//   const container = useRef(null);

//   useEffect( () => {
//     gsap.registerPlugin(ScrollTrigger);
//     createAnimation();
//   }, [])

//   const createAnimation = () => {
//       gsap.to(refs.current, {
//         scrollTrigger: {
//             trigger: container.current,
//             scrub: true,
//             start: `top`,
//             end: `+=${window.innerHeight / 1.5}`,
//         },
//         opacity: 1,
//         ease: "none",
//         stagger: 0.1
//     })
//   }

//   const splitWords = (phrase) => {
//     let body = [];
//     phrase.split(" ").forEach( (word, i) => {
//       const letters = splitLetters(word);
//       body.push(<p key={word + "_" + i}>{letters}</p>)
//     })
//     return body
//   }

//   const splitLetters = (word) => {
//     let letters = []
//     word.split("").forEach( (letter, i) => {
//       letters.push(<span key={letter + "_" + i} ref={el => {refs.current.push(el)}}>{letter}</span>)
//     })
//     return letters;
//   }

  return (
    // <div ref={container} className={styles.main}>
    //   <div ref={body} className={styles.body}>
    //     {
    //       splitWords(phrase)
    //     }
    //   </div>
    // </div>
    <div>
    <div style={{height: "25vh"}}></div>
      <p className='text-[50px] max-w-[1200px] mx-auto flex flex-wrap leading-[1] text-white' ref={element}>
        {
            words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length)
                return <Word key={i} range={[start, end]} progress={scrollYProgress}>{word}</Word>
            })
        }
      </p>
    <div style={{height: "25vh"}}></div>
    </div>
  )
}

const Word = ({
    children,
    range,
    progress
}) => {
    const opacity = useTransform(progress, range, [0, 1])
    return(
        <span className='mr-3 mt-3 relative'>
          <span className='absolute opacity-10'>{children}</span>
          <motion.span style={{opacity}}>{children}</motion.span>
         </span>
    )
}