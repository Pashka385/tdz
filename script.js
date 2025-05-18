
const quizData = [
  {
    id: 1,
    question_text: "Какова основная функция операционной системы?",
    answers: [
      { id: 1, answer_text: "Писать код", is_correct: false },
      { id: 2, answer_text: "Управлять аппаратными и программными ресурсами компьютера", is_correct: true },
      { id: 3, answer_text: "Просматривать интернет", is_correct: false },
      { id: 4, answer_text: "Разрабатывать графику", is_correct: false }
    ]
  },
  {
    id: 2,
    question_text: "Какой из следующих вариантов НЕ является операционной системой?",
    answers: [
      { id: 5, answer_text: "Windows", is_correct: false },
      { id: 6, answer_text: "Linux", is_correct: false },
      { id: 7, answer_text: "Photoshop", is_correct: true },
      { id: 8, answer_text: "macOS", is_correct: false }
    ]
  },
  {
    id: 3,
    question_text: "Что означает аббревиатура ЦП?",
    answers: [
      { id: 9, answer_text: "Центральный Процессор", is_correct: true },
      { id: 10, answer_text: "Компьютерный Персональный Устройство", is_correct: false },
      { id: 11, answer_text: "Центральный Программный Устройство", is_correct: false },
      { id: 12, answer_text: "Компьютерный Процессор Пользователя", is_correct: false }
    ]
  },
  {
    id: 4,
    question_text: "Какой язык программирования считается языком низкого уровня, близким к машинному коду?",
    answers: [
      { id: 13, answer_text: "Python", is_correct: false },
      { id: 14, answer_text: "Ассемблер", is_correct: true },
      { id: 15, answer_text: "Java", is_correct: false },
      { id: 16, answer_text: "C++", is_correct: false }
    ]
  },
  {
    id: 5,
    question_text: "Какой тип памяти является энергозависимым и теряет содержимое при отключении питания?",
    answers: [
      { id: 17, answer_text: "ПЗУ", is_correct: false },
      { id: 18, answer_text: "ОЗУ", is_correct: true },
      { id: 19, answer_text: "Жесткий диск", is_correct: false },
      { id: 20, answer_text: "SSD", is_correct: false }
    ]
  },
  {
    id: 6,
    question_text: "Что означает аббревиатура HTML?",
    answers: [
      { id: 21, answer_text: "Язык разметки гипертекста", is_correct: true },
      { id: 22, answer_text: "Язык гипертекстовой машины", is_correct: false },
      { id: 23, answer_text: "Язык разметки высокого текста", is_correct: false },
      { id: 24, answer_text: "Язык гипертекстовых таблиц", is_correct: false }
    ]
  },
  {
    id: 7,
    question_text: "Какой протокол в основном используется для передачи веб-страниц в интернете?",
    answers: [
      { id: 25, answer_text: "FTP", is_correct: false },
      { id: 26, answer_text: "SMTP", is_correct: false },
      { id: 27, answer_text: "HTTP", is_correct: true },
      { id: 28, answer_text: "HTTPS", is_correct: false }
    ]
  },
  {
    id: 8,
    question_text: "Какое устройство используется для долговременного хранения данных?",
    answers: [
      { id: 29, answer_text: "ОЗУ", is_correct: false },
      { id: 30, answer_text: "ЦП", is_correct: false },
      { id: 31, answer_text: "Жесткий диск", is_correct: true },
      { id: 32, answer_text: "Кэш", is_correct: false }
    ]
  },
  {
    id: 9,
    question_text: "Что такое 'ошибка' в терминах программирования?",
    answers: [
      { id: 33, answer_text: "Программная ошибка", is_correct: true },
      { id: 34, answer_text: "Аппаратное устройство", is_correct: false },
      { id: 35, answer_text: "Руководство пользователя", is_correct: false },
      { id: 36, answer_text: "Инструмент программирования", is_correct: false }
    ]
  },
  {
    id: 10,
    question_text: "Какой из этих вариантов является популярной парадигмой программирования?",
    answers: [
      { id: 37, answer_text: "Объектно-ориентированное программирование", is_correct: true },
      { id: 38, answer_text: "Водопад", is_correct: false },
      { id: 39, answer_text: "Agile", is_correct: false },
      { id: 40, answer_text: "Scrum", is_correct: false }
    ]
  }
];

    let currentQuestionIndex = 0;
    let score = 0;
    let userAnswers = [];
    let selectedAnswerId = null;

    function initQuiz() {
      document.getElementById('total-questions-result').textContent = quizData.length;
      updateProgress();
      showQuestion();
    }

    function showQuestion() {
      const quizBox = document.getElementById('quiz-box');
      quizBox.innerHTML = '';
      if (currentQuestionIndex >= quizData.length) {
        showResults();
        return;
      }

      const question = quizData[currentQuestionIndex];
      const questionElement = document.createElement('div');
      questionElement.className = 'question-box fade-in';
      questionElement.innerHTML = `
        <div class="question-text">${question.question_text}</div>
        <div class="answers-container">
          ${question.answers.map(answer => `
            <button class="answer-btn" data-id="${answer.id}">${answer.answer_text}</button>
          `).join('')}
        </div>
      `;

      quizBox.appendChild(questionElement);

      document.querySelectorAll('.answer-btn').forEach(button => {
        button.addEventListener('click', () => {
          document.querySelectorAll('.answer-btn').forEach(btn => btn.classList.remove('selected'));
          button.classList.add('selected');
          selectedAnswerId = parseInt(button.dataset.id);
        });
      });
    }

    function nextQuestion() {
      const question = quizData[currentQuestionIndex];

      if (selectedAnswerId != null) {
        const selectedAnswer = question.answers.find(a => a.id === selectedAnswerId);
        userAnswers.push({
          question_id: question.id,
          selected_answer_id: selectedAnswerId,
          is_correct: selectedAnswer.is_correct
        });
        if (selectedAnswer.is_correct) score++;
      } else {
        userAnswers.push({
          question_id: question.id,
          selected_answer_id: null,
          is_correct: false
        });
      }

      currentQuestionIndex++;
      selectedAnswerId = null;
      updateProgress();
      showQuestion();
    }

    function updateProgress() {
      const progressPercent = (currentQuestionIndex / quizData.length) * 100;
      document.getElementById('progress-bar').style.width = `${progressPercent}%`;
      document.getElementById('progress-text').textContent =
        `Вопрос ${Math.min(currentQuestionIndex + 1, quizData.length)} из ${quizData.length}`;
    }

    function showResults() {
      document.getElementById('quiz-box').style.display = 'none';
      document.querySelector('.controls').style.display = 'none';
      document.getElementById('result-box').style.display = 'block';
      document.getElementById('final-score').textContent = score;

      const percentage = (score / quizData.length) * 100;
      const emojiElement = document.getElementById('result-emoji');
      emojiElement.textContent = percentage >= 80 ? '😍' : percentage >= 50 ? '😊' : '😢';
    }

function generateCertificate() {
    // Получаем данные пользователя
    const userName = document.getElementById('username').value || 'Аноним';
    const dateStr = new Date().toLocaleDateString('ru-RU');
    const certElement = document.getElementById('certificate-template');
    
    // Устанавливаем данные в шаблон
    document.getElementById('certificate-name').textContent = userName;
    document.getElementById('certificate-score').textContent = score;
    document.getElementById('certificate-total').textContent = quizData.length;
    document.getElementById('certificate-date').textContent = dateStr;

    // Временно показываем и позиционируем элемент для рендеринга
    certElement.style.display = 'block';
    certElement.style.position = 'fixed';
    certElement.style.left = '0';
    certElement.style.top = '0';
    certElement.style.zIndex = '99999';
    certElement.style.width = '800px';
    certElement.style.height = '600px';

    // Ждем ререндер страницы
    setTimeout(() => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: 'landscape',
            unit: 'mm',
            format: 'a4'
        });

        html2canvas(certElement, {
            scale: 2, // Улучшаем качество
            logging: false,
            useCORS: true,
            width: 800,
            height: 600,
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            // Сразу скрываем элемент после рендеринга
            certElement.style.display = 'none';
            certElement.style.position = 'absolute';
            certElement.style.left = '-9999px';

            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save(`IT_Сертификат_${userName.replace(/\s+/g, '_')}.pdf`);
        }).catch(err => {
            console.error("Ошибка генерации сертификата:", err);
            alert("Ошибка при создании сертификата. Попробуйте снова.");
            // Все равно скрываем элемент в случае ошибки
            certElement.style.display = 'none';
            certElement.style.position = 'absolute';
            certElement.style.left = '-9999px';
        });
    }, 100); // Даем 100мс на отрисовку DOM
}


    function restartQuiz() {
      currentQuestionIndex = 0;
      score = 0;
      userAnswers = [];
      selectedAnswerId = null;

      document.getElementById('quiz-box').style.display = 'block';
      document.querySelector('.controls').style.display = 'block';
      document.getElementById('result-box').style.display = 'none';
      document.getElementById('username').value = '';

      updateProgress();
      showQuestion();
    }

    document.addEventListener('DOMContentLoaded', () => {
      initQuiz();
      document.getElementById('next-btn').addEventListener('click', nextQuestion);
    });
