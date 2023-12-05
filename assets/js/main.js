var tl = gsap.timeline();

tl.from("nav .logo , .main-menu a, .nav-right a, .nav-right button, nav .nav-right #feedbacCta", {
    y: -100,
    duration: 1,
    delay: 0.5,
    stagger: 0.1
})

tl.from(".hContent h1", {
    x: -200,
    duration: .3,
    opacity: 0, 
    stagger: 0.2,
})

tl.from(".animateHeading", {
    y:50,
    opacity: 0,
})

tl.from(".contentBox_front", {
    x: 100,
    opacity: 0,
})

tl.from(".contentBox_back", {
    scale: 1, 
    opacity: 0,
    duration: 5,
    rotate: -7,
})