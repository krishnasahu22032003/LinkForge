"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import Button from "../ui/Button";
import Image from "next/image";

const navItems = ["Features", "Pricing", "Testimonials", "About"];

const Navbar = () => {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const { y: currentScrollY } = useWindowScroll();
    const navContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!navContainerRef.current) return;

        if (currentScrollY === 0) {
            setIsNavVisible(true);
            navContainerRef.current.classList.remove("floating-nav");
        } else if (currentScrollY > lastScrollY) {
            setIsNavVisible(false);
            navContainerRef.current.classList.add("floating-nav");
        } else if (currentScrollY < lastScrollY) {
            setIsNavVisible(true);
            navContainerRef.current.classList.add("floating-nav");
        }
        setLastScrollY(currentScrollY);
    }, [currentScrollY, lastScrollY]);

    useEffect(() => {
        gsap.to(navContainerRef.current, {
            y: isNavVisible ? 0 : -100,
            opacity: isNavVisible ? 1 : 0,
            duration: 0.3,
            ease: "power2.out",
        });
    }, [isNavVisible]);

    return (
        <div
            ref={navContainerRef}
            className="fixed inset-x-0 top-4 z-50 h-[72px] sm:inset-x-6 transition-all duration-700"
        >
            <header className="absolute top-1/2 w-full -translate-y-1/2">
                <nav className="flex size-full items-center justify-between px-5 sm:px-10">
<Link href="/" className="flex items-center gap-2 group">
  <div className="logo-mark" />

 <span className="text-[20px] font-bold tracking-[-0.04em]">
  Link<span className="gradient-text">Forge</span>
</span>
</Link>

                    <div className="flex items-center gap-9">
                        <div className="hidden md:flex items-center gap-8">
                            {navItems.map((item) => (
                                <a key={item} href={`#${item.toLowerCase()}`} className="nav-link">
                                    {item}
                                </a>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            <Button variant="secondary" size="lg" className="hidden cursor-pointer sm:inline-flex">
                                Sign in
                            </Button>
                            <Button variant="primary" size="lg" className="cursor-pointer">
                                Get started
                            </Button>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    );
};

export default Navbar;