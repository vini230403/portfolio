
function updateProfileInfo(profileData) {
    const photo = document.getElementById('profile.photo')
    photo.src = profileData.photo
    photo.alt = profileData.name
    
    const name = document.getElementById('profile.name')
    name.innerText = profileData.name

    const job = document.getElementById('profile.job')
    job.innerText = profileData.job

    const cell = document.getElementById('profile.cell')
    cell.innerText = profileData.cell
    cell.href =`tel:${profileData.cell}`

    const adress = document.getElementById('profile.adress')
    adress.innerText = profileData.adress
    

    const email = document.getElementById('profile.email')
    email.innerText = profileData.email
    email.href = `mailto:${profileData.email}`


    const linkedin = document.getElementById('profile.linkedin')
    linkedin.innerText = profileData.linkedin
    linkedin.href = `${profileData.linkedin}`
    linkedin.target = "_blank";
    linkedin.rel = "noopener noreferrer";

    const GitHub = document.getElementById('profile.GitHub')
    GitHub.innerText = profileData.GitHub
    GitHub.href = `${profileData.GitHub}`
    GitHub.target = "_blank";
    GitHub.rel = "noopener noreferrer";
    

}

function updateSoftSkills(profileData) {
    const softSkills = document.getElementById('profile.skills.softSkills')

    softSkills.innerHTML = profileData.skills.softSkills.map(skill => `<li>${skill}</ li>`).join('')
}

function updateHardSkills(profileData) {
    const hardSkills = document.getElementById('profile.skills.hardSkills')

    hardSkills.innerHTML = profileData.skills.hardSkills.map(skill => `
        <li class="${skill.class}">
            ${skill.name}
            <img src="${skill.logo}" alt="${skill.name} logo" class="skill-icon" />
        </li>`
    ).join('')
}

function updateLanguages(profileData) {
    const languages = document.getElementById('profile.languages');
    

    profileData.languages.forEach((language, index) => {
        
        const [langName, level] = language.split(' (')
        const langCode = getLanguageCode(langName)
        
        
        const li = document.createElement('li')
        li.className = `${langCode} title`
        li.textContent = langName

        
        const ul = document.createElement('ul')
        const levelItem = document.createElement('li')
        levelItem.innerHTML = `<p>${level ? level.replace(')', '') : ''}</p>`
        ul.appendChild(levelItem)

        if (langName === 'Inglês USA') {
            const link = document.createElement('a')
            link.href = 'https://bestof2024.openenglish.com/?id=0033r000043D6jvAAC'
            link.textContent = 'https://bestof2024.openenglish.com/?id=0033r000043D6jvAAC'
            link.target = '_blank'
            link.className = 'language-link'
            
            languages.appendChild(li)
            languages.appendChild(ul)
            languages.appendChild(link)
        } else {
            languages.appendChild(li)
            languages.appendChild(ul)
        }


        if (index < profileData.languages.length - 1) {
            const hr = document.createElement('hr')
            languages.appendChild(hr)
        }
    });
}

function getLanguageCode(language) {
    const languageMap = {
        'Português BR': 'pt_br',
        'Inglês USA': 'us'
    };
    return languageMap[language] || ''
}

function updatePortfolio(profileData) {
    const portfolio = document.getElementById('profile.portfolio')

    portfolio.innerHTML = profileData.portfolio.map((project, index) => {
        
        const carouselHTML = `
            <div class="swiper project-carousel-${index}">
                <div class="swiper-wrapper">
                    ${project.images
                        .map(
                            (image) => `
                                <div class="swiper-slide">
                                    <img src="${image}" alt="${project.name}" />
                                </div>
                            `
                        )
                        .join("")}
                </div>
                <!-- Paginação -->
                <div class="swiper-pagination"></div>
                <!-- Navegação -->
                <div class="swiper-button-next"></div>
                <div class="swiper-button-prev"></div>
            </div>
        `


        let projectHTML = `
            <li>
                <h3 ${project.github ? 'class="github"' : ''}>${project.name}</h3>
                <a href="${project.url}" target="_blank">${project.url}</a>
                ${project.urlPage ? `<br><a href="${project.urlPage}" target="_blank">Ver Página</a>` : ""}
                ${carouselHTML}
            </li>
        `

        
        if (index < profileData.portfolio.length - 1) {
            projectHTML += '<hr>';
        }

        return projectHTML;
    }).join('');

    profileData.portfolio.forEach((_, index) => {
        new Swiper(`.project-carousel-${index}`, {
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev"
            }
        });
    });

}

function updateProfessionalExperience(profileData) {
    const professionalExperience = document.getElementById('profile.professionalExperience')

    professionalExperience.innerHTML = profileData.professionalExperience.map((professional, index) => {
        let professionalHTML = `
            <li>
                <h3 >${professional.name}</h3>
                <p class="date">${professional.date}</p>
                <p >${professional.description}</p>
            </li>
        `;

        
        if (index < profileData.professionalExperience.length - 1) {
            professionalHTML += '<hr>';
        }

        return professionalHTML;
    }).join('');
}

function updateScholarity(profileData) {
    const scholarity = document.getElementById('profile.educations.scholarity')

    scholarity.innerHTML = profileData.educations.scholarity.map((education, index) =>{
        let educationHTML = 
        `
            <li>
                <h3>${education.school}</h3>
                <p class="study">${education.training}</p>
                <p class="date">${education.period}</p>
            </li>
        `
        if (index < profileData.educations.scholarity.length - 1) {
            educationHTML += '<hr>';
        }

        return educationHTML;
    
    }).join('')
}

function updateCourse(profileData) {
    const course = document.getElementById('profile.educations.course')

    course.innerHTML = profileData.educations.course.map((education, index) => {

        const certificateHTML = education.certificate_url && education.certificate_completed
            ? `<a href="${education.certificate_url}" target="_blank" class="certificate">${education.certificate_completed}</a>` 
            : ''

        let educationsHTML =
        `
            <li>
                <h3>${education.institution}</h3>
                <p class="study">${education.name}</p>
                <p class="date">${education.workload}</p>
                ${certificateHTML}
            </li>
        `
        if (index < profileData.educations.course.length - 1) {
            educationsHTML += '<hr>';
        }

        return educationsHTML;

    
    }).join('')
}

(async () => {
    const profileData = await fetchProfileData()
    updateProfileInfo(profileData)
    updateSoftSkills(profileData)
    updateHardSkills(profileData)
    updateLanguages(profileData)
    updatePortfolio(profileData)
    updateProfessionalExperience(profileData)
    updateScholarity(profileData)
    updateCourse(profileData)
})()

//https://bestof2024.openenglish.com/?id=0033r000043D6jvAAC
