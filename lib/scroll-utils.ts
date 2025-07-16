/**
 * Smooth scroll utilities for the layered scroll implementation
 */

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const offset = 100; // Account for fixed navbar
    const targetPosition = element.offsetTop - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth',
    });
  }
};

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const scrollToContent = () => {
  const contentElement = document.querySelector('.layered-content');
  if (contentElement) {
    contentElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const getScrollProgress = (): number => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
  return scrollTop / documentHeight;
};

export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

const scrollUtils = {
  scrollToSection,
  scrollToTop,
  scrollToContent,
  getScrollProgress,
  isInViewport,
};

export default scrollUtils;
