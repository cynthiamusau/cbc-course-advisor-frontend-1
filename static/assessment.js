// CBC Course Advisor - Assessment Form JavaScript
let currentStep = 1;
const totalSteps = 5;

const subjectAreas = [
   'English',
   'Kiswahili (or Kenyan Sign Language)',
   'Mathematics',
   'Integrated Science',
   'Social Studies',
   'Religious Education (CRE, IRE, or HRE)',
   'Pre-Technical and Pre-Career Education',
   'Agriculture',
   'Business Studies',
   'Life Skills Education',
   'Health Education',
   'Sports & Physical Education'
];

const competencyLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];

const popularCareers = [
   'Software Developer', 'Engineer', 'Doctor', 'Teacher',
   'Entrepreneur', 'Scientist', 'Designer', 'Accountant'
];

// Data storage
let competencies = [];
let interests = [];
let academicPerformance = [];
let careerAspirations = [];

// Initialize the form
document.addEventListener('DOMContentLoaded', function() {
    initializeSubjectButtons();
    initializePopularCareers();
});

function initializeSubjectButtons() {
  const compButtons = document.getElementById('addCompetencyButtons');
  const intButtons = document.getElementById('addInterestButtons');

  subjectAreas.forEach(subject => {
    // Competency button
    const compBtn = document.createElement('button');
    compBtn.type = 'button';
    compBtn.className = 'subject-btn';
    compBtn.textContent = '+ ' + subject;
    compBtn.onclick = () => addCompetency(subject);
    compButtons.appendChild(compBtn);

     // Interest button
     const intBtn = document.createElement('button');
     intBtn.type = 'button';
     intBtn.className = 'subject-btn';
     intBtn.textContent = '+ ' + subject;
     intBtn.onclick = () => addInterest(subject);
     intButtons.appendChild(intBtn);
  });
}

function initializePopularCareers() {
  const container = document.getElementById('popularCareers');
  popularCareers.forEach(career => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'subject-btn';
      btn.textContent = '+ ' + career;
      btn.onclick = () => {
         if (!careerAspirations.includes(career)) {
             careerAspirations.push(career);
             updateCareersList();
         }
      };
      container.appendChild(btn);
  });
}

function addCompetency(area) {
  if (competencies.find(c => c.area === area)) {
      alert('Competency already added');
      return;
  }

    competencies.push({
        area: area,
        level: 'Intermediate',
        score: 70
    });

    updateCompetenciesList();
}

function updateCompetenciesList() {
  const list = document.getElementById('competenciesList');
  list.innerHTML = '';

    competencies.forEach((comp, index) => {
        const div = document.createElement('div');
        div.className = 'competency-item';
        div.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
              <h3 style="margin: 0;">${comp.area}</h3>
              <button type="button" onclick="removeCompetency(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.25rem;">×</button>
            </div>
            <div class="form-group">
              <label>Score: ${comp.score}%</label>
              <input type="range" class="slider" min="0" max="100" step="5" value="${comp.score}"
                    oninput="updateCompetencyScore(${index}, this.value)">
            </div>
        `;
        list.appendChild(div);
    });
}

function updateCompetencyLevel(index, level) {
  competencies[index].level = level;
}

function updateCompetencyScore(index, score) {
  competencies[index].score = parseInt(score);
  updateCompetenciesList();
}

function removeCompetency(index) {
  competencies.splice(index, 1);
  updateCompetenciesList();
}

function addInterest(area) {
    if (interests.find(i => i.area === area)) {
        alert('Interest already added');
        return;
    }

    interests.push({
        area: area,
        level: 3
    });

    updateInterestsList();
}

function updateInterestsList() {
  const list = document.getElementById('interestsList');
  list.innerHTML = '';

  interests.forEach((interest, index) => {
      const div = document.createElement('div');
      div.className = 'interest-item';
      div.innerHTML = `
          <div style="display: flex; justify-content: between; align-items: center; margin-bottom: 0.5rem;">
            <h3 style="margin: 0;">${interest.area}</h3>
            <button type="button" onclick="removeInterest(${index})" style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.25rem;">×</button>
          </div>
          <div class="form-group">
            <label>Interest Level: ${interest.level}/5</label>
            <input type="range" class="slider" min="1" max="5" step="1" value="${interest.level}"
                 oninput="updateInterestLevel(${index}, this.value)">
            <div style="display: flex; justify-content: space-between; font-size: 0.75rem; color: #6b7280;">
               <span>Not Interested</span>
               <span>Very Interested</span>
            </div>
          </div>
      `;
      list.appendChild(div);
  });
}

function updateInterestLevel(index, level) {
  interests[index].level = parseInt(level);
  updateInterestsList();
}

function removeInterest(index) {
  interests.splice(index, 1);
  updateInterestsList();
}

function addPerformance() {
  const subject = document.getElementById('perfSubject').value;
  const scoreVal = document.getElementById('perfScore').value;
  const term = document.getElementById('perfTerm').value;

    if (!subject || !scoreVal || !term) {
        alert('Please fill all fields');
        return;
    }

    const score = parseInt(scoreVal);
    let grade = '';
    if (score >= 75) grade = 'EE';
    else if (score >= 50) grade = 'ME';
    else if (score >= 25) grade = 'AE';
    else grade = 'BE';

    academicPerformance.push({
        subject: subject,
        grade: grade,
        score: score,
        term: term
    });

    // Clear form
    document.getElementById('perfSubject').value = '';
    document.getElementById('perfScore').value = '';
    document.getElementById('perfTerm').value = '';

    updatePerformanceList();
}

function updatePerformanceList() {
  const list = document.getElementById('performanceList');
  list.innerHTML = '';

    academicPerformance.forEach((perf, index) => {
      const div = document.createElement('div');
      div.className = 'card';
      div.style.background = '#f9fafb';
      div.style.marginBottom = '0.5rem';
      div.innerHTML = `
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
               <strong>${perf.subject}</strong><br>
               <span style="font-size: 0.875rem; color: #6b7280;">
                  Grade ${perf.grade} • ${perf.score}% • ${perf.term}
               </span>
            </div>
            <button type="button" onclick="removePerformance(${index})"
                  style="background: none; border: none; color: #ef4444; cursor: pointer; font-size: 1.25rem;">×</button>
          </div>
      `;
      list.appendChild(div);
  });
}

function removePerformance(index) {
  academicPerformance.splice(index, 1);
  updatePerformanceList();
}

function addCareer() {
  const input = document.getElementById('careerInput');
  const career = input.value.trim();

    if (!career) return;

    if (careerAspirations.includes(career)) {
        alert('Career aspiration already added');
        return;
    }

    careerAspirations.push(career);
    input.value = '';
    updateCareersList();
}

function updateCareersList() {
  const list = document.getElementById('careersList');
  list.innerHTML = '';

    careerAspirations.forEach((career, index) => {
      const badge = document.createElement('span');
      badge.className = 'badge';
      badge.style.marginRight = '0.5rem';
      badge.style.marginBottom = '0.5rem';
      badge.innerHTML = `
          ${career}
          <button type="button" onclick="removeCareer(${index})"
               style="background: none; border: none; color: inherit; cursor: pointer; margin-left: 0.25rem;">×</button>
      `;
      list.appendChild(badge);
  });
}

function removeCareer(index) {
  careerAspirations.splice(index, 1);
  updateCareersList();
}

function changeStep(direction) {
  // Validation
  if (direction === 1) {
      if (currentStep === 1) {
          if (!document.getElementById('name').value ||
              !document.getElementById('admissionNumber').value ||
              !document.getElementById('grade').value) {
              alert('Please fill all required fields');
              return;
          }
      }
      if (currentStep === 2 && competencies.length === 0) {
          alert('Please add at least one competency');
          return;
      }
      if (currentStep === 3 && interests.length === 0) {
          alert('Please add at least one interest');
          return;
      }
  }

  // Hide current step
  document.getElementById(`step${currentStep}`).classList.remove('active');
  document.getElementById(`step${currentStep}-indicator`).classList.remove('active');
  document.getElementById(`step${currentStep}-indicator`).classList.add('completed');
  // Update step
  currentStep += direction;

  // Show new step
  document.getElementById(`step${currentStep}`).classList.add('active');
  document.getElementById(`step${currentStep}-indicator`).classList.add('active');

   // Update buttons
   document.getElementById('prevBtn').style.display = currentStep === 1 ? 'none' : 'block';
   document.getElementById('nextBtn').style.display = currentStep === totalSteps ? 'none' : 'block';
   document.getElementById('submitBtn').style.display = currentStep === totalSteps ? 'block' : 'none';
}

// Form submission
document.getElementById('assessmentForm').addEventListener('submit', async function(e) {
   e.preventDefault();

  const data = {
     name: document.getElementById('name').value,
     admissionNumber: document.getElementById('admissionNumber').value,
     grade: document.getElementById('grade').value,
     learningStyle: document.getElementById('learningStyle').value,
     competencies: competencies,
     interests: interests,
     academicPerformance: academicPerformance,
     careerAspirations: careerAspirations.length > 0 ? careerAspirations : null,
     pathway: document.getElementById('pathway').value
  };

  // Show loading
  document.getElementById('loadingOverlay').style.display = 'flex';

  try {
     const response = await fetch('/api/assessment', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json'
         },
         body: JSON.stringify(data)
     });

     const result = await response.json();
         if (result.success) {
             // Redirect to recommendations page
             window.location.href = `/recommendations/${result.learnerId}`;
         } else {
             alert('Error: ' + result.error);
             document.getElementById('loadingOverlay').style.display = 'none';
         }
      } catch (error) {
         alert('Error submitting assessment: ' + error.message);
         document.getElementById('loadingOverlay').style.display = 'none';
      }
});
