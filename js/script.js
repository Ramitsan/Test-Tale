document.addEventListener('DOMContentLoaded', () => {
  const sections = [...document.querySelectorAll('section')];

  const openedSections = sections.map(() => false);
  const hideSections = () => {
    sections.forEach((section, index) => {
      if (openedSections[index] == false) {
        section.style.transform = `translateY(${document.documentElement.clientHeight}px)`;
        section.style.opacity = '1';
      }
    })
  }

  const checkOpened = () => {
    const bodyHeight = document.documentElement.clientHeight;
    sections.forEach((it, index) => {

      if (it.getBoundingClientRect().top - bodyHeight - bodyHeight < 0 && openedSections[index] == false) {
        openedSections[index] = true;
        it.style.opacity = '';
        it.style.transform = '';
        it.style.transitionDuration = '1s';
        console.log(index);
      }
    })
  }

  window.onscroll = checkOpened;
  window.onresize = () => {
    hideSections();
    checkOpened();
  }
  hideSections();
  checkOpened();
});


