import React, { useEffect, useRef } from 'react'
import { ArrowRight, Sparkles,ImageIcon, Menu, X } from 'lucide-react'
import { Button } from '../components/ui/button'
import { AnimatedGroup } from '../components/ui/animated-group'
import { cn } from '../lib/utils'
import { Link } from 'react-router-dom'

const UnicornStudio = window.UnicornStudio;

const transitionVariants = {
    item: {
        hidden: {
            opacity: 0,
            filter: 'blur(12px)',
            y: 12,
        },
        visible: {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            transition: {
                type: 'spring',
                bounce: 0.3,
                duration: 1.5,
            },
        },
    },
}

export function HeroSection() {
    const unicornRef = useRef(null);
    const sceneRef = useRef(null);

    useEffect(() => {
        if (typeof UnicornStudio !== 'undefined' && unicornRef.current) {
            console.log("Adding Unicorn Studio scene to:", unicornRef.current.id);

            UnicornStudio.addScene({
                elementId: unicornRef.current.id,
                projectId: "V0Rh4G06DX2ixwQO8yp7",
                scale: 1,
                dpi: 1,
                lazyload: false,
                fit: "contain",
                altText: "Interactive background animation",
                ariaLabel: "Unicorn Studio background animation"
            })
                .then((scene) => {
                    sceneRef.current = scene;
                    console.log("Unicorn Studio background animation loaded successfully:", scene);
                })
                .catch((err) => {
                    console.log("Failed to add Unicorn Studio scene:", err);
                });
        } else {
            console.log("UnicornStudio debug:", {
                available: typeof UnicornStudio !== 'undefined',
                refReady: !!unicornRef.current
            });
        }

        return () => {
            if (sceneRef.current?.destroy) {
                console.log("Destroying Unicorn Studio Scene");
                sceneRef.current.destroy();
                sceneRef.current = null;
            }
        };
    }, []);

    return (
        <>
            <HeroHeader />
            <main className="overflow-hidden relative">
                {/* Unicorn Studio Animation Background */}
                <div
                    id="unicorn-hero-animation"
                    ref={unicornRef}
                    className="w-full relative"
                    style={{
                        width: "1920px",
                        height: "1080px",
                        maxWidth: "100%",
                        aspectRatio: "16/9",
                        zIndex: 1,
                        background: "rgba(0, 0, 0, 0.8)", // Dark fallback background
                        objectFit: "contain"
                    }}
                />

                {/* Dark overlay for better text readability */}
                <div 
                    className="absolute w-full bg-black/40"
                    style={{ 
                        zIndex: 2,
                        width: "1920px",
                        height: "1080px",
                        maxWidth: "100%",
                        aspectRatio: "16/9",
                        top: 0,
                        left: 0
                    }}
                />

                {/* Content positioned over the video */}
                <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 100 }}>
                    <div className="mx-auto max-w-7xl px-6 w-full">
                        <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                            <AnimatedGroup variants={transitionVariants}>
                                <a
                                    href="#link"
                                    className="hover:bg-white/10 bg-black/20 group mx-auto flex w-fit items-center gap-4 rounded-full border border-white/20 p-1 pl-4 shadow-md transition-all duration-300">
                                    <span className="text-white text-sm">Introducing Support for AI Models</span>
                                    <span className="block h-4 w-0.5 border-l bg-white/30"></span>

                                    <div className="bg-white/10 group-hover:bg-white/20 size-6 overflow-hidden rounded-full duration-500">
                                        <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3 text-white" />
                                            </span>
                                            <span className="flex size-6">
                                                <ArrowRight className="m-auto size-3 text-white" />
                                            </span>
                                        </div>
                                    </div>
                                </a>
                    
                                <h1
                                    className="mt-8 max-w-4xl mx-auto text-balance text-6xl md:text-7xl lg:mt-16 xl:text-[5.25rem] text-white">
                                    Transform Your Ideas Into Stunning AI Art
                                </h1>
                                <p
                                    className="mx-auto mt-8 max-w-2xl text-balance text-lg text-white/90">
                                    Experience the future of creativity with our advanced AI image generation. Turn your wildest imagination into breathtaking visuals in seconds. it.
                                </p>
                            </AnimatedGroup>

                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-col items-center justify-center gap-2 md:flex-row">
                                <div
                                    key={1}
                                    className="bg-white/10 rounded-[14px] border border-white/20 p-0.5">
                                    <Button
                                        asChild
                                        size="lg"
                                        className="rounded-xl px-5 text-base bg-white text-black hover:bg-white/90">
                                        <Link to="/register">
                                            <span className="text-nowrap">Get Started</span>
                                        </Link>
                                    </Button>
                                </div>
                                <Button
                                    key={2}
                                    asChild
                                    size="lg"
                                    variant="ghost"
                                    className="h-10.5 rounded-xl px-5 text-white border border-white/20 hover:bg-white/10">
                                    <Link to="/login">
                                        <span className="text-nowrap">Sign In</span>
                                    </Link>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>
                </div>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Features', href: '#link' },
    { name: 'Solution', href: '#link' },
    { name: 'Pricing', href: '#link' },
    { name: 'About', href: '#link' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [isScrolled, setIsScrolled] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="fixed z-20 w-full px-2 group">
                <div className={cn('mx-auto mt-2 max-w-6xl px-6 transition-all duration-300 lg:px-12', isScrolled && 'bg-black/50 max-w-4xl rounded-2xl border border-white/20 backdrop-blur-lg lg:px-5')}>
                    <div className="relative flex flex-wrap items-center justify-between gap-6 py-3 lg:gap-0 lg:py-4">
                        <div className="flex w-full justify-between lg:w-auto">
                            <a
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <Logo />
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu className="in-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>
                        </div>

                        <div className="absolute inset-0 m-auto hidden size-fit lg:block">
                            <ul className="flex gap-8 text-sm">
                                {menuItems.map((item, index) => (
                                    <li key={index}>
                                        <a
                                            href={item.href}
                                            className="text-white hover:text-white/80 block duration-150">
                                            <span>{item.name}</span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-black/50 group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border border-white/20 p-6 shadow-2xl md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none">
                            <div className="lg:hidden">
                                <ul className="space-y-6 text-base">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-white hover:text-white/80 block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden', 'text-white border-white/20 hover:bg-white/10')}>
                                    <a href="#">
                                        <span>Login</span>
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled && 'lg:hidden', 'bg-white text-black hover:bg-white/90')}>
                                    <a href="#">
                                        <span>Sign Up</span>
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    size="sm"
                                    className={cn(isScrolled ? 'lg:inline-flex' : 'hidden', 'bg-white text-black hover:bg-white/90')}>
                                    <a href="#">
                                        <span>Get Started</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}

const Logo = ({ className }) => {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-white" />
              </div>
            <span className="text-2xl font-bold text-white">PromptVision</span>
        </div>
    )
}
