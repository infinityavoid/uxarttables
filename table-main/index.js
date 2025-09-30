document.addEventListener('DOMContentLoaded', () => {
  const quaters = document.querySelectorAll('.grid-header__cell.resize')

  quaters.forEach((el) => {
    el.addEventListener('click', () => {
      parentEl = el.parentElement
      parentEl.classList.toggle('closed')
      const target = parentEl.dataset.quater
      const tableContent = document.querySelectorAll(`.accordion-cell[data-quater="${target}"]`)
      tableContent.forEach((el) => {
        el.classList.toggle('closed')
      })
    })
  })

  const accordions = document.querySelectorAll('.accordion-title');

  function setZIndexForAccordions() {
    const accordionContainers = document.querySelectorAll('.accordion');
    accordionContainers.forEach((container, index) => {
      container.style.zIndex = accordionContainers.length - index;
      const content = container.querySelectorAll('.accordion-content');

      if (!content.length) return;

      content.forEach((el) => {
        if (container.classList.contains('open')) {
          el.style.height = el.scrollHeight + 'px';
          el.style.transform = 'translateY(0)';
        } else {
          el.style.height = '0px';
          el.style.transform = `translateY(-${el.scrollHeight}px)`;
        }
      })
    });
  }
  const scrollToEmployee = () => {
    const hash = location.hash.substring(1);
    const accordionAnchor = document.querySelector(`.accordion-content[data-employee="${hash}"]`);

    if (!accordionAnchor) {
      return;
    }

    if (accordionAnchor.classList.contains('open')) {
      return;
    } else {
      const accordionAnchorParent = accordionAnchor.parentElement;
      accordionAnchorParent.classList.toggle('open');
      if (accordionAnchorParent.classList.contains('open')) {
        accordionAnchor.style.height = accordionAnchor.scrollHeight + 'px';
        accordionAnchor.style.transform = 'translateY(0)';
      } else {
        accordionAnchor.style.height = '0px';
        accordionAnchor.style.transform = `translateY(-${accordionAnchor.scrollHeight}px)`; // Используем шаблонную строку
      }
    }

    accordionAnchor.scrollIntoView({ block: 'start', behavior: "smooth" });
    accordionAnchor.classList.add('highlighted');

    setTimeout(() => {
      accordionAnchor.classList.remove('highlighted');
    }, 700); // 1 секунда
  };

  scrollToEmployee();
  setZIndexForAccordions();

  accordions.forEach((el) => {
    el.addEventListener('click', (event) => {
      const container = event.target.closest('.accordion');
      if (!container) return;

      container.classList.toggle('open');
      const content = container.querySelectorAll('.accordion-content');

      if (!content.length) return;

      content.forEach((el) => {
        if (container.classList.contains('open')) {
          el.style.height = el.scrollHeight + 'px';
          el.style.transform = 'translateY(0)';
        } else {
          el.style.height = '0px';
          el.style.transform = `translateY(-${el.scrollHeight}px)`;
        }
      })
    });
  });

  const initialClosedAccordions = document.querySelectorAll('.accordion:not(.open)');

  initialClosedAccordions.forEach((el) => {
    const content = el.querySelector('.accordion-content');
    if (content) {
      content.style.transform = `translateY(-${content.scrollHeight}px)`;
    }
  });


  const getCurrentQuaterAndScroll = () => {
    const gridContainer = document.querySelector('.grid-container');
    const targetElement = document.querySelector('.grid-header__cell.current');
    const colStart = document.querySelector('.grid-header__cell.first')
    const secondBlock = document.querySelector('.second-block')
    const secondBlockStyles = window.getComputedStyle(secondBlock)
    const gridContainerStyles = window.getComputedStyle(gridContainer)
    const gridMarginLeft = gridContainerStyles.getPropertyValue('margin-left')
    const marginLeft = secondBlockStyles.getPropertyValue('margin-left');
    const paddingLeft = secondBlockStyles.getPropertyValue('padding-left');
    if (gridContainer && targetElement) {
      gridContainer.scrollTo({
        left: targetElement.offsetLeft - colStart.offsetWidth - parseInt(paddingLeft) - parseInt(marginLeft) - (window.innerWidth <= 767 ? parseInt(gridMarginLeft) : 0),
        behavior: 'smooth'
      });
    }
  }

  const initFilterSelect = () => {
    const select = document.querySelector('.header-row__select')
    const currentSelect = document.querySelector('.header-row__select-current');
    currentSelect.addEventListener('click', (e) => {
      e.stopPropagation()
      select.classList.toggle('active')
    })

    document.addEventListener('click', (event) => {
      const target = event.target;
      const isInsideContainer = target.closest('.header-row__select-container');

      if (isInsideContainer) {
        return;
      }

      select.classList.remove('active')
    });
  }

  const initMoreTab = () => {
    const moreTab = document.querySelector('.export-more')
    const moreTabIcon = document.querySelector('.export-more svg')
    moreTabIcon?.addEventListener('click', (e) => {
      e.stopPropagation()
      moreTab.classList.toggle('active')
    })

    document.addEventListener('click', (event) => {
      const target = event.target;
      const isInsideContainer = target.closest('.export-more__content');

      if (isInsideContainer) {
        return;
      }

      moreTab?.classList.remove('active')
    });

  }

  const initDetailPopup = () => {
    const popup = document.querySelector('.popup')
    const button = document.querySelector('.first-block__content-details')
    const closeButton = document.querySelector('.popup-close')
    button?.addEventListener('click', () => {
      popup.classList.add('active')
    })
    closeButton?.addEventListener('click', () => {
      popup.classList.remove('active')
    })
    popup?.addEventListener('click', (e) => {
      const isInsideContainer = e.target.closest('.popup-content')
      if (!isInsideContainer) {
        popup.classList.remove('active')
      }
    })
  }
  const inputs = document.querySelectorAll('input.first-block__content-cell-content');
  const output = document.querySelector('output.first-block__content-cell-content');

  // Функция для расчета и вывода результата
  function calculateAndOutput() {
    if(!inputs.length) return
    const coefficient = parseFloat(inputs[0].value) || 0;
    const salary = parseFloat(inputs[1].value) || 0;
    const numberOfSalaries = parseFloat(inputs[2].value) || 0;

    let result = coefficient * salary * numberOfSalaries;
    if (result < 1) {
      result = 0
    }
    output.textContent = result.toLocaleString('ru-RU'); // Форматируем число в строку с разделением разрядов
  }

  // Добавляем обработчики событий на поля ввода
  inputs.forEach((el) => {
    el.addEventListener('keydown', (evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault())
    el.addEventListener('input', calculateAndOutput)
  })
  calculateAndOutput();
  initDetailPopup()
  initFilterSelect()
  initMoreTab()
  getCurrentQuaterAndScroll()
})