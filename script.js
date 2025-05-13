
  
    const quizData = [
      {
        id: 1,
        question_text: "Какая абревиатура нашего колледжа?",
        answers: [
          { id: 1, answer_text: "ГПОАС ИС БК", is_correct: false },
          { id: 2, answer_text: "ИСИП У ДЕДА", is_correct: false },
          { id: 3, answer_text: "АКСЖКХ", is_correct: false },
          { id: 4, answer_text: "ГПОАУ АО АПК", is_correct: true }
        ]
      },
      {
        id: 2,
        question_text: "Какую пароду собак любит Торба Нина Викторовна?",
        answers: [
          { id: 5, answer_text: "Мопс", is_correct: true },
          { id: 6, answer_text: "Чау чау", is_correct: false },
          { id: 7, answer_text: "Корги", is_correct: false },
          { id: 8, answer_text: "Мейнкун", is_correct: false }
        ]
      },
      {
        id: 3,
        question_text: "При помощи какого документа студент может зайти в колледж при забытом пропуске?",
        answers: [
          { id: 9, answer_text: "СНИЛС", is_correct: false },
          { id: 10, answer_text: "ИНН", is_correct: false },
          { id: 11, answer_text: "Студенческий билет", is_correct: true },
          { id: 12, answer_text: "Полис", is_correct: false }
        ]
      },
      {
        id: 4,
        question_text: "Какой номер кабинета у заведующего отделенеим?",
        answers: [
          { id: 13, answer_text: "№23", is_correct: false },
          { id: 14, answer_text: "№33", is_correct: true },
          { id: 15, answer_text: "№35", is_correct: false },
          { id: 16, answer_text: "№15", is_correct: false }
        ]
      },
      {
        id: 5,
        question_text: "В какое время начинаеться обед в ВТ-ПТ?",
        answers: [
          { id: 17, answer_text: "11:15", is_correct: true },
          { id: 18, answer_text: "12:30", is_correct: false },
          { id: 19, answer_text: "11:00", is_correct: false },
          { id: 20, answer_text: "10:30", is_correct: false }
        ]
      },
      {
        id: 6,
        question_text: "Как зовут системного администратора?",
        answers: [
          { id: 21, answer_text: "Марат Игнатович", is_correct: false },
          { id: 22, answer_text: "Василий Денисович", is_correct: false },
          { id: 23, answer_text: "Андрей Игоревич", is_correct: true },
          { id: 24, answer_text: "Дмитрий Евгеньевич", is_correct: false }
        ]
      },
      {
      id: 7,
      question_text: "Что означает красная обложка зачетной книжки?",
      answers: [
        { id: 25, answer_text: "Отличник учебы", is_correct: true },
        { id: 26, answer_text: "Долги по предметам", is_correct: false },
        { id: 27, answer_text: "Задолженность по оплате", is_correct: false },
        { id: 28, answer_text: "Участие в студсовете", is_correct: false }
      ]
      },
      {
      id: 8,
      question_text: "На каком этаже вывешываваеться рассписание?",
      answers: [
    { id: 29, answer_text: "На третьем этаже.", is_correct: false },
    { id: 30, answer_text: "На первом этаже.", is_correct: true },
    { id: 31, answer_text: "На втором этаже.", is_correct: false },
  ]
      },
      {
      id: 9,
      question_text: "Какого размера базовая стипендия в нашем колледже?",
      answers: [
    { id: 32, answer_text: "700-900 руб.", is_correct: true },
    { id: 33, answer_text: "500-600 руб.", is_correct: false },
    { id: 34, answer_text: "1000-1200 руб.", is_correct: false },
  ]
      },

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
            pdf.save(`Косметология_Сертификат_${userName.replace(/\s+/g, '_')}.pdf`);
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
