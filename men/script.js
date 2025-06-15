let menIndex = 0;
let womenIndex = 0;
let shoeIndex = 0;

function swipe(section, direction) {
    const carousel = document.getElementById(`${section}-carousel`);
    const items = carousel.querySelectorAll('carousel-item');
    const itemWidth = items[0].offsetWidth;

    if (section === 'men') {
        menIndex += direction;
        if (menIndex < 0) menIndex = items.length - 1;
        if (menIndex >= items.length) menIndex = 0;
        carousel.style.transform = `translateX(-${menIndex * itemWidth}px)`;
    } else if (section === 'women') {
        womenIndex += direction;
        if (womenIndex < 0) womenIndex = items.length - 1;
        if (womenIndex >= items.length) womenIndex = 0;
        carousel.style.transform = `translateX(-${womenIndex * itemWidth}px)`;
    } else if (section === 'shoe') {
      shoeIndex += direction;
      if (shoeIndex < 0) shoeIndex = items.length - 1;
      if (shoeIndex >= items.length) shoeIndex = 0;
      carousel.style.transform = `translateX(-${shoeIndex * itemWidth}px)`;
  }
}

document.querySelector('.continue-shopping').addEventListener('click', function(e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
