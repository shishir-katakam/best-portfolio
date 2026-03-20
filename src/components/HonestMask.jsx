import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import { motion, useSpring, useMotionValue, useMotionTemplate, useTransform } from 'framer-motion';

const CursorContext = createContext();

export const CursorProvider = ({ children, isLoaded }) => {
    const mouseX = useMotionValue(-1000);
    const mouseY = useMotionValue(-1000);
    const [hoverCount, setHoverCount] = useState(0); // Counter to handle multiple hovers
    const isHoveringVal = useMotionValue(0);

    const springConfig = { damping: 25, stiffness: 150 };
    const cursorX = useSpring(mouseX, springConfig);
    const cursorY = useSpring(mouseY, springConfig);
    const hoverSpring = useSpring(isHoveringVal, springConfig);

    useEffect(() => {
        const handleMouseMove = (e) => {
            mouseX.set(e.clientX);
            mouseY.set(e.clientY);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Global toggle for all children
    const setIsHovering = (isHovering) => {
        setHoverCount(prev => isHovering ? prev + 1 : Math.max(0, prev - 1));
    };

    useEffect(() => {
        isHoveringVal.set(hoverCount > 0 ? 1 : 0);
    }, [hoverCount]);

    return (
        <CursorContext.Provider value={{ 
            cursorX, cursorY, mouseX, mouseY, 
            isHovering: hoverCount > 0, 
            setIsHovering, hoverSpring, isLoaded 
        }}>
            {children}
            <CustomCursor />
        </CursorContext.Provider>
    );
};

export const useCursor = () => useContext(CursorContext);

const CustomCursor = () => {
    const { cursorX, cursorY, hoverSpring } = useCursor();
    const size = useTransform(hoverSpring, [0, 1], [12, 300]);

    return (
        <motion.div
            style={{
                left: cursorX,
                top: cursorY,
                translateX: '-50%',
                translateY: '-50%',
                width: size,
                height: size,
            }}
            className="fixed pointer-events-none z-[20000] flex items-center justify-center"
        >
            <div className="w-full h-full rounded-full bg-accent shadow-[0_0_50px_rgba(235,94,40,0.3)]" />
        </motion.div>
    );
};

export const DualText = ({ professional, honest }) => {
    const { setIsHovering, cursorX, cursorY, mouseX, mouseY, hoverSpring, isLoaded } = useCursor();
    const [isLocalHover, setIsLocalHover] = useState(false);
    const [measured, setMeasured] = useState(false);
    const containerRef = useRef(null);
    const isHoveredRef = useRef(false); // Direct reference for synchronous logic
    
    // Motion values for element position
    const rectLeft = useMotionValue(0);
    const rectTop = useMotionValue(0);

    const updateRectAndCollision = () => {
        if (!containerRef.current || !isLoaded) {
            // Force reset if splash screen is still up
            if (isHoveredRef.current) {
                isHoveredRef.current = false;
                setIsLocalHover(false);
                setIsHovering(false);
            }
            return;
        }
        
        const rect = containerRef.current.getBoundingClientRect();
        rectLeft.set(rect.left);
        rectTop.set(rect.top);
        if (!measured) setMeasured(true);

        const mx = mouseX.get();
        const my = mouseY.get();
        const isInside = (
            mx >= rect.left && 
            mx <= rect.right && 
            my >= rect.top && 
            my <= rect.bottom
        );

        if (isInside !== isHoveredRef.current) {
            isHoveredRef.current = isInside;
            setIsLocalHover(isInside);
            setIsHovering(isInside);
        }
    };

    // Calculate relative position for the masks
    const relativeX = useTransform([cursorX, rectLeft], ([x, left]) => x - left);
    const relativeY = useTransform([cursorY, rectTop], ([y, top]) => y - top);
    const maskRadius = useTransform(hoverSpring, [0, 1], [0, 150]);
    
    // The reveal mask: shows only inside the circle
    const maskImage = useMotionTemplate`radial-gradient(${maskRadius}px circle at ${relativeX}px ${relativeY}px, black 100%, transparent 100%)`;
    
    useEffect(() => {
        // Update whenever mouse moves, page scrolls, or splash screen finishes
        updateRectAndCollision();
        
        const unsubX = mouseX.on('change', updateRectAndCollision);
        const unsubY = mouseY.on('change', updateRectAndCollision);
        
        // Polling to handle transitions/layout shifts
        const interval = setInterval(updateRectAndCollision, 50);
        
        window.addEventListener('resize', updateRectAndCollision);
        window.addEventListener('scroll', updateRectAndCollision, true);

        const observer = new ResizeObserver(updateRectAndCollision);
        if (containerRef.current) observer.observe(containerRef.current);

        return () => {
            unsubX();
            unsubY();
            clearInterval(interval);
            window.removeEventListener('resize', updateRectAndCollision);
            window.removeEventListener('scroll', updateRectAndCollision, true);
            observer.disconnect();
            
            if (isHoveredRef.current) {
                setIsHovering(false);
            }
        };
    }, [isLoaded]); // CRITICAL: Re-initialize listeners and force check when splash screen vanishes

    return (
        <span
            ref={containerRef}
            className="relative inline-grid group"
            onMouseMove={updateRectAndCollision}
            style={{ cursor: 'none' }}
        >
            {/* Professional Text – always visible (will be covered by the orange ball) */}
            <span className="[grid-area:1/1] relative whitespace-normal text-center text-inherit flex items-center justify-center pointer-events-none select-none">
                {professional}
            </span>

            {/* Honest Text – revealed only where the cursor is */}
            <motion.span
                className="[grid-area:1/1] relative pointer-events-none text-[#0D0D0D] font-black whitespace-normal text-center flex items-center justify-center z-[20001]"
                style={{
                    WebkitMaskImage: maskImage,
                    maskImage: maskImage,
                    opacity: hoverSpring,
                }}
            >
                {honest}
            </motion.span>
        </span>
    );
};
