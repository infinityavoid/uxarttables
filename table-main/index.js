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

  const scrollToEmployee = () => {
    const hash = location.hash.substring(1);
    const accordionAnchor = document.querySelector(`.accordion-content[data-employee="${hash}"]`);
    if (!accordionAnchor) return;

    // Function to open all parent accordions
    const openParents = (element) => {
      let parent = element.parentElement;
      while (parent) {
        if (parent.classList?.contains('accordion')) {
          if (!parent.classList.contains('open')) {
            parent.classList.add('open');
          }
        }
        parent = parent.parentElement;
      }
    };

    openParents(accordionAnchor);

    accordionAnchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    accordionAnchor.classList.add('highlighted');

    setTimeout(() => {
      accordionAnchor.classList.remove('highlighted');
    }, 700);
  };

  scrollToEmployee();



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
    if (!inputs.length) return
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

  const accordions =  document.querySelectorAll('.accordion-title');
  accordions.forEach((el)=> {
    el.addEventListener('click', ()=>{
      el.closest('.accordion').classList.toggle('open')
    })
  })
  calculateAndOutput();
  initDetailPopup()
  initFilterSelect()
  initMoreTab()
  getCurrentQuaterAndScroll()
})