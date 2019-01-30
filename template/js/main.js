(function($){

      var $projects = $('.projects'),  // contenedor de projectos
          $project = $('.project'),     // projecto individual
          $projectImageBefore = CSSRulePlugin.getRule(".project-image:before") , // decoration
          $projectImageAfter = CSSRulePlugin.getRule(".project-image:after") ,   // decoration
          tlProjects, tlProject;

      // Main projects timeline
      tlProjects = new TimelineMax();

      tlProjects
        .set($projects, {autoAlpha: 1})

      tlProject = new TimelineMax({repeat: -1, repeatDelay: 2});


      $project.each(function(index, element){

        var projectClasses = $(this).attr('class').split(' '),
            projectClass = projectClasses[1],
            $pixel = $(this).find('.pixel'),
            $pixels = $(this).find('.project-pixels'),
            $projectTitle = $(this).find('.project-title'),
            $projectSubtitle = $(this).find('.project-subtitle'),
            $projectImage = $(this).find('.project-image');


        // Project CTA

        var tlProjectsCTA = new TimelineMax(),
            $projectLink = $(this).find('.button-container'),
            $projectLinkButton = $(this).find('.button'),
            $projectLinkSpan = $(this).find('.bp'),
            $projectLinkText = $(this).find('.bp-text');

        tlProjectsCTA
        .to($projectSubtitle, 0.3, {autoAlpha: 0, yPercent: 100, ease:Back.easeOut})
        .staggerFrom($projectLinkSpan, 0.3, {autoAlpha: 0, yPercent: -100, ease:Back.easeOut}, 0.1)
        .from($projectLinkText,  0.3, {autoAlpha: 0, x: '-100%', ease:Power4.easeInOut}, '-=0.2');


        // Create a project timeline

        tlProject
          .set([$projectTitle,$projectSubtitle, $pixel], {autoAlpha: 0})
          .fromTo($projectImage, 0.4, {autoAlpha: 0, xPercent: '-200'}, {autoAlpha: 1, xPercent: '-10', ease:Power4.easeInOut, onStart: updateClass, onStartParams: [projectClass]})
          .add('imageIn')
          .staggerFromTo($pixel,0.3,{autoAlpha: 0, x: '-=10'},{autoAlpha: 1, x: '0', ease: Power4.easeInOut},0.05, '-=0.2')
          .add('pixelsIn')
          .fromTo($projectTitle, 0.7, {autoAlpha: 0, xPercent: '-50'}, {autoAlpha: 1, xPercent: '-5', ease: Power4.easeInOut}, '-=0.4')
          .fromTo($projectSubtitle, 0.7, {autoAlpha: 0, xPercent: '-50'}, {autoAlpha: 2, xPercent: '-5', ease: Power4.easeInOut},'-=0.5')
          .add('titleIn')
          .add(tlProjectsCTA, '+=2') // but button animation to the project timeline
          .to($projectTitle, 4.3, {xPercent: '+=5', ease:Linear.easeNone}, 'titleIn-=0.1')
  	    	.to($projectSubtitle, 4.3, {xPercent: '+=2', ease:Linear.easeNone}, 'titleIn-=0.2')
          .add('titleOut')
          .to($projectImage,5,{xPercent: '0', ease:Linear.easeNone, onComplete: pauseProjects}, 'imageIn')
          .add('imageOut')
          .to($pixels, 4.1, {x: '-5', ease:Linear.easeNone}, 'pixelsIn')
          .to([$projectTitle, $projectSubtitle, $projectLink], 0.5, {autoAlpha: 0, xPercent: '+=10', ease:Power4.easeInOut}, 'titleOut')
  	    	.to($projectImage, 0.4, {autoAlpha: 0, xPercent: '+=80', ease:Power4.easeInOut}, 'imageOut');

        // Add project to the projects timeline
  	    tlProjects.add(tlProject);

      });

      // create a function to update the body class

      function updateClass(projectClass){
        $('body').attr('class', projectClass)
      }

      function pauseProjects(){

        tlProjects.pause();

      }

})(jQuery);
