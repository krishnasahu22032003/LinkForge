"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import Button from "../ui/Button";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

const navItems = ["Features", "Testimonials", "About"];

const Navbar = () => {
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { y: currentScrollY } = useWindowScroll();
    const navContainerRef = useRef<HTMLDivElement>(null);
    const router = useRouter() ;

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
        <>
            <div
                ref={navContainerRef}
                className="fixed inset-x-0 top-4 z-50 h-[68px] sm:inset-x-6 transition-all duration-700"
            >
                <header className="absolute top-1/2 w-full -translate-y-1/2">
                    <nav className="flex size-full items-center justify-between px-5 sm:px-10">
                        <Link href="#home" className="flex items-center gap-2 group">
                            <div className="logo-mark" />

                            <span className="text-[20px] font-bold tracking-[-0.04em]">
                                Link<span className="gradient-text">Forge</span>
                            </span>
                        </Link>

                        <div className="hidden md:flex items-center gap-9">
                            <div className="flex items-center gap-8">
                                {navItems.map((item) => (
                                    <a
                                        key={item}
                                        href={`#${item.toLowerCase()}`}
                                        className="nav-link"
                                    >
                                        {item}
                                    </a>
                                ))}
                            </div>

                            <div className="flex items-center gap-3">
                                <Button
                                    onClick={()=>router.push("/signin")}
                                    variant="secondary"
                                    size="lg"
                                    className="cursor-pointer"
                                >
                                    Sign in
                                </Button>

                                <Button
                                 onClick={()=>router.push("/signup")}
                                    variant="primary"
                                    size="lg"
                                    className="cursor-pointer"
                                >
                                    Get started
                                </Button>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
                        >
                            <Menu size={22} />
                        </button>
                    </nav>
                </header>
            </div>

            <div
                className={`fixed inset-0 z-[100] md:hidden transition-all duration-300 ${
                    isMenuOpen
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                }`}
            >
                <div
                    className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    onClick={() => setIsMenuOpen(false)}
                />

                <div
                    className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-300 ${
                        isMenuOpen
                            ? "translate-y-0"
                            : "-translate-y-6"
                    }`}
                >
                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl"
                    >
                        <X size={22} />
                    </button>

                    <div className="flex flex-col items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase()}`}
                                className="text-xl font-semibold"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </a>
                        ))}

                        <div className="mt-4 flex w-[240px] flex-col gap-3">
                            <Button
                                onClick={()=>router.push("/signin")}
                                variant="secondary"
                                size="lg"
                                className="w-full"
                            >
                                Sign in
                            </Button>

                            <Button
                            onClick={()=>router.push("/signup")}
                                variant="primary"
                                size="lg"
                                className="w-full"
                            >
                                Get started
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;