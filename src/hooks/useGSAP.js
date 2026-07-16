/**
 * useGSAP — registers GSAP + ScrollTrigger globally once.
 * Import and call this hook at the App level before any
 * component tries to use ScrollTrigger.
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };
