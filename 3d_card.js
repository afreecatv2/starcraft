let calculateAngle = function(e, item, parent) {
        // let dropShadowColor = `rgba(0, 0, 0, 0.3)`
        let dropShadowColor = `rgba(0, 0, 0, 0.8)`
        if(parent.getAttribute('data-filter-color') !== null) {
            dropShadowColor = parent.getAttribute('data-filter-color');
        }

        parent.classList.add('animated');
        // Get the x position of the users mouse, relative to the button itself
        let x = Math.abs(item.getBoundingClientRect().x - e.clientX);
        // Get the y position relative to the button
        let y = Math.abs(item.getBoundingClientRect().y - e.clientY);

        // Calculate half the width and height
        let halfWidth  = item.getBoundingClientRect().width / 2;
        let halfHeight = item.getBoundingClientRect().height / 2;

        // Use this to create an angle. I have divided by 6 and 4 respectively so the effect looks good.
        // Changing these numbers will change the depth of the effect.
        let calcAngleX = (x - halfWidth) / 6;
        let calcAngleY = (y - halfHeight) / 14;
      
        let gX = (1 - (x / (halfWidth * 2))) * 100;
        let gY = (1 - (y / (halfHeight * 2))) * 100;
      
        // item.querySelector('.glare').style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(199 198 243), transparent)`;
        item.querySelector('.glare').style.background = `radial-gradient(circle at ${gX}% ${gY}%, rgb(225 225 255), transparent)`;
        // And set its container's perspective.
        parent.style.perspective = `${halfWidth * 6}px`
        item.style.perspective = `${halfWidth * 6}px`

        // Set the items transform CSS property
        item.style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04)`;
        parent.querySelector('.inner-card-backface').style.transform = `rotateY(${calcAngleX}deg) rotateX(${-calcAngleY}deg) scale(1.04) translateZ(-4px)`;
      
        if(parent.getAttribute('data-custom-perspective') !== null) {
            parent.style.perspective = `${parent.getAttribute('data-custom-perspective')}`
        }

        // Reapply this to the shadow, with different dividers
        let calcShadowX = (x - halfWidth) / 3;
        let calcShadowY = (y - halfHeight) / 6;
        
        // Add a filter shadow - this is more performant to animate than a regular box shadow.
        item.style.filter = `drop-shadow(${-calcShadowX}px ${-calcShadowY}px 15px ${dropShadowColor})`;
    }

    document.querySelectorAll('.card').forEach(function(item) {
        /* if(item.querySelector('.flip') !== null) {
          item.querySelector('.flip').addEventListener('click', function() {
            item.classList.add('flipped');
          });
        }
        if(item.querySelector('.unflip') !== null) {
          item.querySelector('.unflip').addEventListener('click', function() {
            item.classList.remove('flipped');
          });
        } */
		item.addEventListener('click', function(e) {
            if(item.classList.contains('offline')){
				item.classList.remove('offline');				
			}else{
				item.classList.add('offline');
			}
			setTimeout(() => {
				if(item.classList.contains('onair')){
					item.classList.remove('offline');		
				}else{
					item.classList.add('offline');		
				}
			}, 3000);
        });
        item.addEventListener('mouseenter', function(e) {
            calculateAngle(e, this.querySelector('.inner-card'), this);
        });

        item.addEventListener('mousemove', function(e) {
            calculateAngle(e, this.querySelector('.inner-card'), this);
        });

        item.addEventListener('mouseleave', function(e) {
            let dropShadowColor = `rgba(0, 0, 0, 0.3)`
            if(item.getAttribute('data-filter-color') !== null) {
                dropShadowColor = item.getAttribute('data-filter-color')
            }
            item.classList.remove('animated');
            item.querySelector('.inner-card').style.transform = `rotateY(0deg) rotateX(0deg) scale(1)`;
            item.querySelector('.inner-card-backface').style.transform = `rotateY(0deg) rotateX(0deg) scale(1.01) translateZ(-4px)`;
            item.querySelector('.inner-card').style.filter = `drop-shadow(0 10px 15px ${dropShadowColor})`;
        });
    })