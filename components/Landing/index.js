'use client'
import Image from 'next/image'
import styles from './style.module.css'
import { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { slideUp } from './animation';
import profile from "../../public/image_profile.png";
import { motion } from 'framer-motion';
import dayjs from "dayjs";
import About from '@/components/About'
import {
    FADE_DOWN_ANIMATION_VARIANTS,
    FADE_LEFT_ANIMATION_VARIANTS,
    FADE_OPACITY_ANIMATION_VARIANTS,
    FADE_RIGHT_ANIMATION_VARIANTS,
  } from "@/anim/revealAnim";
  import { ArrowRight, Check, Copy, Github, Instagram, Linkedin, Mail, MessagesSquare } from "lucide-react";
  import Link from "next/link";
  import { Button } from "@/components/ui/button";
import Sidebar from '../sidebar';
export default function Home() {

  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  let xPercent = 0;
  let direction = -1;

  const [currentTime, setCurrentTime] = useState("");
  const [currentYear, setCurrentYear] = useState("2023");
  const [buttonText, setButtonText] = useState("Copy email");

  function handleEmailCopy() {
    navigator.clipboard.writeText("fadadoussama@gmail.com");
    setButtonText("Copied");

    setTimeout(() => {
      setButtonText("Copy email");
    }, 3000);
  }


  useEffect(() => {
    const updateClock = () => {
        const now = dayjs();
        const formattedTime = now.format("ddd HH:mm:ss A");
        setCurrentTime(formattedTime);
        setCurrentYear(now.year());
      };
  
      // Update time initially
      updateClock();
  }, [])
  useLayoutEffect( () => {
    gsap.registerPlugin(ScrollTrigger);
    gsap.to(slider.current, {
      scrollTrigger: {
        trigger: document.documentElement,
        scrub: 0.25,
        start: 0,
        end: window.innerHeight,
        onUpdate: e => direction = e.direction * -1
      },
      x: "-500px",
    })
    requestAnimationFrame(animate);
  }, [])



  const animate = () => {
    if(xPercent < -100){
      xPercent = 0;
    }
    else if(xPercent > 0){
      xPercent = -100;
    }
    gsap.set(firstText.current, {xPercent: xPercent})
    gsap.set(secondText.current, {xPercent: xPercent})
    requestAnimationFrame(animate);
    xPercent += 0.1 * direction;
  }

  return (
    <motion.div variants={slideUp} initial="initial" animate="enter" className={styles.landing}>
      <Image 
        src="/images/background.jpg"
        fill={true}
        alt="background"
      />
      <div className={styles.sliderContainer}>
        <div ref={slider} className={styles.slider}>
          <p ref={firstText}>Freelance Developer -</p>
          <p ref={secondText}>Freelance Developer -</p>
        </div>
      </div>
      <Sidebar />
        <motion.div
            initial="hidden"
            animate="show"
            viewport={{ once: true }}
            variants={{
            hidden: {},
            show: {
                transition: {
                staggerChildren: 0.1,
                },
            },
            }}
            className="case text-textColor"
        >
        <div className="flex flex-col justify-center items-center gap-4 w-full">
          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="mb-6">
            <p className="font-mono text-accent text-xs tracking-wider uppercase font-medium">{currentTime}</p>
          </motion.div>

          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="relative h-20 w-20">
            <Image src={profile} alt="profile" placeholder="blur" fill priority className="object-cover object-center rounded-full" />
          </motion.div>

          <div className="flex flex-col flex-nowrap items-center justify-center gap-4 w-full text-center">
            <div className="flex flex-col flex-nowrap justify-center items-center gap-y-2 w-full">
              <motion.h1 variants={FADE_DOWN_ANIMATION_VARIANTS} className="text-[22px]">
                Younes Ayoub
              </motion.h1>
              <motion.p variants={FADE_DOWN_ANIMATION_VARIANTS} className="text-lg text-accent">
                Web & App Developer Based In Morocco{" "}
                <Image src="/flag.png" alt="flag" width={300} height={300} className="inline-block h-[18px] w-[18px]" />
              </motion.p>
            </div>

            <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex flex-nowrap justify-center items-center gap-x-4 w-full">
              <div className="relative flex justify-center items-center rounded-full h-2 w-2 bg-green-400">
                <span className="animate-ping absolute h-3 w-3 rounded-full bg-green-400 opacity-50"></span>
              </div>

              <div>
                <p className="text-sm text-accent">Available for new opportunities</p>
              </div>
            </motion.div>
          </div>

          <motion.div variants={FADE_DOWN_ANIMATION_VARIANTS} className="flex items-center gap-x-8 py-3">
            <a
              href="https://github.com/fadadOussama"
              target="_blank"
              className="cursor-pointer text-primary hover:text-textColor active:scale-125 transition-all duration-300"
            >
              <Github size={24} strokeWidth={1.25} />
            </a>

            <a
              href="https://www.linkedin.com/in/fadad-oussama"
              target="_blank"
              className="cursor-pointer text-primary hover:text-textColor active:scale-125 transition-all duration-300"
            >
              <Linkedin size={24} strokeWidth={1.25} />
            </a>

            <a
              href="https://www.instagram.com/oussamafadad/"
              target="_blank"
              className="cursor-pointer text-primary hover:text-textColor active:scale-125 transition-all duration-300"
            >
              <Instagram size={24} strokeWidth={1.25} />
            </a>
          </motion.div>

          <motion.div
            variants={{
              show: {
                transition: {
                  staggerChildren: 0,
                },
              },
            }}
            className="flex mb:flex-row flex-col justify-center items-center gap-x-4 gap-y-2 mb:max-w-[80%] max-w-full w-full"
          >
            <motion.div className="w-full" variants={FADE_LEFT_ANIMATION_VARIANTS}>
              <Button onClick={handleEmailCopy} disabled={buttonText === "Copied" && true} className="w-full" variant="default">
                <div className="flex justify-center items-center gap-x-2">
                  {buttonText}
                  {buttonText === "Copy email" ? <Copy size={18} strokeWidth={1.25} /> : <Check size={18} strokeWidth={1.25} />}
                </div>
              </Button>
            </motion.div>

            <motion.div variants={FADE_OPACITY_ANIMATION_VARIANTS} className="text-accent text-sm">
              <span>or</span>
            </motion.div>

            <motion.div className="w-full" variants={FADE_RIGHT_ANIMATION_VARIANTS}>
              <a href="mailto:fadadoussama@gmail.com?subject=Mail%20from%20website" target="_blank" className="w-full">
                <Button className="w-full" variant="secondary">
                  <div className="flex justify-center items-center gap-x-2">
                    Contact me
                    <Mail size={18} strokeWidth={1.25} />
                  </div>
                </Button>
              </a>
            </motion.div>
          </motion.div>

          <motion.div variants={FADE_OPACITY_ANIMATION_VARIANTS}>
            <div className="py-3">
              <p className="font-mono text-accent text-xs tracking-wider uppercase font-medium">CB, MA · 33.571187° N, -7.597979° W</p>
            </div>
          </motion.div>

        </div>
       </motion.div>
       </motion.div>
  )
}