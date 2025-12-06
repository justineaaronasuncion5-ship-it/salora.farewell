// Reveal elements on scroll using IntersectionObserver
(function(){
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('in-view');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.12});

  document.querySelectorAll('.animate-on-scroll').forEach(el=>io.observe(el));
})();
